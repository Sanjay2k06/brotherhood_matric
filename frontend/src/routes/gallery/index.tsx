import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { API_BASE } from "@/config";
import { X, ChevronLeft, ChevronRight, Eye, Calendar, Sparkles, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import imageCampus1 from "../../images/aboutimage2.jpg";
import imageCampus2 from "../../images/aboutimage4.jpeg";
import imageCampus3 from "../../images/schooluniform.jpg";
import imageEvents1 from "../../images/aboutimage3.jpg";
import imageEvents2 from "../../images/choir.jpg";
import imageEvents3 from "../../images/ecoclub.jpg";
import imageSports1 from "../../images/sports.jpg";
import imageSports2 from "../../images/result.jpg";

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
          fetch(`${API_BASE}/gallery-images/`),
          fetch(`${API_BASE}/events/`)
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

      {/* Main Gallery Showcase Section */}
      <section className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 relative bg-white border-b border-[#e2e8f0] overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Section Introduction Heading */}
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-10 sm:mb-14">
            <div className="inline-flex items-center justify-center gap-3 sm:gap-4">
              <div className="w-8 sm:w-12 h-[1px] bg-[#d4af37]"></div>
              <span className="text-[#d4af37] uppercase tracking-[0.2em] text-xs font-bold">
                Visual Archives
              </span>
              <div className="w-8 sm:w-12 h-[1px] bg-[#d4af37]"></div>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0a2b18] leading-[1.15] font-normal tracking-tight break-words">
              Moments of <span className="italic text-[#1b4d32]">Excellence</span> & Campus Life
            </h2>

            <p className="text-[#6c8274] font-light text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Explore photographs capturing classroom scholarship, scientific innovation, athletic achievements, and vibrant student traditions across Brotherhood School.
            </p>
          </div>

          {/* Category Filter Pills - Perfectly Centered */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3.5 justify-center mb-10 sm:mb-16 relative z-10">
            {["All", "Campus", "Events", "Sports"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setLightboxIndex(null);
                }}
                className={`relative px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm uppercase tracking-widest font-bold transition-all duration-300 overflow-hidden ${
                  selectedCategory === cat
                    ? "text-white shadow-md"
                    : "text-[#6c8274] hover:text-[#0a2b18] border border-[#e2e8f0] bg-[#f7faf8] hover:border-[#d4af37]/60"
                }`}
              >
                {selectedCategory === cat && (
                  <motion.div 
                    layoutId="activeFilter" 
                    className="absolute inset-0 bg-[#0a2b18]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>

          {/* Perfectly Aligned Responsive Grid */}
          <div>
            {loading ? (
              <div className="text-center py-32 space-y-4">
                <div className="w-12 h-12 border-2 border-[#e2e8f0] border-t-[#d4af37] rounded-full animate-spin mx-auto"></div>
                <p className="text-xs text-[#718096] uppercase tracking-widest font-bold">Curating Archives...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredImages.map((img, i) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 20 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      key={img.src + img.title}
                      onClick={() => setLightboxIndex(i)}
                      className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] group cursor-pointer shadow-[0_10px_30px_rgba(10,43,24,0.06)] hover:shadow-2xl transition-all duration-500 bg-[#06180d] border border-gray-100"
                    >
                      {/* Image */}
                      <img
                        src={img.src}
                        alt={img.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#05140b]/95 via-[#05140b]/40 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

                      {/* Category Badge Top-Left */}
                      <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-20 pointer-events-none">
                        <span className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-[11px] uppercase font-bold tracking-widest bg-[#05140b]/85 text-[#d4af37] border border-[#d4af37]/40 backdrop-blur-md shadow-md">
                          {img.category}
                        </span>
                      </div>

                      {/* Center Zoom Icon on Hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 scale-90 group-hover:scale-100 pointer-events-none z-20">
                        <div className="w-12 h-12 rounded-full bg-[#d4af37] text-[#05140b] flex items-center justify-center shadow-xl">
                          <Plus className="h-6 w-6 stroke-[2.5]" />
                        </div>
                      </div>

                      {/* Info Panel Aligned at Bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-20 pointer-events-none">
                        <div className="w-6 h-[2px] bg-[#d4af37] mb-2 group-hover:w-12 transition-all duration-400"></div>
                        <h3 className="font-serif text-base sm:text-lg text-white font-medium leading-snug drop-shadow-md line-clamp-1">
                          {img.title}
                        </h3>
                        <p className="text-white/70 text-xs font-light line-clamp-2 mt-1 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                          {img.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Dynamic Events Section - Cinematic Layout */}
      <section className="py-16 sm:py-24 md:py-32 bg-[#05140b] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#1b4d32_0%,transparent_50%)] opacity-20 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16 sm:space-y-24">
          
          {/* Upcoming Events */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            <div className="mb-10 sm:mb-16 flex flex-col items-center text-center">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-5">
                <div className="w-8 sm:w-12 h-[1px] bg-[#d4af37]/60"></div>
                <span className="text-[#d4af37] uppercase tracking-[0.2em] text-[10px] sm:text-[11px] font-bold">Future</span>
                <div className="w-8 sm:w-12 h-[1px] bg-[#d4af37]/60"></div>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white break-words">Upcoming Campus Events</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {upcomingEvents.map((ev) => (
                <div key={ev.title} className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-[2rem] p-6 sm:p-10 group hover:bg-[#1b4d32]/20 hover:border-[#d4af37]/50 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden flex flex-col justify-between h-full">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#d4af37] rounded-full blur-[70px] opacity-[0.03] group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#d4af37]/30 flex items-center justify-center bg-[#05140b] shrink-0">
                        <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-[#d4af37]" />
                      </div>
                      <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#d4af37] font-bold">{ev.date}</div>
                    </div>
                    
                    <h4 className="font-serif text-xl sm:text-2xl text-white mb-3 sm:mb-4 leading-snug">{ev.title}</h4>
                    <p className="text-white/60 font-light leading-relaxed text-sm sm:text-[15px]">{ev.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Latest Events */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}>
            <div className="mb-10 sm:mb-16 flex flex-col items-center text-center">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-5">
                <div className="w-8 sm:w-12 h-[1px] bg-white/40"></div>
                <span className="text-white/60 uppercase tracking-[0.2em] text-[10px] sm:text-[11px] font-bold">Past</span>
                <div className="w-8 sm:w-12 h-[1px] bg-white/40"></div>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white/90 break-words">Latest Highlights</h3>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              {latestEvents.map((ev) => {
                const dateParts = ev.date.split(' ');
                const month = dateParts[0];
                const day = dateParts[1]?.replace(',', '');
                const year = dateParts[2];

                return (
                  <div key={ev.title} className="bg-transparent border border-white/10 rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10 group hover:bg-white/[0.02] hover:border-white/20 transition-all duration-500 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-[60px] opacity-[0.01] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none"></div>
                     
                     <div className="shrink-0 text-center bg-[#05140b] border border-white/10 rounded-xl sm:rounded-[1.5rem] p-4 sm:p-5 min-w-[90px] sm:min-w-[110px] group-hover:border-white/30 transition-colors shadow-inner">
                       <div className="text-white font-serif text-2xl sm:text-3xl mb-1">{day}</div>
                       <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-white/50 font-bold">{month}</div>
                       <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-white/50 font-bold mt-1">{year}</div>
                     </div>
                     
                     <div className="relative z-10 pt-1 sm:pt-2">
                       <h4 className="font-serif text-xl sm:text-2xl text-white/90 mb-2 sm:mb-3 leading-snug">{ev.title}</h4>
                       <p className="text-white/50 font-light leading-relaxed text-sm sm:text-[15px]">{ev.desc}</p>
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
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#030906]/95 backdrop-blur-xl p-3 sm:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Bar */}
            <div className="flex justify-between items-center w-full relative z-10">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-6 sm:w-8 h-[1px] bg-[#d4af37]"></div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                  {lightboxIndex + 1} / {filteredImages.length}
                </span>
              </div>
              <button
                onClick={() => setLightboxIndex(null)}
                className="group h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-white/20 bg-white/5 hover:bg-[#d4af37] flex items-center justify-center transition-all duration-300"
              >
                <X className="h-5 w-5 text-white group-hover:text-[#0a2b18]" />
              </button>
            </div>

            {/* Image Area */}
            <div className="flex-1 flex items-center justify-between w-full relative">
              <button
                onClick={handlePrev}
                className="group h-10 w-10 sm:h-14 sm:w-14 rounded-full border border-white/20 bg-white/5 hover:bg-[#d4af37] flex items-center justify-center transition-all duration-300 shrink-0 mx-1 sm:mx-8 z-10"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white group-hover:text-[#0a2b18] group-hover:-translate-x-0.5 transition-transform" />
              </button>

              <div 
                className="w-full h-full flex items-center justify-center p-2 sm:p-4 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
                  src={filteredImages[lightboxIndex].src}
                  alt={filteredImages[lightboxIndex].title}
                  className="max-w-full max-h-[70vh] sm:max-h-[75vh] object-contain rounded-xl sm:rounded-[2rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10"
                />
              </div>

              <button
                onClick={handleNext}
                className="group h-10 w-10 sm:h-14 sm:w-14 rounded-full border border-white/20 bg-white/5 hover:bg-[#d4af37] flex items-center justify-center transition-all duration-300 shrink-0 mx-1 sm:mx-8 z-10"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white group-hover:text-[#0a2b18] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="w-full text-center pb-2 sm:pb-4 relative z-10" onClick={(e) => e.stopPropagation()}>
              <motion.div key={`caption-${lightboxIndex}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-bold mb-1 sm:mb-3">
                  {filteredImages[lightboxIndex].category}
                </div>
                <h4 className="font-serif text-xl sm:text-2xl md:text-3xl font-medium mb-1 sm:mb-3 text-white drop-shadow-lg">
                  {filteredImages[lightboxIndex].title}
                </h4>
                <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed max-w-2xl mx-auto px-4">
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
