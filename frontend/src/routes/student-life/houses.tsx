import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Shield } from "lucide-react";

export const Route = createFileRoute("/student-life/houses")({
  head: () => ({
    meta: [
      { title: "School Houses — Brotherhood School" },
      { name: "description", content: "Details about the four school houses - Red, Blue, Green, and Gold." },
    ],
  }),
  component: HousesPage,
});

function HousesPage() {
  const houseData = [
    { name: "Red House", motto: "Charity", color: "bg-red-500", desc: "Instilling deep compassion, volunteer service, and caring attitudes." },
    { name: "Blue House", motto: "Faith", color: "bg-blue-500", desc: "Focusing on trust, resilience, dedication, and integrity in challenges." },
    { name: "Green House", motto: "Hope", color: "bg-emerald-500", desc: "Inspiring environmental care, growth, positive attitudes, and optimism." },
    { name: "Gold House", motto: "Wisdom", color: "bg-amber-500", desc: "Prioritizing scholastic research, sound judgment, and lifelong study." },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Co-curricular Houses"
        title="School Houses"
        subtitle="Our house system fosters healthy competition, teamwork, and leadership."
      />

      <section className="max-w-6xl mx-auto px-6 py-20 space-y-12">
        <h2 className="font-display text-3xl text-primary font-bold text-center">The Four School Houses</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {houseData.map((house) => (
            <div key={house.name} className="bg-card border border-border rounded-3xl p-8 text-center shadow-sm hover-lift transition duration-300">
              <div className="flex justify-center mb-6">
                <div className={`h-16 w-16 rounded-full ${house.color} p-0.5 shadow-md flex items-center justify-center`}>
                  <div className="h-full w-full rounded-full bg-card grid place-items-center">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </div>
              <h3 className="font-display text-2xl font-bold text-primary mb-1">{house.name}</h3>
              <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-4">Motto: {house.motto}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{house.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-center mt-12 bg-muted/20 border border-border rounded-3xl p-8 sm:p-10 shadow-sm">
          <div className="md:col-span-7 text-muted-foreground leading-relaxed space-y-4">
            <h3 className="font-display text-2xl text-primary font-bold">Inter-House Championship</h3>
            <p>
              Throughout the academic term, students earn points for their respective houses through sports matches, athletic meets, academic quizzes, and cultural projects.
            </p>
            <p>
              At the close of the academic year, the house securing the highest accumulated points is honored with the prestigious Cock House Trophy during the annual Sports Day celebration.
            </p>
          </div>
          <div className="md:col-span-5 relative group rounded-3xl overflow-hidden shadow-elegant border border-border bg-gradient-to-br from-navy-deep to-primary/20 flex flex-col items-center justify-center p-6 min-h-[250px] animate-float">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.7679_0.1778_81.65/0.12),transparent_65%)]" />
            <Shield className="h-24 w-24 text-gold drop-shadow-[0_4px_12px_rgba(212,175,55,0.35)]" />
            <span className="text-xs tracking-widest uppercase text-white/50 mt-4 font-semibold">House System</span>
          </div>
        </div>
      </section>
    </>
  );
}
