# Brotherhood School CMS - Production FastAPI Backend

This is the production-grade, modular, and scale-ready content management backend for the **Brotherhood Matriculation Higher Secondary School** website. Built utilizing Python 3.12+ and FastAPI, it integrates seamlessly with the existing React/Vite/TS frontend.

---

## Technical Stack
* **Framework**: FastAPI (latest stable)
* **Language**: Python 3.12+
* **Database**: PostgreSQL (SQLAlchemy 2.0 ORM & Connection Pooling)
* **Migrations**: Alembic ready
* **Validation**: Pydantic v2
* **Authentication**: JWT Authorization & Password Cryptography (`bcrypt`)
* **Asset Upload**: Dual-Mode (Cloudinary cloud storage or local directory fallback)

---

## Directory Architecture
```text
backend/
├── app/
│   ├── core/                  # Core Utilities & Middleware
│   │   ├── config.py          # Settings loader
│   │   ├── database.py        # SQLAlchemy connections
│   │   ├── security.py        # Hashing & JWT tokens
│   │   ├── logging.py         # Structured logging configuration
│   │   └── dependencies.py    # Depends() injections & Role checks
│   ├── modules/               # Pluggable Feature Components
│   │   ├── auth/              # JWT logins & profile changes
│   │   ├── alerts/            # Notice marquee / announcements
│   │   ├── events/            # School calendar and timelines
│   │   ├── teachers/          # Faculty profiles directory
│   │   ├── achievements/      # Honors board and student awards
│   │   ├── uniforms/          # School dress regulations
│   │   ├── houses/            # House points scoreboard
│   │   ├── leaders/           # Student council nominations
│   │   ├── gallery/           # Media grid photos
│   │   ├── admissions/        # Public enquiries inbox
│   │   ├── contact/           # Customer message center
│   │   ├── careers/           # Open job positions & candidate resumes
│   │   ├── settings/          # Global header / footer configuration
│   │   ├── uploads/           # File storage uploading
│   │   └── pages/             # Dynamic CMS page text editor
│   └── main.py                # Main app file
├── uploads/                   # Statically served local uploads fallback
├── Dockerfile                 # Multi-stage image build
├── docker-compose.yml         # Dev cluster configs
├── seed.py                    # Standalone database seed script
├── .env                       # Environment configs
└── requirements.txt           # Dependency logs
```

---

## Database Seeding & Admin Credentials

On startup, the FastAPI server will automatically verify and initialize database tables. If empty, it will seed default configurations including:
* **Default Admin Account**:
  * **Username**: `admin`
  * **Password**: `admin123`
* **Default Scorecard**: Red, Blue, Green, and Gold houses initialized.
* **Default Settings**: Pre-seeded phone, address, and header/footer strings.

---

## Setup & Running Locally

### Option 1: Running with Docker Compose (Recommended)
This launches both the PostgreSQL database and the FastAPI web service, with a health check mapping database readiness before initiating the api.

1. Ensure Docker is running.
2. In the `backend` folder, run:
   ```bash
   docker-compose up --build
   ```
3. The API will boot and be accessible at `http://localhost:8000`.
4. API docs can be viewed at `http://localhost:8000/docs`.

### Option 2: Running Manually

1. **Virtual Environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Or `venv\Scripts\activate` on Windows
   ```
2. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
3. **Configure Environment**:
   Rename or copy `.env.example` to `.env` and fill in your variables (like `DATABASE_URL` or optional `CLOUDINARY_*` keys).
4. **Seed Database**:
   ```bash
   python seed.py
   ```
5. **Run Server**:
   ```bash
   uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
   ```

---

## Key API Routes (REST `/api/` & `/api/v1/`)

* **Authentications**:
  * `POST /api/auth/token/` - Matches credentials, returns `{access, refresh}`.
  * `GET /api/auth/profile/` - Yields authenticated user metadata.
* **Content Management**:
  * `GET/POST/PUT/DELETE /api/announcements/`
  * `GET/POST/PUT/DELETE /api/events/`
  * `GET/POST/PUT/DELETE /api/teachers/`
  * `GET/POST/PUT/DELETE /api/student-achievements/`
  * `GET/POST/PUT/DELETE /api/school-uniforms/`
  * `GET/POST/PUT/DELETE /api/student-houses/`
  * `GET/POST/PUT/DELETE /api/student-leaders/`
  * `GET/POST/PUT/DELETE /api/gallery-images/`
  * `GET/POST/PUT/DELETE /api/admission-queries/` (POST is public)
  * `GET/POST/PUT/DELETE /api/contact-messages/` (POST is public)
  * `GET/POST/PUT/DELETE /api/vacancies/`
  * `GET/POST/PUT/DELETE /api/job-applications/` (POST is public)
  * `GET/PUT /api/settings/` (GET is public)
  * `GET/POST/PUT/DELETE /api/pages/`
* **Media Uploads**:
  * `POST /api/media/upload/` - Accepts file forms and returns JSON `{"url": "storage_url"}`.
