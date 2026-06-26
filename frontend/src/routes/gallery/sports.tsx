import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import image2 from "../../images/aboutimage2.jpg";
import image3 from "../../images/aboutimage3.png";
import image4 from "../../images/aboutimage4.jpeg";

export const Route = createFileRoute("/gallery/sports")({
  head: () => ({
    meta: [
      { title: "Sports Gallery — Brotherhood School" },
      { name: "description", content: "Photos from athletic meets, inter-school tournaments, and football matches." },
    ],
  }),
  component: SportsGalleryPage,
});

function SportsGalleryPage() {
  const images = [
    { src: image2, title: "Inter-House Football League", desc: "Friendly matches played in the school field." },
    { src: image3, title: "Annual Athletic Meet", desc: "Track events and awards distribution quadrangle." },
    { src: image4, title: "Sports Day Ceremonies", desc: "Flag march past and physical drills by the houses." },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Media Archives"
        title="Sports Gallery"
        subtitle="Visual records of track events, football matches, and sports days."
      />

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {images.map((img, i) => (
            <div key={i} className="flex flex-col bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:border-gold/60 transition duration-300">
              <div className="aspect-[4/3] bg-muted overflow-hidden">
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-550"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-primary font-bold mb-2">{img.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{img.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
