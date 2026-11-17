import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { API_BASE, BACKEND_URL } from "@/config";
import { 
  Mail, GraduationCap, Sparkles, Award, 
  BookOpen, Clock, Quote, Check, Shield, 
  ChevronDown
} from "lucide-react";
import shimaPhoto from "../images/Principal-Photo.jpg";
import correspondentPhoto from "../images/correspondent_image.jpeg";

export const Route = createFileRoute("/teachers")({
  head: () => ({
    meta: [
      { title: "Distinguished Faculty & Educators — Brotherhood School" },
      { name: "description", content: "Explore the distinguished faculty, leadership, and teaching scholars shaping minds and character at Brotherhood Matriculation Higher Secondary School since 1991." },
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
  departmentCategory?: string;
}

function getCategoryForSubject(subject: string, role: string): string {
  const s = (subject || "").toLowerCase();
  const r = (role || "").toLowerCase();

  if (r.includes("correspondent") || r.includes("principal") || r.includes("coordinator")) {
    return "Leadership & Admin";
  }
  if (s.includes("tamil") || s.includes("english") || s.includes("hindi") || s.includes("french")) {
    return "Languages";
  }
  if (s.includes("math")) {
    return "Mathematics";
  }
  if (s.includes("physics") || s.includes("chemistry") || s.includes("bio") || s.includes("science")) {
    return "Sciences";
  }
  if (s.includes("computer") || s.includes("robotics") || s.includes("coding")) {
    return "Technology & CS";
  }
  if (s.includes("commerce") || s.includes("economic") || s.includes("history") || s.includes("civics")) {
    return "Commerce & Humanities";
  }
  return "Arts & Physical Ed";
}

function TeachersPage() {
  const [teachersList, setTeachersList] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const defaultTeachers: Teacher[] = [
    {
      name: "Mr. J. Jeyakumar",
      role: "Correspondent",
      subject: "Administration",
      qualifications: "B.Sc. (Physics), M.A., M.A.(T), M.Ed., M.Phil.",
      experience: "30+ Years",
      email: "jeyakumar@brotherhoodschool.edu.in",
      bio: "Visionary educational leader providing administrative guidance, infrastructure innovation, and spiritual mentorship since the school's inception in 1991.",
      philosophy: "Governance built on integrity, moral transparency, and holistic child development.",
      avatarBg: "from-[#1b4d32] to-[#0a2b18]",
      image: correspondentPhoto,
      departmentCategory: "Leadership & Admin"
    },
    {
      name: "Mrs. Shima Newton",
      role: "Principal (Higher Secondary)",
      subject: "French",
      qualifications: "M.A., B.Ed.",
      experience: "20+ Years",
      email: "shimanewton@brotherhoodschool.edu.in",
      bio: "Directing higher secondary academic streams, competitive examination readiness, and mentoring senior students toward responsible global citizenship.",
      philosophy: "Character development and academic rigor must advance as twin pillars of human transformation.",
      avatarBg: "from-[#2e260c] via-[#4a3d13] to-[#0a2b18]",
      image: shimaPhoto,
      departmentCategory: "Leadership & Admin"
    },
    {
      name: "Mrs. Helen Johnson",
      role: "Principal (Primary)",
      subject: "Science",
      qualifications: "M.Sc., B.Ed.",
      experience: "15+ Years",
      email: "helenjohnson@brotherhoodschool.edu.in",
      bio: "Guiding the foundational primary wing with activity-based learning, cognitive stimulation, and standard pupil care.",
      philosophy: "Every young learner flourishes in a secure sanctuary of joy, imagination, and moral encouragement.",
      avatarBg: "from-[#0d2a4a] to-[#051329]",
      departmentCategory: "Leadership & Admin"
    },
    {
      name: "Mr. S. Solomon Devadoss",
      role: "Academic Coordinator",
      subject: "Science",
      qualifications: "M.Sc., B.Ed.",
      experience: "15+ Years",
      email: "solomondevadoss@brotherhoodschool.edu.in",
      bio: "Coordinating inter-departmental curricula alignment, smart-board pedagogy, continuous teacher refresher programs, and academic evaluation audits.",
      philosophy: "Systematic logic and structured syllabus pacing cultivate confident intellectual thinkers.",
      avatarBg: "from-[#173827] to-[#081a11]",
      departmentCategory: "Leadership & Admin"
    },
    {
      name: "Mrs. Sahaya Jamuna",
      role: "Tamil Teacher",
      subject: "Tamil",
      qualifications: "M.A., B.Ed.",
      experience: "10 Years",
      email: "sahayajamuna@brotherhoodschool.edu.in",
      bio: "Teaching classical Sangam poetry, Thirukkural moral couplets, and conducting state-level oratorical forums.",
      philosophy: "Preserving mother-tongue eloquence and classical Tamil ethics in young hearts.",
      avatarBg: "from-[#1e3a2b] to-[#0d1f16]",
      departmentCategory: "Languages"
    },
    {
      name: "Mrs. S. Jeyasoundari",
      role: "Tamil Teacher",
      subject: "Tamil",
      qualifications: "M.A., M.T.T.",
      experience: "6 Years",
      email: "jeyasoundari@brotherhoodschool.edu.in",
      bio: "Utilizing modern linguistic methods to refine phonetics, orthography, and creative composition skills.",
      philosophy: "Patience and playful phonetics turn language acquisition into an effortless joy.",
      avatarBg: "from-[#2b1f13] to-[#120c07]",
      departmentCategory: "Languages"
    },
    {
      name: "Mrs. Deivamani",
      role: "Tamil Teacher",
      subject: "Tamil",
      qualifications: "M.A., B.Ed.",
      experience: "8 Years",
      email: "deivamani@brotherhoodschool.edu.in",
      bio: "Engaging primary and secondary classes in dramatic prose reading, drama, and poetry recitation.",
      philosophy: "Language is the gateway to timeless culture and articulate civic expression.",
      avatarBg: "from-[#132a1e] to-[#07130c]",
      departmentCategory: "Languages"
    },
    {
      name: "Mrs. S. Anitha Kumari",
      role: "Tamil Teacher",
      subject: "Tamil",
      qualifications: "M.A., B.Ed.",
      experience: "7 Years",
      email: "anithakumari@brotherhoodschool.edu.in",
      bio: "Directing foundational Tamil literary comprehension and student library reading groups.",
      philosophy: "Encouraging a deep appetite for literary books from an early age.",
      avatarBg: "from-[#1a2e3b] to-[#0a151c]",
      departmentCategory: "Languages"
    },
    {
      name: "Mrs. M. Sasikala Raman",
      role: "Tamil Teacher",
      subject: "Tamil",
      qualifications: "B.Lit., B.Ed.",
      experience: "5 Years",
      email: "sasikalaraman@brotherhoodschool.edu.in",
      bio: "Focusing on middle school grammar modules, cursive script, and vocabulary development.",
      philosophy: "Consistent daily handwriting practice unlocks mental clarity.",
      avatarBg: "from-[#292211] to-[#141005]",
      departmentCategory: "Languages"
    },
    {
      name: "Mrs. S. Suganya",
      role: "Tamil Teacher",
      subject: "Tamil",
      qualifications: "B.A., D.T.Ed.",
      experience: "6 Years",
      email: "suganya@brotherhoodschool.edu.in",
      bio: "Primary language mentor specialized in auditory recognition, storytelling, and early speech fluency.",
      philosophy: "Vibrant storytelling makes grammar natural and memorable.",
      avatarBg: "from-[#143324] to-[#071710]",
      departmentCategory: "Languages"
    },
    {
      name: "Mr. M.S. Seetharaman",
      role: "English Teacher",
      subject: "English",
      qualifications: "M.A., B.Ed.",
      experience: "12 Years",
      email: "seetharaman@brotherhoodschool.edu.in",
      bio: "Leading senior Shakespearean prose, communicative debate club, and modern essay composition workshops.",
      philosophy: "To equip students with English as an effortless vehicle for international opportunity.",
      avatarBg: "from-[#0f2d3d] to-[#05131a]",
      departmentCategory: "Languages"
    },
    {
      name: "Mr. T. Rajkumar Sam Kingsley",
      role: "Mathematics Teacher",
      subject: "Mathematics",
      qualifications: "M.Sc., M.Phil.",
      experience: "14 Years",
      email: "samkingsley@brotherhoodschool.edu.in",
      bio: "Instructing senior batch advanced calculus, vectors, and analytical coordinate geometry.",
      philosophy: "Mathematics is not memorization; it is the sublime universal language of logic.",
      avatarBg: "from-[#281b3d] to-[#110a1c]",
      departmentCategory: "Mathematics"
    },
    {
      name: "Mr. R. Loganathan",
      role: "Mathematics Teacher",
      subject: "Mathematics",
      qualifications: "M.Sc., B.Ed.",
      experience: "9 Years",
      email: "loganathan@brotherhoodschool.edu.in",
      bio: "Teaching algebra, trigonometry, and statistical probability techniques with geometric visualization.",
      philosophy: "Deconstruct complex formulas into intuitive steps to eliminate all mathematical anxiety.",
      avatarBg: "from-[#113322] to-[#05170d]",
      departmentCategory: "Mathematics"
    },
    {
      name: "Mrs. C. Bhuvaneswari",
      role: "Mathematics Teacher",
      subject: "Mathematics",
      qualifications: "B.Sc., B.Ed.",
      experience: "7 Years",
      email: "cbhuvaneswari@brotherhoodschool.edu.in",
      bio: "Specializing in middle school fraction mechanics, planar geometry, and practical arithmetic.",
      philosophy: "Visual arithmetic models ground abstract numbers in the tangible physical world.",
      avatarBg: "from-[#0d2a45] to-[#03111f]",
      departmentCategory: "Mathematics"
    },
    {
      name: "Mrs. Nanthini",
      role: "Mathematics Teacher",
      subject: "Mathematics",
      qualifications: "M.Sc., B.Ed.",
      experience: "5 Years",
      email: "nanthini@brotherhoodschool.edu.in",
      bio: "Cultivating speed-math techniques and problem-solving puzzles for young mathematical minds.",
      philosophy: "Confidence grows with every small puzzle solved independently.",
      avatarBg: "from-[#33250f] to-[#171004]",
      departmentCategory: "Mathematics"
    },
    {
      name: "Mrs. E.L. Ancy Niruba",
      role: "Mathematics Teacher",
      subject: "Mathematics",
      qualifications: "M.Sc., B.Ed.",
      experience: "6 Years",
      email: "ancyniruba@brotherhoodschool.edu.in",
      bio: "Instructing intermediate arithmetic sequences and applied Euclidean problem solving.",
      philosophy: "Encouraging collaborative problem-solving unlocks multi-perspective analytical reasoning.",
      avatarBg: "from-[#1d382d] to-[#091712]",
      departmentCategory: "Mathematics"
    },
    {
      name: "Mrs. S. Vaishnupriya",
      role: "Mathematics Teacher",
      subject: "Mathematics",
      qualifications: "B.Sc., B.Ed.",
      experience: "5 Years",
      email: "vaishnupriya@brotherhoodschool.edu.in",
      bio: "Instilling joyful numeracy fundamentals, place values, and spatial reasoning in junior batches.",
      philosophy: "Every single child is innately capable of mathematical mastery when nurtured with gentle patience.",
      avatarBg: "from-[#12281e] to-[#06120c]",
      departmentCategory: "Mathematics"
    },
    {
      name: "Mrs. K. Bhuvaneswari",
      role: "Physics Teacher",
      subject: "Science",
      qualifications: "M.Sc., M.Phil.",
      experience: "11 Years",
      email: "kbhuvaneswari@brotherhoodschool.edu.in",
      bio: "Guiding high-school experimental laboratory setups in electromagnetic fields, optics, and kinematics.",
      philosophy: "Hands-on laboratory experimentation transforms theoretical physics into living reality.",
      avatarBg: "from-[#241a38] to-[#0c0717]",
      departmentCategory: "Sciences"
    },
    {
      name: "Mr. M. Sathyadoss",
      role: "Chemistry Teacher",
      subject: "Science",
      qualifications: "M.Sc., B.Ed.",
      experience: "13 Years",
      email: "sathyadoss@brotherhoodschool.edu.in",
      bio: "Directing senior organic reaction chemistry, chemical safety audits, and reagent experiments.",
      philosophy: "Chemistry teaches children how atoms collaborate to build the entire universe.",
      avatarBg: "from-[#153a27] to-[#081810]",
      departmentCategory: "Sciences"
    },
    {
      name: "Mrs. B. Chitra",
      role: "Biology Teacher",
      subject: "Science",
      qualifications: "M.Sc., B.Ed.",
      experience: "10 Years",
      email: "bchitra@brotherhoodschool.edu.in",
      bio: "Supervising cellular biology, dissection-free botanical models, and environmental ecology projects.",
      philosophy: "To study biology is to cultivate reverent stewardship toward all living beings.",
      avatarBg: "from-[#0e2c1e] to-[#04120b]",
      departmentCategory: "Sciences"
    },
    {
      name: "Mrs. R. Rathika",
      role: "Science Teacher",
      subject: "Science",
      qualifications: "M.Sc., M.Phil.",
      experience: "8 Years",
      email: "rathika@brotherhoodschool.edu.in",
      bio: "Cultivating junior scientific inquiry, scientific exhibits, and eco-sustainable energy projects.",
      philosophy: "Childhood wonder is the original scientific spark that changes the world.",
      avatarBg: "from-[#291e3b] to-[#0f0a17]",
      departmentCategory: "Sciences"
    },
    {
      name: "Mrs. D. Mahalakshmi",
      role: "Science Teacher",
      subject: "Science",
      qualifications: "M.Sc., B.Ed.",
      experience: "7 Years",
      email: "mahalakshmi@brotherhoodschool.edu.in",
      bio: "Fostering elementary general science knowledge, planetary physics, and plant physiology.",
      philosophy: "Every leaf and pebble on school grounds holds a scientific lesson.",
      avatarBg: "from-[#112a1f] to-[#06140d]",
      departmentCategory: "Sciences"
    },
    {
      name: "Mrs. G. Subhashini",
      role: "Social Science Teacher",
      subject: "Social Studies",
      qualifications: "M.A., B.Ed.",
      experience: "9 Years",
      email: "subhashini@brotherhoodschool.edu.in",
      bio: "Instructing medieval Indian history, cartography, global civics, and constitution ethics.",
      philosophy: "History is not past memory; it is our roadmap for humane democratic citizenship.",
      avatarBg: "from-[#382613] to-[#140c04]",
      departmentCategory: "Commerce & Humanities"
    },
    {
      name: "Mrs. S. Revathi",
      role: "Social Science Teacher",
      subject: "Social Studies",
      qualifications: "M.A., B.Ed.",
      experience: "8 Years",
      email: "revathi@brotherhoodschool.edu.in",
      bio: "Exploring world geography, atmospheric sciences, trade routes, and demographic evolution.",
      philosophy: "Understanding geography helps young minds embrace diversity and empathy.",
      avatarBg: "from-[#23351d] to-[#0c1409]",
      departmentCategory: "Commerce & Humanities"
    },
    {
      name: "Mrs. M. Vasanthi",
      role: "Computer Science Teacher",
      subject: "Computer Science",
      qualifications: "M.C.A., B.Ed.",
      experience: "10 Years",
      email: "vasanthi@brotherhoodschool.edu.in",
      bio: "Leading senior Python coding curricula, database administration, and cyber wellness modules.",
      philosophy: "Code is pure creative literacy for tomorrow's architects and engineers.",
      avatarBg: "from-[#0a273d] to-[#03101c]",
      departmentCategory: "Technology & CS"
    },
    {
      name: "Mrs. B. Chitra",
      role: "Computer Science Teacher",
      subject: "Computer Science",
      qualifications: "B.E. (CSE)",
      experience: "6 Years",
      email: "bchitracse@brotherhoodschool.edu.in",
      bio: "Teaching junior logic diagrams, Scratch animation programming, and algorithm basics.",
      philosophy: "Computational logic empowers young problem-solvers to build real solutions.",
      avatarBg: "from-[#1a382e] to-[#071712]",
      departmentCategory: "Technology & CS"
    },
    {
      name: "Mr. J. Solomon",
      role: "Physical Education Director",
      subject: "Physical Education",
      qualifications: "M.P.Ed., M.Phil.",
      experience: "16 Years",
      email: "solomonpet@brotherhoodschool.edu.in",
      bio: "Head athletic coach producing zonal champions in track-and-field, basketball, and football.",
      philosophy: "Physical vigor, resilience in defeat, and unshakeable discipline define true sportsmanship.",
      avatarBg: "from-[#331c12] to-[#120704]",
      departmentCategory: "Arts & Physical Ed"
    },
    {
      name: "Mr. A. Xavier",
      role: "Physical Education Teacher",
      subject: "Physical Education",
      qualifications: "B.P.Ed.",
      experience: "8 Years",
      email: "xavierpet@brotherhoodschool.edu.in",
      bio: "Organizing daily morning calisthenics, cross-country marathons, and intra-house tournament leagues.",
      philosophy: "A healthy, agile body is the irreplaceable vessel for a sharp, vibrant mind.",
      avatarBg: "from-[#1d2d1b] to-[#091207]",
      departmentCategory: "Arts & Physical Ed"
    }
  ];

  // Fetch teachers from backend API dynamically
  useEffect(() => {
    fetch(`${API_BASE}/teachers/`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response not ok");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const backgrounds = [
            "from-[#1b4d32] to-[#0a2b18]",
            "from-[#0d2a4a] to-[#051329]",
            "from-[#281b3d] to-[#110a1c]",
            "from-[#2b1f13] to-[#120c07]",
            "from-[#173827] to-[#081a11]",
            "from-[#0a273d] to-[#03101c]"
          ];

          const mapped: Teacher[] = data.map((t: any, index: number) => {
            let teacherImg = t.image_url;
            if (teacherImg && !teacherImg.startsWith("http") && !teacherImg.startsWith("/")) {
              teacherImg = `${BACKEND_URL}/uploads/${teacherImg}`;
            }
            if ((t.name && t.name.toLowerCase().includes("shima")) || (t.designation && t.designation.toLowerCase().includes("principal (higher secondary)"))) {
              teacherImg = shimaPhoto;
            }
            if ((t.name && t.name.toLowerCase().includes("jeyakumar")) || (t.designation && t.designation.toLowerCase().includes("correspondent"))) {
              teacherImg = correspondentPhoto;
            }

            return {
              name: t.name,
              role: t.designation || "Faculty Member",
              subject: t.subject || "General Education",
              qualifications: t.qualification || "Accredited Faculty",
              experience: t.experience || "Dedicated Educator",
              email: `${t.name.toLowerCase().replace(/[^a-z0-9]/g, "")}@brotherhoodschool.edu.in`,
              bio: t.description || "Distinguished faculty member dedicated to character development, high standards of academic scholarship, and mentorship.",
              philosophy: t.description && t.description.length > 40 
                ? t.description 
                : "To inspire curiosity, nurture discipline, and empower students to become independent critical thinkers.",
              avatarBg: backgrounds[index % backgrounds.length],
              image: teacherImg,
              departmentCategory: getCategoryForSubject(t.subject, t.designation)
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

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2200);
  };

  return (
    <div className="bg-[#fdfdfc] text-[#2d3748] font-sans selection:bg-[#0a2b18] selection:text-white min-h-screen">
      
      {/* 1. Preserved Exact Hero Section */}
      <PageHeader
        eyebrow="Academic Leadership"
        title="Distinguished Faculty"
        subtitle="Meet the qualified educators shaping character, discipline, and scholarship since 1991."
      />

      {/* 2. Prestigious Institutional Heading Section on Clean White Background */}
      <section className="relative z-20 py-14 sm:py-20 md:py-28 px-4 sm:px-6 bg-white border-b border-[#e2e8f0] overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          
          <div className="inline-flex items-center justify-center gap-3 sm:gap-4">
            <div className="w-8 sm:w-12 h-[1px] bg-[#d4af37]"></div>
            <span className="text-[#d4af37] uppercase tracking-[0.2em] text-[11px] sm:text-xs font-bold">
              Faculty & Academic Leadership
            </span>
            <div className="w-8 sm:w-12 h-[1px] bg-[#d4af37]"></div>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0a2b18] leading-[1.15] font-normal tracking-tight break-words">
            Distinguished <span className="italic text-[#1b4d32]">Educators</span> & Mentors
          </h2>

          <p className="text-[#6c8274] font-light text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Meet the thirty-year legacy of dedicated scholars, department heads, and mentors 
            shaping character, intellectual rigor, and holistic student development at Brotherhood School.
          </p>

          <div className="pt-2 sm:pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-semibold text-[#1b4d32]">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#f4f7f5] border border-[#e2e8f0] shadow-sm uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              Academic Scholarship
            </span>
            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#f4f7f5] border border-[#e2e8f0] shadow-sm uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
              Values & Personal Dignity
            </span>
            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#f4f7f5] border border-[#e2e8f0] shadow-sm uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5 text-[#d4af37]" />
              Continuous Teacher Refresher
            </span>
          </div>

        </div>
      </section>

      {/* 3. Loading State */}
      {loading && (
        <div className="py-32 text-center space-y-4 bg-white">
          <div className="w-12 h-12 rounded-full border-2 border-[#d4af37] border-t-transparent animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest text-[#d4af37]">Loading Faculty Showcase...</p>
        </div>
      )}

      {/* 4. FULL-PAGE TEACHER PROFILES ON WHITE SECTION BACKGROUND */}
      {!loading && teachersList.length > 0 && (
        <main className="w-full bg-white relative">
          
          {teachersList.map((teacher, idx) => {
            const isEven = idx % 2 === 0;
            const nextTeacher = teachersList[idx + 1];

            return (
              <section
                key={teacher.name}
                id={`educator-${idx}`}
                className="min-h-screen w-full flex items-center justify-center py-8 sm:py-14 md:py-24 px-3 sm:px-6 md:px-12 lg:px-16 relative overflow-hidden bg-white border-b border-[#e2e8f0]"
              >
                {/* Subtle Ambient Background Lighting per section on white canvas */}
                <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#1b4d32]/5 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#d4af37]/8 rounded-full blur-[140px] pointer-events-none" />

                {/* Massive Full-Page Editorial Card */}
                <div className="w-full max-w-7xl min-h-[auto] sm:min-h-[82vh] rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3.5rem] p-5 sm:p-8 md:p-14 lg:p-16 bg-gradient-to-br from-[#0c2316] via-[#07190f] to-[#040e08] border border-[#d4af37]/35 shadow-[0_30px_90px_rgba(10,43,24,0.18)] backdrop-blur-2xl flex flex-col justify-between relative overflow-hidden">
                  
                  {/* Top Ambient Highlight Orb inside the card */}
                  <div className="absolute -top-16 -right-16 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Header Row: Department Tag & Faculty Index */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-white/10 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/35 text-[11px] sm:text-xs uppercase tracking-widest font-bold">
                      <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{teacher.departmentCategory || teacher.subject}</span>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="font-mono text-sm md:text-base font-bold text-[#d4af37]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[11px] sm:text-xs uppercase tracking-widest text-white/40">
                        / {String(teachersList.length).padStart(2, "0")} Faculty Profiles
                      </span>
                    </div>
                  </div>

                  {/* Main Editorial Content Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-14 items-center py-4 sm:py-6 md:py-8 relative z-10 my-auto">
                    
                    {/* Portrait Column (Alternates side for dynamic rhythm) */}
                    <div className={`md:col-span-5 ${isEven ? "md:order-1" : "md:order-2"}`}>
                      <div className="relative rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] overflow-hidden aspect-[4/5] sm:aspect-square md:aspect-[3/4] max-h-[320px] sm:max-h-[440px] lg:max-h-[500px] w-full shadow-2xl border-2 border-[#d4af37]/40 bg-[#06180d] group">
                        {teacher.image ? (
                          <img
                            src={teacher.image}
                            alt={teacher.name}
                            loading={idx === 0 ? "eager" : "lazy"}
                            decoding="async"
                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <EditorialMonogramCard 
                            name={teacher.name} 
                            subject={teacher.subject} 
                            avatarBg={teacher.avatarBg} 
                          />
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-[#05140b]/80 via-transparent to-transparent opacity-60 pointer-events-none" />

                        {/* Floating Experience Badge */}
                        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-[#05140b]/95 border border-[#d4af37]/50 backdrop-blur-md flex items-center gap-2 sm:gap-2.5 shadow-xl">
                          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d4af37]" />
                          <div>
                            <div className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#d4af37] font-bold">Experience</div>
                            <div className="text-white text-[11px] sm:text-xs md:text-sm font-semibold">{teacher.experience}</div>
                          </div>
                        </div>

                        {/* Subject Badge on Portrait */}
                        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                          <span className="inline-block px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] uppercase font-bold tracking-widest bg-[#05140b]/90 text-[#d4af37] border border-[#d4af37]/40 backdrop-blur-md shadow-md">
                            Dept. of {teacher.subject}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content Details Column */}
                    <div className={`md:col-span-7 space-y-4 sm:space-y-5 ${isEven ? "md:order-2" : "md:order-1"}`}>
                      
                      {/* Name & Role */}
                      <div>
                        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-normal leading-[1.12] sm:leading-[1.1] tracking-tight break-words">
                          {teacher.name}
                        </h2>
                        <p className="text-[#d4af37] text-xs sm:text-sm md:text-base uppercase tracking-widest font-semibold mt-1.5 sm:mt-2">
                          {teacher.role}
                        </p>
                      </div>

                      {/* Credentials Row */}
                      <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 text-xs sm:text-sm text-[#9bb2a4]">
                        <span className="flex items-center gap-1.5 sm:gap-2 font-medium">
                          <GraduationCap className="w-4 h-4 text-[#d4af37] shrink-0" />
                          <span>{teacher.qualifications}</span>
                        </span>
                        <span className="flex items-center gap-1.5 sm:gap-2 font-medium">
                          <BookOpen className="w-4 h-4 text-[#d4af37] shrink-0" />
                          <span>Academic Discipline: {teacher.subject}</span>
                        </span>
                      </div>

                      {/* Teaching Philosophy Quote */}
                      <div className="relative pl-4 sm:pl-5 py-2.5 sm:py-3 border-l-2 border-[#d4af37] bg-white/[0.02] rounded-r-2xl pr-3 sm:pr-4 my-2 sm:my-3">
                        <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4af37]/20 absolute -top-2.5 -left-2.5 sm:-top-3 sm:-left-3 pointer-events-none" />
                        <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#d4af37] font-bold mb-1">
                          Educational Philosophy
                        </div>
                        <p className="font-serif italic text-sm sm:text-base md:text-lg lg:text-xl text-white/95 font-light leading-relaxed">
                          "{teacher.philosophy}"
                        </p>
                      </div>

                      {/* Educator Biography */}
                      <p className="text-[#8ba294] text-xs sm:text-sm md:text-base font-light leading-relaxed">
                        {teacher.bio}
                      </p>

                    </div>

                  </div>

                  {/* Footer Row: Direct Email, Copy Email, and Next Educator Link */}
                  <div className="pt-4 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                    
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                      <a
                        href={`mailto:${teacher.email}`}
                        className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#d4af37] text-[#05140b] text-xs sm:text-sm font-bold tracking-wider uppercase hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                      >
                        <Mail className="w-4 h-4" />
                        Email Educator
                      </a>

                      <button
                        onClick={() => handleCopyEmail(teacher.email)}
                        className="text-xs sm:text-sm text-[#6c8274] hover:text-white transition-colors break-all text-left"
                      >
                        {copiedEmail === teacher.email ? (
                          <span className="text-[#25D366] flex items-center gap-1 font-semibold">
                            <Check className="w-4 h-4" /> Copied Email
                          </span>
                        ) : (
                          teacher.email
                        )}
                      </button>
                    </div>

                    {/* Next Educator Navigation Link */}
                    {nextTeacher && (
                      <a
                        href={`#educator-${idx + 1}`}
                        className="group inline-flex items-center justify-between sm:justify-start gap-2 text-xs uppercase tracking-wider text-[#d4af37] hover:text-white transition-colors"
                      >
                        <span>Next: <strong>{nextTeacher.name}</strong></span>
                        <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                      </a>
                    )}

                  </div>

                </div>
              </section>
            );
          })}

        </main>
      )}

      {/* 5. Institutional Creed & Recruitment Callout */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 overflow-hidden">
        <div className="relative rounded-2xl sm:rounded-[3rem] p-6 sm:p-10 md:p-16 bg-gradient-to-br from-[#0a2b18] via-[#05140b] to-[#040f08] border border-[#d4af37]/30 text-center space-y-6 sm:space-y-8 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 relative z-10">
            <div className="w-10 h-10 rounded-full border border-[#d4af37]/40 flex items-center justify-center mx-auto text-[#d4af37]">
              <Sparkles className="w-5 h-5" />
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight break-words">
              A Lifelong Commitment to <span className="italic text-[#d4af37]">Pedagogical Excellence</span>.
            </h2>

            <p className="text-[#96ab9d] text-sm sm:text-base md:text-lg font-light leading-relaxed text-balance">
              Brotherhood Matriculation Higher Secondary School provides continuous faculty development, 
              Montessori training, and modern STEM refresher programs to empower our teachers as mentors 
              and architects of the next generation.
            </p>

            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/about/about-school"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#d4af37] text-[#05140b] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300 text-center"
              >
                Discover Our School Legacy
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white/[0.05] hover:bg-white/10 text-white border border-white/15 font-medium text-xs uppercase tracking-wider transition-all duration-300 text-center"
              >
                Contact Academic Office
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

// Editorial Monogram Component for Teachers Without Images
function EditorialMonogramCard({ name, subject, avatarBg }: { name: string; subject: string; avatarBg: string }) {
  const cleanName = name.replace(/^(Mr\.|Mrs\.|Miss|Dr\.|Rev\.|Fr\.)\s*/i, "").trim();
  const parts = cleanName.split(/\s+/).filter(Boolean);
  const initials = parts.length >= 2 
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    : (parts[0] ? parts[0].substring(0, 2).toUpperCase() : "BH");

  return (
    <div className={`w-full h-full bg-gradient-to-br ${avatarBg} relative flex flex-col items-center justify-center p-8 select-none overflow-hidden group`}>
      <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
      <div className="absolute w-44 h-44 rounded-full border border-[#d4af37]/20 border-dashed animate-[spin_40s_linear_infinite]" />
      <div className="absolute w-56 h-56 rounded-full border border-[#d4af37]/10" />

      <div className="relative z-10 w-24 h-24 rounded-full bg-[#05140b]/80 border-2 border-[#d4af37]/50 backdrop-blur-md flex items-center justify-center shadow-2xl group-hover:border-[#d4af37] transition-all duration-500 group-hover:scale-105">
        <span className="font-serif text-3xl font-bold text-[#d4af37] tracking-wider">
          {initials}
        </span>
      </div>

      <div className="relative z-10 text-center mt-6 space-y-1">
        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#d4af37]/90 block">
          Faculty Scholar
        </span>
        <span className="text-xs text-white/70 block font-light truncate max-w-[200px]">
          {name}
        </span>
      </div>
    </div>
  );
}
