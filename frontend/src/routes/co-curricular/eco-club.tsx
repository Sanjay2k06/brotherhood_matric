import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Leaf, Award, Globe } from "lucide-react";
import ecoImg from "../../images/ecoclub.png";

export const Route = createFileRoute("/co-curricular/eco-club")({
  head: () => ({
    meta: [
      { title: "Eco Club — Brotherhood School" },
      { name: "description", content: "Details of school environment drives, waste recycling projects, and organic farming by Eco Club." },
    ],
  }),
  component: EcoClubPage,
});

function EcoClubPage() {
  const highlights = [
    { title: "Zero Plastic Campus", desc: "Strict policies against single-use plastics, with awareness campaigns conducted by student club members." },
    { title: "Waste Management", desc: "Setting up dry and wet garbage segregation systems and organic waste composting blocks." },
    { title: "Tree Plantation Drives", desc: "Erecting saplings along the Neelankarai coast, building local botanical spaces, and nurturing lawns." }
  ];

  return (
    <>
      <PageHeader
        eyebrow="Green Initiatives"
        title="Eco Club"
        subtitle="Raising awareness, planting trees, and cultivating green habits for life."
      />

      <section className="max-w-6xl mx-auto px-6 py-20 space-y-16">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-muted-foreground leading-relaxed text-sm sm:text-base">
            <h2 className="font-display text-3xl text-primary font-bold">Nurturing Environmental Guardians</h2>
            <p>
              The Eco Club at Brotherhood School encourages students to translate environment lessons into tangible actions. By managing the school composting pit, nurturing native herbs, and monitoring water consumption, club members learn standard sustainable habits.
            </p>
            <p>
              The club organizes drawing competitions, plastic-free rallies in the neighborhood, and coordinates with local environmental agencies to keep our campus and surrounding spaces green.
            </p>
          </div>

          <div className="lg:col-span-5 relative group border border-gold/30 rounded-3xl overflow-hidden shadow-elegant img-hover-effect">
            <img
              src={ecoImg}
              alt="School Eco Club Planting Trees"
              className="w-full h-[320px] object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 bg-navy-deep/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur">
              Composting & Gardening Assembly Area
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid gap-6 md:grid-cols-3 pt-6 border-t border-border">
          {highlights.map((h) => (
            <div key={h.title} className="bg-card border border-border rounded-3xl p-8 shadow-sm hover:border-gold/60 transition duration-300">
              <div className="h-10 w-10 rounded-xl bg-primary/5 grid place-items-center mb-6">
                <Leaf className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-display text-xl text-primary font-bold mb-3">{h.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
