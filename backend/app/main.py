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
            from sqlalchemy import text
            for col_sql in [
                "ALTER TABLE student_leaders ADD COLUMN wing VARCHAR DEFAULT 'Primary'",
                "ALTER TABLE student_leaders ADD COLUMN house VARCHAR",
                "ALTER TABLE student_leaders ADD COLUMN duties VARCHAR",
            ]:
                try:
                    await conn.execute(text(col_sql))
                except Exception:
                    pass
        
        # Seed Initial Super Admin and Website Settings
        async with AsyncSessionLocal() as db:
            try:
                from app.auth.models import User
                from app.core.security import get_password_hash
                from app.settings.models import WebsiteSettings
                from app.houses.models import StudentHouse
                from app.leaders.models import StudentLeader
                from app.uniforms.models import SchoolUniform
                from app.teachers.models import Teacher
                from app.events.models import Event
                from app.achievements.models import StudentAchievement
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

                # 3. Seed Default School Houses if none exist (or if placeholder houses exist)
                stmt_houses = select(StudentHouse).filter(StudentHouse.deleted_at.is_(None))
                res_houses = await db.execute(stmt_houses)
                houses = list(res_houses.scalars().all())
                has_real_houses = any(h.name in ["Galilee House", "St. Matthew House"] for h in houses)
                if not has_real_houses:
                    logger.info("Seeding real school houses (Galilee, Zion, Judah, Bethel, St. Matthew, St. Mark, St. Luke, St. John)...")
                    default_houses = [
                        StudentHouse(name="Galilee House", motto="Knowledge and Exploration", color_code="bg-blue-600", points=385, description="Inspiring deep inquisitiveness, scientific reasoning, and a passion for discovering truth in the natural and mathematical universe."),
                        StudentHouse(name="Zion House", motto="Strength and Faith", color_code="bg-amber-500", points=410, description="Fostering unwavering character, spiritual strength, moral conviction, and upright leadership in times of challenge."),
                        StudentHouse(name="Judah House", motto="Courage and Praise", color_code="bg-red-600", points=395, description="Encouraging bold enthusiasm on athletic fields, joyful participation in school events, and fearless dedication to excellence."),
                        StudentHouse(name="Bethel House", motto="House of Peace", color_code="bg-emerald-600", points=400, description="Guiding students toward environmental stewardship, peaceful peer collaboration, creative arts, and gentle benevolence."),
                        StudentHouse(name="St. Matthew House", motto="Grace and Wisdom", color_code="bg-blue-700", points=425, description="Nurturing rigorous academic thinking, intellectual clarity, and visionary scholastic research across senior streams."),
                        StudentHouse(name="St. Mark House", motto="Courage and Action", color_code="bg-rose-600", points=415, description="Champions of speed, track and field excellence, physical endurance, and active student initiative."),
                        StudentHouse(name="St. Luke House", motto="Healing and Service", color_code="bg-emerald-700", points=440, description="Instilling altruistic civic consciousness, biomedical inquisitiveness, and active philanthropic service to society."),
                        StudentHouse(name="St. John House", motto="Love and Truth", color_code="bg-yellow-600", points=430, description="Prioritizing oratorical eloquence, classical literature, artistic mastery, and steadfast commitment to timeless truth."),
                    ]
                    db.add_all(default_houses)
                    await db.commit()

                # 4. Seed Default Student Leaders if none exist
                stmt_leaders = select(StudentLeader).filter(StudentLeader.deleted_at.is_(None))
                res_leaders = await db.execute(stmt_leaders)
                leaders = list(res_leaders.scalars().all())
                if len(leaders) == 0:
                    logger.info("Seeding default student leaders (Primary & Senior councils)...")
                    default_leaders = [
                        # Primary Council
                        StudentLeader(role="Head Boy", name="Immanual Jafferson.S", grade="Std V", wing="Primary", duties="Leading the primary pupil body, coordinating morning assemblies, and representing junior student interests with faculty."),
                        StudentLeader(role="Head Girl", name="Inshika Shri.S", grade="Std V", wing="Primary", duties="Guiding primary student initiatives, welcoming school guests, and maintaining classroom harmony and peer friendship."),
                        StudentLeader(role="Sports Captain", name="Harish.S", grade="Std V", wing="Primary", duties="Coordinating junior sports meets, physical training drills, and promoting fair play and energetic sportsmanship."),
                        StudentLeader(role="Sports Captain", name="Yashika.D", grade="Std V", wing="Primary", duties="Organizing primary athletic activities, track events, and motivating young athletes during inter-house games."),
                        StudentLeader(role="Cultural Leader", name="Keerthana.V", grade="Std V", wing="Primary", duties="Directing primary cultural celebrations, storytelling sessions, music performances, and festival assemblies."),
                        StudentLeader(role="Captain", name="Pratheesh.B", grade="Std V", wing="Primary", house="Galilee House", duties="Leading Galilee House in primary sports, quizzes, and discipline assemblies."),
                        StudentLeader(role="Vice Captain", name="Nivedha.N", grade="Std V", wing="Primary", house="Galilee House", duties="Assisting the House Captain in squad coordination and inter-house preparation."),
                        StudentLeader(role="Captain", name="Jeshwanth.S", grade="Std V", wing="Primary", house="Zion House", duties="Directing Zion House members, fostering team spirit, and inspiring moral character."),
                        StudentLeader(role="Vice Captain", name="Jaclin Nibola.J", grade="Std V", wing="Primary", house="Zion House", duties="Managing house points allocation, sports lineups, and classroom cleanliness."),
                        StudentLeader(role="Captain", name="Praveen Sai.B", grade="Std V", wing="Primary", house="Judah House", duties="Inspiring courage and sporting determination in all Judah House competitions."),
                        StudentLeader(role="Vice Captain", name="Sree Dharshini.I", grade="Std V", wing="Primary", house="Judah House", duties="Coordinating relay squads, attendance, and encouraging participation in house events."),
                        StudentLeader(role="Captain", name="Jayakandhan.M.D", grade="Std V", wing="Primary", house="Bethel House", duties="Directing Bethel House environmental care, campus stewardship, and academic excellence."),
                        StudentLeader(role="Vice Captain", name="Danya Shree.R", grade="Std V", wing="Primary", house="Bethel House", duties="Supporting house members in creative arts, literary contests, and sports assemblies."),
                        # Senior Council
                        StudentLeader(role="Head Boy", name="P. Kishore", grade="XII - A", wing="Secondary", duties="Chief student representative, managing the prefectorial board, coordinating school celebrations, and liaising directly with the Principal."),
                        StudentLeader(role="Head Girl", name="M. Akshaya", grade="XII - C", wing="Secondary", duties="Chief student leader presiding over student governance, mentorship circles, academic forums, and community outreach programs."),
                        StudentLeader(role="Vice Head Boy", name="B. Ashwanth", grade="XII - A", wing="Secondary", duties="Assisting the Head Boy in day-to-day discipline, morning assembly alignment, and committee oversight."),
                        StudentLeader(role="Vice Head Girl", name="A. Monisha", grade="XII - B", wing="Secondary", duties="Assisting the Head Girl in student council duties, cultural arrangements, and junior student welfare."),
                        StudentLeader(role="Sport Secretary", name="N. Divya Dharshini", grade="XII - A", wing="Secondary", duties="Directing the annual Sports Day, zonal athletic meets, inter-school tournaments, and campus physical fitness."),
                        StudentLeader(role="Asst. Sport Secretary", name="F. Calvin Mawia", grade="XII - A", wing="Secondary", duties="Supporting sports equipment management, ground organization, and scheduling inter-house leagues."),
                        StudentLeader(role="Cultural Secretary", name="R. Sripriya", grade="XII - B", wing="Secondary", duties="Leading the drama, dance, and music ensembles for Annual Day, Teachers' Day, and festive school galas."),
                        StudentLeader(role="Literary Secretary", name="P. Gayathri", grade="XII - C", wing="Secondary", duties="Coordinating school debating society, editorial club, elocution contests, and library symposiums."),
                        StudentLeader(role="Captain", name="G. Ajith Kumar", grade="XII - B", wing="Secondary", house="St. Matthew House", duties="Leading St. Matthew House in high school athletic championships, debates, and points tally."),
                        StudentLeader(role="Vice Captain", name="D. Sairathi", grade="XII - C", wing="Secondary", house="St. Matthew House", duties="Assisting the House Captain in organizing march-past contingents and quiz delegations."),
                        StudentLeader(role="Captain", name="R. Sree Hari", grade="XII - A", wing="Secondary", house="St. Mark House", duties="Inspiring St. Mark House members to athletic supremacy and energetic participation in all campus meets."),
                        StudentLeader(role="Vice Captain", name="P. Akshaya", grade="XII - B", wing="Secondary", house="St. Mark House", duties="Supporting the captain with senior sports squads, attendance verification, and house discipline."),
                        StudentLeader(role="Captain", name="B. Jaya Prakash", grade="XII - C", wing="Secondary", house="St. Luke House", duties="Commanding St. Luke House in science fairs, humanitarian service projects, and sports tournaments."),
                        StudentLeader(role="Vice Captain", name="B. Priya Dharshini", grade="XII - A", wing="Secondary", house="St. Luke House", duties="Coordinating house literary entries, assembly presentations, and student sports coaching."),
                        StudentLeader(role="Captain", name="G. Nithish Kumar", grade="XII - C", wing="Secondary", house="St. John House", duties="Leading St. John House with dedication in academics, speech competitions, and athletic events."),
                        StudentLeader(role="Vice Captain", name="K. Soniya", grade="XII - A", wing="Secondary", house="St. John House", duties="Managing house points tracking, sports cheer squads, and inter-house cultural showcases."),
                        StudentLeader(role="Senior Student Prefect", name="G. Vijay Vignesh", grade="XII - A", wing="Secondary", duties="Maintaining high school corridor order, monitoring morning arrivals, and ensuring student punctuality."),
                        StudentLeader(role="Senior Student Prefect", name="N. Raju Yogi", grade="XII - B", wing="Secondary", duties="Assisting during campus break periods, library study hours, and maintaining assembly line discipline."),
                        StudentLeader(role="Senior Student Prefect", name="R. Sathya Priya", grade="XII - B", wing="Secondary", duties="Supporting campus cleanliness, monitoring canteen areas, and helping junior students with campus guidance."),
                        StudentLeader(role="Senior Student Prefect", name="S. Karnika", grade="XII - B", wing="Secondary", duties="Assisting school events management, visitor guidance during parent-teacher meetings, and lab discipline."),
                    ]
                    db.add_all(default_leaders)
                    await db.commit()

                # 5. Seed School Uniforms if none exist
                stmt_uniforms = select(SchoolUniform).filter(SchoolUniform.deleted_at.is_(None))
                res_uniforms = await db.execute(stmt_uniforms)
                uniforms = list(res_uniforms.scalars().all())
                if len(uniforms) == 0:
                    logger.info("Seeding default school uniforms...")
                    default_uniforms = [
                        SchoolUniform(section="Primary (Classes I to V)", boys_uniform="Navy blue shorts, light blue shirts, black shoes, school belt & tie.", girls_uniform="Navy blue pinafore, light blue shirts, black shoes, school belt & tie."),
                        SchoolUniform(section="Secondary (Classes VI to XII)", boys_uniform="Navy blue trousers, light blue shirts, black shoes, school belt & tie.", girls_uniform="Navy blue salwar suit with light blue dupatta and black shoes.")
                    ]
                    db.add_all(default_uniforms)
                    await db.commit()

                # 6. Seed Teachers if none exist
                stmt_teachers = select(Teacher).filter(Teacher.deleted_at.is_(None))
                res_teachers = await db.execute(stmt_teachers)
                teachers = list(res_teachers.scalars().all())
                if len(teachers) == 0:
                    logger.info("Seeding default faculty members...")
                    default_teachers = [
                        Teacher(name="Mr. T. Rajkumar Sam Kingsley", designation="Head of Department", subject="Mathematics", qualification="M.Sc., M.Phil., B.Ed.", experience="16 Years", description="Department lead directing advanced higher secondary pure mathematics, calculus, and board coaching."),
                        Teacher(name="Mr. R. Loganathan", designation="Senior Mathematics Educator", subject="Mathematics", qualification="M.Sc., B.Ed.", experience="12 Years", description="Specialist in trigonometry, coordinate geometry, and secondary competitive Olympiad coaching."),
                        Teacher(name="Mrs. C. Bhuvaneswari", designation="Mathematics Educator", subject="Mathematics", qualification="B.Sc., B.Ed.", experience="8 Years", description="Focused on building strong analytical reasoning and algebraic fundamentals in junior classes."),
                        Teacher(name="Mrs. S. Prabha Leethiyal", designation="Head of Department", subject="Biology", qualification="M.Sc., B.Ed.", experience="15 Years", description="Leading the life sciences faculty with extensive expertise in botany, zoology, and medical entrance."),
                        Teacher(name="Mrs. Helen Johnson", designation="Senior Physics Educator & Principal", subject="Physics", qualification="B.Sc., M.A., B.Ed.", experience="14 Years", description="Demonstrating physical laws through real-world experiments, optics, and electrodynamics."),
                        Teacher(name="Ms. S. Solomon Devadoss", designation="Senior Chemistry Educator", subject="Chemistry", qualification="M.Sc., B.Ed.", experience="12 Years", description="Directing inorganic chemical reactions, stoichiometry, and safe wet-lab operations."),
                        Teacher(name="Mrs. K. Vimala", designation="Head of Economics", subject="Economics", qualification="M.A., B.Ed.", experience="14 Years", description="Inspiring macroeconomic understanding, Indian economic history, and statistics."),
                        Teacher(name="Mrs. M. Kalaiselvi Latha Muthu", designation="Commerce Lead", subject="Commerce", qualification="M.Com., B.Ed.", experience="16 Years", description="Guiding commerce stream pupils to high scores in double-entry bookkeeping and business studies."),
                        Teacher(name="Mrs. J. Latha", designation="Computer Science Lead", subject="Computer Science", qualification="M.C.A., B.Ed.", experience="13 Years", description="Directing software programming, Python, SQL database management, and computer lab practicals."),
                        Teacher(name="Mr. M. Sridhar", designation="History Lead", subject="History", qualification="M.A., B.Ed.", experience="15 Years", description="Enriching world history, constitutional governance, and civics education."),
                        Teacher(name="Mrs. T.S. Maheshwari", designation="Hindi Department Lead", subject="Hindi", qualification="M.Com., B.Ed.", experience="12 Years", description="Fostering national language fluency, creative essay writing, and Hindi recitation."),
                        Teacher(name="Mrs. Shima Newton", designation="French Language Instructor & Principal", subject="French", qualification="M.A., B.Ed., DELF B1", experience="11 Years", description="Delivering French communicative skills, phonetic articulation, and European language culture."),
                        Teacher(name="Mrs. Ranganayagi", designation="Physical Education Director", subject="Physical Education", qualification="B.Sc., M.P.Ed.", experience="14 Years", description="Coaching track events, zonal basketball and football teams, and overall school wellness."),
                        Teacher(name="Mr. Kulandaivelu", designation="Art & Drawing Master", subject="Art", qualification="Diploma in Fine Arts", experience="18 Years", description="Nurturing fine arts, watercolor landscape painting, and visual creativity across all grades."),
                        Teacher(name="Mrs. Saranya", designation="Kindergarten Lead Educator", subject="Kindergarten", qualification="Montessori Trained", experience="8 Years", description="Dedicated to early childhood phonetic learning, sensory play, and gentle moral care.")
                    ]
                    db.add_all(default_teachers)
                    await db.commit()

                # 7. Seed Calendar Events if none exist
                stmt_events = select(Event).filter(Event.deleted_at.is_(None))
                res_events = await db.execute(stmt_events)
                events = list(res_events.scalars().all())
                if len(events) == 0:
                    logger.info("Seeding default calendar events...")
                    default_events = [
                        Event(title="School Reopens for Classes I to XII", description="Commencement of Academic Year 2026–2027 with school prayer and welcome assembly.", event_date="2026-06-01", event_time="08:45 AM - 03:30 PM", venue="Main Campus", category="Reopening", status="Published"),
                        Event(title="Investiture Ceremony & Leadership Badges", description="Installation of the Student Council, House Captains, and Prefectorial Board.", event_date="2026-06-20", event_time="09:30 AM - 12:00 PM", venue="School Auditorium", category="Celebration", status="Published"),
                        Event(title="Independence Day Celebrations", description="Flag hoisting ceremony, patriotic choir songs, march-past, and cultural pageantry.", event_date="2026-08-15", event_time="08:00 AM - 10:30 AM", venue="School Sports Grounds", category="Celebration", status="Published"),
                        Event(title="Annual Sports Day & Zonal Athletic Finals", description="Inter-house athletic tournament, sprint heats, high jump, and medal presentations.", event_date="2026-08-29", event_time="08:30 AM - 04:30 PM", venue="Athletic Stadium", category="Athletics", status="Published"),
                        Event(title="Teachers' Day Felicitation Assembly", description="Student-led cultural honors, speech recitals, and teacher appreciation ceremony.", event_date="2026-09-05", event_time="10:00 AM - 01:00 PM", venue="Main Auditorium", category="Celebration", status="Published"),
                        Event(title="Founder's Day Memorial Thanksgiving", description="School founder remembrance service, alumni felicitation, and scholarship awards.", event_date="2026-09-18", event_time="09:30 AM - 12:30 PM", venue="School Chapel & Hall", category="Celebration", status="Published"),
                        Event(title="Children's Day Gala & Food Carnival", description="Fun stalls, science discovery stations, game arenas, and student food fest.", event_date="2026-11-14", event_time="09:00 AM - 03:00 PM", venue="School Courtyard", category="Celebration", status="Published"),
                        Event(title="Christmas Carol Service & Pageant", description="Choral ensemble, live nativity play, festive brass band, and charity gift drive.", event_date="2026-12-05", event_time="04:30 PM - 07:30 PM", venue="School Amphitheater", category="Celebration", status="Published"),
                        Event(title="Pongal Harvest Festival & Folk Dances", description="Traditional sweet pongal preparation, pot breaking, and traditional folk art forms.", event_date="2026-01-14", event_time="09:00 AM - 01:00 PM", venue="Open Grounds", category="Celebration", status="Published"),
                        Event(title="Republic Day Parade & Salutations", description="Patriotic parade, student speeches, scouts & guides troop salute.", event_date="2026-01-26", event_time="08:00 AM - 10:00 AM", venue="Parade Ground", category="Celebration", status="Published"),
                        Event(title="National Science Day & STEM Exhibition", description="Robotics demonstrations, working models, eco-science displays by junior inventors.", event_date="2026-02-28", event_time="09:30 AM - 03:30 PM", venue="Science Laboratories", category="Celebration", status="Published")
                    ]
                    db.add_all(default_events)
                    await db.commit()

                # 8. Seed Student Achievements if none exist
                stmt_ach = select(StudentAchievement).filter(StudentAchievement.deleted_at.is_(None))
                res_ach = await db.execute(stmt_ach)
                achievements = list(res_ach.scalars().all())
                if len(achievements) == 0:
                    logger.info("Seeding default student achievements & honors...")
                    default_ach = [
                        StudentAchievement(title="Best Student of the Month - Master R. Sai Ganesh (Class XI-A)", description="Outstanding programming project in Computer Science and leadership in STEM club."),
                        StudentAchievement(title="Best Student of the Month - Miss S. Kavitha (Class XI-B)", description="Excellent leadership in Commerce club activities and consistent academic support to peers."),
                        StudentAchievement(title="Best Student of the Month - Master M. Vignesh (Class XI-C)", description="Academic consistency and top scores in chemistry laboratory worksheets."),
                        StudentAchievement(title="Best Student of the Month - Miss P. Harini (Class XII-A)", description="Exemplary discipline, high attendance, and centum score in mathematics mock examinations."),
                        StudentAchievement(title="Best Student of the Month - Master V. Rajesh (Class XII-B)", description="Outstanding public speaking in the debate tournament and active commerce club volunteer."),
                        StudentAchievement(title="Best Student of the Month - Miss K. Sneha (Class XII-C)", description="Consistent academic performance of 95%+ marks and dedicated library club student helper."),
                        StudentAchievement(title="School Topper - Master Kishore P. (Class XII - A)", description="Record-breaking aggregate score of 594/600 with centum in Physics and Computer Science."),
                        StudentAchievement(title="School 2nd Rank - Miss Akshaya M. (Class XII - C)", description="Exemplary academic brilliance of 595/600 and distinction in medical entrance foundations."),
                        StudentAchievement(title="Overall Champions Trophy - Zonal Athletic Meet", description="Gold medals in 4x100m relay, 200m sprint, and high jump clinching the zonal shield."),
                        StudentAchievement(title="Gold Medal & Winner Trophy - District Football Championship", description="Undefeated champion run across five knockout matches to claim the district cup.")
                    ]
                    db.add_all(default_ach)
                    await db.commit()

                # 9. Seed Default CMS Pages if none exist
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
