import { createFileRoute } from '@tanstack/react-router';
import { PageHeader } from "@/components/PageHeader";
import { useState, useEffect } from "react";
import aboutImage from "../../images/aboutimage3.jpg";
import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { API_BASE } from "@/config";

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
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_BASE}/pages/about-school/`)
      .then(res => res.json())
      .then(data => {
        if (data && data.content_blocks) {
          setPageData(data);
        }
      })
      .catch(err => console.error("Error loading dynamic page content:", err));
  }, []);

  const heroTitle = pageData?.hero_title || "About our School";
  const heroSubtitle = pageData?.hero_subtitle || "Foundational history and campus learning resources at Brotherhood.";

  const p1 = pageData?.content_blocks?.p1 || "Brotherhood Matriculation Higher Secondary school is a thirty-year-old institution, recognised by the Government of Tamilnadu. It has classes from pre-Kindergarten to standard XII. It was founded in the year 1991.";
  const p2 = pageData?.content_blocks?.p2 || "It is a gender-neutral school, where students of both genders study and relate with respect for each other and maintain their personal dignity. It is aware that the quality of education is very much dependant on the competence of the teachers, therefore it has hired highly educated and dedicated teachers who are acutely aware of the great responsibility that vests on their shoulders. Our teachers undergo regular refresher programs and believe that they too are eternal students.";
  const p3 = pageData?.content_blocks?.p3 || "The school has all the standard facilities and much more. In keeping with its future oriented mindset, it has set up language labs, mathematics lab, Robotic lab, smart classes and a very well-equipped library.";

  return (
    <>
      <PageHeader
        eyebrow="Introduction & Legacy"
        title={heroTitle}
        subtitle={heroSubtitle}
      />

      {/* School Introduction with Image */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#f7faf8] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center">
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
              className="space-y-6 sm:space-y-8"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3 sm:gap-4">
                 <div className="w-8 sm:w-12 h-[1px] bg-[#d4af37]"></div>
                 <span className="text-[#d4af37] uppercase tracking-widest text-xs font-semibold">Our Legacy</span>
              </motion.div>
              
              <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0a2b18] leading-[1.15] break-words">
                School <br className="hidden md:block" />
                <span className="italic text-[#1b4d32]">Introduction</span>
              </motion.h2>

                <div className="space-y-4 sm:space-y-6 text-[#6c8274] text-sm sm:text-base font-light leading-relaxed">
                  <p>{p1}</p>
                  <p>{p2}</p>
                  <p>{p3}</p>
                </div>
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
            </motion.div>

          </div>
        </div>
      </section>

      {/* Our History */}
      <section className="py-16 sm:py-24 md:py-32 bg-[#05140b] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#d4af37] rounded-full blur-[150px] opacity-[0.05] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1b4d32] rounded-full blur-[150px] opacity-10 translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-20 space-y-4 sm:space-y-6"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-8 sm:w-12 h-[1px] bg-[#d4af37]/40"></div>
              <span className="text-[#d4af37] uppercase tracking-widest text-xs font-semibold">Our Journey</span>
              <div className="w-8 sm:w-12 h-[1px] bg-[#d4af37]/40"></div>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white break-words">
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
