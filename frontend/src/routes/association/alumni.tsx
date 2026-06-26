import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Sparkles, Trophy, Star, ArrowRight, Quote } from "lucide-react";
import aboutImage2 from "../../images/aboutimage2.jpg";

export const Route = createFileRoute("/association/alumni")({
  head: () => ({
    meta: [
      { title: "Alumni Association — Brotherhood School" },
      { name: "description", content: "Learn about the Brotherhood School Alumni Association network, achievements, and testimonials." },
    ],
  }),
  component: AlumniPage,
});

function AlumniPage() {
  const achievements = [
    { name: "Dr. Sandeep Rajan", batch: "Batch of 2004", field: "Medical Officer, Apollo Hospitals", desc: "Leading post-graduate medical research initiatives and community clinical health drives in Chennai." },
    { name: "Mrs. Priya Srinivasan", batch: "Batch of 2008", field: "Senior Lead Engineer, Google", desc: "Developing state-of-the-art consumer applications and advocating for women in STEM careers globally." },
    { name: "Mr. Imran Khan", batch: "Batch of 2012", field: "Founder & CEO, GreenSpaces", desc: "Established a leading eco-friendly waste management startup featured in national enterprise listings." }
  ];

  const testimonials = [
    {
      quote: "The discipline, respect, and academic vigor instilled in me during my years at Brotherhood School paved the way for my medical career. It really is a family.",
      author: "Dr. Sandeep Rajan",
      desc: "Batch of 2004 · Cardiologist"
    },
    {
      quote: "At Brotherhood, I wasn't just taught standard courses; I was guided to think. The computer lab classes sparked my passion for software engineering.",
      author: "Mrs. Priya Srinivasan",
      desc: "Batch of 2008 · Tech Lead"
    }
  ];

  return (
    <>
      <PageHeader
        eyebrow="Alumni Network"
        title="Alumni Association"
        subtitle="Staying connected, celebrating alumni achievements, and supporting the school's growth."
      />

      <section className="max-w-7xl mx-auto px-6 py-20 space-y-16">
        {/* Intro */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-muted-foreground leading-relaxed text-sm sm:text-base">
            <h2 className="font-display text-3xl text-primary font-bold">The Brotherhood Legacy</h2>
            <p>
              Since our first graduating batch, Brotherhood School has sent thousands of qualified young men and women into the professional streams. The Alumni Association serves as a network to mentor current student batches, offer career seminars, and support campus infrastructure projects.
            </p>
            <p>
              Whether you are working in technology, healthcare, public administration, or starting your own venture, you remain a key part of the school motto: "Character Formation Through Quality Education". We invite you to join our digital registry to stay updated on school reunions and networking meets.
            </p>
          </div>
          <div className="lg:col-span-5 relative group img-hover-effect rounded-3xl overflow-hidden shadow-elegant border border-border">
            <img
              src={aboutImage2}
              alt="School Alumni Meeting"
              className="w-full h-[320px] object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 bg-navy-deep/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur">
              Annual Reunion assembly at Courtyard
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-8 pt-8">
          <h2 className="font-display text-3xl text-primary font-bold text-center">Featured Alumni Achievements</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {achievements.map((item) => (
              <div key={item.name} className="bg-card border border-border rounded-3xl p-8 shadow-sm hover:border-gold/60 transition duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/5 grid place-items-center">
                    <Trophy className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-primary font-bold">{item.name}</h3>
                    <p className="text-xs text-gold font-semibold uppercase tracking-wider mt-1">{item.batch} · {item.field}</p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed pt-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="space-y-8 pt-8 border-t border-border">
          <h2 className="font-display text-3xl text-primary font-bold text-center font-serif">Alumni Testimonials</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((test, index) => (
              <div key={index} className="bg-card border border-border rounded-3xl p-8 shadow-sm relative overflow-hidden flex flex-col justify-between">
                <Quote className="absolute top-4 right-4 h-16 w-16 text-gold/5 select-none" />
                <blockquote className="text-sm text-muted-foreground italic leading-relaxed relative z-10">
                  "{test.quote}"
                </blockquote>
                <div className="mt-6 border-t border-border pt-4 text-xs">
                  <div className="font-bold text-primary">{test.author}</div>
                  <div className="text-muted-foreground mt-0.5">{test.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Register CTA */}
        <div className="bg-primary text-primary-foreground rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center shadow-elegant">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,oklch(0.7679_0.1778_81.65/0.18),transparent_60%)]" />
          <h3 className="font-display text-3xl mb-4">Are you a Brotherhood graduate?</h3>
          <p className="text-white/85 max-w-xl mx-auto text-sm sm:text-base mb-8">
            Register your profile with the alumni portal to network with peers, share job opportunities, and mentor senior school batches.
          </p>
          <div className="flex justify-center">
            <Link
              to="/association/registration"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-gold text-navy-deep hover:opacity-95 font-bold shadow-gold px-8 py-4 text-sm transition duration-300"
            >
              Alumni Registration Portal <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
