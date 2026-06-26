import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Trophy, Star, Award, Zap } from "lucide-react";

export const Route = createFileRoute("/achievements/sports")({
  head: () => ({
    meta: [
      { title: "Sports Achievements — Brotherhood School" },
      { name: "description", content: "Sports honors, championship trophies, and outstanding athletic milestones." },
    ],
  }),
  component: SportsAchievementsPage,
});

function SportsAchievementsPage() {
  const sportsHonors = [
    { title: "Zonal Championship", team: "Under-17 Football Team", status: "Gold Medal Winners (2025)", award: "District Shield" },
    { title: "State Athletic Meet", team: "Master Tarun Kumar", status: "100m Sprint Gold Medalist (2025)", award: "Fastest School Athlete" },
    { title: "District Basketball", team: "Under-19 Basketball Team", status: "Runners-Up Trophy (2025)", award: "Silver Medal" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Athletic Accolades"
        title="Sports Achievements"
        subtitle="Celebrating outstanding team trophies, athletic medals, and tournament victories."
      />

      <section className="max-w-5xl mx-auto px-6 py-20 space-y-16">
        {/* Sports Achievements Grid */}
        <div className="space-y-8">
          <h2 className="font-display text-3xl text-primary font-bold text-center">Sports Milestones (2025)</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {sportsHonors.map((honor) => (
              <div key={honor.team} className="bg-card border border-border rounded-3xl p-8 text-center shadow-sm hover:border-gold/60 transition duration-300">
                <div className="flex justify-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-gradient-gold grid place-items-center shadow-gold">
                    <Trophy className="h-5 w-5 text-navy-deep" />
                  </div>
                </div>
                <h4 className="text-xs uppercase tracking-widest text-gold font-semibold mb-2">{honor.title}</h4>
                <h3 className="font-display text-2xl text-primary font-bold mb-1">{honor.team}</h3>
                <div className="text-lg font-bold text-primary mt-2">{honor.status}</div>
                <p className="text-xs text-muted-foreground mt-1">{honor.award}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sports and Facilities with Image */}
        <div className="grid md:grid-cols-12 gap-8 items-center rounded-3xl border border-border bg-muted/20 p-8 sm:p-12 mt-12">
          <div className="md:col-span-7 text-muted-foreground leading-relaxed space-y-4">
            <h3 className="font-display text-2xl text-primary font-bold flex items-center gap-2">
              <Zap className="h-6 w-6 text-gold" /> Inter-School Trophies
            </h3>
            <p>
              Our school teams participated in over twenty inter-school athletic meets across Chennai in 2025. We secured the overall championship in the Kazura Garden Athletic Invitational, clinching top scores in both track and field events.
            </p>
            <p>
              We also hosted the annual Brotherhood Football Tournament, welcoming over 16 schools across South Chennai, reinforcing fair play and sportsmanship.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="relative group rounded-2xl overflow-hidden border border-gold/30 shadow-elegant bg-gradient-to-br from-navy-deep to-primary/20 flex flex-col items-center justify-center p-6 min-h-[250px] animate-float">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.7679_0.1778_81.65/0.12),transparent_65%)]" />
              <Trophy className="h-24 w-24 text-gold drop-shadow-[0_4px_12px_rgba(212,175,55,0.35)]" />
              <span className="text-xs tracking-widest uppercase text-white/50 mt-4 font-semibold">Championship Legacy</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
