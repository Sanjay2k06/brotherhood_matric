import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { BookOpen, PenTool, Sparkles, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/student-life/literary-association")({
  head: () => ({
    meta: [
      { title: "Literary Association — Brotherhood School" },
      { name: "description", content: "Details about the school's Literary Association, debates, elocution, and publication programs." },
    ],
  }),
  component: LiteraryAssociationPage,
});

function LiteraryAssociationPage() {
  const events = [
    { title: "Elocution Contests", desc: "Developing persuasive speaking, voice modulation, and stage confidence in English and Tamil.", icon: MessageSquare },
    { title: "Debate Tournaments", desc: "Rigorous research, critical analysis, and constructive arguing on contemporary social topics.", icon: Sparkles },
    { title: "Creative Writing", desc: "Encouraging original short stories, essay compositions, and poetry writing for the school magazine.", icon: PenTool },
    { title: "Spelling Bee", desc: "Building strong vocabulary, phonetics understanding, and cognitive recall through yearly bees.", icon: BookOpen },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Scholastic Clubs"
        title="Literary Association"
        subtitle="Unlocking the power of language, public speaking, and written expression."
      />

      <section className="max-w-6xl mx-auto px-6 py-20 space-y-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-display text-3xl text-primary font-bold">Expressing Thought & Creativity</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            The Literary Association aims to nurture the oratorical, analytical, and writing talents of students. Through periodic events and competitions, we build confident speakers who can articulate their thoughts clearly.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {events.map((item) => (
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
            <h3 className="font-display text-2xl text-primary font-bold">The School Magazine: "The Brotherhood Log"</h3>
            <p>
              Edited and designed by student editors of the Literary Association, our annual school publication features drawings, travelogues, analytical essays, poetry, and research updates penned by students.
            </p>
            <p>
              The association also hosts book reviews, author dialogues, and poetry reading clubs in the school library to build reading habits.
            </p>
          </div>
          <div className="md:col-span-5 relative group rounded-3xl overflow-hidden shadow-elegant border border-border bg-gradient-to-br from-navy-deep to-primary/20 flex flex-col items-center justify-center p-6 min-h-[250px] animate-float">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.7679_0.1778_81.65/0.12),transparent_65%)]" />
            <BookOpen className="h-24 w-24 text-gold drop-shadow-[0_4px_12px_rgba(212,175,55,0.35)]" />
            <span className="text-xs tracking-widest uppercase text-white/50 mt-4 font-semibold">Literary Association</span>
          </div>
        </div>
      </section>
    </>
  );
}
