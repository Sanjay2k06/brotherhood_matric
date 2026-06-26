import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import image2 from "../../images/aboutimage2.jpg";
import image3 from "../../images/aboutimage3.png";
import image4 from "../../images/aboutimage4.jpeg";
import { Laptop, BookOpen, Compass, Trophy, Microscope, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/about/infrastructure")({
  head: () => ({
    meta: [
      { title: "Infrastructure — Brotherhood School" },
      { name: "description", content: "Learn about the advanced campus infrastructure at Brotherhood, including labs, library, smart classes, and sports grounds." },
    ],
  }),
  component: InfrastructurePage,
});

function InfrastructurePage() {
  const infraItems = [
    {
      name: "Smart Classrooms",
      desc: "Our classrooms are fully digitised with high-quality interactive projectors and audio systems, creating immersive lessons and catering to auditory and visual learners.",
      icon: Laptop,
    },
    {
      name: "Language Lab",
      desc: "An audio-visual setup dedicated to honing pronunciation, public speaking, and fluency in English and other regional languages through specialized software.",
      icon: MessageSquare,
    },
    {
      name: "Robotics Lab",
      desc: "Equipped with STEM kits, microcontroller blocks, sensors, and basic soldering gear. Designed to teach programming logic, automation, and basic circuit design.",
      icon: Compass,
    },
    {
      name: "Mathematics Lab",
      desc: "Features solid geometry kits, abacus structures, metric charts, and models that allow students to explore mathematical concepts practically.",
      icon: Microscope,
    },
    {
      name: "Library",
      desc: "A spacious reading hall housing thousands of books, referencing encyclopedias, children's fiction, science journals, and online research terminals.",
      icon: BookOpen,
    },
    {
      name: "Sports Facilities",
      desc: "Includes our main football field, outdoor basketball court, cricket net pitches, and an indoor arena for table tennis and chess tournaments.",
      icon: Trophy,
    },
  ];

  const campusPhotos = [
    { src: image2, caption: "Spacious and green school courtyard pathways" },
    { src: image3, caption: "Main academic building entrance and sports assembly area" },
    { src: image4, caption: "Well-equipped interactive classrooms and student spaces" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Campus Resources"
        title="Infrastructure"
        subtitle="Explore the facilities, learning labs, and sports arenas built for student success."
      />

      {/* Facilities Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {infraItems.map((item) => (
          <div key={item.name} className="bg-card border border-border rounded-3xl p-8 shadow-sm hover:border-gold/60 transition duration-300">
            <div className="h-12 w-12 rounded-2xl bg-primary/5 grid place-items-center mb-6">
              <item.icon className="h-6 w-6 text-gold" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-primary mb-3">{item.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Campus Photos */}
      <section className="bg-muted/30 py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-3xl text-primary font-bold text-center mb-12">Campus Photos</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {campusPhotos.map((photo, index) => (
              <div key={index} className="flex flex-col">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-sm bg-card">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-center italic">{photo.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
