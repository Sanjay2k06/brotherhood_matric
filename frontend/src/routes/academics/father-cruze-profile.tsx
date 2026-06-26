import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Award, Compass, Heart, ShieldCheck, Sparkles } from "lucide-react";

export const Route = createFileRoute("/academics/father-cruze-profile")({
  head: () => ({
    meta: [
      { title: "Father Anton Cruze Profile — Brotherhood School" },
      { name: "description", content: "Read the life story, achievements, and educational philosophy of Father Anton Cruze, founder of Brotherhood Matriculation Hr. Sec. School." },
    ],
  }),
  component: FatherCruzeProfilePage,
});

function FatherCruzeProfilePage() {
  const milestones = [
    { year: "1991", title: "Founded Brotherhood School", desc: "Initiated school classrooms with a handful of desks and standard lessons, catering to local children in Neelankarai." },
    { year: "2005", title: "Higher Secondary Upgradation", desc: "Upgraded the school to higher secondary status, launching advanced streams in Science and Commerce." },
    { year: "2015", title: "Charitable Trust Expansion", desc: "Established scholarship funds for deserving candidates, integrating free remedial education blocks." },
    { year: "Present", title: "Community Icon", desc: "Continues to serve as the spiritual and administrative guide, championing character-building education." }
  ];

  return (
    <>
      <PageHeader
        eyebrow="Tribute Profile"
        title="Father Anton Cruze"
        subtitle="A lifetime dedicated to character formation, community welfare, and educational access."
      />

      <section className="max-w-6xl mx-auto px-6 py-20 space-y-16">
        {/* Biography Grid */}
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-muted-foreground leading-relaxed text-sm sm:text-base">
            <h2 className="font-display text-3xl text-primary font-bold">Rev. Fr. Anton Cruze — Founder</h2>
            <p>
              Rev. Father Anton Cruze is a visionary educationist and social reformer who has dedicated his life to youth empowerment and value-based scholastic formation. Inspired by the Salesian educational framework of Saint John Bosco, he believes that true education cannot be separated from moral training and sympathetic guidance.
            </p>
            <p>
              Under his guidance, Brotherhood School has expanded from a small primary school block into a double-track higher secondary school with thousands of alumni. He remains a beloved figure on campus, regularly visiting students during assemblies, counselling families, and advocating for inclusive education for less fortunate children.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 pt-4">
              <div className="bg-card border border-border p-5 rounded-2xl flex gap-3">
                <Heart className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <p className="text-xs">Fosters student-centric care and compassionate environments on campus.</p>
              </div>
              <div className="bg-card border border-border p-5 rounded-2xl flex gap-3">
                <Compass className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <p className="text-xs">Guided by reason, spiritual values, and positive discipline models.</p>
              </div>
            </div>
          </div>

          {/* Graphical timeline panel */}
          <div className="lg:col-span-5 bg-card border border-border rounded-3xl p-8 shadow-sm space-y-6">
            <h3 className="font-display text-2xl text-primary font-bold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-gold" /> Leadership Milestones
            </h3>
            
            <div className="relative border-l border-gold pl-6 space-y-6 py-1">
              {milestones.map((m) => (
                <div key={m.year} className="relative">
                  <span className="absolute -left-[28px] top-1.5 h-3.5 w-3.5 rounded-full bg-gold ring-4 ring-card" />
                  <div className="font-display text-sm font-bold text-primary">{m.year} - {m.title}</div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
