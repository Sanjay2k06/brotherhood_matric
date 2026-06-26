import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Award, UserCheck, Sparkles } from "lucide-react";

export const Route = createFileRoute("/achievements/best-student")({
  head: () => ({
    meta: [
      { title: "Best Student Awards — Brotherhood School" },
      { name: "description", content: "Details of student-of-the-month and annual student excellence honors at Brotherhood." },
    ],
  }),
  component: BestStudentPage,
});

function BestStudentPage() {
  const currentAwardees = [
    { title: "Best Student of the Month", name: "Miss Divya S.", grade: "Class X", reason: "Outstanding academic progress and volunteering in Eco Club drives." },
    { title: "Best Student of the Month", name: "Master Nitin R.", grade: "Class XII", reason: "Exemplary school discipline and leading the Road Safety Patrol squad." },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Student Honors"
        title="Best Student Awards"
        subtitle="Recognising students who display outstanding character, values, and academic progress."
      />

      <section className="max-w-6xl mx-auto px-6 py-20 space-y-12">
        <h2 className="font-display text-3xl text-primary font-bold text-center">Monthly Student Excellence Honors</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {currentAwardees.map((student) => (
            <div key={student.name} className="bg-card border border-border rounded-3xl p-8 shadow-sm hover-lift transition duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-10 w-10 rounded-xl bg-primary/5 grid place-items-center">
                  <UserCheck className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gold font-semibold">{student.title}</h4>
                  <div className="font-display text-lg text-primary font-bold">{student.grade}</div>
                </div>
              </div>
              <h3 className="font-display text-2xl text-primary font-bold mb-3">{student.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{student.reason}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-center mt-12 bg-muted/20 border border-border rounded-3xl p-8 sm:p-10 shadow-sm">
          <div className="md:col-span-7 text-muted-foreground leading-relaxed space-y-4">
            <h3 className="font-display text-2xl text-primary font-bold flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-gold" /> Annual Best Student Award (Don Bosco Trophy)
            </h3>
            <p>
              The Don Bosco Trophy for the Overall Best Student is awarded at the end of the academic year during the Annual Valedictory function.
            </p>
            <p>
              The selection is made by a panel of teachers and is based on a student's consistent academic excellence, active participation in clubs, sportsmanship, and overall adherence to the school motto: "Character Formation Through Quality Education".
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="relative group rounded-3xl overflow-hidden border border-gold/30 shadow-elegant bg-gradient-to-br from-navy-deep to-primary/20 flex flex-col items-center justify-center p-6 min-h-[250px] animate-float">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.7679_0.1778_81.65/0.12),transparent_65%)]" />
              <Award className="h-24 w-24 text-gold drop-shadow-[0_4px_12px_rgba(212,175,55,0.35)]" />
              <span className="text-xs tracking-widest uppercase text-white/50 mt-4 font-semibold">Excellence Award</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
