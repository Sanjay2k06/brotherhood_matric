import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { X, ChevronLeft, ChevronRight, Eye, Calendar, Sparkles, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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

import { fadeUp } from "../../lib/motion";

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
    <div className="bg-[#fdfdfc] text-[#2d3748] font-sans selection:bg-[#0a2b18] selection:text-white">
      <PageHeader
        eyebrow="Media Archives"
        title="School Gallery"
        subtitle="Visual stories from classrooms, laboratory blocks, athletic meets, and student councils."
      />

      <section className="py-24 px-6 relative bg-[#fdfdfc]">
        {/* Category Filter Pills - Premium Style */}
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4 justify-center mb-20 relative z-10">
          {["All", "Campus", "Events", "Sports"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setLightboxIndex(null);
              }}
              className={`relative px-8 py-3 rounded-full text-sm uppercase tracking-widest font-bold transition-all duration-500 overflow-hidden ${
                selectedCategory === cat
                  ? "text-white"
                  : "text-[#718096] hover:text-[#0a2b18] border border-[#e2e8f0] bg-white hover:border-[#d4af37]"
              }`}
            >
              {selectedCategory === cat && (
                <motion.div 
                  layoutId="activeFilter" 
                  className="absolute inset-0 bg-[#0a2b18]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Cinematic Masonry Gallery */}
        <div className="max-w-[1400px] mx-auto relative z-10">
          {loading ? (
            <div className="text-center py-32">
              <div className="w-12 h-12 border-2 border-[#e2e8f0] border-t-[#d4af37] rounded-full animate-spin mx-auto"></div>
              <p className="text-xs text-[#718096] mt-6 uppercase tracking-widest font-bold">Curating Archives...</p>
            </div>
          ) : (
            <motion.div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              <AnimatePresence mode="popLayout">
                {filteredImages.map((img, i) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    key={img.src + img.category}
                    onClick={() => setLightboxIndex(i)}
                    className="break-inside-avoid relative rounded-[2rem] overflow-hidden group cursor-pointer shadow-[0_15px_30px_rgba(10,43,24,0.05)] hover:shadow-2xl transition-all duration-700"
                  >
                    <div className="relative w-full overflow-hidden">
                      <img
                        src={img.src}
                        alt={img.title}
                        className="w-full h-auto object-cover transform transition-transform duration-[1.5s] group-hover:scale-[1.07] sepia-[0.05] group-hover:sepia-0"
                      />
                      {/* Premium Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a2b18] via-[#0a2b18]/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>
                      
                      {/* Hover Center Icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                          <Plus className="h-6 w-6 text-[#d4af37]" />
                        </div>
                      </div>

                      {/* Info Panel (Bottom) */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                        <div className="w-8 h-[1px] bg-[#d4af37] mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-bold mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-150">{img.category}</div>
                        <h3 className="font-serif text-xl md:text-2xl text-white font-medium mb-1 drop-shadow-lg">{img.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Dynamic Events Section - Cinematic Layout */}
      <section className="py-24 md:py-32 bg-[#05140b] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#1b4d32_0%,transparent_50%)] opacity-20 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-24">
          
          {/* Upcoming Events */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            <div className="mb-16 flex flex-col items-center text-center">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-[1px] bg-[#d4af37]/60"></div>
                <span className="text-[#d4af37] uppercase tracking-[0.2em] text-[11px] font-bold">Future</span>
                <div className="w-12 h-[1px] bg-[#d4af37]/60"></div>
              </div>
              <h3 className="font-serif text-4xl md:text-5xl text-white">Upcoming Campus Events</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((ev) => (
                <div key={ev.title} className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-[2rem] p-10 group hover:bg-[#1b4d32]/20 hover:border-[#d4af37]/50 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden flex flex-col justify-between h-full">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#d4af37] rounded-full blur-[70px] opacity-[0.03] group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-full border border-[#d4af37]/30 flex items-center justify-center bg-[#05140b]">
                        <Calendar className="h-5 w-5 text-[#d4af37]" />
                      </div>
                      <div className="text-[11px] uppercase tracking-widest text-[#d4af37] font-bold">{ev.date}</div>
                    </div>
                    
                    <h4 className="font-serif text-2xl text-white mb-4 leading-snug">{ev.title}</h4>
                    <p className="text-white/60 font-light leading-relaxed text-[15px]">{ev.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Latest Events */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}>
            <div className="mb-16 flex flex-col items-center text-center">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-[1px] bg-white/40"></div>
                <span className="text-white/60 uppercase tracking-[0.2em] text-[11px] font-bold">Past</span>
                <div className="w-12 h-[1px] bg-white/40"></div>
              </div>
              <h3 className="font-serif text-4xl md:text-5xl text-white/90">Latest Highlights</h3>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {latestEvents.map((ev) => {
                const dateParts = ev.date.split(' ');
                const month = dateParts[0];
                const day = dateParts[1]?.replace(',', '');
                const year = dateParts[2];

                return (
                  <div key={ev.title} className="bg-transparent border border-white/10 rounded-[2.5rem] p-8 md:p-10 group hover:bg-white/[0.02] hover:border-white/20 transition-all duration-500 flex flex-col sm:flex-row gap-8 items-start relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-[60px] opacity-[0.01] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none"></div>
                     
                     <div className="shrink-0 text-center bg-[#05140b] border border-white/10 rounded-[1.5rem] p-5 min-w-[110px] group-hover:border-white/30 transition-colors shadow-inner">
                       <div className="text-white font-serif text-3xl mb-1">{day}</div>
                       <div className="text-[10px] uppercase tracking-[0.25em] text-white/50 font-bold">{month}</div>
                       <div className="text-[10px] uppercase tracking-[0.25em] text-white/50 font-bold mt-1">{year}</div>
                     </div>
                     
                     <div className="relative z-10 pt-2">
                       <h4 className="font-serif text-2xl text-white/90 mb-3 leading-snug">{ev.title}</h4>
                       <p className="text-white/50 font-light leading-relaxed text-[15px]">{ev.desc}</p>
                     </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </section>

      {/* Cinematic Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#030906]/95 backdrop-blur-xl p-4 sm:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Bar */}
            <div className="flex justify-between items-center w-full relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-8 h-[1px] bg-[#d4af37]"></div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                  {lightboxIndex + 1} / {filteredImages.length}
                </span>
              </div>
              <button
                onClick={() => setLightboxIndex(null)}
                className="group h-12 w-12 rounded-full border border-white/20 bg-white/5 hover:bg-[#d4af37] flex items-center justify-center transition-all duration-300"
              >
                <X className="h-5 w-5 text-white group-hover:text-[#0a2b18]" />
              </button>
            </div>

            {/* Image Area */}
            <div className="flex-1 flex items-center justify-between w-full relative">
              <button
                onClick={handlePrev}
                className="group h-14 w-14 rounded-full border border-white/20 bg-white/5 hover:bg-[#d4af37] flex items-center justify-center transition-all duration-300 shrink-0 mx-2 sm:mx-8 z-10"
              >
                <ChevronLeft className="h-6 w-6 text-white group-hover:text-[#0a2b18] group-hover:-translate-x-0.5 transition-transform" />
              </button>

              <div 
                className="w-full h-full flex items-center justify-center p-4 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
                  src={filteredImages[lightboxIndex].src}
                  alt={filteredImages[lightboxIndex].title}
                  className="max-w-full max-h-[75vh] object-contain rounded-[2rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10"
                />
              </div>

              <button
                onClick={handleNext}
                className="group h-14 w-14 rounded-full border border-white/20 bg-white/5 hover:bg-[#d4af37] flex items-center justify-center transition-all duration-300 shrink-0 mx-2 sm:mx-8 z-10"
              >
                <ChevronRight className="h-6 w-6 text-white group-hover:text-[#0a2b18] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="w-full text-center pb-4 relative z-10" onClick={(e) => e.stopPropagation()}>
              <motion.div key={`caption-${lightboxIndex}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                <div className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-bold mb-3">
                  {filteredImages[lightboxIndex].category}
                </div>
                <h4 className="font-serif text-3xl font-medium mb-3 text-white drop-shadow-lg">
                  {filteredImages[lightboxIndex].title}
                </h4>
                <p className="text-sm text-white/60 font-light leading-relaxed max-w-2xl mx-auto">
                  {filteredImages[lightboxIndex].desc}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
