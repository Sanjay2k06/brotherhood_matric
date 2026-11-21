import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Award, Users, Shield, RotateCw, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import aboutImage3 from "../../images/aboutimage3.jpg";
import { API_BASE } from "@/config";

export const Route = createFileRoute("/students/student-leaders")({
  head: () => ({
    meta: [
      { title: "Student Leadership & Council 2026–2027 — Brotherhood School" },
      {
        name: "description",
        content:
          "Meet the elected student leaders and pupil representatives of Brotherhood Matriculation Higher Secondary School for the academic year 2026–2027.",
      },
    ],
  }),
  component: StudentLeadersPage,
});

interface LeaderItem {
  role: string;
  name: string;
  grade: string;
  house?: string;
  duties?: string;
}

const PRIMARY_COUNCIL: LeaderItem[] = [
  {
    role: "Head Boy",
    name: "Immanual Jafferson.S",
    grade: "Std V",
    duties: "Leading the primary pupil body, coordinating morning assemblies, and representing junior student interests with faculty.",
  },
  {
    role: "Head Girl",
    name: "Inshika Shri.S",
    grade: "Std V",
    duties: "Guiding primary student initiatives, welcoming school guests, and maintaining classroom harmony and peer friendship.",
  },
  {
    role: "Sports Captain",
    name: "Harish.S",
    grade: "Std V",
    duties: "Coordinating junior sports meets, physical training drills, and promoting fair play and energetic sportsmanship.",
  },
  {
    role: "Sports Captain",
    name: "Yashika.D",
    grade: "Std V",
    duties: "Organizing primary athletic activities, track events, and motivating young athletes during inter-house games.",
  },
  {
    role: "Cultural Leader",
    name: "Keerthana.V",
    grade: "Std V",
    duties: "Directing primary cultural celebrations, storytelling sessions, music performances, and festival assemblies.",
  },
];

const PRIMARY_HOUSE_CAPTAINS: { house: string; color: string; badge: string; members: LeaderItem[] }[] = [
  {
    house: "Galilee House",
    color: "from-blue-600 to-indigo-800",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    members: [
      {
        role: "Captain",
        name: "Pratheesh.B",
        grade: "Std V",
        house: "Galilee House",
        duties: "Leading Galilee House in primary sports, quizzes, and discipline assemblies.",
      },
      {
        role: "Vice Captain",
        name: "Nivedha.N",
        grade: "Std V",
        house: "Galilee House",
        duties: "Assisting the House Captain in squad coordination and inter-house preparation.",
      },
    ],
  },
  {
    house: "Zion House",
    color: "from-amber-500 to-yellow-700",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    members: [
      {
        role: "Captain",
        name: "Jeshwanth.S",
        grade: "Std V",
        house: "Zion House",
        duties: "Directing Zion House members, fostering team spirit, and inspiring moral character.",
      },
      {
        role: "Vice Captain",
        name: "Jaclin Nibola.J",
        grade: "Std V",
        house: "Zion House",
        duties: "Managing house points allocation, sports lineups, and classroom cleanliness.",
      },
    ],
  },
  {
    house: "Judah House",
    color: "from-red-500 to-rose-800",
    badge: "bg-red-50 text-red-700 border-red-200",
    members: [
      {
        role: "Captain",
        name: "Praveen Sai.B",
        grade: "Std V",
        house: "Judah House",
        duties: "Inspiring courage and sporting determination in all Judah House competitions.",
      },
      {
        role: "Vice Captain",
        name: "Sree Dharshini.I",
        grade: "Std V",
        house: "Judah House",
        duties: "Coordinating relay squads, attendance, and encouraging participation in house events.",
      },
    ],
  },
  {
    house: "Bethel House",
    color: "from-emerald-600 to-teal-800",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    members: [
      {
        role: "Captain",
        name: "Jayakandhan.M.D",
        grade: "Std V",
        house: "Bethel House",
        duties: "Directing Bethel House environmental care, campus stewardship, and academic excellence.",
      },
      {
        role: "Vice Captain",
        name: "Danya Shree.R",
        grade: "Std V",
        house: "Bethel House",
        duties: "Supporting house members in creative arts, literary contests, and sports assemblies.",
      },
    ],
  },
];

