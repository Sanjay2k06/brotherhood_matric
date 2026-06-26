import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import image2 from "../../images/aboutimage2.jpg";
import image3 from "../../images/aboutimage3.png";
import image4 from "../../images/aboutimage4.jpeg";

export const Route = createFileRoute("/gallery/campus")({
  head: () => ({
    meta: [
      { title: "Campus Gallery — Brotherhood School" },
      { name: "description", content: "Photos and visual archives of the school campus buildings and facilities." },
    ],
  }),
  component: CampusGalleryPage,
});

function CampusGalleryPage() {
  const images = [
    { src: image2, title: "Main Courtyard Pathways", desc: "Green and tree-lined walkways connecting blocks." },
    { src: image3, title: "Assembly Quadrangle", desc: "The main quadrangle for morning assemblies and flag ceremonies." },
    { src: image4, title: "Interactive Classrooms", desc: "Modern smart desks and projector displays." },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Media Archives"
        title="Campus Gallery"
        subtitle="Visual highlights of buildings, classrooms, and school infrastructure."
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
