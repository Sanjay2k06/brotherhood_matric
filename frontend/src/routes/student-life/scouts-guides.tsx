import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Compass, Sparkles, Shield, Heart } from "lucide-react";
import aboutImage2 from "../../images/aboutimage2.jpg";

export const Route = createFileRoute("/student-life/scouts-guides")({
  head: () => ({
    meta: [
      { title: "Scouts & Guides — Brotherhood School" },
      { name: "description", content: "Learn about the Scouts & Guides unit training camps, badges, and social services at Brotherhood." },
    ],
  }),
  component: ScoutsGuidesPage,
});

function ScoutsGuidesPage() {
  const pillars = [
    { title: "Outdoor Camping", desc: "Developing wilderness survival, woodcraft skills, navigation, and camping discipline.", icon: Compass },
    { title: "Knotting & Pioneering", desc: "Mastering practical ropes, pioneering bridges, trestles, and flagstaff structures.", icon: Shield },
    { title: "First-Aid Training", desc: "Essential medical knowledge, bandaging techniques, splinting, and emergency rescue methods.", icon: Heart },
    { title: "Social Service", desc: "Organizing blood donation drives, cleaning public spaces, and disaster mitigation drills.", icon: Sparkles },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Youth Empowerment"
        title="Scouts & Guides"
        subtitle="Building character, survival skills, and a commitment to serve."
      />

      <section className="max-w-6xl mx-auto px-6 py-20 space-y-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-display text-3xl text-primary font-bold">Be Prepared</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            The Bharat Scouts & Guides unit of Brotherhood School focuses on physical, mental, and spiritual development. Through the patrol system, scouts discover peer leadership and outdoor skills.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {pillars.map((item) => (
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
            <h3 className="font-display text-2xl text-primary font-bold">Rajya Puraskar & Rashtrapati Awards</h3>
            <p>
              Our scouts and guides actively train to achieve Rajya Puraskar (Governor's Award) and Rashtrapati Scout/Guide Award (President's Award), which are highly respected milestones.
            </p>
            <p>
              The scouts attend weekend camps, participate in standard-setting hiking expeditions, and develop self-reliance and community-minded ideals.
            </p>
          </div>
          <div className="md:col-span-5 relative group img-hover-effect rounded-3xl overflow-hidden shadow-elegant border border-border">
            <img
              src={aboutImage2}
              alt="Bharat Scouts and Guides Outdoor Training"
              className="w-full h-[250px] object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>
    </>
  );
}