const SENIOR_COUNCIL: LeaderItem[] = [
  {
    role: "Head Boy",
    name: "P. Kishore",
    grade: "XII - A",
    duties: "Chief student representative, managing the prefectorial board, coordinating school celebrations, and liaising directly with the Principal.",
  },
  {
    role: "Head Girl",
    name: "M. Akshaya",
    grade: "XII - C",
    duties: "Chief student leader presiding over student governance, mentorship circles, academic forums, and community outreach programs.",
  },
  {
    role: "Vice Head Boy",
    name: "B. Ashwanth",
    grade: "XII - A",
    duties: "Assisting the Head Boy in day-to-day discipline, morning assembly alignment, and committee oversight.",
  },
  {
    role: "Vice Head Girl",
    name: "A. Monisha",
    grade: "XII - B",
    duties: "Assisting the Head Girl in student council duties, cultural arrangements, and junior student welfare.",
  },
  {
    role: "Sport Secretary",
    name: "N. Divya Dharshini",
    grade: "XII - A",
    duties: "Directing the annual Sports Day, zonal athletic meets, inter-school tournaments, and campus physical fitness.",
  },
  {
    role: "Asst. Sport Secretary",
    name: "F. Calvin Mawia",
    grade: "XII - A",
    duties: "Supporting sports equipment management, ground organization, and scheduling inter-house leagues.",
  },
  {
    role: "Cultural Secretary",
    name: "R. Sripriya",
    grade: "XII - B",
    duties: "Leading the drama, dance, and music ensembles for Annual Day, Teachers' Day, and festive school galas.",
  },
  {
    role: "Literary Secretary",
    name: "P. Gayathri",
    grade: "XII - C",
    duties: "Coordinating school debating society, editorial club, elocution contests, and library symposiums.",
  },
];

const SENIOR_HOUSE_CAPTAINS: { house: string; color: string; badge: string; members: LeaderItem[] }[] = [
  {
    house: "St. Matthew House",
    color: "from-blue-600 to-indigo-800",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    members: [
      {
        role: "Captain",
        name: "G. Ajith Kumar",
        grade: "XII - B",
        house: "St. Matthew House",
        duties: "Leading St. Matthew House in high school athletic championships, debates, and points tally.",
      },
      {
        role: "Vice Captain",
        name: "D. Sairathi",
        grade: "XII - C",
        house: "St. Matthew House",
        duties: "Assisting the House Captain in organizing march-past contingents and quiz delegations.",
      },
    ],
  },
  {
    house: "St. Mark House",
    color: "from-red-500 to-rose-800",
    badge: "bg-red-50 text-red-700 border-red-200",
    members: [
      {
        role: "Captain",
        name: "R. Sree Hari",
        grade: "XII - A",
        house: "St. Mark House",
        duties: "Inspiring St. Mark House members to athletic supremacy and energetic participation in all campus meets.",
      },
      {
        role: "Vice Captain",
        name: "P. Akshaya",
        grade: "XII - B",
        house: "St. Mark House",
        duties: "Supporting the captain with senior sports squads, attendance verification, and house discipline.",
      },
    ],
  },
  {
    house: "St. Luke House",
    color: "from-emerald-600 to-teal-800",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    members: [
      {
        role: "Captain",
        name: "B. Jaya Prakash",
        grade: "XII - C",
        house: "St. Luke House",
        duties: "Commanding St. Luke House in science fairs, humanitarian service projects, and sports tournaments.",
      },
      {
        role: "Vice Captain",
        name: "B. Priya Dharshini",
        grade: "XII - A",
        house: "St. Luke House",
        duties: "Coordinating house literary entries, assembly presentations, and student sports coaching.",
      },
    ],
  },
  {
    house: "St. John House",
    color: "from-amber-500 to-yellow-700",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    members: [
      {
        role: "Captain",
        name: "G. Nithish Kumar",
        grade: "XII - C",
        house: "St. John House",
        duties: "Leading St. John House with dedication in academics, speech competitions, and athletic events.",
      },
      {
        role: "Vice Captain",
        name: "K. Soniya",
        grade: "XII - A",
        house: "St. John House",
        duties: "Managing house points tracking, sports cheer squads, and inter-house cultural showcases.",
      },
    ],
  },
];

const SENIOR_PREFECTS: LeaderItem[] = [
  {
    role: "Senior Student Prefect",
    name: "G. Vijay Vignesh",
    grade: "XII - A",
    duties: "Maintaining high school corridor order, monitoring morning arrivals, and ensuring student punctuality.",
  },
  {
    role: "Senior Student Prefect",
    name: "N. Raju Yogi",
    grade: "XII - B",
    duties: "Assisting during campus break periods, library study hours, and maintaining assembly line discipline.",
  },
  {
    role: "Senior Student Prefect",
    name: "R. Sathya Priya",
    grade: "XII - B",
    duties: "Supporting campus cleanliness, monitoring canteen areas, and helping junior students with campus guidance.",
  },
  {
    role: "Senior Student Prefect",
    name: "S. Karnika",
    grade: "XII - B",
    duties: "Assisting school events management, visitor guidance during parent-teacher meetings, and lab discipline.",
  },
];

