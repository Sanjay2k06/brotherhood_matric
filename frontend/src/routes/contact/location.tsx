import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { MapPin, Navigation, Bus, Car } from "lucide-react";
import aboutImage3 from "../../images/aboutimage3.png";

export const Route = createFileRoute("/contact/location")({
  head: () => ({
    meta: [
      { title: "Location & Directions — Brotherhood School" },
      { name: "description", content: "Locate our Neelankarai, Chennai campus on Google Maps. Read bus routes, driving directions, and local landmarks." },
    ],
  }),
  component: LocationPage,
});

function LocationPage() {
  const directions = [
    {
      mode: "By Bus",
      icon: Bus,
      desc: "Get down at Neelankarai Bus Stop on East Coast Road (ECR). The school is located just a 5-minute walk down 2nd Street in Kazura Garden, next to local landmarks."
    },
    {
      mode: "By Car / Two-Wheeler",
      icon: Car,
      desc: "Drive down ECR towards Neelankarai. Turn into Kazura Garden Street (near the Neelankarai signal intersection) and proceed to 2nd Street."
    },
    {
      mode: "Landmarks",
      icon: Navigation,
      desc: "Located near Kazura Garden Children's Park, Neelankarai, South Chennai."
    }
  ];

  return (
    <>
      <PageHeader
        eyebrow="Find Us"
        title="Campus Location"
        subtitle="Detailed maps, driving directions, and public transit info to reach us."
      />

      <section className="max-w-6xl mx-auto px-6 py-20 space-y-12">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Map Embed */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-display text-3xl text-primary font-bold">Google Maps</h2>
            <div className="rounded-3xl overflow-hidden border border-border shadow-sm aspect-[4/3] sm:aspect-[16/10] bg-card">
              <iframe
                title="Brotherhood School Location Map"
                src="https://www.google.com/maps?q=Neelankarai,+Palavakkam,+Chennai,+Tamil+Nadu+600041&output=embed"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>

          {/* Directions Details */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display text-3xl text-primary font-bold">Directions & Address</h2>

            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm flex gap-4">
              <div className="h-10 w-10 rounded-xl bg-primary/5 grid place-items-center shrink-0">
                <MapPin className="h-5 w-5 text-gold" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-gold font-semibold">Postal Address</h4>
                <p className="text-foreground text-sm font-medium mt-1 leading-relaxed">
                  2nd Street, Kazura Garden, Neelankarai,<br />
                  Palavakkam, Chennai, Tamil Nadu 600041
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {directions.map((dir) => (
                <div key={dir.mode} className="bg-card border border-border rounded-3xl p-6 shadow-sm flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/5 grid place-items-center shrink-0">
                    <dir.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-gold font-semibold">{dir.mode}</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed mt-1">{dir.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual Image Banner */}
            <div className="relative group img-hover-effect rounded-3xl overflow-hidden shadow-elegant border border-border mt-6">
              <img
                src={aboutImage3}
                alt="School Campus Gate Entrance"
                className="w-full h-[220px] object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-3 left-3 bg-navy-deep/80 text-white text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full backdrop-blur">
                School Main Entrance Gate
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
