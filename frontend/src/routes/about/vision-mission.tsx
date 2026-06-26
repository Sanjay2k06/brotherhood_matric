import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Target, Compass, Sparkles, ShieldCheck, Heart, Users } from "lucide-react";
import aboutImage2 from "../../images/aboutimage2.jpg";

export const Route = createFileRoute("/about/vision-mission")({
  head: () => ({
    meta: [
      { title: "Vision & Mission — Brotherhood School" },
      { name: "description", content: "Discover our educational vision, mission statements, and fundamental core values." },
    ],
  }),
  component: VisionMissionPage,
});

function VisionMissionPage() {
  const values = [
    { title: "Integrity", desc: "Honesty and strong moral principles in actions and academic pursuits.", icon: ShieldCheck },
    { title: "Discipline", desc: "Orderly conduct, consistency, and respect for school policies and community guidelines.", icon: Compass },
    { title: "Excellence", desc: "Striving for the highest standards in academics, co-curriculars, and character.", icon: Sparkles },
    { title: "Compassion", desc: "Caring for the less fortunate and relating to one another with sympathy and respect.", icon: Heart },
    { title: "Respect", desc: "Fostering standard-setting self-esteem and recognizing value and dignity in every individual.", icon: Users },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Statements & Principles"
        title="Vision & Mission"
        subtitle="The philosophical pillars that guide educational pathways at Brotherhood."
      />

      <section className="max-w-7xl mx-auto px-6 py-20 space-y-16">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Cards Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* Vision Statement */}
            <div className="grid md:grid-cols-12 gap-6 items-center border border-gold/20 rounded-3xl bg-primary/5 p-8 relative overflow-hidden shadow-sm hover-lift transition duration-300">
              <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-gold/5 blur-[50px]" />
              <div className="md:col-span-3 text-center md:text-left flex flex-col items-center md:items-start">
                <div className="h-12 w-12 rounded-2xl bg-gradient-gold grid place-items-center mb-3 shadow-gold">
                  <Target className="h-6 w-6 text-navy-deep" />
                </div>
                <h2 className="font-display text-xl font-bold text-primary">Our Vision</h2>
              </div>
              <div className="md:col-span-9">
                <blockquote className="font-display text-lg text-primary leading-snug italic">
                  "To be a distinguished center of academic learning, forming morally integrated, intellectually competent, and socially responsible leaders of tomorrow."
                </blockquote>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="grid md:grid-cols-12 gap-6 items-center border border-border rounded-3xl bg-card p-8 shadow-sm hover-lift transition duration-300">
              <div className="md:col-span-3 text-center md:text-left flex flex-col items-center md:items-start">
                <div className="h-12 w-12 rounded-2xl bg-primary/5 grid place-items-center mb-3">
                  <Compass className="h-6 w-6 text-gold" />
                </div>
                <h2 className="font-display text-xl font-bold text-primary">Our Mission</h2>
              </div>
              <div className="md:col-span-9 text-muted-foreground text-sm leading-relaxed space-y-3">
                <p>
                  To offer comprehensive education that balances academic excellence, innovative technological understanding, and personal growth.
                </p>
                <p>
                  By aligning our methodologies with the preventative pedagogical principles of Don Bosco, we foster standard-setting discipline and character, preparing students to confidently navigate and serve the global community.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Image Column */}
          <div className="lg:col-span-5 relative group img-hover-effect rounded-3xl overflow-hidden shadow-elegant border border-border">
            <img
              src={aboutImage2}
              alt="School Green Courtyard"
              className="w-full h-[400px] object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 bg-navy-deep/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur">
              School Courtyard & Pathways
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-8 pt-8">
          <h2 className="font-display text-3xl text-center text-primary font-bold">Our Core Values</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((val) => (
              <div key={val.title} className="bg-card border border-border rounded-2xl p-6 text-center shadow-sm hover:border-gold/60 hover:-translate-y-1 transition duration-300">
                <val.icon className="h-8 w-8 text-gold mx-auto mb-4" />
                <h3 className="font-display text-lg text-primary font-semibold mb-2">{val.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
