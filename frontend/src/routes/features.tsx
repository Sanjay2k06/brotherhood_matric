import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Laptop, Tv, Languages, Binary, Cpu, Beaker, BookOpen, Sparkles } from "lucide-react";

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
      desc: "Brotherhood Matriculation Higher Secondary School provides dedicated computer laboratories equipped with modern computer systems to develop digital literacy, typing skills, programming knowledge, internet awareness, and practical computer education. Students gain hands-on experience through technology-enabled learning that prepares them for future careers in the digital world.",
      icon: Laptop,
      color: "hover:border-blue-400 bg-blue-500/5"
    },
    {
      title: "Smart Classrooms",
      desc: "Our smart classrooms integrate multimedia technology, interactive digital content, educational videos, presentations, animations, and visual learning tools to make every lesson engaging, interactive, and student-centered while improving conceptual understanding.",
      icon: Tv,
      color: "hover:border-amber-400 bg-amber-500/5"
    },
    {
      title: "Mathematics Laboratory",
      desc: "The Mathematics Laboratory encourages experiential learning through mathematical models, activities, puzzles, games, charts, and practical demonstrations that help students understand mathematical concepts with confidence and creativity.",
      icon: Binary,
      color: "hover:border-purple-400 bg-purple-500/5"
    },
    {
      title: "English Language Laboratory",
      desc: "The English Language Laboratory enhances listening, speaking, pronunciation, vocabulary, grammar, reading, and communication skills through audio-visual learning, interactive activities, and language development exercises that improve students' confidence in English.",
      icon: Languages,
      color: "hover:border-emerald-400 bg-emerald-500/5"
    },
    {
      title: "Robotics Laboratory",
      desc: "The Robotics Laboratory introduces students to robotics, STEM education, coding, programming, innovation, automation, and problem-solving skills, encouraging creativity and technological thinking from an early age.",
      icon: Cpu,
      color: "hover:border-red-400 bg-red-500/5"
    },
    {
      title: "Science Laboratories",
      desc: "Well-equipped Physics, Chemistry, and Biology laboratories provide students with practical scientific learning through experiments, demonstrations, observations, and research-based activities aligned with the curriculum.",
      icon: Beaker,
      color: "hover:border-pink-400 bg-pink-500/5"
    },
    {
      title: "Library",
      desc: "The school library offers an extensive collection of academic books, reference materials, journals, newspapers, magazines, and digital resources that cultivate reading habits, research skills, and lifelong learning.",
      icon: BookOpen,
      color: "hover:border-indigo-400 bg-indigo-500/5"
    },
    {
      title: "Holistic Development",
      desc: "The school focuses on the overall development of every child through academics, leadership opportunities, sports, cultural activities, moral education, discipline, creativity, communication skills, and personality development.",
      icon: Sparkles,
      color: "hover:border-gold bg-gold/5"
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
