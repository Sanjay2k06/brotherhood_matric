import os
import sys
import django

# Set Django settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

def run_setup():
    print("Initializing Django framework...")
    django.setup()

    from django.contrib.auth import get_user_model
    from settings.models import SiteSetting
    from academics.models import AcademicsContent
    from features.models import FeatureLab

    User = get_user_model()

    # 1. Create default administrative users if not exists
    print("\nCreating default administrator accounts...")
    
    super_admin_username = "admin"
    super_admin_pass = "admin123"
    
    if not User.objects.filter(username=super_admin_username).exists():
        admin_user = User.objects.create_superuser(
            username=super_admin_username,
            email="admin@brotherhoodschool.edu.in",
            password=super_admin_pass,
            role="Super Admin"
        )
        print(f"-> Created Super Admin account: '{super_admin_username}' (password: '{super_admin_pass}')")
    else:
        print(f"-> Super Admin account '{super_admin_username}' already exists.")

    # Content Admin
    content_username = "editor"
    if not User.objects.filter(username=content_username).exists():
        User.objects.create_user(
            username=content_username,
            email="editor@brotherhoodschool.edu.in",
            password="editor123",
            role="Content Admin",
            is_staff=True
        )
        print(f"-> Created Content Admin account: '{content_username}' (password: 'editor123')")

    # 2. Seed site settings
    print("\nSeeding default website settings...")
    site_settings, created = SiteSetting.objects.get_or_create(id=1)
    if created:
        site_settings.school_name = "Brotherhood Matriculation Hr. Sec. School"
        site_settings.address = "East Coast Road, Neelankarai, Chennai - 600115"
        site_settings.phone = "044-2440133"
        site_settings.email = "info@brotherhoodschool.edu.in"
        site_settings.footer_content = "Character Formation Through Quality Education. Shaping Future Leaders Since 1991."
        site_settings.social_links = {
            "facebook": "https://facebook.com/brotherhood",
            "twitter": "https://twitter.com/brotherhood",
            "youtube": "https://youtube.com/brotherhood"
        }
        site_settings.save()
        print("-> Seeded default site settings.")
    else:
        print("-> Site settings already initialized.")

    # 3. Seed academics content placeholders
    print("\nSeeding default academic subsections...")
    academics_placeholders = [
        ("admission", "Admission Process", "Step-by-step guidance on securing a place for your child..."),
        ("courses", "Courses Offered", "Details of Science and Commerce streams for High School..."),
        ("curriculum", "Curriculum Details", "We follow the Tamil Nadu State Board Matriculation curriculum..."),
        ("fees", "School Fees", "Term fee guidelines and payment deadline instructions..."),
        ("timings", "School Timings", "Morning assembly begins at 8:50 AM, regular classes close at 3:40 PM...")
    ]
    for key, title, content in academics_placeholders:
        ac_obj, created = AcademicsContent.objects.get_or_create(key=key)
        if created:
            ac_obj.title = title
            ac_obj.content = content
            ac_obj.save()
            print(f"-> Seeded academic subsection: '{title}'")

    # 4. Seed feature labs
    print("\nSeeding campus learning labs...")
    labs = [
        ("Computer Education", "Computer Laboratory equipped with modern desktops."),
        ("Smart Class", "Immersive audio-visual projectors and digitised lessons."),
        ("English Lab", "Accent training software and speech monitoring headsets."),
        ("Maths Lab", "Geometry sets, fractions, and formula panels."),
        ("Robotics Lab", "STEM microcontrollers, sensor kits, and breadboards."),
        ("Science Lab", "Physics, Chemistry, and Biology compounds and measuring tubes.")
    ]
    for title, desc in labs:
        lab_obj, created = FeatureLab.objects.get_or_create(title=title)
        if created:
            lab_obj.description = desc
            lab_obj.save()
            print(f"-> Seeded campus learning lab: '{title}'")

    # 5. Seed teachers
    print("\nSeeding faculty directory...")
    from teachers.models import Teacher
    
    teachers_list = [
        ("Mr. J. Jeyakumar", "Correspondent", "Languages", "M.A(H), M.A(T), M.Ed., M.Phil.", "25 Years", "Providing vision, strategic direction, and values-based governance to the Brotherhood educational institutions."),
        ("Mrs. Shima Newton", "Principal", "English", "M.A., B.Ed.", "20 Years", "Leading our academic and teaching faculty with a focus on holistic student development, modern pedagogy, and school discipline."),
        ("Mr. Solomon Devadoss", "Academic Co-ordinator & HOD Chemistry", "Science", "M.Sc., B.Ed.", "18 Years", "Managing curriculum implementation, co-curricular planning, and senior secondary chemistry streams."),
        ("Mrs. M. Sahaya Jamuna", "Tamil Teacher", "Languages", "M.A., B.Ed.", "12 Years", "Teaching classic Tamil literature and grammar with a focus on essay writing and oratorical skills."),
        ("Mrs. S. Deivamani", "Tamil Teacher", "Languages", "M.A., B.Ed.", "10 Years", "Fostering language fluency, spelling accuracy, and literary analysis in secondary students."),
        ("Mrs. S. Jayasoundari", "Tamil Teacher", "Languages", "M.A., M.T.T.", "8 Years", "Instructing foundation language batches with child-centric teaching aids and vocabulary exercises."),
        ("Mr. M.S. Seetharaman", "English Teacher", "English", "M.A., B.Ed.", "15 Years", "Mentoring senior secondary batches in English communication, drama, and state board examination grammar."),
        ("Mr. T. Rajkumar Sam Kingsly", "Mathematics Teacher", "Mathematics", "M.Sc., M.Phil.", "14 Years", "Teaching calculus, matrices, and coordinate geometry for senior secondary levels with problem-solving boards."),
        ("Mr. R. Loganathan", "Mathematics Teacher", "Mathematics", "M.Sc., B.Ed.", "11 Years", "Supporting junior classes in algebra, arithmetic logic, and speed math methods."),
        ("Mrs. C. Bhuvaneswari", "Mathematics Teacher", "Mathematics", "B.Sc., B.Ed.", "9 Years", "Guiding matriculation levels with math lab modules, geometry grids, and interactive whiteboard worksheets."),
        ("Mrs. Nanthini", "Mathematics Teacher", "Mathematics", "M.Sc., B.Ed.", "7 Years", "Instructing foundation arithmetic, statistics databases, and homework tutorials."),
        ("Mrs. S. Prabha Leethiyal", "Biology Teacher", "Science", "B.Sc., B.Ed.", "13 Years", "Teaching botany and zoology fields with microscopic slides, plant charts, and anatomy diagrams."),
        ("Mrs. M. Shakila Banu", "Biology Teacher", "Science", "M.Sc., B.Ed.", "10 Years", "Coaching biological streams, human physiology models, and environmental ecology clubs."),
        ("Mrs. K.M. Jahanara", "Biology Teacher", "Science", "M.A., M.Sc., B.Ed.", "14 Years", "Specializing in biochemistry, cellular processes, and lab safety regulations."),
        ("Mrs. K. Bhuvaneswari", "Physics Teacher", "Science", "M.Sc., M.Phil., B.Ed.", "16 Years", "Instructing physics formulas, mechanics labs, optical light refraction, and circuit diagrams."),
        ("Ms. S. Rajathi", "Chemistry Teacher", "Science", "B.Sc., B.Ed.", "8 Years", "Instructing organic equations, laboratory compound tests, and chemistry exhibition projects."),
        ("Mrs. K. Vimala", "Economics Teacher", "Languages", "M.A., B.Ed.", "14 Years", "Instructing macroeconomic theories, Indian economic development, and debate sessions."),
        ("Mrs. M. Kalaiselvi Latha Muthu", "Commerce Teacher", "Mathematics", "M.Com., B.Ed.", "15 Years", "Mentoring secondary commerce batches in business operations, entrepreneurship, and trade files."),
        ("Mr. S. Bharath Kumar", "Accountancy Teacher", "Mathematics", "MBA, M.Phil.", "12 Years", "Teaching accounting ledger entries, company balance sheet evaluations, and tax calculations."),
        ("Mrs. J. Latha", "Computer Science Teacher", "Computer Science", "MCA., B.Ed.", "13 Years", "Teaching HTML/CSS, Python programming, databases, and digital logic gates in the computer laboratory."),
        ("Mr. M. Sridhar", "History Teacher", "Languages", "M.A., B.Ed.", "11 Years", "Fostering historical interest through maps, archival timelines, and ancient culture stories."),
        ("Mrs. Sudha", "History Teacher", "Languages", "M.A., B.Ed.", "10 Years", "Instructing democratic structures, global historical milestones, and civic responsibilities."),
        ("Mrs. T.S. Maheshwari", "Hindi Teacher", "Languages", "M.Com., B.Ed.", "12 Years", "Teaching national language grammar, pronunciation, and literature excerpts."),
        ("Mr. Vishal", "Music Teacher", "Languages", "B.Mus.", "6 Years", "Coaching vocal pitch control, musical keyboard, and organizing the school choir rehearsals."),
        ("Mrs. Ranganayagi", "Physical Education Director", "Science", "B.Sc., M.P.Ed.", "15 Years", "Leading athletic coaching, zonal sports meets, yoga exercises, and track-and-field drills."),
        ("Mr. Kulandaivelu", "Art & Library Incharge", "Languages", "B.A., B.Lib.Sc.", "14 Years", "Managing school book library database index and supervising creative drawing classes.")
    ]
    
    for name, desig, subj, qual, exp, desc in teachers_list:
        teacher_obj, created = Teacher.objects.get_or_create(
            name=name,
            defaults={
                "designation": desig,
                "subject": subj,
                "qualification": qual,
                "experience": exp,
                "description": desc
            }
        )
        if created:
            print(f"-> Seeded teacher profile: '{name}' ({desig})")
        else:
            teacher_obj.designation = desig
            teacher_obj.subject = subj
            teacher_obj.qualification = qual
            teacher_obj.experience = exp
            teacher_obj.description = desc
            teacher_obj.save()
            print(f"-> Updated teacher profile: '{name}' ({desig})")

    # 6. Seed school uniforms, houses, and student leaders
    print("\nSeeding student dress codes, houses, and student leaders...")
    from students.models import SchoolUniform, StudentHouse, StudentLeader

    uniforms = [
        ("Primary (Classes I to V)", "Navy blue shorts, light blue shirts, black shoes, school belt & tie.", "Navy blue pinafore, light blue shirts, black shoes, school belt & tie."),
        ("Secondary (Classes VI to XII)", "Navy blue trousers, light blue shirts, black shoes, school belt & tie.", "Navy blue salwar suit with light blue dupatta and black shoes.")
    ]
    for sec, boys, girls in uniforms:
        u_obj, created = SchoolUniform.objects.get_or_create(
            section=sec,
            defaults={"boys_uniform": boys, "girls_uniform": girls}
        )
        if created:
            print(f"-> Seeded school uniform: '{sec}'")

    houses = [
        ("Red House", "Charity", "bg-red-500", "Instilling deep compassion, volunteer service, and caring attitudes.", 420),
        ("Blue House", "Faith", "bg-blue-500", "Focusing on trust, resilience, dedication, and integrity in challenges.", 410),
        ("Green House", "Hope", "bg-emerald-500", "Inspiring environmental care, growth, positive attitudes, and optimism.", 430),
        ("Gold House", "Wisdom", "bg-amber-500", "Prioritizing scholastic research, sound judgment, and lifelong study.", 445)
    ]
    for name, motto, color, desc, pts in houses:
        h_obj, created = StudentHouse.objects.get_or_create(
            name=name,
            defaults={"motto": motto, "color_code": color, "description": desc, "points": pts}
        )
        if created:
            print(f"-> Seeded house: '{name}'")

    leaders = [
        ("School Head Boy", "Master Siddharth V.", "Class XII - Science"),
        ("School Head Girl", "Miss Ananya R.", "Class XII - Commerce"),
        ("Assistant Head Boy", "Master Tarun K.", "Class XI - Computer Science"),
        ("Assistant Head Girl", "Miss Harini S.", "Class XI - Biology Focus"),
        ("Sports Captain", "Master Rohan Kumar", "Class XII - Science")
    ]
    for role, name, grade in leaders:
        l_obj, created = StudentLeader.objects.get_or_create(
            role=role,
            defaults={"name": name, "grade": grade}
        )
        if created:
            print(f"-> Seeded student leader: '{name}' ({role})")

    print("\nDatabase initialization complete! You can start the server now.")

if __name__ == "__main__":
    run_setup()
