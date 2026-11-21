import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Shield, Trophy, Sparkles, Award, Star, Compass, Flame, Leaf, Heart } from "lucide-react";
import { motion } from "motion/react";
import { API_BASE } from "@/config";

export const Route = createFileRoute("/students/houses")({
  head: () => ({
    meta: [
      { title: "School Houses — Brotherhood School" },
      {
        name: "description",
        content:
          "Discover the four school houses of Brotherhood Matriculation Higher Secondary School — Galilee, Zion, Judah, Bethel for Primary, and St. Matthew, St. Mark, St. Luke, St. John for Senior Wings.",
      },
    ],
  }),
  component: HousesPage,
});

interface HouseInfo {
  name: string;
  motto: string;
  values: string;
  description: string;
  colorName: string;
  accentColor: string;
  bgGradient: string;
  borderColor: string;
  badgeStyle: string;
  icon: any;
  captain: string;
  captainClass: string;
  viceCaptain: string;
  viceCaptainClass: string;
  points: number;
}

const PRIMARY_HOUSES: HouseInfo[] = [
  {
    name: "Galilee House",
    motto: "Knowledge and Exploration",
    values: "Curiosity • Logic • Academic Scholarship",
    description:
      "Inspiring deep inquisitiveness, scientific reasoning, and a passion for discovering truth in the natural and mathematical universe.",
    colorName: "Royal Sapphire Blue",
    accentColor: "#2563eb",
    bgGradient: "from-blue-500/10 via-sky-500/5 to-transparent",
    borderColor: "hover:border-blue-500/60",
    badgeStyle: "bg-blue-50 text-blue-800 border-blue-200",
    icon: Compass,
    captain: "Pratheesh.B",
    captainClass: "Std V",
    viceCaptain: "Nivedha.N",
    viceCaptainClass: "Std V",
    points: 385,
  },
  {
    name: "Zion House",
    motto: "Strength and Faith",
    values: "Moral Integrity • Fortitude • Resilient Spirit",
    description:
      "Fostering unwavering character, spiritual strength, moral conviction, and upright leadership in times of challenge.",
    colorName: "Imperial Gold & Amber",
    accentColor: "#d97706",
    bgGradient: "from-amber-500/10 via-yellow-500/5 to-transparent",
    borderColor: "hover:border-amber-500/60",
    badgeStyle: "bg-amber-50 text-amber-800 border-amber-200",
    icon: Star,
    captain: "Jeshwanth.S",
    captainClass: "Std V",
    viceCaptain: "Jaclin Nibola.J",
    viceCaptainClass: "Std V",
    points: 410,
  },
  {
    name: "Judah House",
    motto: "Courage and Praise",
    values: "Bravery • Athletic Passion • Team Endurance",
    description:
      "Encouraging bold enthusiasm on athletic fields, joyful participation in school events, and fearless dedication to excellence.",
    colorName: "Crimson Ruby Red",
    accentColor: "#dc2626",
    bgGradient: "from-red-500/10 via-rose-500/5 to-transparent",
    borderColor: "hover:border-red-500/60",
    badgeStyle: "bg-red-50 text-red-800 border-red-200",
    icon: Flame,
    captain: "Praveen Sai.B",
    captainClass: "Std V",
    viceCaptain: "Sree Dharshini.I",
    viceCaptainClass: "Std V",
    points: 395,
  },
  {
    name: "Bethel House",
    motto: "House of Peace",
    values: "Ecological Harmony • Serenity • Fellowship",
    description:
      "Guiding students toward environmental stewardship, peaceful peer collaboration, creative arts, and gentle benevolence.",
    colorName: "Forest Emerald Green",
    accentColor: "#059669",
    bgGradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
    borderColor: "hover:border-emerald-500/60",
    badgeStyle: "bg-emerald-50 text-emerald-800 border-emerald-200",
    icon: Leaf,
    captain: "Jayakandhan.M.D",
    captainClass: "Std V",
    viceCaptain: "Danya Shree.R",
    viceCaptainClass: "Std V",
    points: 400,
  },
];

