import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, ChevronRight, Phone, BookOpen, Users, Shield, Lightbulb, MapPin, Calendar, Microscope, Monitor, Library, Bus, Home, Clock } from "lucide-react";
import { fadeUp, fadeLeft, fadeRight, staggerContainer, buttonHover, buttonTap, cardHover } from "../lib/motion";

// Optimized Images
import heroImage from "../images/herosection1.jpg";
import aboutImage from "../images/aboutimage3.jpg";
import campusImage1 from "../images/aboutimage2.jpg";
import campusImage2 from "../images/schooluniform.jpg";
import campusImage3 from "../images/house.jpg";
import sportsImage from "../images/sports.jpg";
import artsImage from "../images/choir.jpg";
import principalImage from "../images/Principal-Photo.jpg";
import facilityImage1 from "../images/result.jpg";
import facilityImage2 from "../images/aboutimage2.jpg";
import facilityImage3 from "../images/herosection.jpg";
import galleryImage from "../images/ecoclub.jpg";

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
      <div className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#d4af37]/10 rounded-full blur-[90px] sm:blur-[120px] mix-blend-screen pointer-events-none z-10"></div>
      <div className="absolute -bottom-40 left-10 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-[#1b4d32]/30 rounded-full blur-[80px] sm:blur-[100px] mix-blend-screen pointer-events-none z-10"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full flex flex-col justify-center h-full pt-20 sm:pt-24 md:pt-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl space-y-6 sm:space-y-8 flex flex-col items-start"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-3 sm:gap-4">
            <div className="h-[1px] w-6 sm:w-8 bg-[#d4af37]"></div>
            <span className="text-[#d4af37] text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold">Established 1991</span>
            <div className="h-[1px] w-6 sm:w-8 bg-[#d4af37]"></div>
          </motion.div>

          {/* Majestic Typography */}
          <motion.h1 variants={fadeUp} className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-[5rem] text-white leading-[1.1] sm:leading-[1.05] font-normal tracking-tight text-balance drop-shadow-2xl break-words">
            Building Future <br className="hidden md:block" />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f9e596] font-light drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">Leaders Through Excellence</span> <br className="hidden md:block" />
            in Education
          </motion.h1>

          {/* Refined Subtitle */}
          <motion.div variants={fadeUp} className="border-l-2 border-[#d4af37]/40 pl-4 sm:pl-6 py-1">
            <p className="text-[#e2e8f0] text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed text-balance opacity-90">
              Brotherhood Matriculation Higher Secondary School has been shaping young minds since 1991 by providing quality education, strong moral values, innovative teaching methods, and a nurturing environment where every child can achieve academic excellence and holistic development.
            </p>
          </motion.div>

          {/* High-end interactive Buttons */}
          <motion.div variants={fadeUp} className="pt-6 sm:pt-8 flex flex-col sm:flex-row gap-4 sm:gap-5 items-stretch sm:items-center w-full sm:w-auto">
            {/* Primary Gold Button */}
            <motion.div whileHover={buttonHover} whileTap={buttonTap} className="w-full sm:w-auto">
              <Link to="/admissions" className="w-full sm:w-auto group relative inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-full overflow-hidden transition-shadow duration-300 shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#b58c2a] via-[#d4af37] to-[#b58c2a] bg-[length:200%_auto] group-hover:bg-right transition-all duration-500"></div>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] skew-x-[-15deg] group-hover:translate-x-[150%] transition-transform duration-1000 ease-out"></div>
                <span className="relative z-10 font-semibold tracking-wide text-[#05140b] flex items-center justify-center gap-2">
                  Admissions Open
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </motion.div>

            {/* Secondary Glass Button */}
            <motion.div whileHover={buttonHover} whileTap={buttonTap} className="w-full sm:w-auto">
              <Link to="/about" className="w-full sm:w-auto group inline-flex items-center justify-center sm:justify-start gap-4 px-3 sm:px-2 py-2 pr-6 bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 rounded-full font-medium tracking-wide">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#d4af37] group-hover:text-[#05140b] transition-colors duration-300 shrink-0">
                   <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <span>Explore Campus</span>
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
    <section className="py-20 sm:py-32 md:py-40 px-4 sm:px-6 bg-[#f7faf8] overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-32 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-6 sm:space-y-8"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 sm:gap-4">
            <div className="w-2 h-2 rounded-full bg-[#1b4d32]"></div>
            <span className="text-[#6c8274] uppercase tracking-widest text-xs font-semibold">About the School</span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0a2b18] leading-[1.15] break-words">
            A tradition of <span className="italic text-[#1b4d32]">scholarship</span> and service.
          </motion.h2>

          <motion.div variants={fadeUp} className="space-y-4 sm:space-y-6 text-[#6c8274] text-sm sm:text-base leading-relaxed font-light">
            <p>
              Brotherhood Matriculation Higher Secondary school is a thirty-year-old institution, recognised by the Government of Tamilnadu. It has classes from pre-Kindergarten to standard XII. It was founded in the year 1991.
            </p>
            <p>
              It is a gender-neutral school, where students of both genders study and relate with respect for each other and maintain their personal dignity. It is aware that the quality of education is very much dependant on the competence of the teachers, therefore it has hired highly educated and dedicated teachers who are acutely aware of the great responsibility that vests on their shoulders. Our teachers undergo regular refresher programs and believe that they too are eternal students.
            </p>
            <p>
              The school has all the standard facilities and much more. In keeping with its future oriented mindset, it has set up language labs, mathematics lab, Robotic lab, smart classes and a very well-equipped library.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="pt-4 sm:pt-6">
            <Link to="/about" className="group inline-flex items-center gap-3 text-[#1b4d32] border-b border-[#1b4d32]/30 pb-1 hover:border-[#1b4d32] transition-colors duration-300">
              <span className="font-medium text-sm sm:text-base">Discover Our Story</span>
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
            <img src={aboutImage} alt="Students learning" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#0a2b18]/10 mix-blend-multiply"></div>
          </div>

          {/* Floating Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute -bottom-6 left-4 sm:-bottom-10 sm:-left-6 md:-left-12 lg:-left-16 bg-white/90 backdrop-blur-xl p-5 sm:p-8 rounded-2xl shadow-[0_20px_40px_-15px_rgba(10,43,24,0.1)] max-w-[240px] sm:max-w-[280px] border border-white/50 z-10"
          >
            <p className="font-serif text-xl sm:text-2xl text-[#0a2b18] leading-tight mb-2">"Every Child is a Gift of God."</p>
            <p className="text-[#6c8274] text-xs sm:text-sm uppercase tracking-wider font-semibold">— Our Tagline</p>
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
    <section className="py-20 sm:py-32 md:py-40 px-4 sm:px-6 bg-[#05140b] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 sm:gap-16 lg:gap-24">
          
          <div className="lg:w-1/3">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="lg:sticky lg:top-32 space-y-4 sm:space-y-6"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                 <div className="w-8 sm:w-12 h-[1px] bg-[#d4af37]"></div>
                 <span className="text-[#d4af37] uppercase tracking-widest text-xs font-semibold">Educational Philosophy</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] break-words">
                The Pillars of <br className="hidden lg:block" /> <span className="italic text-white/70">Brotherhood</span>
              </h2>
              <p className="text-white/60 font-light leading-relaxed pt-2 sm:pt-4 text-base sm:text-lg">
                Our foundation is built upon timeless values that guide our students toward a life of purpose, meaning, and profound impact.
              </p>
            </motion.div>
          </div>

          <div className="lg:w-2/3 flex flex-col">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                variants={fadeUp}
                className="group border-t border-white/10 last:border-b py-8 sm:py-12 flex flex-col sm:flex-row gap-3 sm:gap-12 items-start transition-colors hover:bg-white/[0.02]"
              >
                <div className="text-[#d4af37]/40 font-serif text-3xl sm:text-4xl italic group-hover:text-[#d4af37] transition-colors duration-500">
                  {pillar.num}
                </div>
                <div className="flex-1 space-y-2 sm:space-y-4">
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white group-hover:translate-x-2 transition-transform duration-500">
                    {pillar.title}
                  </h3>
                  <p className="text-white/60 text-base sm:text-lg font-light leading-relaxed max-w-xl group-hover:text-white/80 transition-colors duration-500">
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
    <section className="py-20 sm:py-32 md:py-40 bg-[#f7faf8] px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="mb-12 sm:mb-20 max-w-2xl"
        >
          <span className="text-[#1b4d32] uppercase tracking-widest text-xs font-semibold mb-3 sm:mb-4 block">Campus Life</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0a2b18]">A vibrant environment where memories are made.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 auto-rows-[240px] sm:auto-rows-[280px] md:auto-rows-[300px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="md:col-span-8 md:row-span-2 rounded-2xl sm:rounded-3xl overflow-hidden relative group"
          >
            <img src={campusImage1} alt="Campus Event" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a2b18]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 text-white">
              <p className="font-serif text-xl sm:text-2xl">Annual Celebrations</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.8 }}
            className="md:col-span-4 md:row-span-1 rounded-2xl sm:rounded-3xl overflow-hidden relative group"
          >
            <img src={campusImage2} alt="Students" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[#0a2b18]/20 group-hover:bg-transparent transition-colors duration-500"></div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="md:col-span-4 md:row-span-1 rounded-2xl sm:rounded-3xl overflow-hidden relative group bg-[#1b4d32] p-6 sm:p-8 flex flex-col justify-between text-white"
          >
            <img src={campusImage3} alt="House Activities" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay transition-transform duration-1000 group-hover:scale-105" />
            <div className="relative z-10">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-[#d4af37] mb-3 sm:mb-4" />
              <h3 className="font-serif text-xl sm:text-2xl mb-1 sm:mb-2">Rich Traditions</h3>
              <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed">From House Competitions to cultural festivals, life at Brotherhood is deeply enriching.</p>
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
    <section className="py-20 sm:py-32 md:py-40 bg-white px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="lg:w-1/3 space-y-6 sm:space-y-8"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-8 sm:w-12 h-[1px] bg-[#1b4d32]"></div>
            <span className="text-[#6c8274] uppercase tracking-widest text-xs font-semibold">Academic Excellence</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0a2b18] leading-[1.2] break-words">
            A curriculum built for the world ahead.
          </h2>
          <p className="text-[#6c8274] text-base sm:text-lg font-light leading-relaxed">
            Our comprehensive educational framework is designed to challenge students intellectually while providing the support they need to excel.
          </p>
          <div className="pt-2 sm:pt-4">
            <Link to="/academics" className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#1b4d32]/20 text-[#1b4d32] hover:bg-[#f7faf8] transition-colors duration-300">
              <span className="font-medium text-sm">View All Programs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {programs.map((prog, idx) => (
            <motion.div
              key={prog.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              className={`p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-[#f1f6f3] bg-[#f7faf8] hover:shadow-xl transition-shadow duration-500 ${idx === 2 ? 'md:col-span-2 md:w-1/2 md:mx-auto' : ''}`}
            >
              <div className="text-[#1b4d32] text-xs sm:text-sm uppercase tracking-wider font-semibold mb-2">{prog.subtitle}</div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#0a2b18] mb-3 sm:mb-4">{prog.title}</h3>
              <p className="text-[#6c8274] text-sm sm:text-base leading-relaxed font-light">{prog.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StudentLife() {
  return (
    <section className="py-20 sm:py-32 md:py-40 bg-[#f7faf8] px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24 md:space-y-32">
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row items-center gap-10 sm:gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
            className="w-full md:w-1/2"
          >
            <div className="aspect-[4/3] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-xl">
              <img src={sportsImage} alt="Sports and Athletics" loading="lazy" decoding="async" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
            </div>
          </motion.div>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="w-full md:w-1/2 space-y-4 sm:space-y-6"
          >
            <span className="text-[#d4af37] uppercase tracking-widest text-xs font-semibold">Physical Development</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0a2b18] break-words">Sports & Athletics</h2>
            <p className="text-[#6c8274] text-base sm:text-lg font-light leading-relaxed">
              We believe in the power of physical education to teach teamwork, discipline, and resilience. Our comprehensive sports programs cater to all levels of ability, fostering a lifelong commitment to health and fitness.
            </p>
          </motion.div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-10 sm:gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
            className="w-full md:w-1/2"
          >
            <div className="aspect-[4/3] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-xl">
              <img src={artsImage} alt="Arts and Culture" loading="lazy" decoding="async" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
            </div>
          </motion.div>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="w-full md:w-1/2 space-y-4 sm:space-y-6"
          >
            <span className="text-[#1b4d32] uppercase tracking-widest text-xs font-semibold">Creative Expression</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0a2b18] break-words">Arts & Culture</h2>
            <p className="text-[#6c8274] text-base sm:text-lg font-light leading-relaxed">
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
    <section className="py-20 sm:py-32 bg-[#0a2b18] px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute left-0 top-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(27,77,50,0.4),transparent_50%)]"></div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 sm:gap-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
          className="lg:w-2/5 shrink-0 w-full"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[#d4af37] rounded-full translate-x-4 translate-y-4 opacity-50 blur-2xl"></div>
            <div className="aspect-[3/4] w-full max-w-[280px] sm:max-w-[360px] md:max-w-[400px] mx-auto rounded-t-full rounded-b-[2.5rem] sm:rounded-b-[3rem] overflow-hidden border-4 border-white/10 shadow-2xl relative z-10">
              <img src={principalImage} alt="Principal" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="lg:w-3/5 space-y-6 sm:space-y-8"
        >
          <div className="text-[#d4af37]">
            <svg width="40" height="40" className="sm:w-12 sm:h-12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.017 21L16.417 14.5C16.817 13.5 17.517 11.5 17.517 9.5C17.517 6.5 15.017 4.5 11.517 4.5C11.517 4.5 11.017 4.5 10.517 4.6C11.017 3.5 12.017 2.5 13.517 2L12.517 1C10.517 1.5 8.517 3.5 7.517 6.5C6.517 9.5 6.517 12.5 6.517 12.5L8.517 12.5C8.517 12.5 9.017 12.5 9.517 12.5C9.517 12.5 10.017 12.5 10.017 14.5C10.017 16.5 8.517 17.5 8.517 17.5L7.517 21H14.017Z" />
            </svg>
          </div>
          <motion.blockquote variants={fadeUp} className="font-serif text-xl sm:text-2xl md:text-3xl text-white leading-relaxed text-balance">
            "Education is not merely the acquisition of knowledge but the development of life skills, values, character, and personality. At Brotherhood Matriculation Higher Secondary School, we are committed to providing value-based education that empowers students to become responsible, compassionate, and confident individuals."
          </motion.blockquote>

          <motion.div variants={fadeUp} className="pt-4 sm:pt-6">
            <h4 className="text-white text-lg sm:text-xl font-medium tracking-wide">Mrs. Shima Newton</h4>
            <p className="text-[#d4af37] text-xs sm:text-sm uppercase tracking-widest mt-1">Principal (Higher Secondary)</p>
          </motion.div>

          <motion.div variants={fadeUp} className="pt-2 sm:pt-4">
            <Link to="/about/principal-message" className="text-white/70 hover:text-white border-b border-white/30 pb-1 text-sm transition-colors">
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
    <section className="py-20 sm:py-32 md:py-40 bg-white px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-center space-y-3 sm:space-y-4 max-w-2xl mx-auto"
        >
          <span className="text-[#1b4d32] uppercase tracking-widest text-xs font-semibold">Our Campus</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0a2b18]">State-of-the-Art Facilities</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 auto-rows-[240px] sm:auto-rows-[280px]">
          {items.map((item, idx) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              whileHover={cardHover}
              className={`group relative rounded-2xl sm:rounded-[2rem] overflow-hidden ${item.span}`}
            >
              <img src={item.img} alt={item.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a2b18]/90 via-[#0a2b18]/20 to-transparent opacity-80"></div>

              <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full transform translate-y-3 sm:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-3 sm:mb-4">
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-white mb-2">{item.title}</h3>
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
    <section className="py-16 sm:py-24 bg-[#f7faf8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading Aligned with Home Theme */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center space-y-3 sm:space-y-4 max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center justify-center gap-3">
            <div className="w-8 h-[1px] bg-[#1b4d32]"></div>
            <span className="text-[#1b4d32] uppercase tracking-widest text-xs font-semibold">Visual Archives</span>
            <div className="w-8 h-[1px] bg-[#1b4d32]"></div>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0a2b18]">Life at Brotherhood</h2>
          <p className="text-[#6c8274] font-light text-sm sm:text-base leading-relaxed">
            Take a visual tour through our historic campus, modern laboratories, arts performances, and sports achievements.
          </p>
        </motion.div>

        {/* Aligned Preview Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative rounded-2xl sm:rounded-[3rem] overflow-hidden h-[45vh] sm:h-[55vh] md:h-[65vh] group cursor-pointer shadow-2xl border border-gray-100"
        >
          <img src={galleryImage} alt="Campus Life Gallery" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a2b18]/90 via-[#0a2b18]/40 to-transparent group-hover:bg-[#0a2b18]/50 transition-colors duration-500 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <span className="text-[#d4af37] uppercase tracking-[0.2em] text-xs font-bold drop-shadow">Campus Heritage</span>
            <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl text-white font-normal drop-shadow-lg max-w-xl">
              Explore Our Complete Visual Archive
            </h3>
            <Link to="/gallery" className="mt-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#d4af37] text-[#05140b] rounded-full font-bold tracking-wider text-xs sm:text-sm uppercase flex items-center gap-2.5 shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-105 transition-all duration-300">
              <span>View Full Photo Gallery</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function AdmissionsCTA() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 bg-[#f7faf8] overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl sm:rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#1b4d32] to-[#0a2b18] p-8 sm:p-14 md:p-20 text-center shadow-2xl"
        >
          {/* Subtle Decorative Background Element */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#d4af37] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white rounded-full blur-[100px] opacity-10 pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-6 sm:space-y-8">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white leading-tight break-words">
              Begin your child's journey today.
            </h2>
            <p className="text-[#f7faf8]/80 text-base sm:text-lg font-light leading-relaxed">
              Applications for the upcoming academic year are now open. We invite you to discover the Brotherhood difference.
            </p>

            <div className="pt-4 sm:pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/admissions" className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-[#d4af37] text-[#0a2b18] rounded-full font-semibold tracking-wide hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all duration-300">
                Apply Now
              </Link>
              <Link to="/contact" className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent border border-white/30 text-white rounded-full font-medium tracking-wide hover:bg-white hover:text-[#0a2b18] transition-all duration-300">
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
  const defaultUpcomingEvents = [
    {
      id: "1",
      date: "15",
      month: "AUG",
      title: "Independence Day Celebration",
      time: "08:00 AM - 12:30 PM",
      location: "Main Ground",
      category: "Celebration",
    },
    {
      id: "2",
      date: "22",
      month: "SEP",
      title: "Annual Science Exhibition",
      time: "09:00 AM - 03:00 PM",
      location: "Science Block",
      category: "Academic",
    },
    {
      id: "3",
      date: "10",
      month: "OCT",
      title: "Inter-School Sports Meet",
      time: "07:30 AM - 04:00 PM",
      location: "Sports Arena",
      category: "Athletics",
    }
  ];

  const defaultLatestNews = [
    {
      id: "1",
      title: "Brotherhood students secure top ranks in state board examinations.",
      date: "July 12, 2026",
      image: galleryImage,
      tag: "Academics"
    },
    {
      id: "2",
      title: "New state-of-the-art Robotics lab inaugurated by the Principal.",
      date: "June 28, 2026",
      image: facilityImage2,
      tag: "Campus"
    }
  ];

  const [upcomingEvents, setUpcomingEvents] = useState(defaultUpcomingEvents);
  const [latestNews, setLatestNews] = useState(defaultLatestNews);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/events/")
      .then(res => res.json())
      .then(data => {
        const eventsList = Array.isArray(data) ? data : (data.results || []);
        if (eventsList.length > 0) {
          const mapped = eventsList.map((ev: any) => {
            const d = new Date(ev.event_date);
            const day = !isNaN(d.getDate()) ? String(d.getDate()).padStart(2, "0") : "15";
            const monthStr = !isNaN(d.getMonth()) ? d.toLocaleString("en-US", { month: "short" }).toUpperCase() : "EVENT";
            return {
              id: String(ev.id),
              date: day,
              month: monthStr,
              title: ev.title,
              time: ev.event_time || "School Hours",
              location: ev.venue || "Campus",
              category: ev.category || "Academic"
            };
          });
          setUpcomingEvents(mapped);
        }
      })
      .catch(err => console.error("Error fetching live events:", err));

    fetch("http://127.0.0.1:8000/api/announcements/")
      .then(res => res.json())
      .then(data => {
        const list = Array.isArray(data) ? data : (data.results || []);
        if (list.length > 0) {
          const newsImages = [galleryImage, facilityImage2, facilityImage1, facilityImage3];
          const mapped = list.slice(0, 4).map((ann: any, idx: number) => ({
            id: String(ann.id),
            title: ann.title,
            date: ann.created_at ? new Date(ann.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Recent",
            image: newsImages[idx % newsImages.length],
            tag: ann.alert_type || ann.priority || "Notice"
          }));
          setLatestNews(mapped);
        }
      })
      .catch(err => console.error("Error fetching live announcements:", err));
  }, []);

  return (
    <section className="py-20 sm:py-28 md:py-32 bg-white px-4 sm:px-6 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#f7faf8] rounded-full translate-x-1/2 -translate-y-1/2 opacity-50 blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
          
          {/* Left Column: Upcoming Events */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-[#1b4d32] uppercase tracking-widest text-xs font-semibold">Mark Your Calendar</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0a2b18] mt-2 sm:mt-3 break-words">Upcoming Events</h2>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="space-y-4 sm:space-y-6"
            >
              {upcomingEvents.map((event) => (
                <motion.div 
                  key={event.id} 
                  variants={fadeUp}
                  className="group flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] bg-[#f7faf8] border border-gray-100 hover:border-[#d4af37]/30 hover:shadow-xl transition-all duration-500 cursor-pointer"
                >
                  {/* Date Badge */}
                  <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white shadow-sm flex flex-col items-center justify-center border border-gray-100 group-hover:bg-[#0a2b18] transition-colors duration-500">
                    <span className="text-xs sm:text-sm font-semibold text-[#6c8274] group-hover:text-[#d4af37] transition-colors uppercase tracking-wider">{event.month}</span>
                    <span className="text-2xl sm:text-3xl font-serif text-[#0a2b18] group-hover:text-white transition-colors mt-0.5 sm:mt-1">{event.date}</span>
                  </div>
                  
                  {/* Event Info */}
                  <div className="flex flex-col justify-center flex-grow">
                    <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-1 sm:mb-2">{event.category}</span>
                    <h3 className="text-lg sm:text-xl font-serif text-[#0a2b18] group-hover:text-[#1b4d32] transition-colors mb-2 sm:mb-3">{event.title}</h3>
                    
                    <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-[#6c8274]">
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
          <div className="lg:col-span-5 space-y-8 sm:space-y-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-[#1b4d32] uppercase tracking-widest text-xs font-semibold">School Highlights</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0a2b18] mt-2 sm:mt-3 break-words">Latest News</h2>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="space-y-6 sm:space-y-8"
            >
              {latestNews.map((news) => (
                <motion.div 
                  key={news.id} 
                  variants={fadeUp}
                  className="group flex gap-3 sm:gap-5 cursor-pointer"
                >
                  <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-xl sm:rounded-[1.5rem] overflow-hidden shadow-md">
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5 sm:mb-2">
                      <span className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-[#1b4d32] bg-[#f7faf8] px-2 py-0.5 sm:py-1 rounded-md">{news.tag}</span>
                      <span className="text-[11px] sm:text-xs text-[#6c8274] flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {news.date}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-medium text-[#0a2b18] group-hover:text-[#1b4d32] transition-colors leading-snug line-clamp-2">
                      {news.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="p-6 sm:p-8 bg-[#f7faf8] rounded-2xl sm:rounded-[2rem] border border-gray-100 flex items-center justify-between group cursor-pointer hover:shadow-xl transition-all duration-500">
              <div>
                <h4 className="font-serif text-lg sm:text-xl text-[#0a2b18] mb-1">Newsletter</h4>
                <p className="text-xs sm:text-sm text-[#6c8274]">Subscribe to our monthly updates</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-[#0a2b18] group-hover:text-white transition-colors duration-500 text-[#0a2b18] shrink-0">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
