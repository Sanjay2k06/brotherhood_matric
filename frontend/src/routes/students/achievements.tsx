import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Award, BookOpen, Star, Trophy, Target } from "lucide-react";
import resultImg from "../../images/result.jpg";

import { useState, useEffect } from "react";

export const Route = createFileRoute("/students/achievements")({
  head: () => ({
    meta: [
      { title: "Results & Achievements — Brotherhood School" },
      { name: "description", content: "Board exam toppers, state rankings, sports trophies, and co-curricular achievements of Brotherhood students." },
    ],
  }),
  component: StudentAchievementsPage,
});

function StudentAchievementsPage() {
  const [boardToppers, setBoardToppers] = useState<any[]>([]);
  const [sportsWins, setSportsWins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultToppers = [
    // Primary Wing Mid-Term Toppers
    { rank: "Mid-Term Topper", name: "Master Amit R.", score: "98% Marks", stream: "Class I" },
    { rank: "Mid-Term Topper", name: "Miss Divya K.", score: "97.5% Marks", stream: "Class II" },
    { rank: "Mid-Term Topper", name: "Master Harish S.", score: "99% Marks", stream: "Class III" },
    { rank: "Mid-Term Topper", name: "Miss Swetha V.", score: "96.8% Marks", stream: "Class IV" },
    { rank: "Mid-Term Topper", name: "Master Sanjay P.", score: "98.2% Marks", stream: "Class V" },

    // Primary Wing Quarterly Toppers
    { rank: "Quarterly Topper", name: "Miss Pooja S.", score: "98.5% Marks", stream: "Class I" },
    { rank: "Quarterly Topper", name: "Master Rahul M.", score: "97% Marks", stream: "Class II" },
    { rank: "Quarterly Topper", name: "Miss Deepa A.", score: "98.8% Marks", stream: "Class III" },
    { rank: "Quarterly Topper", name: "Master Vijay G.", score: "97.2% Marks", stream: "Class IV" },
    { rank: "Quarterly Topper", name: "Miss Nivetha K.", score: "99.1% Marks", stream: "Class V" },

    // Senior Secondary Wing Mid-Term Toppers
    { rank: "Mid-Term Topper", name: "Master Vignesh R.", score: "582 / 600", stream: "Class XI-A" },
    { rank: "Mid-Term Topper", name: "Miss Preethi S.", score: "578 / 600", stream: "Class XI-B" },
    { rank: "Mid-Term Topper", name: "Master Karthik V.", score: "580 / 600", stream: "Class XI-C" },
    { rank: "Mid-Term Topper", name: "Miss Dhivya Dharshini N.", score: "592 / 600", stream: "Class XII-A" },
    { rank: "Mid-Term Topper", name: "Master Ashwanth B.", score: "585 / 600", stream: "Class XII-B" },
    { rank: "Mid-Term Topper", name: "Miss Gayathri P.", score: "588 / 600", stream: "Class XII-C" },

    // Senior Secondary Wing Quarterly Toppers
    { rank: "Quarterly Topper", name: "Miss Monisha R.", score: "585 / 600", stream: "Class XI-A" },
    { rank: "Quarterly Topper", name: "Master Deepak S.", score: "576 / 600", stream: "Class XI-B" },
    { rank: "Quarterly Topper", name: "Miss Pavithra V.", score: "582 / 600", stream: "Class XI-C" },
    { rank: "Quarterly Topper", name: "Master Kishore P.", score: "594 / 600", stream: "Class XII-A" },
    { rank: "Quarterly Topper", name: "Miss Sripriya R.", score: "589 / 600", stream: "Class XII-B" },
    { rank: "Quarterly Topper", name: "Miss Akshaya M.", score: "595 / 600", stream: "Class XII-C" },
  ];

  const defaultSports: any[] = [];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/student-achievements/")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : (data.results || []);
        const toppers: any[] = [];
        const sports: any[] = [];

        list.forEach((item: any) => {
          if (item.title.toLowerCase().includes("best student")) {
            return;
          }
          const isBoard = item.title.toLowerCase().includes("rank") || 
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
              stream: grade || "Class X/XII"
            });
          } else {
            const parts = item.title.split(" - ");
            const title = parts[0] || item.title;
            const award = parts[1] ? parts[1].split(" (")[0] : "Achievement Award";
            const category = item.description;
            
            sports.push({
              title,
              award,
              category
            });
          }
        });

        setBoardToppers(toppers);
        setSportsWins(sports);
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
    <>
      <PageHeader
        eyebrow="School Ranks & Trophies"
        title="Results & Achievements"
        subtitle="Celebrating standard-setting board exam outcomes and zonal athletic championships."
      />

      <section className="max-w-6xl mx-auto px-6 py-20 space-y-16">
        {/* Results Graph / Showcase Image */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-muted-foreground leading-relaxed text-sm sm:text-base">
            <h2 className="font-display text-3xl text-primary font-bold">A Tradition of Board Excellence</h2>
            <p>
              Brotherhood School has maintained an unbroken record of a 100% pass rate in the Tamil Nadu State Board Examinations for both Class X and Class XII. Over 85% of our candidates secure distinction marks, entering leading technical, commerce, and medical colleges across India.
            </p>
            <p>
              In addition to board standards, our students regularly bag top rankings in science quizzes, drawing competitions, and public debates.
            </p>
          </div>
          <div className="lg:col-span-5 relative group border border-gold/30 rounded-3xl overflow-hidden shadow-elegant img-hover-effect">
            <img
              src={resultImg}
              alt="School Board Exam Results 100% Pass Rate"
              className="w-full h-[320px] object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 bg-navy-deep/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur">
              Academic Toppers Commemoration Banner
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gold mx-auto"></div>
          </div>
        ) : (
          <>
            {/* Board Toppers */}
            <div className="space-y-8 pt-8 border-t border-border">
              <h2 className="font-display text-3xl text-primary font-bold text-center">Board Examination Toppers (2025)</h2>
              {boardToppers.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-3">
                  {boardToppers.map((topper) => (
                    <div key={topper.name} className="bg-card border border-border rounded-3xl p-8 text-center shadow-sm hover:border-gold/60 transition duration-300">
                      <div className="flex justify-center mb-6">
                        <div className="h-12 w-12 rounded-full bg-gradient-gold grid place-items-center shadow-gold">
                          <Star className="h-5 w-5 text-navy-deep" />
                        </div>
                      </div>
                      <h4 className="text-xs uppercase tracking-widest text-gold font-semibold mb-2">{topper.rank}</h4>
                      <h3 className="font-display text-2xl text-primary font-bold mb-1">{topper.name}</h3>
                      <div className="text-xl font-bold text-primary mt-2">{topper.score}</div>
                      <p className="text-xs text-muted-foreground mt-1">{topper.stream}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-muted/10 border border-dashed border-border rounded-2xl text-sm text-muted-foreground">
                  No board exam toppers registered yet.
                </div>
              )}
            </div>

            {/* Sports Achievements */}
            <div className="space-y-8 pt-8 border-t border-border">
              <h2 className="font-display text-3xl text-primary font-bold text-center">Sports & Athletic Achievements</h2>
              {sportsWins.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-3">
                  {sportsWins.map((win) => (
                    <div key={win.title} className="bg-card border border-border rounded-3xl p-8 text-center shadow-sm hover:border-gold/60 transition duration-300">
                      <div className="flex justify-center mb-6">
                        <div className="h-12 w-12 rounded-full bg-primary/5 grid place-items-center">
                          <Trophy className="h-5 w-5 text-gold" />
                        </div>
                      </div>
                      <h3 className="font-display text-xl text-primary font-bold mb-1">{win.title}</h3>
                      <div className="text-sm font-semibold text-gold mt-2">{win.award}</div>
                      <p className="text-xs text-muted-foreground mt-1">{win.category}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-muted/10 border border-dashed border-border rounded-2xl text-sm text-muted-foreground">
                  No sports achievements registered yet.
                </div>
              )}
            </div>
          </>
        )}

      </section>
    </>
  );
}
