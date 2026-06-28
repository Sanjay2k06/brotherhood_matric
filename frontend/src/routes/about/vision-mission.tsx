import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import aboutImage2 from "../../images/aboutimage2.jpg";
import { motion } from "motion/react";

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export const Route = createFileRoute("/about/vision-mission")({
  head: () => ({
    meta: [
      { title: "Vision & Mission — Brotherhood School" },
      { name: "description", content: "Discover our educational vision, mission statements, and fundamental core values." },
    ],
  }),
  component: VisionMissionPage,
});

function VisionMissionPage() {
  const values = [
    { title: "Integrity", desc: "Honesty and strong moral principles in actions and academic pursuits." },
    { title: "Discipline", desc: "Orderly conduct, consistency, and respect for school policies and community guidelines." },
    { title: "Excellence", desc: "Striving for the highest standards in academics, co-curriculars, and character." },
    { title: "Compassion", desc: "Caring for the less fortunate and relating to one another with sympathy and respect." },
    { title: "Respect", desc: "Recognizing the profound value and dignity inherent in every individual." },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Statements & Principles"
        title="Vision & Mission"
        subtitle="The philosophical pillars that guide educational pathways at Brotherhood."
      />

      {/* Vision & Mission Section */}
      <section className="py-24 md:py-32 bg-[#f7faf8] text-[#0a2b18] relative overflow-hidden">
        {/* Ambient lights */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#d4af37] rounded-full blur-[150px] opacity-[0.15] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1b4d32] rounded-full blur-[150px] opacity-[0.05] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* Content Column */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
              className="lg:col-span-7 space-y-24"
            >
              
              {/* Vision */}
              <motion.div variants={fadeUp} className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-[#1b4d32]"></div>
                  <span className="text-[#1b4d32] uppercase tracking-widest text-xs font-semibold">Our Vision</span>
                </div>
                
                <div className="relative">
                  <span className="absolute -top-12 -left-6 md:-left-10 text-9xl font-serif text-[#d4af37]/20 leading-none select-none">"</span>
                  <h2 className="font-serif text-4xl md:text-5xl text-[#0a2b18] leading-[1.2] relative z-10 text-balance">
                    To be a <span className="italic text-[#1b4d32]">distinguished center</span> of academic learning, forming morally integrated, intellectually competent, and socially responsible leaders of tomorrow.
                  </h2>
                </div>
              </motion.div>

              {/* Mission */}
              <motion.div variants={fadeUp} className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-[#1b4d32]"></div>
                  <span className="text-[#1b4d32] uppercase tracking-widest text-xs font-semibold">Our Mission</span>
                </div>
                
                <div className="space-y-6 text-lg font-light text-[#6c8274] leading-relaxed border-l-2 border-[#1b4d32]/30 pl-6 md:pl-10 ml-2 md:ml-4">
                  <p>
                    To offer comprehensive education that balances academic excellence, innovative technological understanding, and personal growth.
                  </p>
                  <p>
                    By aligning our methodologies with the preventative pedagogical principles of Don Bosco, we foster standard-setting discipline and character, preparing students to confidently navigate and serve the global community.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Image Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-5 relative hidden md:block"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[3/4] shadow-2xl group">
                <img
                  src={aboutImage2}
                  alt="School Green Courtyard"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#0a2b18]/10 group-hover:bg-transparent transition-colors duration-700"></div>
              </div>
              
              {/* Floating Accent */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-[#d4af37]/50 rounded-full animate-[spin_30s_linear_infinite] flex items-center justify-center z-20 pointer-events-none">
                <div className="w-32 h-32 border border-[#d4af37]/40 rounded-full border-dashed"></div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 md:py-32 bg-[#05140b] text-white px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="mb-20 max-w-2xl"
          >
            <span className="text-[#d4af37] uppercase tracking-widest text-xs font-semibold">The Foundation</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white mt-4">Our Core Values</h2>
          </motion.div>
          
          <div className="flex flex-col">
            {values.map((val, idx) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="group border-t border-white/10 last:border-b py-10 md:py-16 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-16 hover:bg-white/[0.02] transition-colors duration-500 px-6 -mx-6 rounded-3xl"
              >
                <div className="font-serif text-5xl md:text-7xl text-white/10 italic group-hover:text-[#d4af37]/60 transition-colors duration-500 md:w-32 shrink-0">
                  0{idx + 1}
                </div>
                <div className="flex-1 md:w-1/3 shrink-0">
                  <h3 className="font-serif text-3xl md:text-4xl text-white group-hover:translate-x-4 transition-transform duration-500">
                    {val.title}
                  </h3>
                </div>
                <div className="flex-1 md:w-1/2">
                  <p className="text-white/60 text-lg font-light leading-relaxed group-hover:text-white/90 transition-colors duration-500">
                    {val.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
