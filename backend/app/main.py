import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
from fastapi import APIRouter

from app.core.config import settings
from app.database.connection import engine, AsyncSessionLocal
from app.database.base import Base
from app.core.logging import setup_logging, logger

# Import module routers
from app.auth.router import router as auth_router
from app.alerts.router import router as alerts_router
from app.events.router import router as events_router
from app.teachers.router import router as teachers_router
from app.achievements.router import router as achievements_router
from app.uniforms.router import router as uniforms_router
from app.houses.router import router as houses_router
from app.leaders.router import router as leaders_router
from app.gallery.router import router as gallery_router
from app.admissions.router import router as admissions_router
from app.contact.router import router as contact_router
from app.careers.router import vacancy_router, application_router
from app.settings.router import router as settings_router
from app.content.router import router as pages_router
from app.uploads.router import router as uploads_router

# Setup Logging
setup_logging()

# Initialize FastAPI App
app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Modular CMS Backend for School Website",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Setup - Supports localhost, Vercel, Netlify, Render, and custom domains
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://localhost:8081",
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:8080",
        "http://127.0.0.1:8081",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "https://brotherhood-api-ysb1.onrender.com",
    ],
    allow_origin_regex=r"^https?://.*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount local uploads directory for static files serving
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Mount public images directory if available
images_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../frontend/public/images"))
if os.path.exists(images_dir):
    app.mount("/images", StaticFiles(directory=images_dir), name="images")

# Health Check & Version Endpoints
@app.get("/health", tags=["system"])
def health_check():
    return {"status": "healthy", "database": "connected"}

@app.get("/api/v1/version", tags=["system"])
@app.get("/api/version", tags=["system"])
def get_version():
    return {"version": "1.0.0", "framework": "FastAPI"}

# Construct Unified API Router to support both /api and /api/v1 seamlessly
unified_router = APIRouter()

unified_router.include_router(auth_router, prefix="/auth", tags=["auth"])
unified_router.include_router(alerts_router, prefix="/announcements", tags=["announcements"])
unified_router.include_router(alerts_router, prefix="/alerts", tags=["alerts"])
unified_router.include_router(events_router, prefix="/events", tags=["events"])
unified_router.include_router(teachers_router, prefix="/teachers", tags=["teachers"])
unified_router.include_router(achievements_router, prefix="/student-achievements", tags=["student-achievements"])
unified_router.include_router(uniforms_router, prefix="/school-uniforms", tags=["school-uniforms"])
unified_router.include_router(houses_router, prefix="/student-houses", tags=["student-houses"])
unified_router.include_router(leaders_router, prefix="/student-leaders", tags=["student-leaders"])
unified_router.include_router(gallery_router, prefix="/gallery-images", tags=["gallery-images"])
unified_router.include_router(admissions_router, prefix="/admission-queries", tags=["admission-queries"])
unified_router.include_router(admissions_router, prefix="/admissions", tags=["admissions"])
unified_router.include_router(contact_router, prefix="/contact-messages", tags=["contact-messages"])
unified_router.include_router(contact_router, prefix="/contact", tags=["contact"])
unified_router.include_router(vacancy_router, prefix="/vacancies", tags=["vacancies"])
unified_router.include_router(application_router, prefix="/job-applications", tags=["job-applications"])
unified_router.include_router(settings_router, prefix="/settings", tags=["settings"])
unified_router.include_router(pages_router, prefix="/pages", tags=["pages"])
unified_router.include_router(uploads_router, prefix="/media", tags=["media"])

