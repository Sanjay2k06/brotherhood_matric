import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import { BookOpen, Award, Sparkles, Trophy } from "lucide-react";

export const Route = createFileRoute("/scroll-stack-demo")({
  head: () => ({
    meta: [
      { title: "Pillars of Excellence — Brotherhood School" },
      { name: "description", content: "Explore the four pillars that define our educational philosophy: Academic Rigor, Character, Innovation, and Community." },
    ],
  }),
  component: ScrollStackDemoPage,
});

function ScrollStackDemoPage() {
  const cards = [
    {
      title: "Academic Rigor",
      tagline: "Intellectual Mastery & Curiosity",
      description: "We offer challenging Science & Commerce streams, achieving a consistent 100% board pass rate. Our students learn to cultivate critical thinking, mathematical analysis, and structured research under qualified educators.",
      colorClass: "from-navy-deep via-navy-deep to-primary/40 text-white",
      icon: BookOpen,
      metric: "100% Pass Rate"
    },
    {
      title: "Character Formation",
      tagline: "Morally Integrated Leadership",
      description: "Guided by Don Bosco's educational system, we integrate preventive pedagogy to cultivate discipline, service-minded volunteerism, and strong ethical values that prepare students to lead with integrity.",
      colorClass: "from-navy-deep via-navy-deep to-gold/30 text-white border-gold/30",
      icon: Award,
      metric: "Don Bosco Philosophy"
    },
    {
      title: "Innovation & STEM",
      tagline: "Robotics, Coding & Engineering",
      description: "Our state-of-the-art Robotics and Mathematics Labs provide students with hands-on coding, hardware programming, and STEM kits, preparing them for advanced careers in tech and science.",
      colorClass: "from-navy-deep via-navy-deep to-blue-900/40 text-white",
      icon: Sparkles,
      metric: "Advanced Tech Labs"
    },
    {
      title: "Active Community",
      tagline: "Clubs, Sports & Co-curriculars",
      description: "With four school houses, Scouts & Guides, Road Safety Patrol, School Choir, and zonal championship athletic teams, our students build teamwork, resilience, and standard-setting sportsmanship.",
      colorClass: "from-navy-deep via-navy-deep to-emerald-950/40 text-white",
      icon: Trophy,
      metric: "20+ Active Clubs"
    }
  ];

  return (
    <>
      <PageHeader
        eyebrow="Educational Pillars"
        title="Pillars of Excellence"
        subtitle="Scroll down to explore the foundational pillars that shape leadership and character at Brotherhood."
      />

      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="h-[75vh] w-full border border-border bg-muted/10 rounded-[40px] overflow-hidden shadow-inner">
          <ScrollStack
            itemDistance={60}
            itemScale={0.04}
            itemStackDistance={25}
            stackPosition="15%"
            scaleEndPosition="8%"
            baseScale={0.88}
            blurAmount={1.5}
            rotationAmount={-1}
          >
            {cards.map((card, idx) => (
              <ScrollStackItem key={card.title} itemClassName={`bg-gradient-to-br ${card.colorClass} border border-border/40 flex flex-col justify-between shadow-2xl`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.7679_0.1778_81.65/0.1),transparent_70%)] pointer-events-none" />
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <span className="text-xs font-semibold tracking-widest text-gold uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10">
                      Pillar 0{idx + 1}
                    </span>
                    <h3 className="font-display text-2xl md:text-4xl font-bold mt-4 tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-sm md:text-base text-gold font-medium mt-1">
                      {card.tagline}
                    </p>
                  </div>
                  <card.icon className="h-10 w-10 md:h-12 md:w-12 text-gold drop-shadow-[0_4px_12px_rgba(212,175,55,0.35)] shrink-0" />
                </div>

                <div className="relative z-10 grid md:grid-cols-12 gap-4 items-end mt-6">
                  <p className="md:col-span-8 text-sm md:text-base text-white/80 leading-relaxed">
                    {card.description}
                  </p>
                  <div className="md:col-span-4 text-right">
                    <span className="inline-block text-xs md:text-sm font-bold text-gold border-b-2 border-gold/40 pb-1">
                      {card.metric}
                    </span>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </section>
    </>
  );
}
