import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { motion } from "motion/react";
import { API_BASE } from "@/config";
import { getMergedTeachers } from "@/lib/teachersData";
import {
  GraduationCap,
  BookOpen,
  Calculator,
  Dna,
  Atom,
  FlaskConical,
  TrendingUp,
  Landmark,
  Languages,
  Activity,
  Palette,
  Sparkles,
  Binary,
  Search,
  CheckCircle2
} from "lucide-react";

export const Route = createFileRoute("/teachers")({
  head: () => ({
    meta: [
      { title: "Our Teaching Faculty — Brotherhood School" },
      {
        name: "description",
        content:
          "Our dedicated team of educators brings together academic excellence, subject expertise and a passion for nurturing young minds at Brotherhood Matriculation Higher Secondary School.",
      },
    ],
  }),
  component: TeachersPage,
});

interface FacultyMember {
  name: string;
  qualification?: string;
}

interface Department {
  id: string;
  name: string;
  category: "Core Academics" | "Sciences" | "Humanities & Commerce" | "Languages" | "Co-Curricular & Early Years";
  icon: any;
  faculty: FacultyMember[];
}

const DEPARTMENTS: Department[] = [
  {
    id: "mathematics",
    name: "Department of Mathematics",
    category: "Core Academics",
    icon: Calculator,
    faculty: [
      { name: "Mr. T. Rajkumar Sam Kingsley", qualification: "M.Sc., M.Phil., B.Ed." },
      { name: "Mr. R. Loganathan", qualification: "M.Sc., B.Ed." },
      { name: "Mrs. C. Bhuvaneswari", qualification: "B.Sc., B.Ed." },
      { name: "Mrs. Nanthini", qualification: "M.Sc., B.Ed." },
      { name: "Mrs. F.L. Ancy Niruba", qualification: "M.Sc., B.Ed." },
      { name: "Mrs. S. Vaishnupriya", qualification: "B.Sc., M.Ed." },
    ],
  },
  {
    id: "biology",
    name: "Department of Biology",
    category: "Sciences",
    icon: Dna,
    faculty: [
      { name: "Mrs. S. Prabha Leethiyal", qualification: "M.Sc., B.Ed." },
      { name: "Mrs. M. Shakila Banu", qualification: "M.Sc., B.Ed." },
    ],
  },
  {
    id: "physics",
    name: "Department of Physics",
    category: "Sciences",
    icon: Atom,
    faculty: [
      { name: "Mrs. Helen Johnson", qualification: "B.Sc., M.A., B.Ed." },
      { name: "Mrs. K. Bhuvaneswari", qualification: "M.Sc., M.Phil., B.Ed." },
    ],
  },
  {
    id: "chemistry",
    name: "Department of Chemistry",
    category: "Sciences",
    icon: FlaskConical,
    faculty: [
      { name: "Ms. S. Solomon Devadoss", qualification: "M.Sc., B.Ed." },
      { name: "Mrs. S. Rajathi", qualification: "B.Sc., B.Ed." },
    ],
  },
  {
    id: "economics",
    name: "Department of Economics",
    category: "Humanities & Commerce",
    icon: TrendingUp,
    faculty: [
      { name: "Mrs. K. Vimala", qualification: "M.A., B.Ed." },
    ],
  },
  {
    id: "commerce",
    name: "Department of Commerce & Accountancy",
    category: "Humanities & Commerce",
    icon: Landmark,
    faculty: [
      { name: "Mrs. M. Kalaiselvi Latha Muthu", qualification: "M.Com., B.Ed." },
    ],
  },
  {
    id: "computer-science",
    name: "Department of Computer Science",
    category: "Core Academics",
    icon: Binary,
    faculty: [
      { name: "Mrs. J. Latha", qualification: "M.C.A., B.Ed." },
      { name: "Mrs. Thenmozhi", qualification: "M.Sc., B.Ed." },
    ],
  },
  {
    id: "history",
    name: "Department of History",
    category: "Humanities & Commerce",
    icon: BookOpen,
    faculty: [
      { name: "Mr. M. Sridhar", qualification: "M.A., B.Ed." },
      { name: "Mrs. Sudha", qualification: "M.A., B.Ed." },
    ],
  },
  {
    id: "hindi",
    name: "Department of Hindi",
    category: "Languages",
    icon: Languages,
    faculty: [
      { name: "Mrs. T.S. Maheshwari", qualification: "M.Com., B.Ed." },
    ],
  },
  {
    id: "physical-education",
    name: "Department of Physical Education",
    category: "Co-Curricular & Early Years",
    icon: Activity,
    faculty: [
      { name: "Mrs. Ranganayagi", qualification: "B.Sc., M.P.Ed." },
    ],
  },
  {
    id: "art",
    name: "Department of Art",
    category: "Co-Curricular & Early Years",
    icon: Palette,
    faculty: [
      { name: "Mr. Kulandaivelu" },
    ],
  },
  {
    id: "french",
    name: "Department of French",
    category: "Languages",
    icon: Languages,
    faculty: [
      { name: "Mrs. Shima Newton", qualification: "M.A., B.Ed., DELF B1" },
    ],
  },
  {
    id: "kindergarten",
    name: "Kindergarten Department",
    category: "Co-Curricular & Early Years",
    icon: Sparkles,
    faculty: [
      { name: "Mrs. Saranya", qualification: "Montessori Trained" },
    ],
  },
];