# Mount unified router on both prefixes
app.include_router(unified_router, prefix="/api")
app.include_router(unified_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return RedirectResponse(url="/docs")

# Startup Database Tables Creation and Initial Seeding
@app.on_event("startup")
async def startup_db_setup():
    try:
        logger.info("Initializing database tables...")
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        
        # Seed Initial Super Admin and Website Settings
        async with AsyncSessionLocal() as db:
            try:
                from app.auth.models import User
                from app.core.security import get_password_hash
                from app.settings.models import WebsiteSettings
                from app.houses.models import StudentHouse
                from sqlalchemy import select

                # 1. Seed Super Admin
                stmt_admin = select(User).filter(User.username == "admin")
                res_admin = await db.execute(stmt_admin)
                admin_user = res_admin.scalar_one_or_none()
                if not admin_user:
                    logger.info("Seeding default Super Admin user account (admin)...")
                    admin_user = User(
                        username="admin",
                        email="admin@brotherhoodschool.edu.in",
                        hashed_password=get_password_hash("admin123"),
                        role="Super Admin"
                    )
                    db.add(admin_user)
                    await db.commit()

                # 2. Seed Default Settings
                stmt_settings = select(WebsiteSettings)
                res_settings = await db.execute(stmt_settings)
                settings_record = res_settings.scalars().first()
                if not settings_record:
                    logger.info("Seeding default website settings configuration...")
                    settings_record = WebsiteSettings(
                        school_name="Brotherhood Matriculation Hr. Sec. School",
                        tagline="Shaping Future Leaders Since 1991",
                        email="info@brotherhoodschool.edu.in",
                        phone="044-2440133",
                        alternate_phone="98842 04848",
                        whatsapp="9884204848",
                        address="2nd Street, Kazura Garden, Neelankarai, Chennai 600041",
                        working_hours="Mon – Fri: 8:30 AM – 3:30 PM\nSat: 9:00 AM – 12:30 PM",
                        seo_title="Brotherhood Matriculation Hr. Sec. School — Chennai",
                        seo_description="Holistic education and character formation since 1991 in Chennai.",
                        copyright="Copyright © 2026 Brotherhood Matriculation Higher Secondary School. All rights reserved.",
                        theme_color="Forest Green & Gold"
                    )
                    db.add(settings_record)
                    await db.commit()

                # 3. Seed Default School Houses if none exist
                stmt_houses = select(StudentHouse).filter(StudentHouse.deleted_at.is_(None))
                res_houses = await db.execute(stmt_houses)
                houses = list(res_houses.scalars().all())
                if len(houses) == 0:
                    logger.info("Seeding default student houses scorecard...")
                    default_houses = [
                        StudentHouse(name="Red House", motto="Valour and Honor", color_code="bg-red-500", points=350, description="Representing courage, strength, and active sportsmanship."),
                        StudentHouse(name="Blue House", motto="Loyalty and Truth", color_code="bg-blue-600", points=420, description="Representing intelligence, focus, and academic excellence."),
                        StudentHouse(name="Green House", motto="Growth and Harmony", color_code="bg-green-600", points=380, description="Representing ecological stewardship, balance, and creative arts."),
                        StudentHouse(name="Gold House", motto="Victory and Wisdom", color_code="bg-yellow-500", points=410, description="Representing leadership, wisdom, and competitive achievements.")
                    ]
                    db.add_all(default_houses)
                    await db.commit()

                # 4. Seed Default CMS Pages if none exist
                from app.content.models import Page
                stmt_pages = select(Page).filter(Page.deleted_at.is_(None))
                res_pages = await db.execute(stmt_pages)
                pages = list(res_pages.scalars().all())
                if len(pages) == 0:
                    logger.info("Seeding default CMS pages...")
                    default_pages = [
                        Page(
                            title="About our School",
                            slug="about-school",
                            hero_title="Introduction & Legacy",
                            hero_subtitle="Foundational history and campus learning resources at Brotherhood.",
                            content_blocks={
                                "p1": "Brotherhood Matriculation Higher Secondary school is a thirty-year-old institution, recognised by the Government of Tamilnadu. It has classes from pre-Kindergarten to standard XII. It was founded in the year 1991.",
                                "p2": "It is a gender-neutral school, where students of both genders study and relate with respect for each other and maintain their personal dignity. It is aware that the quality of education is very much dependant on the competence of the teachers, therefore it has hired highly educated and dedicated teachers who are acutely aware of the great responsibility that vests on their shoulders. Our teachers undergo regular refresher programs and believe that they too are eternal students.",
                                "p3": "The school has all the standard facilities and much more. In keeping with its future oriented mindset, it has set up language labs, mathematics lab, Robotic lab, smart classes and a very well-equipped library."
                            },
                            seo_title="About School — Brotherhood Matriculation Hr. Sec. School",
                            seo_description="Learn about the history, introduction, and facilities of Brotherhood School.",
                            status="Published"
                        ),
                        Page(
                            title="Chairman's Message",
                            slug="founder-message",
                            hero_title="Rev. Fr. Anton Cruz",
                            hero_subtitle="\"A Vision That Continues To Inspire Generations\"",
                            content_blocks={
                                "name": "Rev. Fr. Anton Cruz",
                                "designation": "Founder & Chairman",
                                "serving_since": "Serving Since 1991",
                                "intro": "With a profound commitment to holistic education and moral integrity, Rev. Fr. Anton Cruz laid the foundations of Brotherhood Matriculation Higher Secondary School. His visionary leadership established an enduring sanctuary of learning where every child is empowered through quality instruction, reason, and faith.",
                                "quote": "Character Formation Through Quality Education",
                                "message_title": "Chairman & Founder's Visionary Message",
                                "message_p1": "Be strong in spiritual values. Every building speaks of the sacrifices made by your parents and grandparents. Every window represents the freedom of your thoughts in your future journey. Every classroom is the inner womb where your destiny is shaped. Every school bag carries your dreams, ambitions, and vision for the future. Every student is the architect of innovation and new discoveries, and every line written in your notebook contributes to the destiny of our nation. Every teacher you meet becomes the blueprint of your inner quest for knowledge and wisdom.",
                                "message_p2": "You are the builder of your own future, while your parents, teachers, and principal serve as your guides and mentors. Every school is the birthplace of God's love. Cherish it, nurture it, and let it transform your life. My prayer is that Brotherhood Group of Schools continues to raise future leaders with strong human and Godly values, expands its mission to every state of India and beyond, and reaches poor and needy children through quality education. Every child is truly a precious gift from God."
                            },
                            seo_title="Chairman's Message — Brotherhood School",
                            seo_description="Official welcoming statement and vision details from the Chairman, Rev. Fr. Anton Cruz.",
                            status="Published"
                        ),
                        Page(
                            title="Correspondent's Message",
                            slug="correspondent-message",
                            hero_title="Mr. J. Jeyakumar",
                            hero_subtitle="B.Sc. (Physics), M.A., M.A.(T), M.Ed., M.Phil.",
                            content_blocks={
                                "name": "Mr. J. Jeyakumar",
                                "designation": "Correspondent",
                                "intro": "I am delighted and privileged to welcome all students, parents, and teachers to Brotherhood Matriculation Higher Secondary School and to a new academic year filled with opportunities for learning and growth.",
                                "message_p1": "Our institution is committed to providing every child with the highest level of care, encouragement, and academic support. We believe that education should inspire curiosity, confidence, and excellence while nurturing strong moral values. Our experienced and highly qualified teaching faculty adopts modern and innovative teaching methodologies to make learning meaningful, engaging, and student-centered.",
                                "message_p2": "Our vision is to help every child discover their unique strengths, unlock their full potential, and confidently face the challenges of an ever-changing world. Alongside academic excellence, we emphasize character formation, leadership, discipline, creativity, and social responsibility. We sincerely seek the continued cooperation, blessings, and support of parents and well-wishers in fulfilling our shared mission of shaping responsible, compassionate, and successful future citizens."
                            },
                            seo_title="Correspondent's Message — Brotherhood School",
                            seo_description="Official welcoming statement and vision details from the Correspondent, Mr. J. Jeyakumar.",
                            status="Published"
                        ),
                        Page(
                            title="Principal's Message",
                            slug="principal-message",
                            hero_title="Principal's Message",
                            hero_subtitle="Welcome statement and educational vision from our school leadership.",
                            content_blocks={
                                "primary_title": "Mrs. Helen Johnson — Principal (Primary Wing)",
                                "primary_message_p1": "Welcome to Brotherhood Primary Wing, where every child's educational journey begins with love, care, and inspiration. We are committed to creating a safe, nurturing, joyful, and stimulating learning environment that encourages children to explore, imagine, and develop a lifelong love for learning.",
                                "primary_message_p2": "Our dedicated team of teachers works tirelessly to foster curiosity, creativity, confidence, communication, and independent thinking through activity-based learning, hands-on experiences, and positive social interactions. We believe that every child possesses unique talents and abilities, and our goal is to help each learner grow academically, emotionally, socially, and morally.",
                                "primary_message_p3": "We value the strong partnership between home and school and encourage parents to remain actively involved in their child's educational journey. Together, we can create meaningful learning experiences that help every child build a strong foundation for future success. Thank you for placing your trust in Brotherhood Primary Wing. We look forward to making every school year joyful, memorable, and enriching for every child.",
                                "secondary_title": "Mrs. Shima Newton — Principal (Higher Secondary Wing)",
                                "secondary_message_p1": "Education is not merely the acquisition of knowledge but the development of life skills, values, character, and personality. At Brotherhood Matriculation Higher Secondary School, we are committed to providing value-based education that empowers students to become responsible, compassionate, and confident individuals.",
                                "secondary_message_p2": "Our teaching-learning environment encourages academic excellence while nurturing creativity, innovation, leadership, and social awareness. We strive to instill compassion and sensitivity toward the less fortunate so that our students grow into socially responsible citizens capable of bringing positive change to society.",
                                "secondary_message_p3": "The warm, caring, and disciplined atmosphere within our school creates an environment where every child can learn with confidence and enthusiasm. Our dedicated teachers motivate each student to achieve their highest potential, while the continued support and cooperation of parents remain essential to our success. Together, we continue to fulfill our Founder's vision of providing quality education rooted in values, discipline, and excellence."
                            },
                            seo_title="Principal's Message — Brotherhood School",
                            seo_description="Official message and welcome note from the Principals Mrs. Helen Johnson & Mrs. Shima Newton.",
                            status="Published"
                        )
                    ]
                    db.add_all(default_pages)
                    await db.commit()

            except Exception as e:
                logger.error(f"Error seeding database data: {str(e)}")
                await db.rollback()
            
    except Exception as e:
        logger.error(f"Database startup hook error: {str(e)}")
