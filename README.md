# Brotherhood Matriculation Higher Secondary School

A modern, responsive full-stack web portal and content management system for Brotherhood Matriculation Higher Secondary School.

---

## 🌟 Features

- **Modern Editorial UI**: Crafted with React 18, Vite, TanStack Router, Tailwind CSS, Lucide icons, and Framer Motion.
- **Interactive Faculty Showcase**: Custom stacking scroll-experience presenting faculty qualifications, departments, and experience.
- **Dynamic Content Management (FastAPI Backend)**:
  - Faculty & Staff directory with photo management
  - Announcements, notice board & circulars
  - Events & academic calendar
  - Gallery archives (Campus, Events, Sports)
  - Student achievements, Houses scoreboard, Student council leaders
  - Online Admissions Enquiry form & Contact desk
- **Responsive Across All Screens**: Optimized for desktop, tablet, and mobile viewports with fluid typography, responsive grids, and touch navigation.
- **Secure Authentication**: JWT-based admin authentication for the administrative portal.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript & Vite
- **Routing**: TanStack Router
- **Styling**: Tailwind CSS & Lucide Icons
- **Animation**: Framer Motion & Custom React Bits ScrollStack
- **Build Tool**: Vite

### Backend
- **Framework**: FastAPI (Python 3.12+)
- **ORM & Database**: SQLAlchemy 2.0 with SQLite / PostgreSQL support
- **Data Validation**: Pydantic v2
- **Auth**: JWT tokens with passlib / bcrypt password hashing

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ & npm / yarn
- Python 3.12+

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
python seed.py
uvicorn app.main:app --reload --port 8000
```
The API documentation is available at `http://localhost:8000/docs`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The website will be accessible at `http://localhost:8080`.

---

## 📁 Repository Structure

```text
brotherHood/
├── backend/                  # FastAPI backend
│   ├── app/                  # Application core & modular routers
│   ├── uploads/              # Local media storage fallback
│   ├── requirements.txt      # Python dependencies
│   └── seed.py               # Seed database records
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/       # Shared UI components
│   │   ├── routes/           # TanStack file-based routes
│   │   └── images/           # Static image assets
│   ├── package.json          # Node dependencies
│   └── vite.config.ts        # Vite configuration
└── README.md
```

---

## 📄 License
All rights reserved © Brotherhood Matriculation Higher Secondary School.