interface DeptMeta {
  id: string;
  name: string;
  category: "Core Academics" | "Sciences" | "Humanities & Commerce" | "Languages" | "Co-Curricular & Early Years";
  icon: any;
  order: number;
}

const KNOWN_DEPARTMENTS: Record<string, DeptMeta> = {
  "administration": { id: "administration", name: "School Leadership & Administration", category: "Core Academics", icon: GraduationCap, order: 0 },
  "mathematics": { id: "mathematics", name: "Department of Mathematics", category: "Core Academics", icon: Calculator, order: 1 },
  "physics": { id: "physics", name: "Department of Physics", category: "Sciences", icon: Atom, order: 2 },
  "chemistry": { id: "chemistry", name: "Department of Chemistry", category: "Sciences", icon: FlaskConical, order: 3 },
  "biology": { id: "biology", name: "Department of Biology", category: "Sciences", icon: Dna, order: 4 },
  "computer science": { id: "computer-science", name: "Department of Computer Science", category: "Core Academics", icon: Binary, order: 5 },
  "english": { id: "english", name: "Department of English", category: "Languages", icon: BookOpen, order: 6 },
  "tamil": { id: "tamil", name: "Department of Tamil", category: "Languages", icon: Languages, order: 7 },
  "economics": { id: "economics", name: "Department of Economics", category: "Humanities & Commerce", icon: TrendingUp, order: 8 },
  "commerce": { id: "commerce", name: "Department of Commerce & Accountancy", category: "Humanities & Commerce", icon: Landmark, order: 9 },
  "history": { id: "history", name: "Department of History", category: "Humanities & Commerce", icon: BookOpen, order: 10 },
  "hindi": { id: "hindi", name: "Department of Hindi", category: "Languages", icon: Languages, order: 11 },
  "french": { id: "french", name: "Department of French", category: "Languages", icon: Languages, order: 12 },
  "physical education": { id: "physical-education", name: "Department of Physical Education", category: "Co-Curricular & Early Years", icon: Activity, order: 13 },
  "art": { id: "art", name: "Department of Art", category: "Co-Curricular & Early Years", icon: Palette, order: 14 },
  "kindergarten": { id: "kindergarten", name: "Kindergarten Department", category: "Co-Curricular & Early Years", icon: Sparkles, order: 15 },
};

