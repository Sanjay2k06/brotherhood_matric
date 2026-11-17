# Brotherhood School CMS — Complete Backend & Database Implementation Reference

This document provides a comprehensive technical reference for the **Brotherhood Matriculation Higher Secondary School** platform, covering the production **FastAPI backend architecture**, **admin access and role-based authorization**, **database schemas and ORM models**, **API endpoint catalog**, **media upload services**, **seeding utilities**, and **deployment instructions**.

---

## Table of Contents
1. [System Architecture Overview](#1-system-architecture-overview)
2. [Backend Directory Structure](#2-backend-directory-structure)
3. [Admin Access & Authentication](#3-admin-access--authentication)
4. [Database Architecture & ORM Schema](#4-database-architecture--orm-schema)
5. [Complete API Endpoints Catalog](#5-complete-api-endpoints-catalog)
6. [Dynamic CMS & Page Content Storage](#6-dynamic-cms--page-content-storage)
7. [Media Upload & Asset Storage](#7-media-upload--asset-storage)
8. [Database Seeding Scripts](#8-database-seeding-scripts)
9. [Configuration & Environment Variables](#9-configuration--environment-variables)
10. [Local Development & Production Execution](#10-local-development--production-execution)

---

## 1. System Architecture Overview

The system is constructed with a decoupled client-server architecture:

```
┌────────────────────────────────────────────────────────┐
│             Frontend (Client Application)              │
│  React 19 + TypeScript + TanStack Router + TailwindCSS │
│             Running on: http://localhost:8080          │
└───────────────▲────────────────────────▲───────────────┘
                │                        │
       Public REST APIs          Protected Admin APIs
       (JSON Payloads)          (Bearer JWT Authorization)
                │                        │
┌───────────────▼────────────────────────▼───────────────┐
│               Backend (FastAPI Web Service)            │
│  FastAPI + SQLAlchemy 2.0 (Async) + Pydantic v2 + Jose │
│             Running on: http://127.0.0.1:8000          │
├────────────────────────────────────────────────────────┤
│  • Dual Routing Prefixes: /api & /api/v1               │
│  • Role-Based Access Control (Super Admin / Editor)    │
│  • Soft Deletion & Audit Trail Middleware              │
│  • Dual-mode Media Storage (Local / Cloudinary)        │
└───────────────▲────────────────────────▲───────────────┘
                │                        │
     Async Engine (aiosqlite)     Async Engine (asyncpg)
                │                        │
┌───────────────▼────────┐      ┌────────▼───────────────┐
│     SQLite Database    │  OR  │   PostgreSQL Database  │
│ (brotherhood_cms.db)   │      │ (Production Cluster)   │
└────────────────────────┘      └────────────────────────┘
```

### Core Technologies
- **Backend Framework**: FastAPI (0.139.0) with Uvicorn ASGI server
- **Database Engine**: SQLAlchemy 2.0 (Async ORM)
- **Database Drivers**: `aiosqlite` (development/local) and `asyncpg` / `psycopg2-binary` (production PostgreSQL)
- **Data Validation & Serialization**: Pydantic v2 and `pydantic-settings`
- **Security & Cryptography**: `bcrypt` for password hashing, `python-jose` for JWT generation/validation
- **Media Storage**: Local static directory (`/uploads`) with optional Cloudinary CDN integration
- **Frontend Stack**: React 19, TypeScript 5.8, TanStack Router & TanStack Query, Vite 7, TailwindCSS v4, Lucide Icons

---

## 2. Backend Directory Structure

The backend source code resides inside `backend/` and follows a modular repository-service pattern:

```text
backend/
├── app/
│   ├── core/                      # Global infrastructure & cross-cutting concerns
│   │   ├── config.py              # Pydantic BaseSettings environment loader
│   │   ├── database.py            # Async engine & session utilities
│   │   ├── dependencies.py        # FastAPI Depends() injections & RBAC checks
│   │   ├── logging.py             # Structured application logger
│   │   └── security.py            # Bcrypt hashing & JWT token encoder/decoder
│   │
│   ├── database/                  # ORM database layer
│   │   ├── base.py                # Base audit model with UUID & timestamp fields
│   │   └── connection.py          # SQLAlchemy async engine & get_db generator
│   │
│   ├── shared/                    # Reusable generic repository logic
│   │   └── repository.py          # AsyncBaseRepository (Generic CRUD operations)
│   │
│   ├── auth/                      # Authentication, user profiles & permissions
│   │   ├── models.py              # User model (users table)
│   │   ├── schemas.py             # Login, token, password change schemas
│   │   ├── repository.py          # Database operations for users
│   │   ├── services.py            # Token generation, password validation logic
│   │   └── router.py              # /api/auth routes
│   │
│   ├── alerts/                    # Announcements marquee & flash notices
│   ├── events/                    # School calendar, academic timeline & events
│   ├── teachers/                  # Faculty directory & department profiles
│   ├── achievements/              # Best students of the month & board toppers
│   ├── uniforms/                  # Boys and girls dress code regulations
│   ├── houses/                    # Student house points & scorecards
│   ├── leaders/                   # Student council & house captains
│   ├── gallery/                   # Campus, sports & event media gallery
│   ├── admissions/                # Student admission inquiry processing
│   ├── contact/                   # Public messages & inquiry inbox
│   ├── careers/                   # Job openings & candidate resume submissions
│   ├── settings/                  # Global site configuration, contact & socials
│   ├── content/                   # Dynamic CMS pages (About, Chairman, etc.)
│   ├── uploads/                   # Media upload handler (Cloudinary & local)
│   │
│   └── main.py                    # Application entry point, router mounting & startup seeding
│
├── uploads/                       # Statically served uploaded media folder
├── brotherhood_cms.db             # Local SQLite database file
├── requirements.txt               # Python package dependencies
├── .env                           # Environment configuration
├── .env.example                   # Template environment configuration
├── seed.py                        # Database seeding script (Full data reset)
├── seed_teachers.py               # Faculty directory seeding script
├── Dockerfile                     # Multi-stage production container build
└── docker-compose.yml             # Container orchestration (API + PostgreSQL)
```

---

## 3. Admin Access & Authentication

### 3.1 Default Administrator Credentials

Upon first startup, the backend automatically initializes the database tables and checks for the root administrator account. If not present, it seeds the default administrator:

| Attribute | Value |
| :--- | :--- |
| **Login URL (Frontend)** | [http://localhost:8080/admin](http://localhost:8080/admin) |
| **Direct API Login** | `POST http://127.0.0.1:8000/api/auth/token/` |
| **Username** | `admin` |
| **Password** | `admin123` |
| **Email** | `admin@brotherhoodschool.edu.in` |
| **Role** | `Super Admin` |

> [!IMPORTANT]
> Change the default password immediately in a production deployment via `POST /api/auth/change-password/` or directly from the Admin Dashboard.

---

### 3.2 Role-Based Access Control (RBAC)

The system supports granular roles enforced by FastAPI dependency injection (`RoleChecker`):

| Role | Permissions |
| :--- | :--- |
| **Super Admin** | Full read, write, update, and soft-delete access to all modules, website settings, user accounts, and admissions/inquiries. |
| **Editor** | Content management access (Announcements, Events, Gallery, Teachers, Uniforms, Achievements, Student Houses, Leaders, CMS Pages, and Media Uploads). Restricted from managing core website settings and user roles. |
| **Public / Guest** | Read-only access to published content; submit-only access to `/api/admission-queries/`, `/api/contact-messages/`, and `/api/job-applications/`. |

#### Dependency Enforcement Matrix
- `get_current_user`: Validates JWT token from `Authorization: Bearer <token>`, fetches active user from database.
- `require_super_admin`: Requires role `Super Admin`.
- `require_editor_or_above`: Requires role in `["Super Admin", "Editor"]`.

---

### 3.3 Authentication Mechanics

1. **Password Hashing**: Passwords are encrypted using standard `bcrypt` with salt generation (`bcrypt.gensalt()`).
2. **JWT Access Tokens**: Generated using `HS256` algorithm with a signed payload containing:
   - `sub`: Username string
   - `exp`: Expiration timestamp (default: 7 days / 10,080 minutes)
3. **Protected Requests**: Clients send credentials in the HTTP header:
   ```http
   Authorization: Bearer <access_token>
   ```

---

## 4. Database Architecture & ORM Schema

The backend uses **SQLAlchemy 2.0** with async session management. All business entities inherit from `BaseAuditModel` which provides standardized audit fields and soft-delete mechanisms.

### 4.1 Base Audit Model (`BaseAuditModel`)

All tables inherit the following fields:

| Column Name | SQL Type | Modifiers / Default | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | Primary Key, `default=uuid.uuid4`, Indexed | Unique record identifier |
| `created_at` | `DateTime(timezone=True)` | `server_default=func.now()`, Not Null | Creation timestamp |
| `updated_at` | `DateTime(timezone=True)` | `server_default=func.now()`, Auto-updating | Last modification timestamp |
| `is_active` | `Boolean` | `default=True`, Not Null | Active status indicator |
| `deleted_at` | `DateTime(timezone=True)` | Nullable | Soft-delete timestamp (records are never dropped) |
| `created_by` | `UUID` | Foreign Key (`users.id`, `ondelete="SET NULL"`), Nullable | User who created the record |
| `updated_by` | `UUID` | Foreign Key (`users.id`, `ondelete="SET NULL"`), Nullable | User who last updated the record |

---

### 4.2 Database Tables & Schema Dictionary

#### 1. `users` (User Management)
- `id` (UUID, PK)
- `username` (String, Unique, Index, Not Null) — Login username
- `email` (String, Unique, Index, Not Null) — Administrator email
- `hashed_password` (String, Not Null) — Bcrypt password hash
- `role` (String, Not Null, Default: `"Editor"`) — `"Super Admin"` or `"Editor"`
- `refresh_token` (String, Nullable) — Token for refreshing sessions
- Audit columns (`created_at`, `updated_at`, `is_active`, `deleted_at`, `created_by`, `updated_by`)

#### 2. `website_settings` (Global Configuration)
- `id` (UUID, PK)
- `school_name` (String, Not Null, Default: `"Brotherhood School"`)
- `tagline` (String, Nullable)
- `logo`, `favicon` (String, URLs, Nullable)
- `email`, `phone`, `alternate_phone`, `whatsapp` (String, Nullable)
- `address`, `google_maps_embed` (String, Nullable)
- `facebook`, `instagram`, `youtube`, `linkedin`, `twitter` (String, URLs, Nullable)
- `working_hours` (String, Nullable)
- `seo_title`, `seo_description`, `seo_keywords` (String, Nullable)
- `google_analytics_id`, `meta_pixel` (String, Nullable)
- `footer_text`, `copyright` (String, Nullable)
- `theme_color`, `primary_color`, `secondary_color` (String, Nullable)
- Audit columns

#### 3. `pages` (Dynamic CMS Pages)
- `id` (UUID, PK)
- `title` (String, Not Null) — Page title
- `slug` (String, Unique, Index, Not Null) — URL slug (e.g., `about-school`, `founder-message`, `correspondent-message`, `principal-message`)
- `hero_title`, `hero_subtitle` (String, Nullable)
- `banner_image` (String, URL, Nullable)
- `content_blocks` (JSON, Nullable) — Flexible key-value structure containing paragraphs, quotes, and author info
- `images` (JSON, Nullable) — Array of asset URLs
- `seo_title`, `seo_description`, `seo_keywords` (String, Nullable)
- `status` (String, Not Null, Default: `"Published"`) — `"Published"` or `"Draft"`
- Audit columns

#### 4. `announcements` (Notice Board & Alerts)
- `id` (UUID, PK)
- `title` (String, Not Null) — Announcement headline
- `message` (String, Not Null) — Detailed notice body
- `priority` (String, Not Null, Default: `"Medium"`) — `"Low"`, `"Medium"`, `"High"`
- `status` (String, Not Null, Default: `"Active"`) — `"Active"`, `"Inactive"`
- `alert_type` (String, Not Null, Default: `"Notice"`) — `"Notice"`, `"Admission"`, `"Event"`, `"Emergency"`
- `expiry_date` (DateTime, Nullable)
- Audit columns

#### 5. `events` (School Calendar & Timeline)
- `id` (UUID, PK)
- `title` (String, Not Null) — Event headline
- `description` (String, Not Null) — Full event overview
- `cover_image` (String, URL, Nullable)
- `event_date` (String, Not Null) — Format `YYYY-MM-DD`
- `event_time` (String, Nullable) — e.g., `"10:00 AM"`
- `venue` (String, Nullable)
- `category` (String, Not Null, Default: `"Academic"`) — `"Academic"`, `"Celebration"`, `"Athletics"`, etc.
- `status` (String, Not Null, Default: `"Published"`) — `"Published"`, `"Draft"`
- `is_featured` (Boolean, Default: `False`)
- `is_upcoming` (Boolean, Default: `True`)
- `registration_link` (String, Nullable)
- Audit columns

#### 6. `teachers` (Faculty Directory)
- `id` (UUID, PK)
- `name` (String, Not Null) — Teacher name
- `designation` (String, Not Null) — e.g., `"Principal"`, `"PG Assistant"`, `"Primary Teacher"`
- `subject` (String, Not Null, Default: `"General"`) — Subject taught
- `qualification` (String, Nullable) — Academic degrees
- `experience` (String, Nullable) — Years of service
- `description` (String, Nullable) — Biography & teaching philosophy
- `image` (String, URL, Nullable) — Teacher portrait photo
- Audit columns

#### 7. `student_achievements` (Honors Board & Toppers)
- `id` (UUID, PK)
- `title` (String, Not Null) — Achievement headline (e.g. Student of the Month, Board Topper)
- `description` (String, Nullable) — Details, marks, or award criteria
- `image` (String, URL, Nullable)
- Audit columns

#### 8. `school_uniforms` (Dress Code Guidelines)
- `id` (UUID, PK)
- `section` (String, Not Null) — e.g., `"Primary Wing"`, `"Middle School"`, `"Higher Secondary"`
- `boys_uniform` (String, Not Null) — Description of boys' uniform
- `girls_uniform` (String, Not Null) — Description of girls' uniform
- Audit columns

#### 9. `student_houses` (Houses Scoreboard)
- `id` (UUID, PK)
- `name` (String, Not Null) — House name (e.g., `"Galileo House"`, `"Red House"`)
- `motto` (String, Nullable) — House motto
- `color_code` (String, Default: `"bg-red-500"`) — Tailwind color badge
- `description` (String, Nullable)
- `points` (Integer, Not Null, Default: `0`) — House points for competitions
- Audit columns

#### 10. `student_leaders` (Student Council Directory)
- `id` (UUID, PK)
- `role` (String, Not Null) — e.g., `"Head Boy"`, `"Head Girl"`, `"Sports Secretary"`
- `name` (String, Not Null) — Student name
- `grade` (String, Not Null) — Class / section (e.g., `"XII-A"`, `"Std V"`)
- Audit columns

#### 11. `gallery_images` (Media Grid Photos)
- `id` (UUID, PK)
- `title` (String, Nullable)
- `description` (String, Nullable)
- `category` (String, Not Null, Default: `"Events"`) — `"Campus"`, `"Sports"`, `"Events"`, `"Academics"`, `"Cultural"`, `"Infrastructure"`
- `image` (String, URL, Not Null) — Asset URL
- `sort_order` (Integer, Default: `0`)
- `is_featured` (Boolean, Default: `False`)
- Audit columns

#### 12. `admission_queries` (Public Admissions Inquiries)
- `id` (UUID, PK)
- `student_name` (String, Not Null)
- `parent_name` (String, Not Null)
- `phone` (String, Not Null)
- `email` (String, Nullable)
- `class_applied` (String, Not Null, Default: `"Class I"`)
- `message` (String, Nullable)
- `status` (String, Not Null, Default: `"New"`) — `"New"`, `"Contacted"`, `"Application Sent"`, `"Closed"`
- `notes` (String, Nullable) — Internal administrative remarks
- Audit columns

#### 13. `contact_messages` (Public Contact Submissions)
- `id` (UUID, PK)
- `name` (String, Not Null)
- `email` (String, Nullable)
- `phone` (String, Not Null)
- `subject` (String, Nullable)
- `message` (String, Not Null)
- `status` (String, Not Null, Default: `"Pending"`) — `"Pending"`, `"Replied"`, `"Closed"`
- Audit columns

#### 14. `vacancies` (Employment Opportunities)
- `id` (UUID, PK)
- `title` (String, Not Null) — Job role
- `description` (String, Not Null) — Job details & expectations
- `qualification` (String, Nullable) — Required degrees
- `experience` (String, Nullable)
- `department` (String, Not Null) — Academic department
- `deadline` (String, Nullable) — Date string
- `status` (String, Not Null, Default: `"Open"`) — `"Open"`, `"Closed"`, `"Draft"`
- Relation: `applications` (One-to-Many to `JobApplication`, `cascade="all, delete-orphan"`)
- Audit columns

#### 15. `job_applications` (Candidate Job Submissions)
- `id` (UUID, PK)
- `name` (String, Not Null) — Candidate full name
- `email` (String, Not Null)
- `phone` (String, Not Null)
- `vacancy_id` (UUID, Foreign Key `vacancies.id`, `ondelete="CASCADE"`, Not Null)
- `cover_letter` (String, Nullable)
- `resume` (String, URL, Nullable) — Link to uploaded resume PDF/DOC
- `status` (String, Not Null, Default: `"New"`) — `"New"`, `"Shortlisted"`, `"Interview"`, `"Rejected"`, `"Selected"`
- Relation: `vacancy_rel` (Many-to-One back to `Vacancy`)
- Audit columns

---

## 5. Complete API Endpoints Catalog

Both `/api` and `/api/v1` prefixes are fully supported and route to identical handlers.

### 5.1 Authentication (`/api/auth/`)
| Method | Endpoint | Access | Request Body | Description |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/token/` | Public | `{"username": "...", "password": "..."}` | Authenticates and returns `{access_token, refresh_token, token_type}`. |
| `POST` | `/api/auth/refresh/` | Public | `{"refresh_token": "..."}` | Issues fresh tokens using a valid refresh token. |
| `GET` | `/api/auth/profile/` | Protected | None (Bearer Token) | Returns user info: `{id, username, email, role, is_active}`. |
| `POST` | `/api/auth/change-password/`| Protected | `{"current_password": "...", "new_password": "..."}` | Updates password for authenticated user. |
| `POST` | `/api/auth/forgot-password/`| Public | `{"email": "..."}` | Initiates password reset token generation. |

---

### 5.2 Announcements & Alerts (`/api/announcements/` & `/api/alerts/`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/announcements/` | Public | List all active announcements (`?skip=0&limit=100`). |
| `GET` | `/api/announcements/{id}/` | Public | Retrieve a specific announcement by UUID. |
| `POST` | `/api/announcements/` | Editor+ | Create a new notice / announcement. |
| `PUT` | `/api/announcements/{id}/` | Editor+ | Update an existing announcement. |
| `DELETE`| `/api/announcements/{id}/` | Editor+ | Soft-delete an announcement. |

---

### 5.3 Events (`/api/events/`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/events/` | Public | Retrieve list of school events. |
| `GET` | `/api/events/{id}/` | Public | Retrieve single event details. |
| `POST` | `/api/events/` | Editor+ | Create a calendar event. |
| `PUT` | `/api/events/{id}/` | Editor+ | Update an existing event. |
| `DELETE`| `/api/events/{id}/` | Editor+ | Soft-delete an event. |

---

### 5.4 Teachers & Faculty (`/api/teachers/`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/teachers/` | Public | Retrieve faculty directory. |
| `GET` | `/api/teachers/{id}/` | Public | Retrieve teacher by ID. |
| `POST` | `/api/teachers/` | Editor+ | Add a teacher profile. |
| `PUT` | `/api/teachers/{id}/` | Editor+ | Update a teacher profile. |
| `DELETE`| `/api/teachers/{id}/` | Editor+ | Soft-delete a teacher profile. |

---

### 5.5 Student Achievements (`/api/student-achievements/`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/student-achievements/` | Public | Retrieve student honors and achievements. |
| `POST` | `/api/student-achievements/` | Editor+ | Add an achievement / topper record. |
| `PUT` | `/api/student-achievements/{id}/` | Editor+ | Update achievement details. |
| `DELETE`| `/api/student-achievements/{id}/` | Editor+ | Soft-delete an achievement record. |

---

### 5.6 School Uniforms (`/api/school-uniforms/`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/school-uniforms/` | Public | Retrieve dress code guidelines. |
| `POST` | `/api/school-uniforms/` | Editor+ | Create a uniform section record. |
| `PUT` | `/api/school-uniforms/{id}/` | Editor+ | Update a uniform section. |
| `DELETE`| `/api/school-uniforms/{id}/` | Editor+ | Soft-delete a uniform entry. |

---

### 5.7 Student Houses (`/api/student-houses/`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/student-houses/` | Public | Retrieve houses and scoreboard points. |
| `POST` | `/api/student-houses/` | Editor+ | Register a new house. |
| `PUT` | `/api/student-houses/{id}/` | Editor+ | Update house points and information. |
| `DELETE`| `/api/student-houses/{id}/` | Editor+ | Soft-delete a house record. |

---

### 5.8 Student Leaders (`/api/student-leaders/`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/student-leaders/` | Public | Retrieve student council and house captains. |
| `POST` | `/api/student-leaders/` | Editor+ | Add a student leader record. |
| `PUT` | `/api/student-leaders/{id}/` | Editor+ | Update leader information. |
| `DELETE`| `/api/student-leaders/{id}/` | Editor+ | Soft-delete a student leader. |

---

### 5.9 Gallery Images (`/api/gallery-images/`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/gallery-images/` | Public | Retrieve media gallery photos. |
| `POST` | `/api/gallery-images/` | Editor+ | Upload / register a gallery image. |
| `PUT` | `/api/gallery-images/{id}/` | Editor+ | Update image details or category. |
| `DELETE`| `/api/gallery-images/{id}/` | Editor+ | Soft-delete a gallery image. |

---

### 5.10 Admission Queries (`/api/admission-queries/` & `/api/admissions/`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/admission-queries/` | **Public** | Submit a student admission inquiry. |
| `GET` | `/api/admission-queries/` | Protected | List all inquiries (Admin / Management). |
| `GET` | `/api/admission-queries/{id}/`| Protected | View single inquiry details. |
| `PUT` | `/api/admission-queries/{id}/`| Protected | Update inquiry status (`New`, `Contacted`, etc.) & internal notes. |
| `DELETE`| `/api/admission-queries/{id}/`| Protected | Soft-delete an inquiry. |

---

### 5.11 Contact Messages (`/api/contact-messages/` & `/api/contact/`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/contact-messages/` | **Public** | Submit a contact / feedback message. |
| `GET` | `/api/contact-messages/` | Protected | List all contact messages (Admin). |
| `GET` | `/api/contact-messages/{id}/` | Protected | View single message details. |
| `PUT` | `/api/contact-messages/{id}/` | Protected | Update message status (`Pending`, `Replied`, `Closed`). |
| `DELETE`| `/api/contact-messages/{id}/` | Protected | Soft-delete a contact message. |

---

### 5.12 Careers & Job Applications (`/api/vacancies/` & `/api/job-applications/`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/vacancies/` | Public | List open career vacancies. |
| `POST` | `/api/vacancies/` | Protected | Post a new job vacancy. |
| `PUT` | `/api/vacancies/{id}/` | Protected | Update a job vacancy. |
| `DELETE`| `/api/vacancies/{id}/` | Protected | Soft-delete a vacancy. |
| `POST` | `/api/job-applications/` | **Public** | Submit an application for an open vacancy. |
| `GET` | `/api/job-applications/` | Protected | List job applications (HR / Admin). |
| `PUT` | `/api/job-applications/{id}/` | Protected | Update candidate status (`Shortlisted`, `Rejected`, etc.). |

---

### 5.13 Website Settings (`/api/settings/`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/settings/` | Public | Retrieve global header, contact, social, and footer settings. |
| `PUT` | `/api/settings/` | **Super Admin** | Update website settings and configuration. |

---

### 5.14 Dynamic CMS Pages (`/api/pages/`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/pages/` | Public | List all CMS pages. |
| `GET` | `/api/pages/{slug}/` | Public | Retrieve page content by URL slug (e.g. `founder-message`). |
| `POST` | `/api/pages/` | Editor+ | Create a new CMS page. |
| `PUT` | `/api/pages/{slug}/` | Editor+ | Update title, hero section, or JSON content blocks. |
| `DELETE`| `/api/pages/{slug}/` | Editor+ | Soft-delete a page. |

---

### 5.15 Media Uploads (`/api/media/`)
| Method | Endpoint | Access | Request Type | Description |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/media/upload/` | Editor+ | `multipart/form-data` | Uploads an image or document. Returns `{"url": "storage_url"}`. |

---

### 5.16 System Endpoints
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Public | Returns server health and database status: `{"status": "healthy", "database": "connected"}`. |
| `GET` | `/api/version` | Public | Returns API build version and framework: `{"version": "1.0.0", "framework": "FastAPI"}`. |
| `GET` | `/docs` | Public | Interactive OpenAPI / Swagger UI interface. |
| `GET` | `/redoc` | Public | ReDoc interactive documentation. |

---

## 6. Dynamic CMS & Page Content Storage

To enable non-technical administrators to update critical institutional pages without code modifications, pages are stored dynamically in the `pages` table using JSON `content_blocks`.

### 6.1 Pre-seeded Page Slugs
1. `about-school`: Foundational history, co-educational learning philosophy, and modern campus infrastructure.
2. `founder-message`: Official welcome statement and visionary message from Founder & Chairman **Rev. Fr. Anton Cruz**.
3. `correspondent-message`: Academic message and leadership vision from Correspondent **Mr. J. Jeyakumar**.
4. `principal-message`: Leadership messages from Primary Wing Principal **Mrs. Helen Johnson** and Higher Secondary Wing Principal **Mrs. Shima Newton**.

### 6.2 Example CMS Page JSON Schema
```json
{
  "title": "Chairman's Message",
  "slug": "founder-message",
  "hero_title": "Rev. Fr. Anton Cruz",
  "hero_subtitle": "\"A Vision That Continues To Inspire Generations\"",
  "content_blocks": {
    "name": "Rev. Fr. Anton Cruz",
    "designation": "Founder & Chairman",
    "serving_since": "Serving Since 1991",
    "intro": "With a profound commitment to holistic education...",
    "quote": "Character Formation Through Quality Education",
    "message_p1": "Be strong in spiritual values. Every building speaks of...",
    "message_p2": "You are the builder of your own future..."
  },
  "seo_title": "Chairman's Message — Brotherhood School",
  "seo_description": "Official welcoming statement and vision details from the Chairman, Rev. Fr. Anton Cruz.",
  "status": "Published"
}
```

---

## 7. Media Upload & Asset Storage

Media uploads are handled by `app.uploads.services.UploadService` using an intelligent **dual-storage architecture**:

1. **Cloudinary Cloud CDN (Preferred in Production)**:
   - Activated automatically when `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` are provided in `.env`.
   - Files are uploaded to the `school_cms` folder in Cloudinary with automated asset optimization.
   - Returns a secure HTTPS Cloudinary URL (`https://res.cloudinary.com/...`).

2. **Local Static Files (Automatic Local Fallback)**:
   - Used when Cloudinary environment variables are absent or when an upload to Cloudinary fails.
   - Files are stored in the `backend/uploads/` directory with a unique UUID filename (e.g. `backend/uploads/a3f29b48-....jpg`).
   - Served statically by FastAPI at `http://127.0.0.1:8000/uploads/<filename>`.

---

## 8. Database Seeding Scripts

The system includes two standalone database seeding scripts:

### 8.1 Standalone Database Reset & Seed (`seed.py`)
Drops all existing tables, recreates the schema, and populates comprehensive production data:
- Super Admin account (`admin` / `admin123`)
- Website settings (official school phone, email, address, working hours, copyright)
- 8 Student Houses (4 Primary Wing: Galileo, Zion, Judah, Bethel; 4 Senior Wing: St. Matthew, St. Mark, St. Luke, St. John)
- 25+ Student Leaders (Head Boy, Head Girl, Sports Captains, House Captains)
- 30+ Student Achievements (Best Students of the Month, Mid-Term and Quarterly Class Toppers)
- Core CMS Pages (About School, Chairman's Message, Correspondent's Message, Principal's Message)

**To run:**
```bash
cd backend
.\venv\Scripts\python.exe seed.py
```

### 8.2 Faculty Directory Seeding (`seed_teachers.py`)
Populates the authentic faculty directory of Brotherhood School, categorized across all school departments:
- **School Administration**: Correspondent, Primary Principal, Higher Secondary Principal, Academic Coordinator
- **Department of Tamil**: Senior & Primary language faculty
- **Department of English**: Senior & Primary language faculty
- **Department of Mathematics**: High school and higher secondary faculty
- **Department of Science & Social Science**: Physics, Chemistry, Biology, History & Geography specialists
- **Department of Computer Science & Robotics**: Lab instructors & programmers
- **Physical Education & Sports**: Physical Directors & sports trainers

**To run:**
```bash
cd backend
.\venv\Scripts\python.exe seed_teachers.py
```

---

## 9. Configuration & Environment Variables

All backend settings are controlled through `backend/.env`. A complete configuration reference is provided below:

```ini
# ==============================================================
# General Server Configuration
# ==============================================================
PROJECT_NAME="Brotherhood School CMS"

# ==============================================================
# Database Configuration
# ==============================================================
# For Local SQLite:
DATABASE_URL=sqlite:///./brotherhood_cms.db

# For Production PostgreSQL:
# DATABASE_URL=postgresql://postgres:password@localhost:5432/brotherhood_cms

# ==============================================================
# Security & JWT Token Authentication
# ==============================================================
SECRET_KEY=87a0dbdc3fb25db951259e863004d3ea2d38e21a221f7db1a1b181db89cf0415
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080 # 7 days in minutes

# ==============================================================
# CORS Configuration
# ==============================================================
BACKEND_CORS_ORIGINS=["*"]

# ==============================================================
# Optional Cloudinary Storage Configuration
# ==============================================================
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## 10. Local Development & Production Execution

### 10.1 Running the Backend

#### Using Windows PowerShell:
```powershell
# 1. Navigate to backend directory
cd backend

# 2. Activate virtual environment (or invoke python directly)
.\venv\Scripts\Activate.ps1

# 3. Start development server with hot-reload
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

The API will start at:
- **Base URL**: `http://127.0.0.1:8000`
- **Interactive Swagger Docs**: `http://127.0.0.1:8000/docs`

---

### 10.2 Running the Frontend

#### Using Windows PowerShell:
```powershell
# 1. Navigate to frontend directory
cd frontend

# 2. Start Vite development server
npm run dev
```

The web application will start at:
- **Local URL**: `http://localhost:8080/`
- **Admin Panel URL**: `http://localhost:8080/admin`

---

### 10.3 Production Docker Deployment

A production-ready `Dockerfile` and `docker-compose.yml` are provided in `backend/` to orchestrate both the FastAPI web service and a PostgreSQL container:

```bash
cd backend
docker-compose up --build -d
```

This launches:
- **PostgreSQL Database** on port `5432` with automated health checks
- **FastAPI Web Service** on port `8000` with database readiness dependencies
