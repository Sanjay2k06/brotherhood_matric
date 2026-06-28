import { createFileRoute } from '@tanstack/react-router';
import { PageHeader } from "@/components/PageHeader";
import { History, GraduationCap } from "lucide-react";
import aboutImage from "../../images/aboutimage3.png";
import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "../../lib/motion";

export const Route = createFileRoute("/about/about-school")({
  head: () => ({
    meta: [
      { title: "About School — Brotherhood Matriculation Hr. Sec. School" },
      { name: "description", content: "Learn about the history, introduction, and facilities of Brotherhood School." },
    ],
  }),
  component: AboutSchoolPage,
});

function AboutSchoolPage() {
  // const facilities = [
  //   { name: "Language Labs", description: "Advanced tools to master communication, accent training, and vocabulary development." },
  //   { name: "Mathematics Lab", description: "Hands-on tools and geometric kits to bring abstract formulas to life." },
  //   { name: "Robotics Lab", description: "Equipped with STEM kits, sensors, and microcontrollers for coding and engineering basics." },
  //   { name: "Smart Classrooms", description: "Equipped with interactive projectors, high-definition audio, and digitised school lessons." },
  //   { name: "Well-equipped Library", description: "Thousands of books, references, journals, and a quiet reading space to build literacy." },
  // ];

  return (
    <>
      <PageHeader
        eyebrow="Introduction & Legacy"
        title="About our School"
        subtitle="Foundational history and campus learning resources at Brotherhood."
      />

      {/* School Introduction with Image */}
      <section className="py-24 md:py-32 px-6 bg-[#f7faf8] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-4">
                 <div className="w-12 h-[1px] bg-[#d4af37]"></div>
                 <span className="text-[#d4af37] uppercase tracking-widest text-xs font-semibold">Our Legacy</span>
              </motion.div>
              
              <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#0a2b18] leading-[1.15]">
                School <br className="hidden md:block" />
                <span className="italic text-[#1b4d32]">Introduction</span>
              </motion.h2>

              <motion.div variants={fadeUp} className="space-y-6 text-[#6c8274] text-lg font-light leading-relaxed">
                <p>
                  Founded in 1991, Brotherhood Matriculation Higher Secondary School stands as a beacon of high academic standards, moral growth, and dedicated service in Chennai. Recognised by the Government of Tamil Nadu, our campus is a gender-neutral space built on mutual respect, personal dignity, and self-belief.
                </p>
                <p>
                  We believe that true education goes beyond textbooks, striving to cultivate analytical thinking, discipline, and standard-setting character in every child. Our qualified educators are dedicated to creating a safe and engaging classroom environment where children can discover their inner potential.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative max-w-md mx-auto lg:mr-0 lg:ml-auto w-full"
            >
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-2xl">
                <img src={aboutImage} alt="Brotherhood School Legacy" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#0a2b18]/10 mix-blend-multiply"></div>
              </div>
              
              {/* Floating Element */}
              <div className="absolute -bottom-6 -left-4 md:-left-8 bg-white/95 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-[0_20px_40px_-15px_rgba(10,43,24,0.15)] max-w-[200px] md:max-w-[240px] border border-[#f1f6f3]">
                <GraduationCap className="h-7 w-7 md:h-9 md:w-9 text-[#d4af37] mb-2 md:mb-3" />
                <p className="font-serif text-lg md:text-xl text-[#0a2b18] leading-tight mb-1">"Beyond Textbooks"</p>
                <p className="text-[#6c8274] text-[10px] md:text-xs uppercase tracking-wider font-semibold">Since 1991</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Our History */}
      <section className="py-24 md:py-32 bg-[#05140b] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#d4af37] rounded-full blur-[150px] opacity-[0.05] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1b4d32] rounded-full blur-[150px] opacity-10 translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20 space-y-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#d4af37]/40"></div>
              <span className="text-[#d4af37] uppercase tracking-widest text-xs font-semibold">Our Journey</span>
              <div className="w-12 h-[1px] bg-[#d4af37]/40"></div>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white">
              A Legacy of <span className="italic text-[#d4af37]">Purpose</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Elegant Divider Line in middle for large screens */}
            <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-[1px] bg-gradient-to-b from-transparent via-[#d4af37]/20 to-transparent -translate-x-1/2"></div>

            <div className="space-y-16 md:space-y-24">
              {/* 1991 Block */}
              <motion.div
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8 }}
                className="grid md:grid-cols-2 gap-8 md:gap-24 items-center group relative"
              >
                <div className="md:text-right space-y-4">
                  <div className="font-serif text-6xl lg:text-7xl text-white/10 group-hover:text-[#d4af37]/20 transition-colors duration-700 italic">
                    1991
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-white group-hover:text-[#d4af37] transition-colors duration-500">
                    Foundation Year
                  </h3>
                  <p className="text-white/60 font-light leading-relaxed text-lg group-hover:text-white/80 transition-colors duration-500">
                    Brotherhood School was established with a small cohort of students, driven by a deep conviction to provide wholesome, value-integrated education. Over the decades, it has grown in size and reputation.
                  </p>
                </div>
                <div className="hidden md:block relative h-full">
                   {/* Center Dot Indicator */}
                   <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#05140b] border border-[#d4af37]/30 flex items-center justify-center group-hover:border-[#d4af37] transition-colors duration-500 z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500"></div>
                   </div>
                </div>
              </motion.div>

              {/* Present Day Block */}
              <motion.div
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8 }}
                className="grid md:grid-cols-2 gap-8 md:gap-24 items-center group relative"
              >
                <div className="hidden md:block relative h-full">
                   {/* Center Dot Indicator */}
                   <div className="absolute right-[-12px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#05140b] border border-[#d4af37]/30 flex items-center justify-center group-hover:border-[#d4af37] transition-colors duration-500 z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500"></div>
                   </div>
                </div>
                <div className="space-y-4">
                  <div className="font-serif text-6xl lg:text-7xl text-white/10 group-hover:text-[#d4af37]/20 transition-colors duration-700 italic">
                    Present
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-white group-hover:text-[#d4af37] transition-colors duration-500">
                    A Standard of Quality
                  </h3>
                  <p className="text-white/60 font-light leading-relaxed text-lg group-hover:text-white/80 transition-colors duration-500">
                    Today, the institution stands as one of the highly respected higher secondary schools in South Chennai, combining modern STEM methodologies with strong values.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* School Facilities
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-display text-3xl text-primary font-semibold mb-8">School Facilities</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {facilities.map((fac) => (
            <div key={fac.name} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:border-gold/60 transition duration-300">
              <h3 className="font-display text-xl text-primary font-semibold mb-2">{fac.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{fac.description}</p>
            </div>
          ))}
        </div>
      </section> */}
    </>
  );
}