function getDepartmentMeta(subject: string): DeptMeta {
  const s = (subject || "").toLowerCase().trim();
  if (KNOWN_DEPARTMENTS[s]) return KNOWN_DEPARTMENTS[s];
  for (const [key, meta] of Object.entries(KNOWN_DEPARTMENTS)) {
    if (s.includes(key) || key.includes(s)) return meta;
  }
  const slug = s ? s.replace(/[^a-z0-9]+/g, "-") : "general";
  return {
    id: slug,
    name: subject ? `Department of ${subject}` : "General Faculty",
    category: "Core Academics",
    icon: BookOpen,
    order: 50
  };
}

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [dbTeachers, setDbTeachers] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/teachers/`)
      .then(res => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then(data => {
        const list = Array.isArray(data) ? data : (data.results || []);
        if (list.length > 0) {
          setDbTeachers(list);
        }
      })
      .catch(err => {
        console.error("Error fetching teachers from backend:", err);
      });
  }, []);

  // Dynamically group all teachers (defaults + edits + API) into departments
  const mergedTeachers = useMemo(() => getMergedTeachers(dbTeachers), [dbTeachers]);

  const activeDepartments: Department[] = useMemo(() => {
    const deptMap = new Map<string, { meta: DeptMeta; faculty: FacultyMember[] }>();

    // Group each teacher into their respective department
    mergedTeachers.forEach((t: any) => {
      const meta = getDepartmentMeta(t.subject || "General");
      if (!deptMap.has(meta.id)) {
        deptMap.set(meta.id, { meta, faculty: [] });
      }
      deptMap.get(meta.id)!.faculty.push({
        name: t.name,
        qualification: t.qualification || undefined
      });
    });

    const list: Department[] = [];
    deptMap.forEach(({ meta, faculty }) => {
      if (faculty.length > 0) {
        list.push({
          id: meta.id,
          name: meta.name,
          category: meta.category,
          icon: meta.icon,
          faculty
        });
      }
    });

    // Sort departments by designated order
    list.sort((a, b) => {
      const orderA = KNOWN_DEPARTMENTS[a.id.replace(/-/g, " ")]?.order ?? 99;
      const orderB = KNOWN_DEPARTMENTS[b.id.replace(/-/g, " ")]?.order ?? 99;
      return orderA - orderB;
    });

    return list.length > 0 ? list : DEPARTMENTS;
  }, [mergedTeachers]);

  const totalTeachers = useMemo(() => {
    return activeDepartments.reduce((acc, dept) => acc + dept.faculty.length, 0);
  }, [activeDepartments]);

  const filteredDepartments = useMemo(() => {
    return activeDepartments.map((dept) => {
      const matchesDept = selectedDept === "all" || dept.id === selectedDept;
      if (!matchesDept) return null;

      const filteredFaculty = dept.faculty.filter((member) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          member.name.toLowerCase().includes(q) ||
          (member.qualification && member.qualification.toLowerCase().includes(q)) ||
          dept.name.toLowerCase().includes(q)
        );
      });

      if (searchQuery.trim() && filteredFaculty.length === 0) {
        return null;
      }

      return {
        ...dept,
        faculty: searchQuery.trim() ? filteredFaculty : dept.faculty,
      };
    }).filter(Boolean) as Department[];
  }, [searchQuery, selectedDept, activeDepartments]);

  return (
    <div className="bg-[#fcfdfa] text-[#1c2e24] min-h-screen">
      {/* 1. Hero Page Header */}
      <PageHeader
        eyebrow="Academic Excellence"
        title="Our Teaching Faculty"
        subtitle="Our dedicated team of educators brings together academic excellence, subject expertise and a passion for nurturing young minds. Each department is supported by qualified and experienced teachers committed to providing quality education and guiding students towards a successful future."
      />

      {/* 2. Institutional Title & Introduction Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white border-b border-[#e2e8f0] relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="space-y-4"
          >
            <div className="inline-flex items-center justify-center gap-3">
              <div className="w-8 sm:w-12 h-[1px] bg-[#d4af37]"></div>
              <span className="text-[#d4af37] uppercase tracking-[0.2em] text-[11px] sm:text-xs font-bold">
                Faculty Roster • {totalTeachers} Qualified Educators
              </span>
              <div className="w-8 sm:w-12 h-[1px] bg-[#d4af37]"></div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0a2b18] font-normal tracking-tight">
              Our Teaching <span className="italic text-[#1b4d32]">Faculty</span>
            </h1>

            <p className="text-[#55695d] font-light text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              Our dedicated team of educators brings together academic excellence, subject expertise and a passion for nurturing young minds. Each department is supported by qualified and experienced teachers committed to providing quality education and guiding students towards a successful future.
            </p>
          </motion.div>

          {/* Search & Department Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="pt-6 max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 items-center justify-center"
          >
            <div className="relative w-full">
              <Search className="w-4 h-4 text-[#8a9e91] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search teacher by name, degree, or subject..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#d6ded8] bg-[#f7faf8] text-sm text-[#0a2b18] placeholder:text-[#8a9e91] focus:outline-none focus:ring-2 focus:ring-[#1b4d32]/20 focus:border-[#1b4d32] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#8a9e91] hover:text-[#0a2b18]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Department Select dropdown for mobile / quick jump */}
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-full border border-[#d6ded8] bg-[#f7faf8] text-sm text-[#0a2b18] focus:outline-none focus:ring-2 focus:ring-[#1b4d32]/20 focus:border-[#1b4d32] transition-all"
            >
              <option value="all">All Departments ({DEPARTMENTS.length})</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name} ({dept.faculty.length})
                </option>
              ))}
            </select>
          </motion.div>
        </div>
      </section>

      {/* 3. Departmental Grid with Compact Cards & Scroll Reveal Animation */}
      <main className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 lg:px-16 max-w-7xl mx-auto">
        {filteredDepartments.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <GraduationCap className="w-12 h-12 text-[#a8b8ae] mx-auto" />
            <h3 className="font-serif text-xl text-[#0a2b18]">No educators found</h3>
            <p className="text-sm text-[#6c8274]">
              No teachers match &quot;{searchQuery}&quot;. Try clearing your search query.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedDept("all");
              }}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#1b4d32] text-white hover:bg-[#0a2b18] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-12 sm:space-y-16">
            {filteredDepartments.map((dept, deptIdx) => {
              const IconComponent = dept.icon;
              return (
                <section
                  key={dept.id}
                  id={dept.id}
                  className="space-y-6 scroll-mt-24"
                >
                  {/* Department Section Header with Reveal Animation */}
                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.45 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-[#1b4d32]/15 gap-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1b4d32] to-[#0a2b18] text-[#d4af37] flex items-center justify-center shadow-sm shrink-0">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="font-serif text-xl sm:text-2xl text-[#0a2b18] font-bold">
                          {dept.name}
                        </h2>
                        <span className="text-xs uppercase tracking-wider text-[#6c8274] font-medium">
                          {dept.faculty.length} {dept.faculty.length === 1 ? "Educator" : "Educators"}
                        </span>
                      </div>
                    </div>

                    <span className="inline-flex items-center text-xs font-medium px-3 py-1 rounded-full bg-[#f4f7f5] text-[#1b4d32] border border-[#e2e8f0] self-start sm:self-auto">
                      {dept.category}
                    </span>
                  </motion.div>

                  {/* Compact Faculty Cards Grid with Scroll Reveal Animation - NO Photo Holders */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {dept.faculty.map((member, memberIdx) => (
                      <motion.div
                        key={member.name}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-30px" }}
                        transition={{
                          duration: 0.4,
                          delay: (memberIdx % 3) * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="group bg-white rounded-xl border border-[#e2e8f0] p-5 shadow-sm hover:shadow-md hover:border-[#d4af37]/60 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
                      >
                        {/* Top decorative accent bar on hover */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1b4d32] via-[#d4af37] to-[#1b4d32] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="space-y-2.5">
                          {/* Teacher Name */}
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-serif text-base sm:text-lg text-[#0a2b18] font-bold leading-snug group-hover:text-[#1b4d32] transition-colors">
                              {member.name}
                            </h3>
                            <CheckCircle2 className="w-4 h-4 text-[#1b4d32]/30 group-hover:text-[#1b4d32] shrink-0 mt-0.5 transition-colors" />
                          </div>

                          {/* Qualifications Tag (if present) */}
                          {member.qualification ? (
                            <div className="pt-1">
                              <span className="inline-block text-xs font-medium text-[#1b4d32] bg-[#f0f6f2] border border-[#d2e2d7] px-2.5 py-1 rounded-md tracking-tight">
                                {member.qualification}
                              </span>
                            </div>
                          ) : (
                            <div className="pt-1">
                              <span className="inline-block text-xs font-medium text-[#7a8a80] bg-[#f7faf8] border border-[#e6ece8] px-2.5 py-1 rounded-md">
                                Faculty Member
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Subtle Department Footnote */}
                        <div className="pt-4 mt-3 border-t border-[#f0f4f1] flex items-center justify-between text-[11px] text-[#7a8c80]">
                          <span className="truncate">{dept.name}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/60 group-hover:bg-[#d4af37] transition-colors shrink-0 ml-2"></span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>

      {/* 4. Educational Philosophy Callout Banner */}
      <section className="bg-gradient-to-br from-[#0a2b18] via-[#123820] to-[#0a2b18] text-white py-14 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center mx-auto text-[#d4af37]">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#f3eed9] font-normal">
            Commitment to Teaching Excellence
          </h3>
          <p className="text-[#c1d4c8] text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Our faculty undergoes continuous academic enhancement and subject pedagogy programs, ensuring that students at Brotherhood Matriculation Higher Secondary School receive standard-setting instruction rooted in timeless values.
          </p>
        </div>
      </section>
    </div>
  );
}
