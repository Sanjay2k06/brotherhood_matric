import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Award, BookOpen, Star, Compass } from "lucide-react";

export const Route = createFileRoute("/achievements/academic")({
  head: () => ({
    meta: [
      { title: "Academic Achievements — Brotherhood School" },
      { name: "description", content: "Academic honors, board examination toppers, and scholarship recognitions." },
    ],
  }),
  component: AcademicAchievementsPage,
});

function AcademicAchievementsPage() {
  const boardToppers = [
    { rank: "State Rank 1st", name: "Miss Sneha R.", score: "594 / 600", stream: "Class XII (2025 Board Exams)" },
    { rank: "District Rank 1st", name: "Master Sanjay S.", score: "591 / 600", stream: "Class XII (2025 Board Exams)" },
    { rank: "Centum Holder", name: "Master Aditya K.", score: "100 / 100", stream: "Mathematics (Class XII 2025)" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        eyebrow="Academic Honors"
        title="Academic Achievements"
        subtitle="Celebrating outstanding scholastic ranks, subject centums, and board toppers."
      />

      <section className="max-w-5xl mx-auto px-6 py-20 space-y-16 bg-white text-[#0a2b18]">
        {/* Board Toppers Section */}
        <div className="space-y-8">
          <h2 className="font-serif text-3xl text-[#0a2b18] font-bold text-center">Board Examination Toppers (2025)</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {boardToppers.map((topper) => (
              <div key={topper.name} className="bg-white border border-[#e2e8f0] rounded-3xl p-8 text-center shadow-sm hover:border-[#d4af37]/60 hover:shadow-lg transition duration-300">
                <div className="flex justify-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#0a2b18] to-[#1b4d32] border border-[#d4af37] grid place-items-center shadow-md">
                    <Star className="h-5 w-5 text-[#d4af37]" />
                  </div>
                </div>
                <h4 className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">{topper.rank}</h4>
                <h3 className="font-serif text-2xl text-[#0a2b18] font-bold mb-1">{topper.name}</h3>
                <div className="text-xl font-bold text-[#1b4d32] mt-2">{topper.score}</div>
                <p className="text-xs text-[#718096] mt-1">{topper.stream}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scholarships and Quizzes with Image */}
        <div className="grid md:grid-cols-12 gap-8 items-center rounded-3xl border border-[#e2e8f0] bg-white p-8 sm:p-12 mt-12 shadow-sm">
          <div className="md:col-span-7 text-[#55695d] leading-relaxed space-y-4">
            <h3 className="font-serif text-2xl text-[#0a2b18] font-bold flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-[#d4af37]" /> Science &amp; Mathematics Olympiad Winners
            </h3>
            <p>
              Three of our high school students secured top 50 national ranks in the National Science Olympiad (NSO) and International Mathematics Olympiad (IMO) in 2025, receiving gold medals and research scholarships.
            </p>
            <p>
              The school continues to achieve a 100% pass rate in the Tamil Nadu State Board Examinations for both Class X and Class XII, with more than 85% of candidates securing distinction grades.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="relative group rounded-2xl overflow-hidden border border-[#d4af37]/30 shadow-lg bg-gradient-to-br from-[#0a2b18] to-[#1b4d32] flex flex-col items-center justify-center p-6 min-h-[250px]">
              <BookOpen className="h-24 w-24 text-[#d4af37] drop-shadow-[0_4px_12px_rgba(212,175,55,0.35)]" />
              <span className="text-xs tracking-widest uppercase text-white/70 mt-4 font-semibold">Scholastic Honors</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