function FlipLeaderCard({
  leader,
  idx,
  accent = "#d4af37",
}: {
  leader: LeaderItem;
  idx: number;
  accent?: string;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Extract initial for avatar
  const initial = leader.name.charAt(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: (idx % 4) * 0.08 }}
      className="relative w-full h-[290px] cursor-pointer perspective-[1000px] select-none group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front Side (Light & Prestigious) */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-white border border-[#e2e8f0] border-t-[5px] border-t-[#d4af37] rounded-3xl p-6 flex flex-col justify-between items-center text-center shadow-sm group-hover:shadow-xl group-hover:border-[#d4af37]/60 group-hover:-translate-y-1 transition-all duration-300 overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4af37]/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Top Initial Avatar */}
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0a2b18] to-[#1b4d32] border-2 border-[#d4af37]/50 flex items-center justify-center text-[#d4af37] shadow-md group-hover:scale-105 group-hover:border-[#d4af37] transition-all duration-300">
            <span className="font-serif font-bold text-lg">{initial}</span>
          </div>

          {/* Content: Role, Bold Name, Italic Class */}
          <div className="space-y-1.5 w-full">
            <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-bold">
              {leader.role}
            </span>
            <h3 className="font-serif font-bold text-xl text-[#0a2b18] leading-tight">
              {leader.name}
            </h3>
            <p className="italic font-medium text-xs text-[#526a5c]">
              Class {leader.grade}
            </p>
            {leader.house && (
              <span className="inline-block text-[11px] font-semibold text-[#1b4d32] bg-[#f0f6f2] px-2.5 py-0.5 rounded-full border border-[#d2e2d7] mt-1">
                {leader.house}
              </span>
            )}
          </div>

          {/* Flip Hint */}
          <div className="pt-2 border-t border-[#f0f4f1] w-full flex items-center justify-center gap-1.5 text-[11px] text-[#7a8c80] group-hover:text-[#1b4d32] transition-colors">
            <RotateCw className="w-3 h-3 text-[#d4af37] group-hover:rotate-180 transition-transform duration-500" />
            <span className="italic font-medium">Click to view duties</span>
          </div>
        </div>

        {/* Back Side (Deep Emerald & Gold) */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#05140b] rounded-3xl p-6 flex flex-col justify-between items-center text-center shadow-2xl border-2 border-[#d4af37]/40 overflow-hidden">
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#d4af37] rounded-full blur-[60px] opacity-[0.2] pointer-events-none"></div>

          <div className="flex items-center gap-2 pt-1 text-[#d4af37]">
            <Award className="w-5 h-5" />
            <span className="text-[10px] uppercase tracking-widest font-bold">
              Leadership Responsibilities
            </span>
          </div>

          <div className="space-y-2 py-2">
            <h4 className="font-serif font-bold text-base text-[#f3eed9]">
              {leader.name}
            </h4>
            <p className="text-white/90 font-light leading-relaxed text-xs italic px-2">
              &ldquo;{leader.duties}&rdquo;
            </p>
          </div>

          <div className="pt-2 border-t border-white/10 w-full flex items-center justify-center gap-1.5 text-[10px] text-[#d4af37]">
            <RotateCw className="w-3 h-3" />
            <span className="italic">Click to flip back</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function StudentLeadersPage() {
  const [activeTab, setActiveTab] = useState<"all" | "primary" | "senior">("all");
  const [apiLeaders, setApiLeaders] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/student-leaders/`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setApiLeaders(data);
        }
      })
      .catch(() => {});
  }, []);

  // Filter out any leaders that are already in the static lists so we don't duplicate them
  const knownNames = new Set<string>([
    ...PRIMARY_COUNCIL.map((l) => l.name.toLowerCase().trim()),
    ...PRIMARY_HOUSE_CAPTAINS.flatMap((h) => h.members.map((m) => m.name.toLowerCase().trim())),
    ...SENIOR_COUNCIL.map((l) => l.name.toLowerCase().trim()),
    ...SENIOR_HOUSE_CAPTAINS.flatMap((h) => h.members.map((m) => m.name.toLowerCase().trim())),
    ...SENIOR_PREFECTS.map((l) => l.name.toLowerCase().trim()),
  ]);

  const customLeaders = apiLeaders.filter(
    (l) => l.name && !knownNames.has(l.name.toLowerCase().trim())
  );

  return (
    <div className="bg-[#fcfdfa] text-[#1c2e24] min-h-screen">
      {/* 1. Hero Header */}
      <PageHeader
        eyebrow="Student Governance"
        title="Student Leadership & Council 2026–2027"
        subtitle="Our Student Council provides opportunities for students to develop leadership, teamwork, responsibility and confidence. Student leaders play an important role in representing their fellow students and contributing to the academic, cultural and sporting activities of the school."
      />

      {/* 2. Institutional Introduction */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white border-b border-[#e2e8f0] relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center justify-center gap-3">
            <div className="w-8 sm:w-12 h-[1px] bg-[#d4af37]"></div>
            <span className="text-[#d4af37] uppercase tracking-[0.2em] text-[11px] sm:text-xs font-bold">
              Investiture & Student Leadership Roster
            </span>
            <div className="w-8 sm:w-12 h-[1px] bg-[#d4af37]"></div>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0a2b18] font-normal">
            Student Leadership & <span className="italic text-[#1b4d32]">Council 2026–2027</span>
          </h1>

          <p className="text-[#55695d] font-light text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Our Student Council provides opportunities for students to develop leadership, teamwork, responsibility and confidence. Student leaders play an important role in representing their fellow students and contributing to the academic, cultural and sporting activities of the school.
          </p>

          {/* Filter Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === "all"
                  ? "bg-[#1b4d32] text-white shadow-md"
                  : "bg-[#f4f7f5] text-[#55695d] hover:bg-[#e6ece8]"
              }`}
            >
              All Wings (29 Leaders)
            </button>
            <button
              onClick={() => setActiveTab("primary")}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === "primary"
                  ? "bg-[#1b4d32] text-white shadow-md"
                  : "bg-[#f4f7f5] text-[#55695d] hover:bg-[#e6ece8]"
              }`}
            >
              Primary Wing (13 Leaders)
            </button>
            <button
              onClick={() => setActiveTab("senior")}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === "senior"
                  ? "bg-[#1b4d32] text-white shadow-md"
                  : "bg-[#f4f7f5] text-[#55695d] hover:bg-[#e6ece8]"
              }`}
            >
              Senior Wing (20 Leaders)
            </button>
          </div>
        </div>
      </section>

      {/* 3. Main Leaders Roster */}
      <main className="py-14 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-16 max-w-7xl mx-auto space-y-20">
        {/* ================= PRIMARY WING ================= */}
        {(activeTab === "all" || activeTab === "primary") && (
          <div className="space-y-16">
            {/* Primary Student Council */}
            <section className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-[#1b4d32]/15 gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1b4d32] to-[#0a2b18] text-[#d4af37] flex items-center justify-center shadow-sm">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#0a2b18] font-bold">
                      Primary Student Council
                    </h2>
                    <span className="text-xs uppercase tracking-wider text-[#6c8274] font-medium">
                      Executive Pupil Leadership • Classes I – V
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#f0f6f2] text-[#1b4d32] border border-[#d2e2d7] self-start sm:self-auto">
                  5 Council Members
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                {PRIMARY_COUNCIL.map((leader, idx) => (
                  <FlipLeaderCard key={leader.name + leader.role} leader={leader} idx={idx} />
                ))}
              </div>
            </section>

            {/* Primary House Captains */}
            <section className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-[#1b4d32]/15 gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1b4d32] to-[#0a2b18] text-[#d4af37] flex items-center justify-center shadow-sm">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#0a2b18] font-bold">
                      Primary House Captains
                    </h2>
                    <span className="text-xs uppercase tracking-wider text-[#6c8274] font-medium">
                      Galilee • Zion • Judah • Bethel
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#f0f6f2] text-[#1b4d32] border border-[#d2e2d7] self-start sm:self-auto">
                  8 House Leaders
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {PRIMARY_HOUSE_CAPTAINS.map((houseGroup) => (
                  <div
                    key={houseGroup.house}
                    className="bg-white rounded-3xl border border-[#e2e8f0] p-5 shadow-sm space-y-4"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[#f0f4f1]">
                      <h3 className="font-serif font-bold text-lg text-[#0a2b18]">
                        {houseGroup.house}
                      </h3>
                      <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${houseGroup.badge}`}>
                        Primary
                      </span>
                    </div>

                    <div className="space-y-4">
                      {houseGroup.members.map((member, idx) => (
                        <FlipLeaderCard key={member.name} leader={member} idx={idx} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ================= SENIOR WING ================= */}
        {(activeTab === "all" || activeTab === "senior") && (
          <div className="space-y-16">
            {/* Senior Student Council */}
            <section className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-[#1b4d32]/15 gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1b4d32] to-[#0a2b18] text-[#d4af37] flex items-center justify-center shadow-sm">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#0a2b18] font-bold">
                      Senior Student Council
                    </h2>
                    <span className="text-xs uppercase tracking-wider text-[#6c8274] font-medium">
                      Higher Secondary Executive Council • Classes XI – XII
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#f0f6f2] text-[#1b4d32] border border-[#d2e2d7] self-start sm:self-auto">
                  8 Council Secretaries
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {SENIOR_COUNCIL.map((leader, idx) => (
                  <FlipLeaderCard key={leader.name + leader.role} leader={leader} idx={idx} />
                ))}
              </div>
            </section>

            {/* Senior House Captains */}
            <section className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-[#1b4d32]/15 gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1b4d32] to-[#0a2b18] text-[#d4af37] flex items-center justify-center shadow-sm">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#0a2b18] font-bold">
                      Senior House Captains
                    </h2>
                    <span className="text-xs uppercase tracking-wider text-[#6c8274] font-medium">
                      St. Matthew • St. Mark • St. Luke • St. John
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#f0f6f2] text-[#1b4d32] border border-[#d2e2d7] self-start sm:self-auto">
                  8 Senior Captains
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {SENIOR_HOUSE_CAPTAINS.map((houseGroup) => (
                  <div
                    key={houseGroup.house}
                    className="bg-white rounded-3xl border border-[#e2e8f0] p-5 shadow-sm space-y-4"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[#f0f4f1]">
                      <h3 className="font-serif font-bold text-lg text-[#0a2b18]">
                        {houseGroup.house}
                      </h3>
                      <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${houseGroup.badge}`}>
                        Senior
                      </span>
                    </div>

                    <div className="space-y-4">
                      {houseGroup.members.map((member, idx) => (
                        <FlipLeaderCard key={member.name} leader={member} idx={idx} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Senior Student Prefects */}
            <section className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-[#1b4d32]/15 gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1b4d32] to-[#0a2b18] text-[#d4af37] flex items-center justify-center shadow-sm">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#0a2b18] font-bold">
                      Senior Student Prefects
                    </h2>
                    <span className="text-xs uppercase tracking-wider text-[#6c8274] font-medium">
                      Discipline, Assembly & Campus Ambassadors
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#f0f6f2] text-[#1b4d32] border border-[#d2e2d7] self-start sm:self-auto">
                  4 Prefects
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {SENIOR_PREFECTS.map((leader, idx) => (
                  <FlipLeaderCard key={leader.name} leader={leader} idx={idx} />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Appointed Council Representatives (Dynamically populated from Admin) */}
        {customLeaders.length > 0 && (
          <section className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-[#1b4d32]/15 gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1b4d32] to-[#0a2b18] text-[#d4af37] flex items-center justify-center shadow-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#0a2b18] font-bold">
                    Appointed Council Representatives
                  </h2>
                  <span className="text-xs uppercase tracking-wider text-[#6c8274] font-medium">
                    Additional Student Leaders &amp; Prefects
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#f0f6f2] text-[#1b4d32] border border-[#d2e2d7] self-start sm:self-auto">
                {customLeaders.length} Appointed Leaders
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {customLeaders.map((leader, idx) => (
                <FlipLeaderCard
                  key={leader.id || leader.name}
                  leader={{
                    role: leader.role || "Council Leader",
                    name: leader.name,
                    grade: leader.grade || "Brotherhood",
                    duties:
                      leader.duties ||
                      "Representing student interests, organizing school events, and upholding leadership excellence.",
                  }}
                  idx={idx}
                />
              ))}
            </div>
          </section>
        )}

        {/* Leadership Responsibilities Institutional Banner */}
        <div className="grid md:grid-cols-12 gap-8 items-center bg-gradient-to-br from-white to-[#f7faf8] border border-[#e2e8f0] rounded-[2.5rem] p-8 sm:p-12 shadow-sm">
          <div className="md:col-span-7 space-y-4 text-[#55695d] text-sm sm:text-base leading-relaxed">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#0a2b18] font-bold">
              Leadership Responsibilities & Code of Honor
            </h3>
            <p>
              The Student Council serves as the liaison between the school administration, faculty, and student body. Student leaders play an important role in representing their fellow students and contributing to the academic, cultural and sporting activities of the school.
            </p>
            <p>
              Leaders maintain school discipline during morning assemblies, coordinate house events, organize inter-school festivals, and champion eco-friendly policies across the Brotherhood campus.
            </p>
          </div>

          <div className="md:col-span-5 rounded-2xl overflow-hidden shadow-lg border border-[#e2e8f0]">
            <img
              src={aboutImage3}
              alt="School Student Leaders Assembly"
              className="w-full h-[260px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
