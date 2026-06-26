import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Award, Compass, Heart } from "lucide-react";
import aboutImage4 from "../../images/aboutimage4.jpeg";

export const Route = createFileRoute("/co-curricular/scouts-guides")({
  head: () => ({
    meta: [
      { title: "Scouts & Guides — Brotherhood School" },
      { name: "description", content: "Details of Scouts & Guides cadet training, annual camps, and badge achievements at Brotherhood." },
    ],
  }),
  component: ScoutsGuidesPage,
});

function ScoutsGuidesPage() {
  const objectives = [
    { title: "Knotting & Survival Skills", desc: "Learning rope structures, tent pitching, compass reading, and woodcraft survival methodologies during outdoor camping blocks.", icon: Compass },
    { title: "First Aid & Rescue", desc: "Official training in bandaging, CPR basics, stretcher fabrication, and emergency crowd management.", icon: Award },
    { title: "Community Social Service", desc: "Participating in health drives, coastal cleaning, temple crowd control assistance, and literacy tutoring.", icon: Heart }
  ];

  return (
    <>
      <PageHeader
        eyebrow="Character & Service"
        title="Scouts & Guides"
        subtitle="Be prepared. Developing mental alerts, physical strength, and helpful attitudes."
      />

      <section className="max-w-6xl mx-auto px-6 py-20 space-y-16">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-muted-foreground leading-relaxed text-sm sm:text-base">
            <h2 className="font-display text-3xl text-primary font-bold">Bharat Scouts & Guides</h2>
            <p>
              The Bharat Scouts and Guides unit at Brotherhood School provides training in citizenship, self-reliance, and outdoor leadership. The squad holds weekly drills and regular campouts under standard Scoutmasters.
            </p>
            <p>
              Cadets work towards earning the prestigious Rajya Puraskar (State Award) and Rashtrapati Award (President's Scout/Guide Certificate), which are recognized in higher education streams.
            </p>
          </div>

          <div className="lg:col-span-5 relative group border border-gold/30 rounded-3xl overflow-hidden shadow-elegant img-hover-effect">
            <img
              src={aboutImage4}
              alt="Scouts Tent Camping Pitching"
              className="w-full h-[320px] object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 bg-navy-deep/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur">
              Scouts Campsite Assembly Ground
            </div>
          </div>
        </div>

        {/* Objectives */}
        <div className="grid gap-6 md:grid-cols-3 pt-6 border-t border-border">
          {objectives.map((obj) => (
            <div key={obj.title} className="bg-card border border-border rounded-3xl p-8 shadow-sm hover:border-gold/60 transition duration-300">
              <div className="h-10 w-10 rounded-xl bg-primary/5 grid place-items-center mb-6">
                <obj.icon className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-display text-xl text-primary font-bold mb-3">{obj.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{obj.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
