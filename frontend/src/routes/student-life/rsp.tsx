import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { ShieldAlert, Compass, Users, Heart } from "lucide-react";
import aboutImage3 from "../../images/aboutimage3.jpg";

export const Route = createFileRoute("/student-life/rsp")({
  head: () => ({
    meta: [
      { title: "RSP (Road Safety Patrol) — Brotherhood School" },
      { name: "description", content: "Details about the Road Safety Patrol (RSP) unit, student duties, and traffic safety programs." },
    ],
  }),
  component: RspPage,
});

function RspPage() {
  const activities = [
    { title: "Traffic Regulations", desc: "Learning street sign interpretations, pedestrian rights, and vehicle speed awareness.", icon: Compass },
    { title: "Dispersal Assistance", desc: "Helping junior classes cross the streets safely outside the school gates during peak hours.", icon: Users },
    { title: "Drill Practice", desc: "Participating in rhythmic cadet marches, signal flags, and physical fitness parades.", icon: ShieldAlert },
    { title: "Community Service", desc: "Visiting local traffic booths, distributing road safety leaflets, and supporting campaigns.", icon: Heart },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Youth Cadet Corps"
        title="RSP (Road Safety Patrol)"
        subtitle="Serving the community and maintaining traffic discipline outside school gates."
      />

      <section className="max-w-6xl mx-auto px-6 py-20 space-y-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-display text-3xl text-primary font-bold">Duty, Safety, and Awareness</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            The Road Safety Patrol (RSP) is a voluntary youth service unit that empowers students to act as ambassadors of safety. Our cadets are trained to recognize traffic hazards and assist in managing student flow.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {activities.map((item) => (
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
            <h3 className="font-display text-2xl text-primary font-bold">Patrol Training</h3>
            <p>
              Cadets receive training under the supervision of local traffic police inspectors. Upon completing basic courses, they are awarded uniform badges and caps.
            </p>
            <p>
              The unit instills leadership, alertness, and a strong sense of civic responsibility. Cadets play an important role during Independence Day and Sports Day parades.
            </p>
          </div>
          <div className="md:col-span-5 relative group img-hover-effect rounded-3xl overflow-hidden shadow-elegant border border-border">
            <img
              src={aboutImage3}
              alt="Road Safety Patrol Cadet Parade Ground"
              className="w-full h-[250px] object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>
    </>
  );
}
