import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, ChevronRight, Phone, BookOpen, Users, Shield, Lightbulb, MapPin, Calendar, Microscope, Monitor, Library, Bus, Home, Clock } from "lucide-react";
import { fadeUp, fadeLeft, fadeRight, staggerContainer, buttonHover, buttonTap, cardHover } from "../lib/motion";

// Images
import heroImage from "../images/herosection1.png";
import aboutImage from "../images/aboutimage3.png";
import campusImage1 from "../images/aboutimage2.jpg";
import campusImage2 from "../images/schooluniform.png";
import campusImage3 from "../images/house.png";
import sportsImage from "../images/sports.png";
import artsImage from "../images/choir.png";
import principalImage from "../images/principal_portrait (2).png";
import facilityImage1 from "../images/result.png";
import facilityImage2 from "../images/aboutimage2.jpg";
import facilityImage3 from "../images/herosection.png";
import galleryImage from "../images/ecoclub.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brotherhood Matriculation Hr. Sec. School — Chennai" },
      { name: "description", content: "Shaping future leaders since 1991. Character formation through quality education — Pre-KG to XII, Neelankarai, Chennai." },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-[#f7faf8] text-[#0d361e] font-sans selection:bg-[#1b4d32] selection:text-white">
      <Hero />
      <AboutSchool />
      <Philosophy />
      <CampusLife />
      <Academics />
      <StudentLife />
      <PrincipalMessage />
      <NewsAndEvents />
      <Facilities />
      <GalleryPreview />
      <AdmissionsCTA />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-start overflow-hidden bg-[#05140b] pt-16">
      {/* Cinematic Background Image with entry animation */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.15, filter: "blur(10px)" }}
        animate={{ scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={heroImage}
          alt="Brotherhood School Campus"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Dramatic Multi-layered Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a2b18]/95 via-[#0a2b18]/60 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05140b] via-transparent to-transparent z-10 opacity-90" />
      <div className="absolute inset-0 bg-[#0a2b18]/20 mix-blend-multiply z-10" />
      
      {/* Decorative Orbs for Premium feel */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#d4af37]/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-10"></div>
      <div className="absolute -bottom-40 left-10 w-[500px] h-[500px] bg-[#1b4d32]/30 rounded-full blur-[100px] mix-blend-screen pointer-events-none z-10"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col justify-center h-full pt-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl space-y-8 flex flex-col items-start"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-4">
            <div className="h-[1px] w-8 bg-[#d4af37]"></div>
            <span className="text-[#d4af37] text-sm uppercase tracking-[0.2em] font-semibold">Established 1991</span>
            <div className="h-[1px] w-8 bg-[#d4af37]"></div>
          </motion.div>

          {/* Majestic Typography */}
          <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] text-white leading-[1.05] font-normal tracking-tight text-balance drop-shadow-2xl">
            Excellence in <br className="hidden md:block" />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f9e596] font-light drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">Education</span> <br className="hidden md:block" />
            & Character
          </motion.h1>

          {/* Refined Subtitle */}
          <motion.div variants={fadeUp} className="border-l-2 border-[#d4af37]/40 pl-6 py-1">
            <p className="text-[#e2e8f0] text-lg md:text-xl max-w-2xl font-light leading-relaxed text-balance opacity-90">
              A legacy of holistic development, nurturing intellectual curiosity and instilling timeless values in every student for over three decades.
            </p>
          </motion.div>

          {/* High-end interactive Buttons */}
          <motion.div variants={fadeUp} className="pt-8 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            {/* Primary Gold Button */}
            <motion.div whileHover={buttonHover} whileTap={buttonTap}>
              <Link to="/admissions" className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full overflow-hidden transition-shadow duration-300 shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#b58c2a] via-[#d4af37] to-[#b58c2a] bg-[length:200%_auto] group-hover:bg-right transition-all duration-500"></div>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] skew-x-[-15deg] group-hover:translate-x-[150%] transition-transform duration-1000 ease-out"></div>
                <span className="relative z-10 font-semibold tracking-wide text-[#05140b] flex items-center gap-2">
                  Explore Admissions
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </motion.div>

            {/* Secondary Glass Button */}
            <motion.div whileHover={buttonHover} whileTap={buttonTap}>
              <Link to="/about" className="group inline-flex items-center gap-4 px-2 py-2 pr-6 bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 rounded-full font-medium tracking-wide">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#d4af37] group-hover:text-[#05140b] transition-colors duration-300">
                   <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <span>Our Heritage</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Elegant Scroll Indicator */}
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 2.5, duration: 1 }}
         className="absolute bottom-12 left-6 lg:left-12 flex flex-col items-center gap-4 z-20 hidden md:flex"
      >
         <span className="uppercase text-[9px] tracking-[0.4em] text-white/50 -rotate-90 origin-bottom whitespace-nowrap mb-8 font-medium">Scroll</span>
         <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
            <motion.div 
              animate={{ y: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-white/80 to-transparent"
            />
         </div>
      </motion.div>
    </section>
  );
}

