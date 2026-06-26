import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { ShieldCheck, Info, Users, Clock } from "lucide-react";
import aboutImage3 from "../../images/aboutimage3.png";

export const Route = createFileRoute("/co-curricular/rsp")({
  head: () => ({
    meta: [
      { title: "Road Safety Patrol (RSP) — Brotherhood School" },
      { name: "description", content: "Learn about the school Road Safety Patrol (RSP) team, traffic control training, and community campaigns." },
    ],
  }),
  component: RSPPage,
});

function RSPPage() {
  const duties = [
    { title: "Traffic Control Support", desc: "Assisting local traffic police officers during peak morning and evening dispersal hours outside the school gate on East Coast Road.", icon: Clock },
    { title: "Awareness Campaigns", desc: "Conducting helmet awareness, zebra crossing safety, and road discipline campaigns in the Neelankarai neighborhood.", icon: ShieldCheck },
    { title: "Campus Dispersal Patrol", desc: "Regulating vehicle movements and ensuring safe passage for primary section kids inside the school parking spaces.", icon: Users }
  ];

  return (
    <>
      <PageHeader
        eyebrow="Civic Duty & Safety"
        title="Road Safety Patrol (RSP)"
        subtitle="Serving the community, maintaining traffic discipline, and building safety awareness."
      />

      <section className="max-w-6xl mx-auto px-6 py-20 space-y-16">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-muted-foreground leading-relaxed text-sm sm:text-base">
            <h2 className="font-display text-3xl text-primary font-bold">Patrol Squad & Training</h2>
            <p>
              The Road Safety Patrol (RSP) at Brotherhood School is a select volunteer force of students from Classes IX to XI. RSP cadets are trained by local traffic police personnel to understand standard traffic signals, pedestrian rights, and first aid basics.
            </p>
            <p>
              Being an RSP cadet fosters deep civic responsibility, self-discipline, and concern for public safety. Cadets wear a distinct white-and-navy patrol uniform and help manage school gate crowds.
            </p>
          </div>

          <div className="lg:col-span-5 relative group border border-gold/30 rounded-3xl overflow-hidden shadow-elegant img-hover-effect">
            <img
              src={aboutImage3}
              alt="RSP Patrol Squad Parade"
              className="w-full h-[320px] object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 bg-navy-deep/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur">
              RSP Patrol Cadets Assembly
            </div>
          </div>
        </div>

        {/* Duties */}
        <div className="grid gap-6 md:grid-cols-3 pt-6 border-t border-border">
          {duties.map((duty) => (
            <div key={duty.title} className="bg-card border border-border rounded-3xl p-8 shadow-sm hover:border-gold/60 transition duration-300">
              <div className="h-10 w-10 rounded-xl bg-primary/5 grid place-items-center mb-6">
                <duty.icon className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-display text-xl text-primary font-bold mb-3">{duty.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{duty.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
