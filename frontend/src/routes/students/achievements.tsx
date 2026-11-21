import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Award, BookOpen, Star, Trophy, Target, Sparkles, CheckCircle2 } from "lucide-react";
import resultImg from "../../images/result.jpg";
import { useState, useEffect } from "react";
import { API_BASE } from "@/config";
import { motion } from "motion/react";

export const Route = createFileRoute("/students/achievements")({
  head: () => ({
    meta: [
      { title: "Results & Achievements — Brotherhood School" },
      {
        name: "description",
        content:
          "Board exam toppers, state rankings, sports trophies, and co-curricular achievements of Brotherhood Matriculation Higher Secondary School.",
      },
    ],
  }),
  component: StudentAchievementsPage,
});

function StudentAchievementsPage() {
  const [boardToppers, setBoardToppers] = useState<any[]>([]);
  const [sportsWins, setSportsWins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultToppers = [
    // Senior Secondary Wing Toppers
    { rank: "School Topper", name: "Master Kishore P.", score: "594 / 600", stream: "Class XII - A" },
    { rank: "School 2nd Rank", name: "Miss Akshaya M.", score: "595 / 600", stream: "Class XII - C" },
    { rank: "School 3rd Rank", name: "Miss Dhivya Dharshini N.", score: "592 / 600", stream: "Class XII - A" },
    { rank: "Commerce Topper", name: "Miss Sripriya R.", score: "589 / 600", stream: "Class XII - B" },
    { rank: "Science Topper", name: "Miss Gayathri P.", score: "588 / 600", stream: "Class XII - C" },
    { rank: "Maths Distinction", name: "Master Ashwanth B.", score: "585 / 600", stream: "Class XII - B" },

    // Primary Wing Toppers
    { rank: "Primary Centum", name: "Master Harish S.", score: "99% Marks", stream: "Class III" },
    { rank: "Primary Topper", name: "Miss Nivetha K.", score: "99.1% Marks", stream: "Class V" },
    { rank: "Primary Star", name: "Miss Pooja S.", score: "98.5% Marks", stream: "Class I" },
  ];

  const defaultSports = [
    {
      title: "Zonal Athletic Meet (Track & Field)",
      award: "Overall Champions Trophy",
      category: "Senior Boys & Girls Relay",
    },
    {
      title: "District Inter-School Football Championship",
      award: "Gold Medal & Winner Trophy",
      category: "Under-17 Secondary Team",
    },
    {
      title: "State Level Chess Olympiad",
      award: "First Prize & Grand Trophy",
      category: "Individual Senior Division",
    },
  ];

  useEffect(() => {
    fetch(`${API_BASE}/student-achievements/`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.results || [];
        const toppers: any[] = [];
        const sports: any[] = [];

        list.forEach((item: any) => {
          if (item.title.toLowerCase().includes("best student")) {
            return;
          }
          const isBoard =
            item.title.toLowerCase().includes("rank") ||
            item.title.toLowerCase().includes("topper") ||
            item.title.toLowerCase().includes("centum") ||
            item.title.toLowerCase().includes("board") ||
            item.description.toLowerCase().includes("score") ||
            item.description.toLowerCase().includes("marks") ||
            item.description.includes("/ 600") ||
            item.description.includes("100/");

          if (isBoard) {
            const parts = item.title.split(" - ");
            const rank = parts[0] || "Topper";
            const nameWithGrade = parts[1] || "";
            const nameParts = nameWithGrade.split(" (");
            const name = nameParts[0] || item.title;
            const grade = nameParts[1] ? nameParts[1].replace(")", "") : "";

            toppers.push({
              rank,
              name,
              score: item.description.length < 25 ? item.description : "Distinction",
              stream: grade || "Class X/XII",
            });
          } else {
            const parts = item.title.split(" - ");
            const title = parts[0] || item.title;
            const award = parts[1] ? parts[1].split(" (")[0] : "Achievement Award";
            const category = item.description;

            sports.push({
              title,
              award,
              category,
            });
          }
        });

        setBoardToppers(toppers.length > 0 ? toppers : defaultToppers);
        setSportsWins(sports.length > 0 ? sports : defaultSports);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching achievements:", err);
        setBoardToppers(defaultToppers);
        setSportsWins(defaultSports);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <PageHeader
        eyebrow="School Ranks & Trophies"
        title="Results & Achievements"
        subtitle="Celebrating standard-setting board exam outcomes, subject centums, and zonal athletic championships."
      />

      {/* 2. White Background Main Content Section */}
      <main className="bg-white text-[#0a2b18] py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-16 max-w-7xl mx-auto space-y-20">
        {/* Results Banner & Institutional Record */}
        <section className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center bg-white border border-[#e2e8f0] rounded-[2.5rem] p-8 sm:p-12 shadow-sm">
          <div className="lg:col-span-7 space-y-6">

            <h2 className="font-serif text-3xl sm:text-4xl text-[#0a2b18] font-bold leading-tight">
              A Proud Tradition of <span className="italic text-[#1b4d32]">100% Board Pass Rate</span>
            </h2>

            <div className="space-y-4 text-[#55695d] text-sm sm:text-base leading-relaxed font-light">
              <p>
                Brotherhood Matriculation Higher Secondary School has maintained an unbroken record of a 100% pass rate in the Tamil Nadu State Board Examinations for both Class X and Class XII. Over 85% of our candidates secure distinction marks, entering leading technical, commerce, and medical universities across India.
              </p>
              <p>
                In addition to state board standards, our students regularly achieve premier positions in inter-school science symposiums, fine arts competitions, and district debates.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f4f7f5] border border-[#e2e8f0] text-[#1b4d32]">
                <CheckCircle2 className="w-4 h-4 text-[#1b4d32]" />
                100% State Board Pass Rate
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f4f7f5] border border-[#e2e8f0] text-[#1b4d32]">
                <Star className="w-4 h-4 text-[#d4af37]" />
                Over 85% First Class Distinctions
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative group rounded-3xl overflow-hidden shadow-xl border-2 border-[#d4af37]/30 bg-white">
            <img
              src={resultImg}
              alt="School Board Exam Results 100% Pass Rate"
              className="w-full h-[320px] sm:h-[360px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-[#0a2b18]/90 text-white text-xs px-4 py-2 rounded-2xl backdrop-blur-md border border-[#d4af37]/40 text-center font-medium">
              Academic Toppers Commemoration Banner
            </div>
          </div>
        </section>

        {loading ? (
          <div className="text-center py-20 bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#d4af37] border-t-transparent mx-auto"></div>
            <p className="text-xs uppercase tracking-widest text-[#d4af37] mt-4 font-semibold">
              Loading Achievements...
            </p>
          </div>
        ) : (
          <>
            {/* Board Examination Toppers Section */}
            <section className="space-y-8 bg-white">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <div className="inline-flex items-center justify-center gap-3">
                  <div className="w-8 h-[1px] bg-[#d4af37]"></div>
                  <span className="text-[#d4af37] uppercase tracking-[0.2em] text-[11px] font-bold">
                    Scholastic Merit
                  </span>
                  <div className="w-8 h-[1px] bg-[#d4af37]"></div>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#0a2b18] font-bold">
                  Board Examination Toppers
                </h2>
                <p className="text-[#6c8274] text-sm sm:text-base font-light">
                  Celebrating top-scoring pupils who have set standard academic milestones in state examinations.
                </p>
              </div>

              {boardToppers.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {boardToppers.map((topper, idx) => (
                    <motion.div
                      key={topper.name + idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: (idx % 3) * 0.08 }}
                      className="group bg-white border border-[#e2e8f0] rounded-3xl p-8 text-center shadow-sm hover:shadow-xl hover:border-[#d4af37]/70 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1b4d32] via-[#d4af37] to-[#1b4d32] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                      <div className="flex justify-center mb-5">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0a2b18] to-[#1b4d32] border-2 border-[#d4af37]/60 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                          <Star className="w-6 h-6 text-[#d4af37]" />
                        </div>
                      </div>

                      <span className="inline-block px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest bg-[#f7faf8] text-[#1b4d32] border border-[#d6ded8] mb-3">
                        {topper.rank}
                      </span>

                      <h3 className="font-serif text-xl sm:text-2xl text-[#0a2b18] font-bold mb-2 group-hover:text-[#1b4d32] transition-colors">
                        {topper.name}
                      </h3>

                      <div className="text-2xl font-serif font-bold text-[#1b4d32] my-2">
                        {topper.score}
                      </div>

                      <p className="text-xs font-medium text-[#7a8c80] italic">
                        {topper.stream}
                      </p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white border border-dashed border-[#e2e8f0] rounded-2xl text-sm text-[#7a8c80]">
                  No board exam toppers registered yet.
                </div>
              )}
            </section>

            {/* Sports & Athletic Achievements Section */}
            <section className="space-y-8 bg-white pt-8 border-t border-[#e2e8f0]">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <div className="inline-flex items-center justify-center gap-3">
                  <div className="w-8 h-[1px] bg-[#d4af37]"></div>
                  <span className="text-[#d4af37] uppercase tracking-[0.2em] text-[11px] font-bold">
                    Athletics & Physical Training
                  </span>
                  <div className="w-8 h-[1px] bg-[#d4af37]"></div>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#0a2b18] font-bold">
                  Sports & Athletic Honors
                </h2>
                <p className="text-[#6c8274] text-sm sm:text-base font-light">
                  Recognizing champions who bring glory to Brotherhood School on track, field, and indoor arenas.
                </p>
              </div>

              {sportsWins.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {sportsWins.map((win, idx) => (
                    <motion.div
                      key={win.title + idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: (idx % 3) * 0.08 }}
                      className="group bg-white border border-[#e2e8f0] rounded-3xl p-8 text-center shadow-sm hover:shadow-xl hover:border-[#d4af37]/70 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="flex justify-center mb-5">
                        <div className="w-14 h-14 rounded-full bg-[#f4f7f5] border-2 border-[#d4af37]/40 flex items-center justify-center text-[#1b4d32] shadow-sm group-hover:scale-110 group-hover:border-[#d4af37] transition-all">
                          <Trophy className="w-7 h-7 text-[#d4af37]" />
                        </div>
                      </div>

                      <h3 className="font-serif text-lg sm:text-xl text-[#0a2b18] font-bold mb-2">
                        {win.title}
                      </h3>

                      <div className="text-sm font-bold text-[#1b4d32] bg-[#f0f6f2] border border-[#d2e2d7] px-3.5 py-1.5 rounded-full inline-block mt-2 mb-3">
                        {win.award}
                      </div>

                      <p className="text-xs text-[#7a8c80] leading-relaxed">
                        {win.category}
                      </p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white border border-dashed border-[#e2e8f0] rounded-2xl text-sm text-[#7a8c80]">
                  No sports achievements registered yet.
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