function AboutSchool() {
  return (
    <section className="py-32 md:py-40 px-6 bg-[#f7faf8]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-[#1b4d32]"></div>
            <span className="text-[#6c8274] uppercase tracking-widest text-xs font-semibold">About the School</span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#0a2b18] leading-[1.15]">
            A tradition of <span className="italic text-[#1b4d32]">scholarship</span> and service.
          </motion.h2>

          <motion.div variants={fadeUp} className="space-y-6 text-[#6c8274] text-lg leading-relaxed font-light">
            <p>
              Since our founding in 1991, Brotherhood Matriculation Higher Secondary School has been dedicated to cultivating an environment where academic rigor meets profound character development.
            </p>
            <p>
              Guided by a commitment to discipline, warmth, and community, we prepare our students not just for examinations, but for a life of purpose and leadership in an ever-evolving world.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="pt-6">
            <Link to="/about" className="group inline-flex items-center gap-3 text-[#1b4d32] border-b border-[#1b4d32]/30 pb-1 hover:border-[#1b4d32] transition-colors duration-300">
              <span className="font-medium">Discover Our Story</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-2xl">
            <img src={aboutImage} alt="Students learning" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#0a2b18]/10 mix-blend-multiply"></div>
          </div>

          {/* Floating Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute -bottom-10 -left-10 md:-left-16 bg-white/85 backdrop-blur-xl p-8 rounded-2xl shadow-[0_20px_40px_-15px_rgba(10,43,24,0.1)] max-w-[280px] border border-white/50"
          >
            <p className="font-serif text-2xl text-[#0a2b18] leading-tight mb-2">"Character Formation Through Quality Education"</p>
            <p className="text-[#6c8274] text-sm uppercase tracking-wider font-semibold">— Our Motto</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Philosophy() {
  const pillars = [
    { num: "01", title: "Character", desc: "Instilling integrity, resilience, and respect as the foundation of personal growth." },
    { num: "02", title: "Leadership", desc: "Empowering students to take initiative, inspire others, and lead by example." },
    { num: "03", title: "Excellence", desc: "Fostering intellectual curiosity and a relentless pursuit of academic mastery." },
    { num: "04", title: "Community", desc: "Building a warm, inclusive environment rooted in faith and enduring values." },
  ];

  return (
    <section className="py-32 md:py-40 px-6 bg-[#05140b] text-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          <div className="lg:w-1/3">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="lg:sticky lg:top-32 space-y-6"
            >
              <div className="flex items-center gap-4">
                 <div className="w-12 h-[1px] bg-[#d4af37]"></div>
                 <span className="text-[#d4af37] uppercase tracking-widest text-xs font-semibold">Educational Philosophy</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
                The Pillars of <br className="hidden lg:block" /> <span className="italic text-white/70">Brotherhood</span>
              </h2>
              <p className="text-white/60 font-light leading-relaxed pt-4 text-lg">
                Our foundation is built upon timeless values that guide our students toward a life of purpose, meaning, and profound impact.
              </p>
            </motion.div>
          </div>

          <div className="lg:w-2/3 flex flex-col">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                variants={fadeUp}
                className="group border-t border-white/10 last:border-b py-12 flex flex-col sm:flex-row gap-4 sm:gap-12 items-start transition-colors hover:bg-white/[0.02]"
              >
                <div className="text-[#d4af37]/40 font-serif text-4xl italic group-hover:text-[#d4af37] transition-colors duration-500">
                  {pillar.num}
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="font-serif text-3xl md:text-4xl text-white group-hover:translate-x-2 transition-transform duration-500">
                    {pillar.title}
                  </h3>
                  <p className="text-white/60 text-lg font-light leading-relaxed max-w-xl group-hover:text-white/80 transition-colors duration-500">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

function CampusLife() {
  return (
    <section className="py-32 md:py-40 bg-[#f7faf8] px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="mb-20 max-w-2xl"
        >
          <span className="text-[#1b4d32] uppercase tracking-widest text-xs font-semibold mb-4 block">Campus Life</span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#0a2b18]">A vibrant environment where memories are made.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 auto-rows-[300px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="md:col-span-8 md:row-span-2 rounded-3xl overflow-hidden relative group"
          >
            <img src={campusImage1} alt="Campus Event" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a2b18]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <p className="font-serif text-2xl">Annual Celebrations</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.8 }}
            className="md:col-span-4 md:row-span-1 rounded-3xl overflow-hidden relative group"
          >
            <img src={campusImage2} alt="Students" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[#0a2b18]/20 group-hover:bg-transparent transition-colors duration-500"></div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="md:col-span-4 md:row-span-1 rounded-3xl overflow-hidden relative group bg-[#1b4d32] p-8 flex flex-col justify-between text-white"
          >
            <img src={campusImage3} alt="House Activities" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay transition-transform duration-1000 group-hover:scale-105" />
            <div className="relative z-10">
              <Calendar className="w-8 h-8 text-[#d4af37] mb-4" />
              <h3 className="font-serif text-2xl mb-2">Rich Traditions</h3>
              <p className="text-white/80 text-sm font-light leading-relaxed">From House Competitions to cultural festivals, life at Brotherhood is deeply enriching.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Academics() {
  const programs = [
    { title: "Foundational Years", subtitle: "Pre-KG to Class V", desc: "Cultivating curiosity and a love for learning through an engaging, play-integrated curriculum." },
    { title: "Middle School", subtitle: "Classes VI to X", desc: "Building a robust academic core with an emphasis on critical thinking, sciences, and holistic development." },
    { title: "Higher Secondary", subtitle: "Classes XI to XII", desc: "Specialized streams in Science, Commerce, and Computer Science preparing students for higher education." },
  ];

  return (
    <section className="py-32 md:py-40 bg-white px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="lg:w-1/3 space-y-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-[#1b4d32]"></div>
            <span className="text-[#6c8274] uppercase tracking-widest text-xs font-semibold">Academic Excellence</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#0a2b18] leading-[1.2]">
            A curriculum built for the world ahead.
          </h2>
          <p className="text-[#6c8274] text-lg font-light leading-relaxed">
            Our comprehensive educational framework is designed to challenge students intellectually while providing the support they need to excel.
          </p>
          <div className="pt-4">
            <Link to="/academics" className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#1b4d32]/20 text-[#1b4d32] hover:bg-[#f7faf8] transition-colors duration-300">
              <span className="font-medium text-sm">View All Programs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        <div className="lg:w-2/3 grid md:grid-cols-2 gap-6">
          {programs.map((prog, idx) => (
            <motion.div
              key={prog.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              className={`p-10 rounded-3xl border border-[#f1f6f3] bg-[#f7faf8] hover:shadow-xl transition-shadow duration-500 ${idx === 2 ? 'md:col-span-2 md:w-1/2 md:mx-auto' : ''}`}
            >
              <div className="text-[#1b4d32] text-sm uppercase tracking-wider font-semibold mb-2">{prog.subtitle}</div>
              <h3 className="font-serif text-2xl text-[#0a2b18] mb-4">{prog.title}</h3>
              <p className="text-[#6c8274] leading-relaxed font-light">{prog.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StudentLife() {
  return (
    <section className="py-32 md:py-40 bg-[#f7faf8] px-6">
      <div className="max-w-7xl mx-auto space-y-32">
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
            className="w-full md:w-1/2"
          >
            <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl">
              <img src={sportsImage} alt="Sports and Athletics" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
            </div>
          </motion.div>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="w-full md:w-1/2 space-y-6"
          >
            <span className="text-[#d4af37] uppercase tracking-widest text-xs font-semibold">Physical Development</span>
            <h2 className="font-serif text-4xl text-[#0a2b18]">Sports & Athletics</h2>
            <p className="text-[#6c8274] text-lg font-light leading-relaxed">
              We believe in the power of physical education to teach teamwork, discipline, and resilience. Our comprehensive sports programs cater to all levels of ability, fostering a lifelong commitment to health and fitness.
            </p>
          </motion.div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
            className="w-full md:w-1/2"
          >
            <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl">
              <img src={artsImage} alt="Arts and Culture" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
            </div>
          </motion.div>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="w-full md:w-1/2 space-y-6"
          >
            <span className="text-[#1b4d32] uppercase tracking-widest text-xs font-semibold">Creative Expression</span>
            <h2 className="font-serif text-4xl text-[#0a2b18]">Arts & Culture</h2>
            <p className="text-[#6c8274] text-lg font-light leading-relaxed">
              Creativity flourishes at Brotherhood. Through music, choir, dramatic arts, and fine arts, students are encouraged to discover their unique voices and express themselves with confidence.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PrincipalMessage() {
  return (
    <section className="py-32 bg-[#0a2b18] px-6 relative overflow-hidden">
      <div className="absolute left-0 top-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(27,77,50,0.4),transparent_50%)]"></div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
          className="lg:w-2/5 shrink-0"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[#d4af37] rounded-full translate-x-4 translate-y-4 opacity-50 blur-2xl"></div>
            <div className="aspect-[3/4] w-full max-w-[400px] mx-auto rounded-t-full rounded-b-[3rem] overflow-hidden border-4 border-white/10 shadow-2xl relative z-10">
              <img src={principalImage} alt="Principal" className="w-full h-full object-cover" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="lg:w-3/5 space-y-8"
        >
          <div className="text-[#d4af37]">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.017 21L16.417 14.5C16.817 13.5 17.517 11.5 17.517 9.5C17.517 6.5 15.017 4.5 11.517 4.5C11.517 4.5 11.017 4.5 10.517 4.6C11.017 3.5 12.017 2.5 13.517 2L12.517 1C10.517 1.5 8.517 3.5 7.517 6.5C6.517 9.5 6.517 12.5 6.517 12.5L8.517 12.5C8.517 12.5 9.017 12.5 9.517 12.5C9.517 12.5 10.017 12.5 10.017 14.5C10.017 16.5 8.517 17.5 8.517 17.5L7.517 21H14.017Z" />
            </svg>
          </div>
          <motion.blockquote variants={fadeUp} className="font-serif text-3xl md:text-4xl text-white leading-relaxed text-balance">
            "Our ultimate goal is to shape individuals of impeccable character, profound intellect, and unwavering compassion, ready to illuminate the world."
          </motion.blockquote>

          <motion.div variants={fadeUp} className="pt-6">
            <h4 className="text-white text-xl font-medium tracking-wide">Rev. Fr. Principal</h4>
            <p className="text-[#d4af37] text-sm uppercase tracking-widest mt-1">Head of Institution</p>
          </motion.div>

          <motion.div variants={fadeUp} className="pt-4">
            <Link to="/about" className="text-white/70 hover:text-white border-b border-white/30 pb-1 text-sm transition-colors">
              Read Full Message
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Facilities() {
  const items = [
    { icon: <Microscope className="w-5 h-5" />, title: "Science Laboratories", span: "md:col-span-2 md:row-span-2", img: facilityImage1 },
    { icon: <Monitor className="w-5 h-5" />, title: "Smart Classrooms", span: "md:col-span-1 md:row-span-1", img: facilityImage2 },
    { icon: <Library className="w-5 h-5" />, title: "Library Resource Center", span: "md:col-span-1 md:row-span-1", img: facilityImage3 },
  ];

  return (
    <section className="py-32 md:py-40 bg-white px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-center space-y-4 max-w-2xl mx-auto"
        >
          <span className="text-[#1b4d32] uppercase tracking-widest text-xs font-semibold">Our Campus</span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#0a2b18]">State-of-the-Art Facilities</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          {items.map((item, idx) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              whileHover={cardHover}
              className={`group relative rounded-[2rem] overflow-hidden ${item.span}`}
            >
              <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a2b18]/90 via-[#0a2b18]/20 to-transparent opacity-80"></div>

              <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-4">
                  {item.icon}
                </div>
                <h3 className="font-serif text-2xl text-white mb-2">{item.title}</h3>
                <div className="h-[2px] w-0 bg-[#d4af37] group-hover:w-12 transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryPreview() {
  return (
    <section className="py-16 bg-[#f7faf8]">
      <div className="w-full px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative rounded-[3rem] overflow-hidden h-[60vh] md:h-[70vh] group cursor-pointer"
        >
          <img src={galleryImage} alt="Campus Life Gallery" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div className="absolute inset-0 bg-[#0a2b18]/30 group-hover:bg-[#0a2b18]/40 transition-colors duration-500 flex items-center justify-center">
            <Link to="/gallery" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-medium tracking-wide flex items-center gap-3 hover:bg-white hover:text-[#0a2b18] transition-all duration-500">
              Explore Campus Life
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AdmissionsCTA() {
  return (
    <section className="py-32 px-6 bg-[#f7faf8]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#1b4d32] to-[#0a2b18] p-12 md:p-20 text-center shadow-2xl"
        >
          {/* Subtle Decorative Background Element */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#d4af37] rounded-full blur-[100px] opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white rounded-full blur-[100px] opacity-10"></div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="font-serif text-4xl md:text-6xl text-white leading-tight">
              Begin your child's journey today.
            </h2>
            <p className="text-[#f7faf8]/80 text-lg font-light leading-relaxed">
              Applications for the upcoming academic year are now open. We invite you to discover the Brotherhood difference.
            </p>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/admissions" className="w-full sm:w-auto px-8 py-4 bg-[#d4af37] text-[#0a2b18] rounded-full font-semibold tracking-wide hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all duration-300">
                Apply Now
              </Link>
              <Link to="/contact" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 text-white rounded-full font-medium tracking-wide hover:bg-white hover:text-[#0a2b18] transition-all duration-300">
                Contact Admissions
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function NewsAndEvents() {
  const upcomingEvents = [
    {
      id: 1,
      date: "15",
      month: "AUG",
      title: "Independence Day Celebration",
      time: "08:00 AM - 12:30 PM",
      location: "Main Ground",
      category: "Celebration",
    },
    {
      id: 2,
      date: "22",
      month: "SEP",
      title: "Annual Science Exhibition",
      time: "09:00 AM - 03:00 PM",
      location: "Science Block",
      category: "Academic",
    },
    {
      id: 3,
      date: "10",
      month: "OCT",
      title: "Inter-School Sports Meet",
      time: "07:30 AM - 04:00 PM",
      location: "Sports Arena",
      category: "Athletics",
    }
  ];

  const latestNews = [
    {
      id: 1,
      title: "Brotherhood students secure top ranks in state board examinations.",
      date: "July 12, 2026",
      image: galleryImage,
      tag: "Academics"
    },
    {
      id: 2,
      title: "New state-of-the-art Robotics lab inaugurated by the Principal.",
      date: "June 28, 2026",
      image: facilityImage2,
      tag: "Campus"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white px-6 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#f7faf8] rounded-full translate-x-1/2 -translate-y-1/2 opacity-50 blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Upcoming Events */}
          <div className="lg:col-span-7 space-y-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-[#1b4d32] uppercase tracking-widest text-xs font-semibold">Mark Your Calendar</span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#0a2b18] mt-3">Upcoming Events</h2>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="space-y-6"
            >
              {upcomingEvents.map((event) => (
                <motion.div 
                  key={event.id}
                  variants={fadeUp}
                  className="group flex flex-col sm:flex-row gap-6 p-6 rounded-[2rem] bg-[#f7faf8] border border-gray-100 hover:border-[#d4af37]/30 hover:shadow-xl transition-all duration-500 cursor-pointer"
                >
                  {/* Date Badge */}
                  <div className="shrink-0 w-24 h-24 rounded-2xl bg-white shadow-sm flex flex-col items-center justify-center border border-gray-100 group-hover:bg-[#0a2b18] transition-colors duration-500">
                    <span className="text-sm font-semibold text-[#6c8274] group-hover:text-[#d4af37] transition-colors uppercase tracking-wider">{event.month}</span>
                    <span className="text-3xl font-serif text-[#0a2b18] group-hover:text-white transition-colors mt-1">{event.date}</span>
                  </div>
                  
                  {/* Event Info */}
                  <div className="flex flex-col justify-center flex-grow">
                    <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">{event.category}</span>
                    <h3 className="text-xl font-serif text-[#0a2b18] group-hover:text-[#1b4d32] transition-colors mb-3">{event.title}</h3>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-[#6c8274]">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 opacity-70" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 opacity-70" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="pt-2">
              <Link to="/events" className="inline-flex items-center gap-2 text-[#0a2b18] font-medium border-b border-[#0a2b18]/30 pb-1 hover:border-[#0a2b18] hover:gap-3 transition-all duration-300">
                View Academic Calendar <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Latest News */}
          <div className="lg:col-span-5 space-y-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-[#1b4d32] uppercase tracking-widest text-xs font-semibold">School Highlights</span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#0a2b18] mt-3">Latest News</h2>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="space-y-8"
            >
              {latestNews.map((news) => (
                <motion.div 
                  key={news.id} 
                  variants={fadeUp}
                  className="group flex gap-5 cursor-pointer"
                >
                  <div className="w-32 h-32 shrink-0 rounded-[1.5rem] overflow-hidden shadow-md">
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#1b4d32] bg-[#f7faf8] px-2 py-1 rounded-md">{news.tag}</span>
                      <span className="text-xs text-[#6c8274] flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {news.date}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-[#0a2b18] group-hover:text-[#1b4d32] transition-colors leading-snug line-clamp-2">
                      {news.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="pt-4 p-8 bg-[#f7faf8] rounded-[2rem] border border-gray-100 flex items-center justify-between group cursor-pointer hover:shadow-xl transition-all duration-500">
              <div>
                <h4 className="font-serif text-xl text-[#0a2b18] mb-1">Newsletter</h4>
                <p className="text-sm text-[#6c8274]">Subscribe to our monthly updates</p>
              </div>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-[#0a2b18] group-hover:text-white transition-colors duration-500 text-[#0a2b18]">
                <ArrowRight className="w-5 h-5" />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