const SENIOR_HOUSES: HouseInfo[] = [
  {
    name: "St. Matthew House",
    motto: "Grace and Wisdom",
    values: "Scholastic Discipline • Insight • Mathematical Logic",
    description:
      "Nurturing rigorous academic thinking, intellectual clarity, and visionary scholastic research across senior streams.",
    colorName: "Celestial Azure Blue",
    accentColor: "#1d4ed8",
    bgGradient: "from-blue-600/10 via-indigo-500/5 to-transparent",
    borderColor: "hover:border-blue-600/60",
    badgeStyle: "bg-blue-50 text-blue-800 border-blue-200",
    icon: Compass,
    captain: "G. Ajith Kumar",
    captainClass: "XII - B",
    viceCaptain: "D. Sairathi",
    viceCaptainClass: "XII - C",
    points: 425,
  },
  {
    name: "St. Mark House",
    motto: "Courage and Action",
    values: "Athletic Supremacy • Rapid Action • Decisiveness",
    description:
      "Champions of speed, track and field excellence, physical endurance, and active student initiative.",
    colorName: "Scarlet Crimson Red",
    accentColor: "#e11d48",
    bgGradient: "from-rose-500/10 via-red-500/5 to-transparent",
    borderColor: "hover:border-rose-500/60",
    badgeStyle: "bg-red-50 text-red-800 border-red-200",
    icon: Flame,
    captain: "R. Sree Hari",
    captainClass: "XII - A",
    viceCaptain: "P. Akshaya",
    viceCaptainClass: "XII - B",
    points: 415,
  },
  {
    name: "St. Luke House",
    motto: "Healing and Service",
    values: "Compassionate Care • Biological Sciences • Civic Duty",
    description:
      "Instilling altruistic civic consciousness, biomedical inquisitiveness, and active philanthropic service to society.",
    colorName: "Jade Forest Emerald",
    accentColor: "#047857",
    bgGradient: "from-emerald-600/10 via-green-500/5 to-transparent",
    borderColor: "hover:border-emerald-600/60",
    badgeStyle: "bg-emerald-50 text-emerald-800 border-emerald-200",
    icon: Leaf,
    captain: "B. Jaya Prakash",
    captainClass: "XII - C",
    viceCaptain: "B. Priya Dharshini",
    viceCaptainClass: "XII - A",
    points: 440,
  },
  {
    name: "St. John House",
    motto: "Love and Truth",
    values: "Eloquent Expression • Truthfulness • Moral Nobility",
    description:
      "Prioritizing oratorical eloquence, classical literature, artistic mastery, and steadfast commitment to timeless truth.",
    colorName: "Radiant Sovereign Gold",
    accentColor: "#b45309",
    bgGradient: "from-amber-600/10 via-yellow-500/5 to-transparent",
    borderColor: "hover:border-amber-500/60",
    badgeStyle: "bg-amber-50 text-amber-800 border-amber-200",
    icon: Heart,
    captain: "G. Nithish Kumar",
    captainClass: "XII - C",
    viceCaptain: "K. Soniya",
    viceCaptainClass: "XII - A",
    points: 430,
  },
];

