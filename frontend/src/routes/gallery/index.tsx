import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { X, ChevronLeft, ChevronRight, Eye, Calendar, Sparkles, Trophy } from "lucide-react";

import imageCampus1 from "../../images/aboutimage2.jpg";
import imageCampus2 from "../../images/aboutimage4.jpeg";
import imageCampus3 from "../../images/schooluniform.png";
import imageEvents1 from "../../images/aboutimage3.png";
import imageEvents2 from "../../images/choir.png";
import imageEvents3 from "../../images/ecoclub.png";
import imageSports1 from "../../images/sports.png";
import imageSports2 from "../../images/result.png";

export const Route = createFileRoute("/gallery/")({
  head: () => ({
    meta: [
      { title: "Photo Gallery — Brotherhood School" },
      { name: "description", content: "Explore the visual archive of Brotherhood School campus infrastructure, sports events, and cultural student festivals." },
    ],
  }),
  component: GalleryIndexPage,
});

interface GalleryImage {
  src: string;
  category: "Campus" | "Events" | "Sports";
  title: string;
  desc: string;
}

function GalleryIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [latestEvents, setLatestEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultImages: GalleryImage[] = [
    { src: imageCampus1, category: "Campus", title: "Main Courtyard Pathways", desc: "Green and tree-lined walkways connecting administrative and academic blocks." },
    { src: imageEvents1, category: "Events", title: "Student Council Assembly", desc: "Elected leaders assembled in the main quadrangle during morning flag hoisting." },
    { src: imageCampus2, category: "Campus", title: "Science Laboratories", desc: "Equipped with organic compounds, micro-telescopes, and safety guides." },
    { src: imageEvents2, category: "Events", title: "School Choir Recital", desc: "The vocal group performing choral tracks during the annual valedictory ceremony." },
    { src: imageSports1, category: "Sports", title: "Football Coaching", desc: "Senior teams practicing drills and goal coordination with physical education coaches." },
    { src: imageEvents3, category: "Events", title: "Eco Club Coastal Planting", desc: "Club members erecting saplings along the local neighborhood pathway." },
    { src: imageCampus3, category: "Campus", title: "Classroom Smart Desks", desc: "Interactive digital projectors showing curriculum worksheets to students." },
    { src: imageSports2, category: "Sports", title: "Zonal Athletics Victory", desc: "Relay team posing with the runners-up cup at the zonal athletic meet." },
  ];

  const defaultUpcoming = [
    { date: "June 25, 2026", title: "Inaugural School Assembly", desc: "Welcoming candidate intakes for the 2026-27 term with blessings and values orientation." },
    { date: "July 12, 2026", title: "Inter-House Debate Cup", desc: "Red, Blue, Green, and Gold house debate groups contesting public speaking topics." },
    { date: "August 15, 2026", title: "Independence Day Parade", desc: "March past from Scouts & Guides, Road Safety Patrol cadets, and national flag ceremonies." }
  ];

  const defaultLatest = [
    { date: "May 20, 2026", title: "Board Examination Results", desc: "Announcing standard-setting 100% pass results with record centum holders in Maths and Chemistry." },
    { date: "April 15, 2026", title: "Science & Robotics Exhibition", desc: "STEM project models, robot pathfinders, and math models presented by senior batches." }
  ];

  useEffect(() => {
    const fetchGalleryAndEvents = async () => {
      try {
        const [galleryRes, eventsRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/gallery-images/"),
          fetch("http://127.0.0.1:8000/api/events/")
        ]);

        if (galleryRes.ok) {
          const galleryData = await galleryRes.json();
          const galleryList = Array.isArray(galleryData) ? galleryData : (galleryData.results || []);
          if (galleryList.length > 0) {
            const mappedGallery = galleryList.map((img: any) => {
              let cat: "Campus" | "Events" | "Sports" = "Events";
              if (img.category === "Academics" || img.category === "Celebrations") {
                cat = "Campus";
              } else if (img.category === "Sports") {
                cat = "Sports";
              }
              return {
                src: img.image,
                category: cat,
                title: img.title || "Campus Life",
                desc: img.description || "Captured moment at Brotherhood School."
              };
            });
            setImages(mappedGallery);
          } else {
            setImages(defaultImages);
          }
        } else {
          setImages(defaultImages);
        }

        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          const eventsList = Array.isArray(eventsData) ? eventsData : (eventsData.results || []);
          if (eventsList.length > 0) {
            const todayStr = new Date().toISOString().split("T")[0];
            
            const upcoming = eventsList
              .filter((ev: any) => ev.event_date > todayStr && ev.status === "Published")
              .map((ev: any) => ({
                date: new Date(ev.event_date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
                title: ev.title,
                desc: ev.description
              }));
              
            const latest = eventsList
              .filter((ev: any) => ev.event_date <= todayStr && ev.status === "Published")
              .map((ev: any) => ({
                date: new Date(ev.event_date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
                title: ev.title,
                desc: ev.description
              }));

            setUpcomingEvents(upcoming.length > 0 ? upcoming : defaultUpcoming);
            setLatestEvents(latest.length > 0 ? latest : defaultLatest);
          } else {
            setUpcomingEvents(defaultUpcoming);
            setLatestEvents(defaultLatest);
          }
        } else {
          setUpcomingEvents(defaultUpcoming);
          setLatestEvents(defaultLatest);
        }
      } catch (err) {
        console.error("Error fetching gallery/events data:", err);
        setImages(defaultImages);
        setUpcomingEvents(defaultUpcoming);
        setLatestEvents(defaultLatest);
      } finally {
        setLoading(false);
      }
    };
    fetchGalleryAndEvents();
  }, []);

  const filteredImages = selectedCategory === "All" 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev === 0 ? filteredImages.length - 1 : prev! - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev === filteredImages.length - 1 ? 0 : prev! + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setLightboxIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredImages]);

  return (
    <>
      <PageHeader
        eyebrow="Media Archives"
        title="School Gallery"
        subtitle="Visual stories from classrooms, laboratory blocks, athletic meets, and student councils."
      />

      <section className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-2.5 justify-center border-b border-border pb-6">
          {["All", "Campus", "Events", "Sports"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setLightboxIndex(null);
              }}
              className={`rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide transition duration-200 ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border border-border hover:bg-primary/5 text-muted-foreground hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid Photo Layout */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gold mx-auto"></div>
            <p className="text-xs text-muted-foreground mt-4 uppercase tracking-widest font-semibold font-sans">Loading Gallery Archives...</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 animate-fade-in">
            {filteredImages.map((img, i) => (
              <div
                key={i}
                onClick={() => setLightboxIndex(i)}
                className="break-inside-avoid bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:border-gold/60 cursor-pointer group hover:shadow-elegant transition-all duration-300 relative"
              >
                <div className="relative overflow-hidden aspect-[4/3] sm:aspect-auto">
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Hover overlay icons */}
                  <div className="absolute inset-0 bg-navy-deep/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Eye className="h-6 w-6" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-[10px] uppercase tracking-wider text-gold font-bold mb-1">{img.category}</div>
                  <h3 className="font-display text-lg text-primary font-bold">{img.title}</h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{img.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Events Timelines */}
        <div className="grid gap-12 md:grid-cols-2 pt-12 border-t border-border">
          {/* Upcoming Events */}
          <div className="space-y-6">
            <h3 className="font-display text-2xl text-primary font-bold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gold" /> Upcoming Campus Events
            </h3>
            <div className="relative border-l-2 border-primary/20 pl-6 space-y-6 py-1">
              {upcomingEvents.map((ev) => (
                <div key={ev.title} className="relative">
                  <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full bg-gold ring-4 ring-background" />
                  <div className="text-xs text-gold font-bold">{ev.date}</div>
                  <h4 className="font-display text-lg text-primary font-bold mt-1">{ev.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{ev.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Events */}
          <div className="space-y-6">
            <h3 className="font-display text-2xl text-primary font-bold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-gold" /> Latest Events & Highlights
            </h3>
            <div className="relative border-l-2 border-primary/20 pl-6 space-y-6 py-1">
              {latestEvents.map((ev) => (
                <div key={ev.title} className="relative">
                  <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full bg-primary ring-4 ring-background" />
                  <div className="text-xs text-gold font-bold">{ev.date}</div>
                  <h4 className="font-display text-lg text-primary font-bold mt-1">{ev.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{ev.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Preview Modal */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex flex-col justify-between bg-navy-deep/95 backdrop-blur-md p-4 text-white animate-fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top close bar */}
          <div className="flex justify-between items-center w-full max-w-7xl mx-auto py-2 relative z-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-soft">
              Image {lightboxIndex + 1} of {filteredImages.length}
            </span>
            <button
              onClick={() => setLightboxIndex(null)}
              className="h-10 w-10 rounded-full border border-white/25 bg-white/5 hover:bg-white/15 flex items-center justify-center active:scale-95 transition-all text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Core content slide area */}
          <div className="flex-1 flex items-center justify-between w-full max-w-7xl mx-auto relative px-4 sm:px-8">
            <button
              onClick={handlePrev}
              className="h-12 w-12 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 flex items-center justify-center active:scale-95 transition-all text-white select-none shrink-0"
              aria-label="Previous Image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div 
              className="max-w-4xl max-h-[60vh] sm:max-h-[70vh] flex items-center justify-center p-2 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].title}
                className="max-w-full max-h-[60vh] sm:max-h-[70vh] object-contain rounded-2xl shadow-elegant animate-scale-up"
              />
            </div>

            <button
              onClick={handleNext}
              className="h-12 w-12 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 flex items-center justify-center active:scale-95 transition-all text-white select-none shrink-0"
              aria-label="Next Image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Bottom text descriptions */}
          <div className="w-full max-w-2xl mx-auto text-center pb-8 pt-4 relative z-10" onClick={(e) => e.stopPropagation()}>
            <div className="text-xs uppercase tracking-widest text-gold font-bold mb-1.5">
              {filteredImages[lightboxIndex].category}
            </div>
            <h4 className="font-display text-2xl font-bold mb-2 text-white">
              {filteredImages[lightboxIndex].title}
            </h4>
            <p className="text-sm text-white/80 leading-relaxed max-w-xl mx-auto">
              {filteredImages[lightboxIndex].desc}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
