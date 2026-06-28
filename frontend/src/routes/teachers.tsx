import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Search, Mail, Linkedin, GraduationCap, X, Sparkles, Filter } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { fadeUp, staggerContainer } from "../lib/motion";

export const Route = createFileRoute("/teachers")({
  head: () => ({
    meta: [
      { title: "Our Teachers — Brotherhood School" },
      { name: "description", content: "Meet our dedicated faculty, teaching staff, and heads of department at Brotherhood School." },
    ],
  }),
  component: TeachersPage,
});

interface Teacher {
  name: string;
  role: string;
  subject: string;
  qualifications: string;
  experience: string;
  email: string;
  bio: string;
  philosophy: string;
  avatarBg: string;
  image?: string;
}

function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [teachersList, setTeachersList] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultTeachers: Teacher[] = [
    {
      name: "Mr. J. Jeyakumar",
      role: "Correspondent",
      subject: "Languages",
      qualifications: "M.A(H), M.A(T), M.Ed., M.Phil.",
      experience: "25 Years",
      email: "jeyakumar@brotherhoodschool.edu.in",
      bio: "Providing vision, strategic direction, and values-based governance to the Brotherhood educational institutions.",
      philosophy: "Character formation is the foundation of all true academic and personal achievement.",
      avatarBg: "bg-primary text-primary-foreground"
    },
    {
      name: "Mrs. Shima Newton",
      role: "Principal",
      subject: "English",
      qualifications: "M.A., B.Ed.",
      experience: "20 Years",
      email: "shimanewton@brotherhoodschool.edu.in",
      bio: "Leading our academic and teaching faculty with a focus on holistic student development, modern pedagogy, and school discipline.",
      philosophy: "To inspire young minds to explore their highest potential and build strong moral compasses.",
      avatarBg: "bg-navy-deep text-white"
    },
    {
      name: "Mr. Solomon Devadoss",
      role: "Academic Co-ordinator & HOD Chemistry",
      subject: "Science",
      qualifications: "M.Sc., B.Ed.",
      experience: "18 Years",
      email: "solomondevadoss@brotherhoodschool.edu.in",
      bio: "Managing curriculum implementation, co-curricular planning, and senior secondary chemistry streams.",
      philosophy: "Science education is about fostering questioning minds and experimental scientific truths.",
      avatarBg: "bg-gold text-navy-deep font-bold"
    },
    {
      name: "Mrs. M. Sahaya Jamuna",
      role: "Tamil Teacher",
      subject: "Languages",
      qualifications: "M.A., B.Ed.",
      experience: "12 Years",
      email: "sahayajamuna@brotherhoodschool.edu.in",
      bio: "Teaching classic Tamil literature and grammar with a focus on essay writing and oratorical skills.",
      philosophy: "Preserving cultural heritage and language appreciation as core keys of identity.",
      avatarBg: "bg-[#8A9A86] text-white"
    },
    {
      name: "Mrs. S. Deivamani",
      role: "Tamil Teacher",
      subject: "Languages",
      qualifications: "M.A., B.Ed.",
      experience: "10 Years",
      email: "deivamani@brotherhoodschool.edu.in",
      bio: "Fostering language fluency, spelling accuracy, and literary analysis in secondary students.",
      philosophy: "Encouraging a love for the mother tongue as the gateway to expressive learning.",
      avatarBg: "bg-[#7c997b] text-white"
    },
    {
      name: "Mrs. S. Jayasoundari",
      role: "Tamil Teacher",
      subject: "Languages",
      qualifications: "M.A., M.T.T.",
      experience: "8 Years",
      email: "jayasoundari@brotherhoodschool.edu.in",
      bio: "Instructing foundation language batches with child-centric teaching aids and vocabulary exercises.",
      philosophy: "Patience and creative methods make language learning joyful.",
      avatarBg: "bg-[#9A8A86] text-white"
    },
    {
      name: "Mr. M.S. Seetharaman",
      role: "English Teacher",
      subject: "English",
      qualifications: "M.A., B.Ed.",
      experience: "15 Years",
      email: "seetharaman@brotherhoodschool.edu.in",
      bio: "Mentoring senior secondary batches in English communication, drama, and state board examination grammar.",
      philosophy: "To equip students with language as a powerful tool for global opportunities.",
      avatarBg: "bg-primary text-primary-foreground"
    },
    {
      name: "Mr. T. Rajkumar Sam Kingsly",
      role: "Mathematics Teacher",
      subject: "Mathematics",
      qualifications: "M.Sc., M.Phil.",
      experience: "14 Years",
      email: "samkingsly@brotherhoodschool.edu.in",
      bio: "Teaching calculus, matrices, and coordinate geometry for senior secondary levels with problem-solving boards.",
      philosophy: "Mathematics is a logic-driven language of patterns and critical reasoning.",
      avatarBg: "bg-navy-deep text-white"
    },
    {
      name: "Mr. R. Loganathan",
      role: "Mathematics Teacher",
      subject: "Mathematics",
      qualifications: "M.Sc., B.Ed.",
      experience: "11 Years",
      email: "loganathan@brotherhoodschool.edu.in",
      bio: "Supporting junior classes in algebra, arithmetic logic, and speed math methods.",
      philosophy: "Fostering confidence and eliminating math anxiety in every student.",
      avatarBg: "bg-[#8A9A86] text-white"
    },
    {
      name: "Mrs. C. Bhuvaneswari",
      role: "Mathematics Teacher",
      subject: "Mathematics",
      qualifications: "B.Sc., B.Ed.",
      experience: "9 Years",
      email: "cbhuvaneswari@brotherhoodschool.edu.in",
      bio: "Guiding matriculation levels with math lab modules, geometry grids, and interactive whiteboard worksheets.",
      philosophy: "Learning math through visualization makes abstract concepts clear.",
      avatarBg: "bg-gold text-navy-deep font-bold"
    },
    {
      name: "Mrs. Nanthini",
      role: "Mathematics Teacher",
      subject: "Mathematics",
      qualifications: "M.Sc., B.Ed.",
      experience: "7 Years",
      email: "nanthini@brotherhoodschool.edu.in",
      bio: "Instructing foundation arithmetic, statistics databases, and homework tutorials.",
      philosophy: "Practice and step-by-step logic build numerical mastery.",
      avatarBg: "bg-[#7c997b] text-white"
    },
    {
      name: "Mrs. S. Prabha Leethiyal",
      role: "Biology Teacher",
      subject: "Science",
      qualifications: "B.Sc., B.Ed.",
      experience: "13 Years",
      email: "prabhaleethiyal@brotherhoodschool.edu.in",
      bio: "Teaching botany and zoology fields with microscopic slides, plant charts, and anatomy diagrams.",
      philosophy: "Inspiring respect and curiosity for the natural world and biological diversity.",
      avatarBg: "bg-[#9A8A86] text-white"
    },
    {
      name: "Mrs. M. Shakila Banu",
      role: "Biology Teacher",
      subject: "Science",
      qualifications: "M.Sc., B.Ed.",
      experience: "10 Years",
      email: "shakilabanu@brotherhoodschool.edu.in",
      bio: "Coaching biological streams, human physiology models, and environmental ecology clubs.",
      philosophy: "To bridge textbook biological facts with real-world conservation.",
      avatarBg: "bg-primary text-primary-foreground"
    },
    {
      name: "Mrs. K.M. Jahanara",
      role: "Biology Teacher",
      subject: "Science",
      qualifications: "M.A., M.Sc., B.Ed.",
      experience: "14 Years",
      email: "jahanara@brotherhoodschool.edu.in",
      bio: "Specializing in biochemistry, cellular processes, and lab safety regulations.",
      philosophy: "An understanding of life sciences empowers students to lead healthy lives.",
      avatarBg: "bg-navy-deep text-white"
    },
    {
      name: "Mrs. K. Bhuvaneswari",
      role: "Physics Teacher",
      subject: "Science",
      qualifications: "M.Sc., M.Phil., B.Ed.",
      experience: "16 Years",
      email: "kbhuvaneswari@brotherhoodschool.edu.in",
      bio: "Instructing physics formulas, mechanics labs, optical light refraction, and circuit diagrams.",
      philosophy: "Hands-on experimentation is the core of understanding physical forces.",
      avatarBg: "bg-[#8A9A86] text-white"
    },
    {
      name: "Ms. S. Rajathi",
      role: "Chemistry Teacher",
      subject: "Science",
      qualifications: "B.Sc., B.Ed.",
      experience: "8 Years",
      email: "rajathi@brotherhoodschool.edu.in",
      bio: "Instructing organic equations, laboratory compound tests, and chemistry exhibition projects.",
      philosophy: "Guiding safety and experimental validation in scientific fields.",
      avatarBg: "bg-gold text-navy-deep font-bold"
    },
    {
      name: "Mrs. K. Vimala",
      role: "Economics Teacher",
      subject: "Languages",
      qualifications: "M.A., B.Ed.",
      experience: "14 Years",
      email: "vimala@brotherhoodschool.edu.in",
      bio: "Instructing macroeconomic theories, Indian economic development, and debate sessions.",
      philosophy: "Connecting economic models to daily life and civic responsibility.",
      avatarBg: "bg-[#7c997b] text-white"
    },
    {
      name: "Mrs. M. Kalaiselvi Latha Muthu",
      role: "Commerce Teacher",
      subject: "Mathematics",
      qualifications: "M.Com., B.Ed.",
      experience: "15 Years",
      email: "kalaiselvi@brotherhoodschool.edu.in",
      bio: "Mentoring secondary commerce batches in business operations, entrepreneurship, and trade files.",
      philosophy: "Business literacy is a practical necessity for the modern world.",
      avatarBg: "bg-[#9A8A86] text-white"
    },
    {
      name: "Mr. S. Bharath Kumar",
      role: "Accountancy Teacher",
      subject: "Mathematics",
      qualifications: "MBA, M.Phil.",
      experience: "12 Years",
      email: "bharathkumar@brotherhoodschool.edu.in",
      bio: "Teaching accounting ledger entries, company balance sheet evaluations, and tax calculations.",
      philosophy: "Accuracy and systemic tracking are key to all financial success.",
      avatarBg: "bg-primary text-primary-foreground"
    },
    {
      name: "Mrs. J. Latha",
      role: "Computer Science Teacher",
      subject: "Computer Science",
      qualifications: "MCA., B.Ed.",
      experience: "13 Years",
      email: "latha@brotherhoodschool.edu.in",
      bio: "Teaching HTML/CSS, Python programming, databases, and digital logic gates in the computer laboratory.",
      philosophy: "Computing is the sandbox for building future-oriented technology.",
      avatarBg: "bg-navy-deep text-white"
    },
    {
      name: "Mr. M. Sridhar",
      role: "History Teacher",
      subject: "Languages",
      qualifications: "M.A., B.Ed.",
      experience: "11 Years",
      email: "sridhar@brotherhoodschool.edu.in",
      bio: "Fostering historical interest through maps, archival timelines, and ancient culture stories.",
      philosophy: "We study history to understand our roots and build a wiser future.",
      avatarBg: "bg-[#8A9A86] text-white"
    },
    {
      name: "Mrs. Sudha",
      role: "History Teacher",
      subject: "Languages",
      qualifications: "M.A., B.Ed.",
      experience: "10 Years",
      email: "sudha@brotherhoodschool.edu.in",
      bio: "Instructing democratic structures, global historical milestones, and civic responsibilities.",
      philosophy: "Empowering youth to become conscious citizens through active history discussions.",
      avatarBg: "bg-gold text-navy-deep font-bold"
    },
    {
      name: "Mrs. T.S. Maheshwari",
      role: "Hindi Teacher",
      subject: "Languages",
      qualifications: "M.Com., B.Ed.",
      experience: "12 Years",
      email: "maheshwari@brotherhoodschool.edu.in",
      bio: "Teaching national language grammar, pronunciation, and literature excerpts.",
      philosophy: "Linguistic diversity is a cultural wealth that bridges borders.",
      avatarBg: "bg-[#7c997b] text-white"
    },
    {
      name: "Mr. Vishal",
      role: "Music Teacher",
      subject: "Languages",
      qualifications: "B.Mus.",
      experience: "6 Years",
      email: "vishal@brotherhoodschool.edu.in",
      bio: "Coaching vocal pitch control, musical keyboard, and organizing the school choir rehearsals.",
      philosophy: "Music is the universal language that harmonizes the soul.",
      avatarBg: "bg-[#9A8A86] text-white"
    },
    {
      name: "Mrs. Ranganayagi",
      role: "Physical Education Director",
      subject: "Science",
      qualifications: "B.Sc., M.P.Ed.",
      experience: "15 Years",
      email: "ranganayagi@brotherhoodschool.edu.in",
      bio: "Leading athletic coaching, zonal sports meets, yoga exercises, and track-and-field drills.",
      philosophy: "A healthy mind resides in a healthy body; discipline builds true sportsmanship.",
      avatarBg: "bg-primary text-primary-foreground"
    },
    {
      name: "Mr. Kulandaivelu",
      role: "Art & Library Incharge",
      subject: "Languages",
      qualifications: "B.A., B.Lib.Sc.",
      experience: "14 Years",
      email: "kulandaivelu@brotherhoodschool.edu.in",
      bio: "Managing school book library database index and supervising creative drawing classes.",
      philosophy: "Fostering creativity through art and cultivating lifelong reading habits.",
      avatarBg: "bg-navy-deep text-white"
    }
  ];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/teachers/")
      .then((res) => res.json())
      .then((data) => {
        const results = Array.isArray(data) ? data : (data.results || []);
        if (results.length > 0) {
          const mapped = results.map((t: any, index: number) => {
            // Curate some harmonious backgrounds for fallback avatars
            const backgrounds = [
              "bg-primary text-primary-foreground",
              "bg-navy-deep text-white",
              "bg-[#8A9A86] text-white",
              "bg-gold text-navy-deep font-bold",
              "bg-[#7c997b] text-white",
              "bg-[#9A8A86] text-white"
            ];
            return {
              name: t.name,
              role: t.designation,
              subject: t.subject,
              qualifications: t.qualification,
              experience: t.experience,
              email: `${t.name.toLowerCase().replace(/[^a-z0-9]/g, "")}@brotherhoodschool.edu.in`,
              bio: t.description || "Dedicated educator committed to character development and academic achievement.",
              philosophy: t.description ? t.description.substring(0, 100) + "..." : "To empower pupils to become creative and independent thinkers.",
              avatarBg: backgrounds[index % backgrounds.length],
              image: t.image || ""
            };
          });
          setTeachersList(mapped);
        } else {
          setTeachersList(defaultTeachers);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching teachers:", err);
        setTeachersList(defaultTeachers);
        setLoading(false);
      });
  }, []);

  const subjects = ["All", "English", "Mathematics", "Science", "Computer Science", "Languages"];

  const filteredTeachers = teachersList.filter((teacher) => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          teacher.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === "All" || teacher.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <>
      <PageHeader
        eyebrow="Faculty Directory"
        title="Our Dedicated Faculty"
        subtitle="Meet the qualified educators shaping character, discipline, and scholarship."
      />

      <section className="max-w-7xl mx-auto px-6 py-16 space-y-12">
        {/* Search & Filter Controls */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search Input */}
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-border bg-background text-sm focus:outline-none focus:border-gold transition duration-200"
            />
          </div>

          {/* Subject Filters */}
          <div className="flex flex-wrap gap-2 items-center w-full md:w-auto justify-center md:justify-end">
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-1.5 mr-2">
              <Filter className="h-3.5 w-3.5" /> Filter:
            </span>
            {subjects.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition duration-200 ${
                  selectedSubject === sub
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border hover:bg-primary/5 text-muted-foreground hover:text-primary"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gold mx-auto"></div>
            <p className="text-xs text-muted-foreground mt-4 uppercase tracking-widest font-semibold">Loading Educators...</p>
          </div>
        )}

        {/* Teachers Cards Grid */}
        <motion.div 
          layout
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredTeachers.map((teacher, idx) => (
              <FlipCard 
                key={teacher.name}
                teacher={teacher}
                idx={idx}
                isFlipped={flippedIndex === idx}
                onFlip={() => setFlippedIndex(flippedIndex === idx ? null : idx)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {!loading && filteredTeachers.length === 0 && (
          <div className="text-center py-16 bg-muted/20 border border-border rounded-3xl text-muted-foreground">
            No educators found matching your criteria.
          </div>
        )}
      </section>
    </>
  );
}

function FlipCard({ teacher, idx, isFlipped, onFlip }: { teacher: Teacher, idx: number, isFlipped: boolean, onFlip: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full h-[400px] cursor-pointer perspective-[1000px] group"
      onClick={onFlip}
    >
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-card/80 backdrop-blur-lg border border-border rounded-3xl p-6 shadow-sm hover:border-gold/60 flex flex-col hover:shadow-elegant overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          
          <div className="flex items-center gap-4 mb-6">
            {teacher.image ? (
              <img 
                src={teacher.image} 
                alt={teacher.name} 
                className="h-16 w-16 rounded-full object-cover border border-gold/25 shadow-sm"
              />
            ) : (
              <div className={`h-16 w-16 rounded-full flex items-center justify-center font-display text-2xl font-bold border border-gold/10 shadow-sm ${teacher.avatarBg}`}>
                {teacher.name.split(" ").map(n => n[0]).join("")}
              </div>
            )}
            <div>
              <h3 className="font-display text-xl text-primary font-bold transition-colors group-hover:text-gold">{teacher.name}</h3>
              <p className="text-xs text-muted-foreground font-medium">{teacher.role}</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground leading-relaxed border-t border-border pt-4">
            <div><strong className="text-foreground">Subject:</strong> {teacher.subject}</div>
            <div><strong className="text-foreground">Qualifications:</strong> {teacher.qualifications}</div>
            <div><strong className="text-foreground">Experience:</strong> {teacher.experience}</div>
          </div>

          <div className="mt-auto flex justify-between items-center border-t border-border pt-4">
            <span className="text-[10px] uppercase tracking-wider text-gold font-bold group-hover:opacity-100 opacity-60 transition duration-200">
              Click to flip →
            </span>
            <div className="flex gap-2">
              <a
                href={`mailto:${teacher.email}`}
                onClick={(e) => e.stopPropagation()}
                className="h-8 w-8 rounded-full border border-border bg-background hover:bg-primary/5 flex items-center justify-center text-muted-foreground hover:text-primary transition duration-150"
              >
                <Mail className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="h-8 w-8 rounded-full border border-border bg-background hover:bg-primary/5 flex items-center justify-center text-muted-foreground hover:text-primary transition duration-150"
              >
                <Linkedin className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-navy-deep rounded-3xl p-6 flex flex-col shadow-2xl border border-gold/30 overflow-hidden text-white/90">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold rounded-full blur-[60px] opacity-[0.15] pointer-events-none"></div>
          
          <h3 className="font-display text-xl text-gold font-bold mb-1">{teacher.name}</h3>
          <p className="text-xs text-white/60 mb-4">{teacher.role}</p>
          
          <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-1.5 flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Biography
              </h4>
              <p className="text-xs text-white/80 leading-relaxed">{teacher.bio}</p>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-1.5 flex items-center gap-1">
                <GraduationCap className="h-3 w-3" /> Philosophy
              </h4>
              <p className="text-xs text-white/80 leading-relaxed italic">
                "{teacher.philosophy}"
              </p>
            </div>
          </div>

          <div className="mt-auto border-t border-white/10 pt-4 flex justify-between items-center">
             <span className="text-[10px] uppercase tracking-wider text-white/50 hover:text-white transition duration-200">
              ← Flip back
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
