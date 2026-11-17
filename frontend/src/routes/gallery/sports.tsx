import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import image2 from "../../images/aboutimage2.jpg";
import image3 from "../../images/aboutimage3.jpg";
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {images.map((img, i) => (
            <div key={i} className="flex flex-col bg-white border border-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(10,43,24,0.06)] hover:shadow-2xl hover:border-[#d4af37]/40 transition-all duration-500 group">
              <div className="aspect-[4/3] bg-[#06180d] overflow-hidden relative">
                <img
                  src={img.src}
                  alt={img.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="w-6 h-[2px] bg-[#d4af37] mb-2 group-hover:w-12 transition-all duration-400"></div>
                  <h3 className="font-serif text-lg sm:text-xl text-[#0a2b18] font-bold mb-2">{img.title}</h3>
                  <p className="text-xs sm:text-sm text-[#6c8274] leading-relaxed font-light">{img.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
