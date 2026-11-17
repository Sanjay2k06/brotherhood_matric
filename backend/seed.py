import sys
import os
import asyncio

# Adjust path to import from app
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from app.database.connection import engine, AsyncSessionLocal
from app.database.base import Base
from app.auth.models import User
from app.settings.models import WebsiteSettings
from app.houses.models import StudentHouse
from app.leaders.models import StudentLeader
from app.achievements.models import StudentAchievement
from app.teachers.models import Teacher
from app.content.models import Page
from app.core.security import get_password_hash

async def seed_db():
    print("Dropping and recreating database tables...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    
    async with AsyncSessionLocal() as db:
        try:
            # Seed Admin
            stmt_admin = select(User).filter(User.username == "admin")
            res_admin = await db.execute(stmt_admin)
            admin_user = res_admin.scalar_one_or_none()
            if not admin_user:
                print("Creating default admin account (username: admin, password: admin123)...")
                admin_user = User(
                    username="admin",
                    email="admin@brotherhoodschool.edu.in",
                    hashed_password=get_password_hash("admin123"),
                    role="Super Admin"
                )
                db.add(admin_user)
                await db.commit()
                print("Admin account created successfully!")

            # Seed Settings
            print("Creating website settings...")
            settings_record = WebsiteSettings(
                school_name="Brotherhood Matriculation Higher Secondary School",
                tagline="Every Child is a Gift of God.",
                email="info@brotherhoodschool.edu.in",
                phone="044-2440133",
                alternate_phone="98842 04848",
                whatsapp="9884204848",
                address="2nd Street, Kazura Garden, Neelankarai, Chennai 600041",
                working_hours="Mon – Fri: 8:30 AM – 3:30 PM\nSat: 9:00 AM – 12:30 PM",
                seo_title="Brotherhood Matriculation Higher Secondary School — Chennai",
                seo_description="Recognized by the Government of Tamil Nadu. Quality co-educational instruction since 1991 from Pre-KG to Standard XII.",
                copyright="© Brotherhood Matriculation Higher Secondary School. All Rights Reserved.",
                theme_color="Forest Green & Gold"
            )
            db.add(settings_record)
            await db.commit()
            print("Website settings seeded successfully!")

            # Seed Houses (4 Primary, 4 Senior)
            print("Seeding student houses scorecard...")
            default_houses = [
                # Primary Wing Houses
                StudentHouse(name="Galileo House", motto="Knowledge and Exploration", color_code="bg-blue-600", points=350, description="Primary Wing - Representing logic, search, and scientific discovery."),
                StudentHouse(name="Zion House", motto="Strength and Faith", color_code="bg-yellow-500", points=390, description="Primary Wing - Representing moral integrity, character, and leadership."),
                StudentHouse(name="Judah House", motto="Courage and Praise", color_code="bg-red-500", points=360, description="Primary Wing - Representing active sportsmanship, endurance, and courage."),
                StudentHouse(name="Bethel House", motto="House of Peace", color_code="bg-green-600", points=380, description="Primary Wing - Representing balance, ecological care, and creativity."),
                
                # Senior Wing Houses
                StudentHouse(name="St. Matthew House", motto="Grace and Wisdom", color_code="bg-blue-600", points=410, description="Senior Wing - Representing scholarly achievements and technical reasoning."),
                StudentHouse(name="St. Mark House", motto="Courage and Action", color_code="bg-red-500", points=385, description="Senior Wing - Representing athletic strength and competitive drive."),
                StudentHouse(name="St. Luke House", motto="Healing and Service", color_code="bg-green-600", points=430, description="Senior Wing - Representing environmental club stewardship and creative arts."),
                StudentHouse(name="St. John House", motto="Love and Truth", color_code="bg-yellow-500", points=405, description="Senior Wing - Representing communication, leadership, and public speech.")
            ]
            db.add_all(default_houses)
            await db.commit()
            print("Student houses seeded successfully!")

            # Seed Student Leaders
            print("Seeding student leaders...")
            default_leaders = [
                # Primary Student Council
                StudentLeader(role="Head Boy (Primary)", name="Immanual Jefferson S.", grade="Std V"),
                StudentLeader(role="Head Girl (Primary)", name="Inshika Shri S.", grade="Std V"),
                StudentLeader(role="Sports Captain (Primary - Boys)", name="Harish S.", grade="Std V"),
                StudentLeader(role="Sports Captain (Primary - Girls)", name="Yashika D.", grade="Std V"),
                StudentLeader(role="Cultural Leader (Primary)", name="Keerthana V.", grade="Std V"),
                
                # Primary House Leaders
                StudentLeader(role="Galileo House Captain (Primary)", name="Pratheesh B.", grade="Std V"),
                StudentLeader(role="Galileo House Vice Captain (Primary)", name="Nivedha N.", grade="Std IV"),
                StudentLeader(role="Zion House Captain (Primary)", name="Jeshwanth S.", grade="Std V"),
                StudentLeader(role="Zion House Vice Captain (Primary)", name="Jackin Nibola J.", grade="Std IV"),
                StudentLeader(role="Judah House Captain (Primary)", name="Praveen Sai B.", grade="Std V"),
                StudentLeader(role="Judah House Vice Captain (Primary)", name="Sree Dharshini I.", grade="Std IV"),
                StudentLeader(role="Bethel House Captain (Primary)", name="Jayapreetha M.D.", grade="Std V"),
                StudentLeader(role="Bethel House Vice Captain (Primary)", name="Deepa Sree R.", grade="Std IV"),

                # Senior Student Council
                StudentLeader(role="Head Boy", name="P. Kishore", grade="XII-A"),
                StudentLeader(role="Head Girl", name="M. Akshaya", grade="XII-C"),
                StudentLeader(role="Vice Head Boy", name="B. Ashwanth", grade="XII-A"),
                StudentLeader(role="Vice Head Girl", name="A. Monisha", grade="XII-B"),
                StudentLeader(role="Sports Secretary", name="N. Divya Dharshini", grade="XII-A"),
                StudentLeader(role="Assistant Sports Secretary", name="F. Calvin Mawia", grade="XII-A"),
                StudentLeader(role="Cultural Secretary", name="R. Sripriya", grade="XII-B"),
                StudentLeader(role="Literary Secretary", name="P. Gayathri", grade="XII-C"),

                # Senior House Leaders
                StudentLeader(role="St. Matthew House Captain", name="G. Ajith Kumar", grade="XII"),
                StudentLeader(role="St. Matthew House Vice Captain", name="D. Sairathi", grade="XI"),
                StudentLeader(role="St. Mark House Captain", name="R. Sree Hari", grade="XII"),
                StudentLeader(role="St. Mark House Vice Captain", name="P. Akshaya", grade="XI"),
                StudentLeader(role="St. Luke House Captain", name="B. Jaya Prakash", grade="XII"),
                StudentLeader(role="St. Luke House Vice Captain", name="B. Priya Dharshini", grade="XI"),
                StudentLeader(role="St. John House Captain", name="G. Nithish Kumar", grade="XII"),
                StudentLeader(role="St. John House Vice Captain", name="K. Soniya", grade="XI"),

                # School Prefects
                StudentLeader(role="School Prefect", name="G. Vijay Vignesh", grade="XII"),
                StudentLeader(role="School Prefect", name="N. Raju Yogi", grade="XII"),
                StudentLeader(role="School Prefect", name="Sathya Priya", grade="XII"),
                StudentLeader(role="School Prefect", name="Karnika", grade="XII")
            ]
            db.add_all(default_leaders)
            await db.commit()
            print("Student leaders seeded successfully!")

            # Seed Student Achievements
            print("Seeding student achievements...")
            default_achievements = [
                # Best Students of the Month (Senior Secondary)
                StudentAchievement(title="Best Student of the Month - Master R. Sai Ganesh (Class XI-A)", description="Outstanding programming project in Computer Science and leadership in STEM club."),
                StudentAchievement(title="Best Student of the Month - Miss S. Kavitha (Class XI-B)", description="Excellent leadership in Commerce club activities and consistent academic support to peers."),
                StudentAchievement(title="Best Student of the Month - Master M. Vignesh (Class XI-C)", description="Academic consistency and top scores in chemistry laboratory worksheets."),
                StudentAchievement(title="Best Student of the Month - Miss P. Harini (Class XII-A)", description="Exemplary discipline, high attendance, and centum score in mathematics mock examinations."),
                StudentAchievement(title="Best Student of the Month - Master V. Rajesh (Class XII-B)", description="Outstanding public speaking in the debate tournament and active commerce club volunteer."),
                StudentAchievement(title="Best Student of the Month - Miss K. Sneha (Class XII-C)", description="Consistent academic performance of 95%+ marks and dedicated library club student helper."),

                # Toppers - Primary (Mid-Term)
                StudentAchievement(title="Mid-Term Topper - Master Amit R. (Class I)", description="Score: 98% Marks"),
                StudentAchievement(title="Mid-Term Topper - Miss Divya K. (Class II)", description="Score: 97.5% Marks"),
                StudentAchievement(title="Mid-Term Topper - Master Harish S. (Class III)", description="Score: 99% Marks"),
                StudentAchievement(title="Mid-Term Topper - Miss Swetha V. (Class IV)", description="Score: 96.8% Marks"),
                StudentAchievement(title="Mid-Term Topper - Master Sanjay P. (Class V)", description="Score: 98.2% Marks"),

                # Toppers - Primary (Quarterly)
                StudentAchievement(title="Quarterly Topper - Miss Pooja S. (Class I)", description="Score: 98.5% Marks"),
                StudentAchievement(title="Quarterly Topper - Master Rahul M. (Class II)", description="Score: 97% Marks"),
                StudentAchievement(title="Quarterly Topper - Miss Deepa A. (Class III)", description="Score: 98.8% Marks"),
                StudentAchievement(title="Quarterly Topper - Master Vijay G. (Class IV)", description="Score: 97.2% Marks"),
                StudentAchievement(title="Quarterly Topper - Miss Nivetha K. (Class V)", description="Score: 99.1% Marks"),

                # Toppers - Senior Secondary (Mid-Term)
                StudentAchievement(title="Mid-Term Topper - Master Vignesh R. (Class XI-A)", description="Score: 582 / 600"),
                StudentAchievement(title="Mid-Term Topper - Miss Preethi S. (Class XI-B)", description="Score: 578 / 600"),
                StudentAchievement(title="Mid-Term Topper - Master Karthik V. (Class XI-C)", description="Score: 580 / 600"),
                StudentAchievement(title="Mid-Term Topper - Miss Dhivya Dharshini N. (Class XII-A)", description="Score: 592 / 600"),
                StudentAchievement(title="Mid-Term Topper - Master Ashwanth B. (Class XII-B)", description="Score: 585 / 600"),
                StudentAchievement(title="Mid-Term Topper - Miss Gayathri P. (Class XII-C)", description="Score: 588 / 600"),

                # Toppers - Senior Secondary (Quarterly)
                StudentAchievement(title="Quarterly Topper - Miss Monisha R. (Class XI-A)", description="Score: 585 / 600"),
                StudentAchievement(title="Quarterly Topper - Master Deepak S. (Class XI-B)", description="Score: 576 / 600"),
                StudentAchievement(title="Quarterly Topper - Miss Pavithra V. (Class XI-C)", description="Score: 582 / 600"),
                StudentAchievement(title="Quarterly Topper - Master Kishore P. (Class XII-A)", description="Score: 594 / 600"),
                StudentAchievement(title="Quarterly Topper - Miss Sripriya R. (Class XII-B)", description="Score: 589 / 600"),
                StudentAchievement(title="Quarterly Topper - Miss Akshaya M. (Class XII-C)", description="Score: 595 / 600"),
            ]
            db.add_all(default_achievements)
            await db.commit()
            print("Student achievements seeded successfully!")

            # Seed Default CMS Pages
            print("Seeding default CMS pages...")
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
            print("Default CMS pages seeded successfully!")

            print("Database seeding completed successfully.")
            
        except Exception as e:
            print(f"Error seeding database: {str(e)}", file=sys.stderr)
            await db.rollback()

if __name__ == "__main__":
    asyncio.run(seed_db())
