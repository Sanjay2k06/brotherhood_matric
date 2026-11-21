import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { PageHeader } from "@/components/PageHeader";
import {
  Folder,
  FolderOpen,
  ArrowLeft,
  ChevronRight,
  X,
  ChevronLeft,
  Calendar,
  Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Strictly ONLY real school photos from frontend/images/gallery photos
import christmasProg1 from "../../images/gallery photos/christmas programme.JPG";
import christmasProg2 from "../../images/gallery photos/christamas progamme.JPG";
import foundersDay from "../../images/gallery photos/founders day.jpeg";
import investiture1 from "../../images/gallery photos/investiture ceremony.jpg";
import investiture2 from "../../images/gallery photos/investiture ceremony.jpeg";
import pongal1 from "../../images/gallery photos/pongal celebration.jpeg";
import pongal2 from "../../images/gallery photos/pongal celebratioin.jpeg";
import roadSafety1 from "../../images/gallery photos/road safety programme.jpeg";
import roadSafety2 from "../../images/gallery photos/road safety prog.jpeg";
import welcomeSchool1 from "../../images/gallery photos/welcome back to school.jpeg";
import welcomeSchool2 from "../../images/gallery photos/welcome back 2 school.jpeg";
import fruitsDay1 from "../../images/gallery photos/Fruits Day.jpeg";
import fruitsDay2 from "../../images/gallery photos/friuts day.jpeg";
import fruitsDay3 from "../../images/gallery photos/fruitsdayy.jpeg";
import yellowDay from "../../images/gallery photos/yellow day.jpeg";
import worldFoodDay from "../../images/gallery photos/world foodday.jpeg";
import { API_BASE } from "@/config";
import { getMergedGalleryFolders, toFolderId } from "@/lib/galleryData";

export const Route = createFileRoute("/gallery/")({
  head: () => ({
    meta: [
      { title: "Photo Gallery & Event Folders — Brotherhood School" },
      {
        name: "description",
        content:
          "Browse event folders and celebration photo archives of Brotherhood Matriculation Higher Secondary School.",
      },
    ],
  }),
  component: GalleryIndexPage,
});

interface GalleryPhoto {
  src: string;
  title: string;
  desc: string;
  folderId: string;
  folderName: string;
  date: string;
}

interface GalleryFolder {
  id: string;
  name: string;
  description: string;
  date: string;
  photos: GalleryPhoto[];
}

function GalleryIndexPage() {
  // Folder data definition strictly using only the 16 photos from gallery photos
  const folders: GalleryFolder[] = [
    {
      id: "christmas-celebration",
      name: "Christmas Celebration",
      description: "Annual Christmas Pageant, Choral Presentations & Nativity Celebrations",
      date: "December",
      photos: [
        {
          src: christmasProg1,
          title: "Annual Christmas Pageant & Choral Performance",
          desc: "Students and choir ensemble presenting traditional Christmas carols, drama, and festive goodwill.",
          folderId: "christmas-celebration",
          folderName: "Christmas Celebration",
          date: "December 2021",
        },
        {
          src: christmasProg2,
          title: "Nativity Presentation & Carol Recital",
          desc: "Joyful celebration of Brotherhood unity, student music, and holiday messages.",
          folderId: "christmas-celebration",
          folderName: "Christmas Celebration",
          date: "December 2021",
        },
      ],
    },
    {
      id: "pongal-celebration",
      name: "Pongal Celebration",
      description: "Traditional Tamil Harvest Festival, Cultural Attire & Festive Unity",
      date: "January",
      photos: [
        {
          src: pongal1,
          title: "Traditional Pongal Harvest Gathering",
          desc: "Faculty and students in traditional attire celebrating the harvest festival with thanksgiving.",
          folderId: "pongal-celebration",
          folderName: "Pongal Celebration",
          date: "January 2022",
        },
        {
          src: pongal2,
          title: "Pongal Cultural Festivities & Kolam",
          desc: "Campus cultural displays, music, and community joy commemorating Tamil heritage.",
          folderId: "pongal-celebration",
          folderName: "Pongal Celebration",
          date: "January 2022",
        },
      ],
    },
    {
      id: "investiture-ceremony",
      name: "Investiture Ceremony",
      description: "Student Council Oath of Office, Badge Investiture & Leadership Installation",
      date: "February",
      photos: [
        {
          src: investiture1,
          title: "Badge Investiture & Leadership Pledge",
          desc: "Student council office bearers receiving their badges and swearing loyalty to the institution.",
          folderId: "investiture-ceremony",
          folderName: "Investiture Ceremony",
          date: "February 2022",
        },
        {
          src: investiture2,
          title: "Student Council Oath of Office",
          desc: "Elected prefects and captains pledging to uphold school values, leadership, and discipline.",
          folderId: "investiture-ceremony",
          folderName: "Investiture Ceremony",
          date: "April 2022",
        },
      ],
    },
    {
      id: "fruits-day",
      name: "Fruits Day Celebration",
      description: "Primary and Kindergarten Fresh Fruit Exhibition, Nutrition Awareness & Tasting",
      date: "April",
      photos: [
        {
          src: fruitsDay1,
          title: "Primary Section Fruits Day Celebration",
          desc: "Primary students learning healthy dietary habits, nutrition values, and fruit identification.",
          folderId: "fruits-day",
          folderName: "Fruits Day Celebration",
          date: "April 2022",
        },
        {
          src: fruitsDay2,
          title: "Fresh Fruits Exhibition & Display",
          desc: "Hands-on exhibition promoting fresh fruits, vitamin nutrition, and healthy living.",
          folderId: "fruits-day",
          folderName: "Fruits Day Celebration",
          date: "April 2022",
        },
        {
          src: fruitsDay3,
          title: "Kindergarten Fruit Carnival",
          desc: "Creative sensory learning and vibrant colorful fruit baskets for kindergarteners.",
          folderId: "fruits-day",
          folderName: "Fruits Day Celebration",
          date: "April 2022",
        },
      ],
    },
    {
      id: "road-safety",
      name: "Road Safety Programme",
      description: "Road Safety Patrol (RSP) Drills & Civic Traffic Awareness Demonstration",
      date: "April",
      photos: [
        {
          src: roadSafety1,
          title: "Road Safety Patrol Demonstration",
          desc: "RSP cadets demonstrating traffic signals, pedestrian crossing etiquette, and road vigilance.",
          folderId: "road-safety",
          folderName: "Road Safety Programme",
          date: "April 2022",
        },
        {
          src: roadSafety2,
          title: "Traffic Awareness & Safety Campaign",
          desc: "Cadet parade and safety drills along the East Coast Road neighborhood.",
          folderId: "road-safety",
          folderName: "Road Safety Programme",
          date: "April 2022",
        },
      ],
    },
    {
      id: "welcome-back",
      name: "Welcome Back to School",
      description: "Reopening Day Greetings, Student Welcoming & Assembly",
      date: "April",
      photos: [
        {
          src: welcomeSchool1,
          title: "School Reopening Day Welcome",
          desc: "Students returning enthusiastically to classrooms, laboratories, and friends.",
          folderId: "welcome-back",
          folderName: "Welcome Back to School",
          date: "April 2022",
        },
        {
          src: welcomeSchool2,
          title: "Campus Reopening Morning Assembly",
          desc: "Staff warmly welcoming students back for the commencement of the academic term.",
          folderId: "welcome-back",
          folderName: "Welcome Back to School",
          date: "April 2022",
        },
      ],
    },
    {
      id: "founders-day",
      name: "Founder's Day",
      description: "Founder's Day Commemoration & Thanksgiving Gathering",
      date: "April",
      photos: [
        {
          src: foundersDay,
          title: "Founder's Day Commemoration",
          desc: "Honoring Founder Rev. M. Anton Cruz and celebrating decades of school legacy and service.",
          folderId: "founders-day",
          folderName: "Founder's Day",
          date: "April 2022",
        },
      ],
    },
    {
      id: "yellow-day",
      name: "Yellow Day Celebration",
      description: "Kindergarten Color Recognition & Sensory Learning Festivities",
      date: "April",
      photos: [
        {
          src: yellowDay,
          title: "Kindergarten Yellow Day Celebration",
          desc: "Little learners exploring sunshine yellow colors, craft activities, and joyful games.",
          folderId: "yellow-day",
          folderName: "Yellow Day Celebration",
          date: "April 2022",
        },
      ],
    },
    {
      id: "world-food-day",
      name: "World Food Day",
      description: "World Food Day Assembly, Nutrition Awareness & Gratitude",
      date: "April",
      photos: [
        {
          src: worldFoodDay,
          title: "World Food Day Observance",
          desc: "Teaching students the value of food sharing, nourishment awareness, and mindful consumption.",
          folderId: "world-food-day",
          folderName: "World Food Day",
          date: "April 2022",
        },
      ],
    },
  ];

  // Active folder state: null means root folders view, or specific folder id
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [apiPhotos, setApiPhotos] = useState<any[]>([]);
  const [deletedFolderIds, setDeletedFolderIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("brotherhood_deleted_folders") || "[]");
    } catch {
      return [];
    }
  });
  const [customFolderMeta, setCustomFolderMeta] = useState<Record<string, any>>(() => {
    try {
      return JSON.parse(localStorage.getItem("brotherhood_custom_folders") || "{}");
    } catch {
      return {};
    }
  });
  const [deletedPhotoIds, setDeletedPhotoIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("brotherhood_deleted_photos") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    setMounted(true);
    fetch(`${API_BASE}/gallery-images/`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setApiPhotos(data);
        }
      })
      .catch(() => {});
  }, []);

  const isDeleted = (name: string, id: string) => {
    return deletedFolderIds.some(
      (d) =>
        d.toLowerCase().trim() === name.toLowerCase().trim() ||
        d.toLowerCase().trim() === id.toLowerCase().trim()
    );
  };

  // Build complete list of folders
  const allFolders: GalleryFolder[] = getMergedGalleryFolders(
    apiPhotos,
    deletedFolderIds,
    customFolderMeta,
    deletedPhotoIds
  ) as GalleryFolder[];

  // Lock body scroll when lightbox viewer is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [lightboxIndex]);

  // Support browser back navigation to close lightbox without leaving folder
  useEffect(() => {
    if (lightboxIndex !== null) {
      window.history.pushState({ modal: "lightbox" }, "");
      const handlePopState = () => {
        setLightboxIndex(null);
      };
      window.addEventListener("popstate", handlePopState);
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [lightboxIndex !== null]);

  // URL search param check on mount for direct folder linking (e.g. ?folder=christmas-celebration)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const folderParam = params.get("folder");
      if (folderParam) {
        setActiveFolderId(folderParam);
      }
    }
  }, []);

  const selectFolder = (id: string | null) => {
    setActiveFolderId(id);
    setLightboxIndex(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (id) {
        url.searchParams.set("folder", id);
      } else {
        url.searchParams.delete("folder");
      }
      window.history.pushState({}, "", url.toString());
    }
  };

  // Determine current active folder and photos to display
  const activeFolder = allFolders.find((f) => f.id === activeFolderId);
  const displayedPhotos = activeFolder ? activeFolder.photos : [];

  const closeLightbox = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (window.history.state?.modal === "lightbox") {
      window.history.back();
    } else {
      setLightboxIndex(null);
    }
  };

  const handlePrev = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (lightboxIndex === null || displayedPhotos.length === 0) return;
    setLightboxIndex((prev) => (prev === 0 ? displayedPhotos.length - 1 : prev! - 1));
  };

  const handleNext = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (lightboxIndex === null || displayedPhotos.length === 0) return;
    setLightboxIndex((prev) => (prev === displayedPhotos.length - 1 ? 0 : prev! + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, displayedPhotos.length]);

  return (
    <div className="bg-[#fdfdfc] text-[#2d3748] font-sans selection:bg-[#0a2b18] selection:text-white min-h-screen">
      <PageHeader
        eyebrow="Media Archives"
        title="Event Albums & Folders"
        subtitle="Explore authentic photographic archives of Brotherhood School events, investiture ceremonies, and cultural celebrations."
      />

      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative bg-white border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto space-y-10">

          {/* Top Breadcrumb & Navigation Bar (Always visible) */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#e2e8f0]/80">
            {/* Breadcrumb Path */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider">
              <button
                onClick={() => selectFolder(null)}
                className={`flex items-center gap-2 transition-colors ${
                  activeFolderId === null
                    ? "text-[#0a2b18] font-bold"
                    : "text-[#6c8274] hover:text-[#0a2b18]"
                }`}
              >
                <Folder className="w-4 h-4 text-[#d4af37]" />
                <span>Event Folders</span>
              </button>

              {activeFolder && (
                <>
                  <span className="text-[#a0aec0]">/</span>
                  <div className="flex items-center gap-1.5 text-[#0a2b18] font-bold">
                    <FolderOpen className="w-4 h-4 text-[#d4af37]" />
                    <span>{activeFolder.name}</span>
                  </div>
                </>
              )}
            </div>

            {/* Quick Action Button */}
            {activeFolderId !== null && (
              <button
                onClick={() => selectFolder(null)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d4af37]/40 text-[#0a2b18] bg-[#f7faf8] hover:bg-[#0a2b18] hover:text-white transition-all text-xs uppercase font-bold tracking-wider shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Folders</span>
              </button>
            )}
          </div>

          {/* VIEW MODE 1: ROOT FOLDERS DIRECTORY (Not in card size) */}
          {activeFolderId === null && (
            <div className="space-y-10">
              {/* Introduction Header */}
              <div className="max-w-3xl mx-auto text-center space-y-3">
                <div className="inline-flex items-center justify-center gap-3">
                  <div className="w-8 h-[1px] bg-[#d4af37]"></div>
                  <span className="text-[#d4af37] uppercase tracking-[0.2em] text-xs font-bold">
                    Directory of Archives • {allFolders.length} Folders
                  </span>
                  <div className="w-8 h-[1px] bg-[#d4af37]"></div>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl text-[#0a2b18] font-normal tracking-tight">
                  Select a Celebration <span className="italic text-[#1b4d32]">Folder</span>
                </h2>

                <p className="text-[#6c8274] font-light text-sm sm:text-base leading-relaxed">
                  Click any folder below to step inside and view its photographic collection.
                </p>
              </div>

              {/* Folders Directory: Card View with Cover Image */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                {allFolders.map((folder, idx) => (
                  <motion.div
                    key={folder.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    onClick={() => selectFolder(folder.id)}
                    className="rounded-2xl sm:rounded-3xl border border-[#e2e8f0] bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-[#d4af37]/60 hover:-translate-y-1.5 transition-all duration-400 group cursor-pointer flex flex-col"
                  >
                    {/* Cover Image Frame */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#06180d]">
                      <img
                        src={folder.photos[0]?.src || ""}
                        alt={folder.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Gradient overlay on image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#05140b]/80 via-transparent to-transparent pointer-events-none" />

                      {/* Photo Count Badge on top of image */}
                      <div className="absolute top-3.5 left-3.5 z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#0a2b18]/85 text-[#d4af37] border border-[#d4af37]/40 backdrop-blur-md shadow-sm">
                          <Folder className="w-3.5 h-3.5 text-[#d4af37]" />
                          <span>{folder.photos.length} {folder.photos.length === 1 ? "Photo" : "Photos"}</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
                      <div>
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0a2b18] group-hover:text-[#1b4d32] transition-colors leading-snug">
                          {folder.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#718096] font-light line-clamp-2 mt-1.5 leading-relaxed">
                          {folder.description}
                        </p>
                      </div>

                      {/* Card Footer with Open Button */}
                      <div className="flex items-center justify-between pt-3 border-t border-[#e2e8f0]/80">
                        <span className="text-xs font-semibold text-[#6c8274]">
                          {folder.photos.length} {folder.photos.length === 1 ? "Photo" : "Photos"}
                        </span>

                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0a2b18] text-white text-xs font-bold uppercase tracking-wider group-hover:bg-[#d4af37] group-hover:text-[#0a2b18] transition-colors shadow-xs">
                          <span>Open</span>
                          <ChevronRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW MODE 2: INSIDE A FOLDER (Displays photos of the selected celebration) */}
          {activeFolderId !== null && activeFolder && (
            <div className="space-y-10">
              {/* Folder Banner Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl border border-[#e2e8f0] bg-gradient-to-br from-[#0a2b18] to-[#123822] text-white p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-lg"
              >
                {/* Background ambient gold halo */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#d4af37] text-xs uppercase tracking-widest font-bold">
                      <FolderOpen className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Celebration Folder</span>
                      <span>•</span>
                      <span>{displayedPhotos.length} {displayedPhotos.length === 1 ? "Photograph" : "Photographs"}</span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal">
                      {activeFolder.name}
                    </h2>

                    <p className="text-white/80 font-light text-sm sm:text-base max-w-2xl leading-relaxed">
                      {activeFolder.description}
                    </p>
                  </div>

                  {/* Back button inside banner */}
                  <div className="shrink-0">
                    <button
                      onClick={() => selectFolder(null)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#d4af37] text-[#0a2b18] hover:bg-white hover:text-[#0a2b18] transition-all font-bold text-xs uppercase tracking-wider shadow-md"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Folders</span>
                    </button>
                  </div>
                </div>

                {/* Quick Folder Switcher Strip */}
                <div className="mt-8 pt-6 border-t border-white/15 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-white/60 shrink-0 mr-1">
                    Quick Jump:
                  </span>
                  {folders.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => selectFolder(f.id)}
                      className={`px-3 py-1 rounded-full text-xs shrink-0 transition-all ${
                        activeFolderId === f.id
                          ? "bg-white text-[#0a2b18] font-bold shadow-xs"
                          : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                      }`}
                    >
                      {f.name} ({f.photos.length})
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Photos Grid of the Current Folder */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                <AnimatePresence mode="popLayout">
                  {displayedPhotos.map((photo, i) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 20 }}
                      transition={{ duration: 0.35, delay: i * 0.05 }}
                      key={photo.src + i}
                      onClick={() => setLightboxIndex(i)}
                      className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] group cursor-pointer shadow-[0_10px_30px_rgba(10,43,24,0.06)] hover:shadow-2xl transition-all duration-500 bg-[#06180d] border border-gray-100"
                    >
                      {/* Image */}
                      <img
                        src={photo.src}
                        alt={photo.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#05140b]/95 via-[#05140b]/40 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-20 pointer-events-none flex items-center gap-2">
                        <span className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-[11px] uppercase font-bold tracking-widest bg-[#05140b]/85 text-[#d4af37] border border-[#d4af37]/40 backdrop-blur-md shadow-md">
                          {photo.folderName}
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
                          {photo.title}
                        </h3>
                        <p className="text-white/70 text-xs font-light line-clamp-2 mt-1 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                          {photo.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Lightbox Modal rendered via Portal directly to body above navbar (z-[999999]) */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {lightboxIndex !== null && displayedPhotos[lightboxIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[999999] bg-[#030905]/98 backdrop-blur-2xl flex flex-col justify-between overflow-hidden select-none"
              onClick={closeLightbox}
            >
              {/* Top Navigation Bar of Viewer */}
              <div
                className="h-16 sm:h-20 flex items-center justify-between px-4 sm:px-8 w-full z-30 shrink-0 border-b border-white/10 bg-black/40 backdrop-blur-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2.5 sm:gap-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs uppercase font-bold tracking-wider bg-white/10 text-[#d4af37] border border-[#d4af37]/40 shadow-sm">
                    <FolderOpen className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{displayedPhotos[lightboxIndex].folderName}</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-black/50 text-white/70 border border-white/10 text-xs font-medium tracking-widest">
                    {lightboxIndex + 1} / {displayedPhotos.length}
                  </span>
                </div>

                {/* Prominent High-Visibility Close Button */}
                <button
                  type="button"
                  onClick={closeLightbox}
                  onTouchEnd={closeLightbox}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-[#d4af37] text-white hover:text-[#05140b] border border-white/20 transition-all duration-200 flex items-center justify-center group shadow-xl cursor-pointer hover:scale-105 active:scale-95 z-50"
                  aria-label="Close image viewer"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:rotate-90 stroke-[2.2]" />
                </button>
              </div>

              {/* Main Image Display Container with Navigation Controls */}
              <div
                className="relative flex-1 min-h-0 w-full flex items-center justify-center px-4 sm:px-12 md:px-20 my-auto overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Previous Image Button */}
                {displayedPhotos.length > 1 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    onTouchEnd={handlePrev}
                    className="absolute left-2 sm:left-6 md:left-8 z-40 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-[#d4af37] text-white hover:text-[#05140b] border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200 shadow-2xl hover:scale-110 active:scale-95 cursor-pointer"
                    aria-label="Previous photo (Left Arrow)"
                    title="Previous"
                  >
                    <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2]" />
                  </button>
                )}

                {/* Perfectly Centered Responsive Image */}
                <motion.img
                  key={displayedPhotos[lightboxIndex].src}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  src={displayedPhotos[lightboxIndex].src}
                  alt={displayedPhotos[lightboxIndex].title}
                  className="max-h-[60vh] sm:max-h-[66vh] md:max-h-[70vh] max-w-[92vw] sm:max-w-[85vw] object-contain object-center rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-white/10 select-none pointer-events-auto"
                />

                {/* Next Image Button */}
                {displayedPhotos.length > 1 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    onTouchEnd={handleNext}
                    className="absolute right-2 sm:right-6 md:right-8 z-40 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-[#d4af37] text-white hover:text-[#05140b] border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200 shadow-2xl hover:scale-110 active:scale-95 cursor-pointer"
                    aria-label="Next photo (Right Arrow)"
                    title="Next"
                  >
                    <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2]" />
                  </button>
                )}
              </div>

              {/* Bottom Caption & Information Area */}
              <div
                className="shrink-0 w-full max-w-3xl mx-auto text-center px-4 pt-3 pb-6 sm:pb-8 space-y-1.5 z-30"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-8 h-[2px] bg-[#d4af37] mx-auto mb-2 opacity-80" />
                <h4 className="font-serif text-lg sm:text-2xl text-white font-medium leading-snug drop-shadow-md">
                  {displayedPhotos[lightboxIndex].title}
                </h4>
                <p className="text-white/75 text-xs sm:text-sm font-light leading-relaxed max-w-2xl mx-auto line-clamp-2 sm:line-clamp-none">
                  {displayedPhotos[lightboxIndex].desc}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
