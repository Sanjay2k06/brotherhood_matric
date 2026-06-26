import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { BookOpen, Edit, Mic, Sparkles } from "lucide-react";
import aboutImage2 from "../../images/aboutimage2.jpg";

export const Route = createFileRoute("/co-curricular/literary-association")({
  head: () => ({
    meta: [
      { title: "Literary Association — Brotherhood School" },
      { name: "description", content: "Details of creative writing, essay debates, public speaking, and reading clubs at Brotherhood." },
    ],
  }),
  component: LiteraryAssociationPage,
});

function LiteraryAssociationPage() {
  const categories = [
    { title: "Public Speaking & Debates", desc: "Weekly classroom mock-debates, declamations, and panel discussions preparing students for inter-school cups.", icon: Mic },
    { title: "Creative Writing", desc: "Workshops on short-story writing, essay composing, poetry creation, and grammar excellence guides.", icon: Edit },
    { title: "Reading Circles", desc: "A reading club based in the library, where members analyze classic novels, biography reviews, and essays.", icon: BookOpen }
  ];

  return (
    <>
      <PageHeader
        eyebrow="Communication Excellence"
        title="Literary Association"
        subtitle="Cultivating reading habits, public speaking confidence, and creative writing skills."
      />

      <section className="max-w-6xl mx-auto px-6 py-20 space-y-16">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-muted-foreground leading-relaxed text-sm sm:text-base">
            <h2 className="font-display text-3xl text-primary font-bold">Expression & Creative Arts</h2>
            <p>
              The Literary Association is dedicated to helping students build eloquence, stage confidence, and precise grammar skills. We coordinate separate branches for English and Tamil/Hindi language pursuits.
            </p>
            <p>
              The club publishes the annual school magazine, organizes story-telling assemblies for primary sections, and hosts the annual Literary Week filled with vocabulary quizzes and writing competitions.
            </p>
          </div>

          <div className="lg:col-span-5 relative group border border-gold/30 rounded-3xl overflow-hidden shadow-elegant img-hover-effect">
            <img
              src={aboutImage2}
              alt="Students Reading in Library"
              className="w-full h-[320px] object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 bg-navy-deep/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur">
              School Library & Reading Desks
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="grid gap-6 md:grid-cols-3 pt-6 border-t border-border">
          {categories.map((cat) => (
            <div key={cat.title} className="bg-card border border-border rounded-3xl p-8 shadow-sm hover:border-gold/60 transition duration-300">
              <div className="h-10 w-10 rounded-xl bg-primary/5 grid place-items-center mb-6">
                <cat.icon className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-display text-xl text-primary font-bold mb-3">{cat.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
