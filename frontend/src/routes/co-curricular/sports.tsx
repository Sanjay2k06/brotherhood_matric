import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Trophy, Shield, Star, Calendar } from "lucide-react";
import sportsImg from "../../images/sports.png";

export const Route = createFileRoute("/co-curricular/sports")({
  head: () => ({
    meta: [
      { title: "Sports & Games — Brotherhood School" },
      { name: "description", content: "Explore the athletic coaching, sports matches, and school trophies at Brotherhood." },
    ],
  }),
  component: SportsPage,
});

function SportsPage() {
  const events = [
    { title: "Annual Sports Meet", desc: "Our hallmark event involving athletic track meets, relays, and march pasts by the four houses." },
    { title: "Inter-School Leagues", desc: "Participating in zonal football tournaments, chess leagues, and local table tennis meets." },
    { title: "Specialist Coaching", desc: "Weekly professional training sessions for cricket, football, karate, and yoga practices." }
  ];

  return (
    <>
      <PageHeader
        eyebrow="Athletics & Games"
        title="Sports Programs"
        subtitle="Cultivating team spirit, sportsmanship, and physical health in every student."
      />

      <section className="max-w-6xl mx-auto px-6 py-20 space-y-16">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Sports Description */}
          <div className="lg:col-span-7 space-y-6 text-muted-foreground leading-relaxed text-sm sm:text-base">
            <h2 className="font-display text-3xl text-primary font-bold">Physical Education & Health</h2>
            <p>
              At Brotherhood, sports is an integral part of standard character formation. We believe that physical endurance builds mental strength, teaches cooperation, and instills a constructive attitude towards victory and defeat alike.
            </p>
            <p>
              The school playground is equipped with standard football fields, volleyball nets, and indoor tables for chess and table tennis. Under the guidance of our Physical Director, students are selected for regional and state-level sports competitions.
            </p>
          </div>

          {/* Sports Showcase image */}
          <div className="lg:col-span-5 relative group border border-gold/30 rounded-3xl overflow-hidden shadow-elegant img-hover-effect">
            <img
              src={sportsImg}
              alt="School Students Playing Sports"
              className="w-full h-[320px] object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 bg-navy-deep/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur">
              School Football Training Ground
            </div>
          </div>
        </div>

        {/* Programs */}
        <div className="grid gap-6 md:grid-cols-3 pt-6 border-t border-border">
          {events.map((ev) => (
            <div key={ev.title} className="bg-card border border-border rounded-3xl p-8 shadow-sm hover:border-gold/60 transition duration-300">
              <div className="h-10 w-10 rounded-xl bg-primary/5 grid place-items-center mb-6">
                <Trophy className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-display text-xl text-primary font-bold mb-3">{ev.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{ev.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
