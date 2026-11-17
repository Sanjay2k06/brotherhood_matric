import sys
import os
import asyncio

# Adjust path to import from app
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import delete
from app.database.connection import engine, AsyncSessionLocal
from app.teachers.models import Teacher
from app.auth.models import User

async def seed_teachers():
    async with AsyncSessionLocal() as db:
        try:
            # Clear existing teachers
            print("Clearing existing faculty directory...")
            stmt_del = delete(Teacher)
            await db.execute(stmt_del)
            await db.commit()

            print("Seeding actual Brotherhood School faculty members...")
            teachers_data = [
                # Administration
                {
                    "name": "Mr. J. Jeyakumar",
                    "designation": "Correspondent",
                    "subject": "Administration",
                    "qualification": "B.Sc. (Physics), M.A., M.A.(T), M.Ed., M.Phil.",
                    "experience": "30+ Years",
                    "description": "Visionary educational leader providing administrative guidance since the school's inception."
                },
                {
                    "name": "Mrs. Helen Johnson",
                    "designation": "Principal (Primary)",
                    "subject": "Physics",
                    "qualification": "M.Sc., B.Ed.",
                    "experience": "15+ Years",
                    "description": "Managing daily primary wing academic affairs and maintaining high standards of pupil character development."
                },
                {
                    "name": "Mrs. Shima Newton",
                    "designation": "Principal (Higher Secondary)",
                    "subject": "French",
                    "qualification": "M.A., B.Ed.",
                    "experience": "20+ Years",
                    "description": "Managing higher secondary academic streams and preparing students to become responsible citizens.",
                    "image": "http://127.0.0.1:8000/uploads/Principal-Photo.jpg"
                },
                {
                    "name": "Mr. S. Solomon Devadoss",
                    "designation": "Academic Coordinator",
                    "subject": "Chemistry",
                    "qualification": "M.Sc., B.Ed.",
                    "experience": "15+ Years",
                    "description": "Coordinating subject syllabi alignment, smart-board lessons, and academic activities."
                },
                # Department of Tamil
                {
                    "name": "Mrs. Sahaya Jamuna",
                    "designation": "Tamil Teacher",
                    "subject": "Tamil",
                    "qualification": "M.A., B.Ed.",
                    "experience": "10 Years",
                    "description": "Teaching classical Tamil literature, grammar, and organizing oratorical contests."
                },
                {
                    "name": "Mrs. S. Jeyasoundari",
                    "designation": "Tamil Teacher",
                    "subject": "Tamil",
                    "qualification": "M.A., M.T.T.",
                    "experience": "6 Years",
                    "description": "Using Montessori training methods to teach language writing and pronunciation."
                },
                {
                    "name": "Mrs. Deivamani",
                    "designation": "Tamil Teacher",
                    "subject": "Tamil",
                    "qualification": "M.A., B.Ed.",
                    "experience": "8 Years",
                    "description": "Engaging primary and secondary classes in prose reading and poetry recitation."
                },
                {
                    "name": "Mrs. S. Anitha Kumari",
                    "designation": "Tamil Teacher",
                    "subject": "Tamil",
                    "qualification": "N/A",
                    "experience": "N/A",
                    "description": "Tamil language instruction and co-curricular reading programs."
                },
                {
                    "name": "Mrs. M. Sasikala Raman",
                    "designation": "Tamil Teacher",
                    "subject": "Tamil",
                    "qualification": "N/A",
                    "experience": "N/A",
                    "description": "Tamil language teacher focusing on foundation and middle school groups."
                },
                {
                    "name": "Mrs. S. Suganya",
                    "designation": "Tamil Teacher",
                    "subject": "Tamil",
                    "qualification": "N/A",
                    "experience": "N/A",
                    "description": "Tamil language instructor specialized in primary school student engagement."
                },
                # Department of English
                {
                    "name": "Mr. M.S. Seetharaman",
                    "designation": "English Teacher",
                    "subject": "English",
                    "qualification": "M.A., B.Ed.",
                    "experience": "12 Years",
                    "description": "Instruction in prose, poetry, creative composition, and communication."
                },
                # Department of Mathematics
                {
                    "name": "Mr. T. Rajkumar Sam Kingsley",
                    "designation": "Mathematics Teacher",
                    "subject": "Mathematics",
                    "qualification": "M.Sc., M.Phil.",
                    "experience": "14 Years",
                    "description": "Senior batch algebra, calculus, and analytical coordinate geometry instruction."
                },
                {
                    "name": "Mr. R. Loganathan",
                    "designation": "Mathematics Teacher",
                    "subject": "Mathematics",
                    "qualification": "M.Sc., B.Ed.",
                    "experience": "9 Years",
                    "description": "Teaching standard equations, trigonometry, and statistical methods."
                },
                {
                    "name": "Mrs. C. Bhuvaneswari",
                    "designation": "Mathematics Teacher",
                    "subject": "Mathematics",
                    "qualification": "B.Sc., B.Ed.",
                    "experience": "7 Years",
                    "description": "Simplifying concepts of fractions, geometry, and arithmetic reasoning."
                },
                {
                    "name": "Mrs. Nanthini",
                    "designation": "Mathematics Teacher",
                    "subject": "Mathematics",
                    "qualification": "M.Sc., B.Ed.",
                    "experience": "5 Years",
                    "description": "Nurturing numerical skills and logical thinking in primary and middle batches."
                },
                {
                    "name": "Mrs. E.L. Ancy Niruba",
                    "designation": "Mathematics Teacher",
                    "subject": "Mathematics",
                    "qualification": "N/A",
                    "experience": "N/A",
                    "description": "Mathematics instructor focused on middle school algebraic and geometric logic."
                },
                {
                    "name": "Mrs. S. Vaishnupriya",
                    "designation": "Mathematics Teacher",
                    "subject": "Mathematics",
                    "qualification": "N/A",
                    "experience": "N/A",
                    "description": "Primary batch mathematics teacher focusing on basic numeracy and problem-solving."
                },
                # Department of Physics
                {
                    "name": "Mrs. K. Bhuvaneswari",
                    "designation": "Physics Teacher",
                    "subject": "Physics",
                    "qualification": "M.Sc., M.Phil., B.Ed.",
                    "experience": "13 Years",
                    "description": "Directing electromagnetism labs, optics exercises, and thermodynamics physics models."
                },
                # Department of Chemistry
                {
                    "name": "Mrs. S. Rajathi",
                    "designation": "Chemistry Teacher",
                    "subject": "Chemistry",
                    "qualification": "B.Sc., B.Ed.",
                    "experience": "6 Years",
                    "description": "Introducing fundamental chemical periodic elements and basic laboratory safety tests."
                },
                # Department of Biology
                {
                    "name": "Mrs. S. Prabha Leethiyal",
                    "designation": "Biology Teacher",
                    "subject": "Biology",
                    "qualification": "B.Sc., B.Ed.",
                    "experience": "11 Years",
                    "description": "Facilitating botany, zoology lessons and botany lab slides preparation."
                },
                {
                    "name": "Mrs. M. Shakila Banu",
                    "designation": "Biology Teacher",
                    "subject": "Biology",
                    "qualification": "M.Sc., B.Ed.",
                    "experience": "8 Years",
                    "description": "Conducting zoological organ studies and environment club excursions."
                },
                # Department of Computer Science
                {
                    "name": "Mrs. J. Latha",
                    "designation": "Computer Science Teacher",
                    "subject": "Computer Science",
                    "qualification": "M.C.A., B.Ed.",
                    "experience": "12 Years",
                    "description": "Directing programming algorithms, SQL databases, Python structures, and CS lab audits."
                },
                {
                    "name": "Mrs. Thenmozhi",
                    "designation": "Computer Science Teacher",
                    "subject": "Computer Science",
                    "qualification": "N/A",
                    "experience": "N/A",
                    "description": "Instructing primary and middle batches in digital literacy and basic coding skills."
                },
                # Department of Commerce & Accountancy
                {
                    "name": "Mrs. M. Kalaiselvi Latha Muthu",
                    "designation": "Commerce Teacher",
                    "subject": "Commerce",
                    "qualification": "M.Com., B.Ed.",
                    "experience": "14 Years",
                    "description": "Teaching business ethics, commercial trades, and corporate operations."
                },
                # Department of Economics
                {
                    "name": "Mrs. K. Vimala",
                    "designation": "Economics Teacher",
                    "subject": "Economics",
                    "qualification": "M.A., B.Ed.",
                    "experience": "11 Years",
                    "description": "Instruction in microeconomics, macroeconomics, and national GDP calculations."
                },
                # Department of History
                {
                    "name": "Mr. M. Sridhar",
                    "designation": "History Teacher",
                    "subject": "History",
                    "qualification": "M.A., B.Ed.",
                    "experience": "10 Years",
                    "description": "Lecturing on world civilizations, freedom struggles, and cartographical maps."
                },
                {
                    "name": "Mrs. Sudha",
                    "designation": "History Teacher",
                    "subject": "History",
                    "qualification": "M.A., B.Ed.",
                    "experience": "8 Years",
                    "description": "Teaching civic systems, state governance networks, and archaeological profiles."
                },
                # Department of Hindi
                {
                    "name": "Mrs. T.S. Maheshwari",
                    "designation": "Hindi Teacher",
                    "subject": "Hindi",
                    "qualification": "M.Com., B.Ed.",
                    "experience": "9 Years",
                    "description": "Teaching national language alphabet prose, vocabulary, and phonetic speaking."
                },
                # Physical Education
                {
                    "name": "Mrs. Ranganayagi",
                    "designation": "Physical Education Director",
                    "subject": "Physical Education",
                    "qualification": "B.Sc., M.P.Ed.",
                    "experience": "12 Years",
                    "description": "Coaching track athletes, volleyball, and physical fitness drill squads."
                },
                # Art
                {
                    "name": "Mr. Kulandaivelu",
                    "designation": "Art & Library Incharge",
                    "subject": "Art",
                    "qualification": "N/A",
                    "experience": "7 Years",
                    "description": "Supervising book indices and directing canvas painting workshops."
                },
                # Kindergarten Department
                {
                    "name": "Mrs. Saranya",
                    "designation": "Kindergarten Teacher",
                    "subject": "Kindergarten",
                    "qualification": "Montessori Trained",
                    "experience": "N/A",
                    "description": "Fostering standard cognitive growth and social skills in early childhood stages."
                }
            ]

            # Insert into database
            for t in teachers_data:
                db_teacher = Teacher(
                    name=t["name"],
                    designation=t["designation"],
                    subject=t["subject"],
                    qualification=t["qualification"],
                    experience=t.get("experience", "N/A"),
                    description=t.get("description", ""),
                    image="" 
                )
                db.add(db_teacher)
            
            await db.commit()
            print(f"Successfully seeded {len(teachers_data)} educators into the database!")

        except Exception as e:
            print(f"Error seeding teachers: {str(e)}", file=sys.stderr)
            await db.rollback()

if __name__ == "__main__":
    asyncio.run(seed_teachers())
