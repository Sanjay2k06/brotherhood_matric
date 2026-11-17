import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export const Route = createFileRoute("/academics/father-cruze-profile")({
  head: () => ({
    meta: [
      { title: "Father Anton Cruz Profile — Brotherhood School" },
      { name: "description", content: "Read the life story, achievements, and educational philosophy of Father Anton Cruz, founder of Brotherhood Matriculation Hr. Sec. School." },
    ],
  }),
  component: FatherCruzeProfilePage,
});

function FatherCruzeProfilePage() {
  const milestones = [
    { year: "1991", title: "Founded Brotherhood School", desc: "Initiated school classrooms with a handful of desks and standard lessons, catering to local children in Neelankarai." },
    { year: "2005", title: "Higher Secondary Upgradation", desc: "Upgraded the school to higher secondary status, launching advanced streams in Science and Commerce." },
    { year: "2015", title: "Charitable Trust Expansion", desc: "Established scholarship funds for deserving candidates, integrating free remedial education blocks." },
    { year: "Present", title: "Community Icon", desc: "Continues to serve as the spiritual and administrative guide, championing character-building education." }
  ];

  return (
    <div className="bg-[#fdfdfc] text-[#2d3748] font-sans selection:bg-[#0a2b18] selection:text-white">
      <PageHeader
        eyebrow="Tribute Profile"
        title="Father Anton Cruz"
        subtitle="A lifetime dedicated to character formation, community welfare, and educational access."
      />

      {/* Biography Section */}
      <section className="py-24 md:py-32 px-6 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f4f7f5] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="w-full lg:w-1/2 space-y-10"
          >
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-[#1b4d32]"></div>
                <span className="text-[#1b4d32] uppercase tracking-widest text-xs font-semibold">The Visionary</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#0a2b18] leading-tight">
                Rev. Fr. Anton Cruz <br/> <span className="italic text-[#1b4d32] font-light">— Founder</span>
              </h2>
            </motion.div>
            
            <motion.div variants={fadeUp} className="space-y-6 text-lg font-light leading-[1.8] text-[#4a5568]">
              <p>
                <span className="text-5xl font-serif text-[#0a2b18] float-left mr-3 mt-1 leading-none italic">R</span>ev. Father Anton Cruz is a visionary educationist and social reformer who has dedicated his life to youth empowerment and value-based scholastic formation. Inspired by the Salesian educational framework of Saint John Bosco, he believes that true education cannot be separated from moral training and sympathetic guidance.
              </p>
              <p>
                Under his guidance, Brotherhood School has expanded from a small primary school block into a double-track higher secondary school with thousands of alumni. He remains a beloved figure on campus, regularly visiting students during assemblies, counselling families, and advocating for inclusive education for less fortunate children.
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="w-full lg:w-1/2 lg:pt-32 flex flex-col gap-6"
          >
            <motion.div variants={fadeUp} className="bg-white p-10 rounded-[2.5rem] border border-[#f1f6f3] shadow-[0_20px_40px_-15px_rgba(10,43,24,0.06)] hover:shadow-lg transition-shadow duration-500 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37] opacity-[0.03] rounded-bl-full group-hover:scale-110 transition-transform duration-700"></div>
              <div className="font-serif italic text-4xl text-[#d4af37]/40 mb-4 group-hover:text-[#d4af37] transition-colors duration-500">01</div>
              <h3 className="font-serif text-2xl text-[#0a2b18] mb-3">Compassionate Environment</h3>
              <p className="text-[#718096] font-light leading-relaxed">
                Fosters student-centric care and compassionate environments on campus, ensuring every child feels valued and heard.
              </p>
            </motion.div>
            
            <motion.div variants={fadeUp} className="bg-[#f7faf8] p-10 rounded-[2.5rem] border border-[#f1f6f3] shadow-[0_10px_30px_-15px_rgba(10,43,24,0.04)] hover:shadow-lg transition-shadow duration-500 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1b4d32] opacity-[0.03] rounded-bl-full group-hover:scale-110 transition-transform duration-700"></div>
              <div className="font-serif italic text-4xl text-[#1b4d32]/30 mb-4 group-hover:text-[#1b4d32] transition-colors duration-500">02</div>
              <h3 className="font-serif text-2xl text-[#0a2b18] mb-3">Positive Discipline</h3>
              <p className="text-[#718096] font-light leading-relaxed">
                Guided by reason, spiritual values, and positive discipline models, replacing fear-based instruction with loving-kindness.
              </p>
            </motion.div>
          </motion.div>
          
        </div>
      </section>

      {/* Leadership Milestones - Cinematic Dark Theme */}
      <section className="py-24 md:py-32 bg-[#05140b] text-white px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#d4af37] rounded-full blur-[150px] opacity-[0.08] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#1b4d32] rounded-full blur-[150px] opacity-[0.1] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="mb-20 text-center"
          >
            <span className="text-[#d4af37] uppercase tracking-widest text-xs font-semibold">Legacy</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white mt-4">Leadership <span className="italic text-[#d4af37]">Milestones</span></h2>
          </motion.div>

          <div className="relative border-l border-white/10 md:border-l-0 md:pl-0 pl-8 space-y-16">
            
            {/* Desktop Center Line */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-white/20 via-[#d4af37]/50 to-white/10"></div>

            {milestones.map((m, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div 
                  key={m.year}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8 }}
                  className="relative flex flex-col md:flex-row items-start md:items-center justify-between w-full group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[37px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-[#05140b] border-2 border-[#d4af37] group-hover:bg-[#d4af37] transition-colors duration-500 z-10 shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
                  
                  {/* Content Left (Empty on odd) */}
                  <div className={`w-full md:w-[45%] ${!isEven ? 'md:order-1 md:text-right' : 'md:order-1 md:text-left'} hidden md:block`}>
                     {isEven ? (
                       <div className="pr-12 text-right">
                         <div className="font-serif text-5xl text-[#d4af37]/20 group-hover:text-[#d4af37] italic transition-colors duration-500 mb-2">{m.year}</div>
                         <h3 className="font-serif text-2xl text-white mb-3">{m.title}</h3>
                         <p className="text-white/60 font-light leading-relaxed">{m.desc}</p>
                       </div>
                     ) : (
                       <div className="pl-12 text-left">
                         <div className="font-serif text-5xl text-[#d4af37]/20 group-hover:text-[#d4af37] italic transition-colors duration-500 mb-2">{m.year}</div>
                         <h3 className="font-serif text-2xl text-white mb-3">{m.title}</h3>
                         <p className="text-white/60 font-light leading-relaxed">{m.desc}</p>
                       </div>
                     )}
                  </div>

                  {/* Mobile Layout Fallback */}
                  <div className="block md:hidden w-full pb-8 border-b border-white/5 group-last:border-0 group-last:pb-0">
                     <div className="font-serif text-4xl text-[#d4af37]/40 mb-2">{m.year}</div>
                     <h3 className="font-serif text-2xl text-white mb-3">{m.title}</h3>
                     <p className="text-white/60 font-light leading-relaxed">{m.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
