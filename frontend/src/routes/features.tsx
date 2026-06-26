import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Laptop, Tv, Languages, Binary, Cpu, Beaker, Sparkles } from "lucide-react";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Campus Features & Labs — Brotherhood School" },
      { name: "description", content: "Explore the advanced laboratories, smart classrooms, robotics, and STEM facilities at Brotherhood School." },
    ],
  }),
  component: FeaturesPage,
});

function FeaturesPage() {
  const features = [
    {
      title: "Computer Education",
      desc: "Full-scale computer laboratory equipped with modern desktops, high-speed connectivity, and programming guides (Scratch, Python, and HTML).",
      icon: Laptop,
      color: "hover:border-blue-400 bg-blue-500/5"
    },
    {
      title: "Smart Class",
      desc: "Interactive projectors, audio systems, and digital class syllabus modules converting standard textbooks into immersive multi-media experiences.",
      icon: Tv,
      color: "hover:border-amber-400 bg-amber-500/5"
    },
    {
      title: "English Lab",
      desc: "Accent training softwares, headphones, and speech monitoring tools helping primary and secondary sections master fluent pronunciation and phonetics.",
      icon: Languages,
      color: "hover:border-emerald-400 bg-emerald-500/5"
    },
    {
      title: "Maths Lab",
      desc: "Hands-on geometry boards, mathematical puzzles, and fractional blocks allowing students to physically analyze and resolve abstract formulas.",
      icon: Binary,
      color: "hover:border-purple-400 bg-purple-500/5"
    },
    {
      title: "Robotics Lab",
      desc: "STEM building blocks, microcontrollers (Arduino/Raspberry Pi), sensor modules, and coding workspaces introducing students to future engineering concepts.",
      icon: Cpu,
      color: "hover:border-red-400 bg-red-500/5"
    },
    {
      title: "Science Lab",
      desc: "Fully equipped Physics, Chemistry, and Biology workspaces with standard compounds, measuring tools, microscopes, and safety shields.",
      icon: Beaker,
      color: "hover:border-pink-400 bg-pink-500/5"
    }
  ];

  return (
    <>
      <PageHeader
        eyebrow="Campus Learning Resources"
        title="Modern Learning Facilities"
        subtitle="Exploring our smart classrooms, specialized science labs, and future-ready robotics facilities."
      />

      <section className="max-w-7xl mx-auto px-6 py-20 space-y-12">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <h2 className="font-display text-3xl text-primary font-bold">Empowering Students Through Innovation</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            At Brotherhood, facilities are customized to build practical understanding alongside textbooks. Our state-of-the-art laboratory sections inspire research, coding competence, and scientific curiosity.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feat) => (
            <div
              key={feat.title}
              className={`bg-card border border-border rounded-3xl p-8 shadow-sm hover-lift transition-all duration-300 relative overflow-hidden group ${feat.color}`}
            >
              {/* Gold border hover glow */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <div className="h-12 w-12 rounded-2xl bg-white shadow-sm border border-gold/15 flex items-center justify-center text-gold mb-6 transition-transform duration-300 group-hover:scale-110">
                <feat.icon className="h-6 w-6" />
              </div>

              <h3 className="font-display text-2xl text-primary font-bold mb-3 flex items-center gap-1.5">
                {feat.title}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feat.desc}
              </p>

              {/* Sparkle background details */}
              <div className="absolute -bottom-4 -right-4 h-16 w-16 text-gold/5 scale-75 group-hover:scale-100 transition-transform duration-300">
                <Sparkles className="h-full w-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
