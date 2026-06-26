import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Leaf, Recycle, Globe, Sparkles } from "lucide-react";

export const Route = createFileRoute("/student-life/eco-club")({
  head: () => ({
    meta: [
      { title: "Eco Club — Brotherhood School" },
      { name: "description", content: "Details about the Eco Club initiatives, green campaigns, and recycling programs." },
    ],
  }),
  component: EcoClubPage,
});

function EcoClubPage() {
  const initiatives = [
    { title: "Waste Segregation", desc: "Setting up dual-bin waste sorting stations across classrooms to separate plastic and organic waste.", icon: Recycle },
    { title: "Campus Composting", desc: "Converting leaf litter and organic kitchen waste into rich organic fertilizer for school gardens.", icon: Leaf },
    { title: "Tree Plantation", desc: "Annual sapling planting events on World Environment Day to increase green cover around our neighborhood.", icon: Globe },
    { title: "Energy Auditing", desc: "Student monitors ensuring lights, smart boards, and fans are switched off during recesses and assemblies.", icon: Sparkles },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Green Initiatives"
        title="Eco Club"
        subtitle="Raising awareness and acting to protect our local environment."
      />

      <section className="max-w-6xl mx-auto px-6 py-20 space-y-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-display text-3xl text-primary font-bold">Nurturing a Green Future</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            The Eco Club encourages students to become active guardians of nature. By taking part in practical projects, students understand the balance of ecology and sustainability.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {initiatives.map((item) => (
            <div key={item.title} className="bg-card border border-border rounded-3xl p-8 shadow-sm hover-lift transition duration-300">
              <div className="h-10 w-10 rounded-xl bg-primary/5 grid place-items-center mb-6">
                <item.icon className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-display text-2xl text-primary font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-center mt-12 bg-muted/20 border border-border rounded-3xl p-8 sm:p-10 shadow-sm">
          <div className="md:col-span-7 text-muted-foreground leading-relaxed space-y-4">
            <h3 className="font-display text-2xl text-primary font-bold">No-Plastic Policy</h3>
            <p>
              Brotherhood School is a plastic-free zone, an initiative led and monitored by the Eco Club. Single-use plastic bottles, disposable food wrappers, and plastic bags are banned inside campus limits.
            </p>
            <p>
              The club organizes eco-exhibitions showcasing paper crafts, cloth bag sewing, and organic clay modeling projects, inspiring creative conservation.
            </p>
          </div>
          <div className="md:col-span-5 relative group rounded-3xl overflow-hidden shadow-elegant border border-border bg-gradient-to-br from-navy-deep to-primary/20 flex flex-col items-center justify-center p-6 min-h-[250px] animate-float">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.7679_0.1778_81.65/0.12),transparent_65%)]" />
            <Leaf className="h-24 w-24 text-gold drop-shadow-[0_4px_12px_rgba(212,175,55,0.35)]" />
            <span className="text-xs tracking-widest uppercase text-white/50 mt-4 font-semibold">Green Club</span>
          </div>
        </div>
      </section>
    </>
  );
}
