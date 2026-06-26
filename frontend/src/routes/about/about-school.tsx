import { createFileRoute } from '@tanstack/react-router';
import { PageHeader } from "@/components/PageHeader";
import { History, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/about/about-school")({
  head: () => ({
    meta: [
      { title: "About School — Brotherhood Matriculation Hr. Sec. School" },
      { name: "description", content: "Learn about the history, introduction, and facilities of Brotherhood School." },
    ],
  }),
  component: AboutSchoolPage,
});

function AboutSchoolPage() {
  const facilities = [
    { name: "Language Labs", description: "Advanced tools to master communication, accent training, and vocabulary development." },
    { name: "Mathematics Lab", description: "Hands-on tools and geometric kits to bring abstract formulas to life." },
    { name: "Robotics Lab", description: "Equipped with STEM kits, sensors, and microcontrollers for coding and engineering basics." },
    { name: "Smart Classrooms", description: "Equipped with interactive projectors, high-definition audio, and digitised school lessons." },
    { name: "Well-equipped Library", description: "Thousands of books, references, journals, and a quiet reading space to build literacy." },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Introduction & Legacy"
        title="About our School"
        subtitle="Foundational history and campus learning resources at Brotherhood."
      />

      {/* School Introduction with Image */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-6 text-muted-foreground leading-relaxed">
            <h2 className="font-display text-3xl text-primary font-bold">School Introduction</h2>
            <p>
              Founded in 1991, Brotherhood Matriculation Higher Secondary School stands as a beacon of high academic standards, moral growth, and dedicated service in Chennai. Recognised by the Government of Tamil Nadu, our campus is a gender-neutral space built on mutual respect, personal dignity, and self-belief.
            </p>
            <p>
              We believe that true education goes beyond textbooks, striving to cultivate analytical thinking, discipline, and standard-setting character in every child. Our qualified educators are dedicated to creating a safe and engaging classroom environment where children can discover their inner potential.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="relative group rounded-2xl overflow-hidden border border-gold/30 shadow-elegant bg-gradient-to-br from-navy-deep to-primary/20 flex flex-col items-center justify-center p-6 min-h-[250px] animate-float">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.7679_0.1778_81.65/0.12),transparent_65%)]" />
              <GraduationCap className="h-24 w-24 text-gold drop-shadow-[0_4px_12px_rgba(212,175,55,0.35)]" />
              <span className="text-xs tracking-widest uppercase text-white/50 mt-4 font-semibold">Academic Excellence</span>
            </div>
          </div>
        </div>
      </section>

      {/* School History */}
      <section className="bg-muted/40 py-16 border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-3xl text-primary font-semibold mb-8 flex items-center gap-2">
            <History className="h-6 w-6 text-gold" /> Our History
          </h2>
          <div className="relative border-l-2 border-gold pl-8 space-y-8 py-2">
            <div>
              <span className="absolute -left-[9px] top-3.5 h-4 w-4 rounded-full bg-gold ring-4 ring-background" />
              <div className="font-display text-2xl text-primary font-semibold">1991</div>
              <h4 className="font-semibold text-foreground mt-1">Foundation Year</h4>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed max-w-2xl">
                Brotherhood School was established with a small cohort of students, driven by a deep conviction to provide wholesome, value-integrated education. Over the decades, it has grown in size and reputation.
              </p>
            </div>
            <div>
              <span className="absolute -left-[9px] top-[148px] h-4 w-4 rounded-full bg-gold ring-4 ring-background" />
              <div className="font-display text-2xl text-primary font-semibold">Present Day</div>
              <h4 className="font-semibold text-foreground mt-1">A Standard of Quality</h4>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed max-w-2xl">
                Today, the institution stands as one of the highly respected higher secondary schools in South Chennai, combining modern STEM methodologies with strong values.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* School Facilities */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-display text-3xl text-primary font-semibold mb-8">School Facilities</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {facilities.map((fac) => (
            <div key={fac.name} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:border-gold/60 transition duration-300">
              <h3 className="font-display text-xl text-primary font-semibold mb-2">{fac.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{fac.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
