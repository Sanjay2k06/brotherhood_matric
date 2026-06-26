import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import principalImage from "../../images/principal_portrait (2).png"; // Fallback portrait image

export const Route = createFileRoute("/academics/founder-message")({
  head: () => ({
    meta: [
      { title: "Founder's Message — Brotherhood School" },
      { name: "description", content: "Official welcoming statement and vision details from the Founder, Rev. Father Anton Cruze." },
    ],
  }),
  component: FounderMessagePage,
});

function FounderMessagePage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundational Statement"
        title="Message from the Founder"
        subtitle="Reflections on our journey, character formation values, and scholastic excellence."
      />

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Founder Portrait Wrapper */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative group w-full max-w-[400px]">
              <div className="absolute inset-0 rounded-3xl bg-gradient-gold opacity-10 blur-[10px] transition duration-300" />
              <div className="relative h-[450px] sm:h-[550px] rounded-3xl overflow-hidden border border-gold/30 shadow-elegant bg-gradient-to-br from-navy-deep to-primary/20 flex items-center justify-center p-6 text-center text-white">
                <div>
                  <h3 className="font-display text-2xl text-gold font-bold mb-1">Rev. Father Anton Cruze</h3>
                  <p className="text-xs uppercase tracking-widest text-white/50 mt-1 font-semibold">Founder & Chairman</p>
                  <p className="text-xs text-white/60 mt-4 leading-relaxed italic">
                    "Character Formation Through Quality Education"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div className="lg:col-span-8 space-y-6 text-muted-foreground leading-relaxed text-base sm:text-lg">
            <p className="font-medium text-primary">
              Greetings and blessings to the entire Brotherhood family,
            </p>
            <p>
              When we laid the first stone of Brotherhood Matriculation Higher Secondary School in 1991, our vision was to create more than just classrooms. We set out to establish a home away from home — a nurturing space where boys and girls, regardless of social background, could discover their inner strength and learn with joy and integrity.
            </p>
            <p>
              Over the last three decades, our campus in Neelankarai has witnessed thousands of students transition from curious toddlers to compassionate, responsible leaders. Our pedagogical focus is heavily inspired by Don Bosco's Preventive System: utilizing reason, religion, and loving-kindness to guide students instead of fear or coercion.
            </p>
            <p>
              In this rapidly changing technological era, we continue to upgrade our science, robotics, and language labs. However, we remain firm in our belief that high-end facilities are only tools. The true soul of education lies in the moral integrity, discipline, and compassionate hearts of our graduates. I pray that our students continue to shine as light in society, bringing credit to their parents, their Alma Mater, and our nation.
            </p>

            {/* Signature */}
            <div className="pt-8 border-t border-border">
              <div className="font-display text-2xl text-primary italic font-semibold">Rev. Father Anton Cruze</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Founder & Chairman</div>
              <div className="text-xs text-muted-foreground">Brotherhood Educational and Charitable Trust</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