function LargeHouseCard({ house, idx }: { house: HouseInfo; idx: number }) {
  const IconComponent = house.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (idx % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative rounded-[2.5rem] bg-white border-2 border-[#e2e8f0] ${house.borderColor} p-8 sm:p-10 lg:p-12 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between overflow-hidden`}
    >
      {/* Dynamic ambient color glow in background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${house.bgGradient} opacity-40 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
      />

      {/* Top Accent Color Bar */}
      <div
        className="absolute top-0 left-0 right-0 h-2.5 transition-all duration-500"
        style={{ backgroundColor: house.accentColor }}
      />

      {/* Decorative Large Watermark Initial in background */}
      <div className="absolute right-4 bottom-4 text-[140px] sm:text-[180px] font-serif font-black opacity-[0.03] group-hover:opacity-[0.07] group-hover:scale-105 transition-all duration-700 pointer-events-none select-none text-[#0a2b18]">
        {house.name.charAt(0)}
      </div>

      <div className="relative z-10 space-y-6">
        {/* Header Row: Shield Icon Emblem + Points Pill */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative">
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl p-1 shadow-md flex items-center justify-center transition-all duration-500 group-hover:scale-105 group-hover:rotate-1"
              style={{
                background: `linear-gradient(135deg, ${house.accentColor}22, ${house.accentColor}55)`,
                border: `2px solid ${house.accentColor}88`,
              }}
            >
              <div className="w-full h-full rounded-[1.3rem] bg-white flex items-center justify-center shadow-inner">
                <Shield
                  className="w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-500 group-hover:scale-110"
                  style={{ color: house.accentColor }}
                  strokeWidth={1.75}
                />
              </div>
            </div>

            {/* Floating Mini Icon */}
            <div
              className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-white shadow-md border flex items-center justify-center text-white"
              style={{ backgroundColor: house.accentColor, borderColor: "#ffffff" }}
            >
              <IconComponent className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="text-right">
            <span className={`inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm ${house.badgeStyle}`}>
              {house.colorName}
            </span>
            <div className="flex items-center justify-end gap-1.5 mt-2 text-xs font-semibold text-[#6c8274]">
              <Trophy className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{house.points} Championship Pts</span>
            </div>
          </div>
        </div>

        {/* House Name & Motto */}
        <div className="space-y-2">
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#0a2b18] font-bold tracking-tight">
            {house.name}
          </h3>
          <p
            className="uppercase tracking-[0.2em] text-xs font-bold"
            style={{ color: house.accentColor }}
          >
            Motto: &ldquo;{house.motto}&rdquo;
          </p>
          <div className="text-xs font-medium text-[#7a8c80] italic">
            {house.values}
          </div>
        </div>

        {/* Rich Description */}
        <p className="text-[#55695d] font-light text-sm sm:text-base leading-relaxed">
          {house.description}
        </p>

        {/* Leadership Showcase: Captain & Vice Captain */}
        <div className="pt-6 border-t border-[#e2e8f0]/80">
          <span className="text-[11px] uppercase tracking-wider font-bold text-[#6c8274] block mb-3">
            Elected House Leadership
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Captain */}
            <div className="bg-[#f7faf8] border border-[#e2e8f0] rounded-2xl p-3.5 flex items-center gap-3 group-hover:bg-white group-hover:border-[#d4af37]/40 transition-all duration-300">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"
                style={{ backgroundColor: house.accentColor }}
              >
                <Award className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-[#d4af37] block">
                  House Captain
                </span>
                <span className="font-serif font-bold text-sm text-[#0a2b18] block truncate">
                  {house.captain}
                </span>
                <span className="italic text-xs text-[#6c8274]">
                  Class {house.captainClass}
                </span>
              </div>
            </div>

            {/* Vice Captain */}
            <div className="bg-[#f7faf8] border border-[#e2e8f0] rounded-2xl p-3.5 flex items-center gap-3 group-hover:bg-white group-hover:border-[#d4af37]/40 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#d6ded8] flex items-center justify-center text-[#1b4d32] shrink-0 shadow-sm">
                <Shield className="w-5 h-5 text-[#6c8274]" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-[#6c8274] block">
                  Vice Captain
                </span>
                <span className="font-serif font-bold text-sm text-[#0a2b18] block truncate">
                  {house.viceCaptain}
                </span>
                <span className="italic text-xs text-[#6c8274]">
                  Class {house.viceCaptainClass}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function HousesPage() {
  const [selectedWing, setSelectedWing] = useState<"all" | "primary" | "senior">("all");
  const [houseUpdates, setHouseUpdates] = useState<Record<string, { points?: number; motto?: string }>>({});

  useEffect(() => {
    fetch(`${API_BASE}/student-houses/`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const map: Record<string, { points?: number; motto?: string }> = {};
          data.forEach((h: any) => {
            if (h.name) {
              map[h.name.toLowerCase().trim()] = {
                points: typeof h.points === "number" ? h.points : undefined,
                motto: h.motto || undefined,
              };
            }
          });
          setHouseUpdates(map);
        }
      })
      .catch(() => {});
  }, []);

  const getUpdatedHouse = (house: HouseInfo): HouseInfo => {
    const key = house.name.toLowerCase().trim();
    const update = houseUpdates[key];
    if (!update) return house;
    return {
      ...house,
      points: update.points !== undefined ? update.points : house.points,
      motto: update.motto || house.motto,
    };
  };

  return (
    <div className="bg-[#fcfdfa] text-[#1c2e24] min-h-screen">
      {/* 1. Hero Page Header */}
      <PageHeader
        eyebrow="Co-Curricular Brotherhood Tradition"
        title="School Houses"
        subtitle="Our house system fosters healthy competition, camaraderie, teamwork, and leadership among students from their early years through higher secondary."
      />

      {/* 2. Institutional Title & Introduction Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white border-b border-[#e2e8f0] relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center justify-center gap-3">
              <div className="w-8 sm:w-12 h-[1px] bg-[#d4af37]"></div>
              <span className="text-[#d4af37] uppercase tracking-[0.2em] text-[11px] sm:text-xs font-bold">
                Heraldry & House System
              </span>
              <div className="w-8 sm:w-12 h-[1px] bg-[#d4af37]"></div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0a2b18] font-normal">
              The Four <span className="italic text-[#1b4d32]">School Houses</span>
            </h1>

            <p className="text-[#55695d] font-light text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Every student upon admission is assigned to one of our historic houses. Through sports, quiz competitions, cultural festivals, and community service, houses compete year-round for the coveted Cock House Championship.
            </p>

            {/* Wing Switcher */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setSelectedWing("all")}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                  selectedWing === "all"
                    ? "bg-[#1b4d32] text-white shadow-md"
                    : "bg-[#f4f7f5] text-[#55695d] hover:bg-[#e6ece8]"
                }`}
              >
                All Houses (8 Houses)
              </button>
              <button
                onClick={() => setSelectedWing("primary")}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                  selectedWing === "primary"
                    ? "bg-[#1b4d32] text-white shadow-md"
                    : "bg-[#f4f7f5] text-[#55695d] hover:bg-[#e6ece8]"
                }`}
              >
                Primary Wing (Classes I – V)
              </button>
              <button
                onClick={() => setSelectedWing("senior")}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                  selectedWing === "senior"
                    ? "bg-[#1b4d32] text-white shadow-md"
                    : "bg-[#f4f7f5] text-[#55695d] hover:bg-[#e6ece8]"
                }`}
              >
                Senior Wing (Classes VI – XII)
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Spacious, Rich House Cards Grid with Increased Sizing & Animations */}
      <main className="py-14 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-16 max-w-7xl mx-auto space-y-20">
        {/* Primary Wing Houses */}
        {(selectedWing === "all" || selectedWing === "primary") && (
          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-[#1b4d32]/15 gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1b4d32] to-[#0a2b18] text-[#d4af37] flex items-center justify-center shadow-sm">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#0a2b18] font-bold">
                    Primary Wing Houses
                  </h2>
                  <span className="text-xs uppercase tracking-wider text-[#6c8274] font-medium">
                    Classes I to V • Foundational House Competitions
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#f0f6f2] text-[#1b4d32] border border-[#d2e2d7] self-start sm:self-auto">
                4 Primary Houses
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {PRIMARY_HOUSES.map(getUpdatedHouse).map((house, idx) => (
                <LargeHouseCard key={house.name} house={house} idx={idx} />
              ))}
            </div>
          </section>
        )}

        {/* Senior Wing Houses */}
        {(selectedWing === "all" || selectedWing === "senior") && (
          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-[#1b4d32]/15 gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1b4d32] to-[#0a2b18] text-[#d4af37] flex items-center justify-center shadow-sm">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#0a2b18] font-bold">
                    Senior Wing Houses
                  </h2>
                  <span className="text-xs uppercase tracking-wider text-[#6c8274] font-medium">
                    Classes VI to XII • Advanced Inter-House League
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#f0f6f2] text-[#1b4d32] border border-[#d2e2d7] self-start sm:self-auto">
                4 Senior Houses
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {SENIOR_HOUSES.map(getUpdatedHouse).map((house, idx) => (
                <LargeHouseCard key={house.name} house={house} idx={idx} />
              ))}
            </div>
          </section>
        )}

        {/* 4. Cinematic Inter-House Championship Showcase */}
        <section className="bg-gradient-to-br from-[#05140b] via-[#0a2b18] to-[#05140b] rounded-[3rem] p-8 sm:p-14 lg:p-16 text-white border border-[#d4af37]/30 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none"></div>

          <div className="grid md:grid-cols-12 gap-10 items-center relative z-10">
            <div className="md:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-[#d4af37] text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-4 h-4" /> Annual Inter-House Championship
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f3eed9] leading-tight font-normal">
                The Quest for the <span className="italic text-[#d4af37]">Cock House Trophy</span>
              </h2>
              <div className="space-y-4 text-white/80 font-light text-sm sm:text-base leading-relaxed">
                <p>
                  Throughout the academic year, students earn points for their respective houses through athletic meets, sports tournaments, science exhibitions, debate contests, and discipline scores.
                </p>
                <p>
                  On the grand culmination of the Annual Sports Day, points from all terms are aggregated. The premier house securing top honors is awarded the prestigious Cock House Trophy amidst roaring student acclaim!
                </p>
              </div>
            </div>

            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px] aspect-square rounded-3xl bg-gradient-to-br from-[#1b4d32]/60 to-[#05140b] border-2 border-[#d4af37]/50 p-8 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(212,175,55,0.2)] group">
                <div className="w-24 h-24 rounded-full bg-[#d4af37]/15 border-2 border-[#d4af37] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Trophy className="w-12 h-12 text-[#d4af37]" />
                </div>
                <h4 className="font-serif text-2xl text-[#f3eed9] font-bold mb-1">
                  Cock House Trophy
                </h4>
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
                  Annual Champions Honor
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
