import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { API_BASE } from "@/config";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export const Route = createFileRoute("/students/school-uniform")({
  head: () => ({
    meta: [
      { title: "School Uniform — Brotherhood School" },
      { name: "description", content: "School dress code, daily uniform specifications, and footwear regulations." },
    ],
  }),
  component: SchoolUniformPage,
});

function SchoolUniformPage() {
  const [dailyUniform, setDailyUniform] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultUniform = [
    { section: "Primary (Classes I to V)", boys_uniform: "Navy blue shorts, light blue shirts, black shoes, school belt & tie.", girls_uniform: "Navy blue pinafore, light blue shirts, black shoes, school belt & tie." },
    { section: "Secondary (Classes VI to XII)", boys_uniform: "Navy blue trousers, light blue shirts, black shoes, school belt & tie.", girls_uniform: "Navy blue salwar suit with light blue dupatta and black shoes." },
  ];

  useEffect(() => {
    fetch(`${API_BASE}/school-uniforms/`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : (data.results || []);
        setDailyUniform(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching uniforms:", err);
        setDailyUniform(defaultUniform);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#fdfdfc] text-[#2d3748] font-sans selection:bg-[#0a2b18] selection:text-white">
      <PageHeader
        eyebrow="Dress Code"
        title="School Uniform"
        subtitle="Dress regulations and daily uniform guide for students at Brotherhood."
      />

      <section className="py-24 md:py-32 px-6 relative overflow-hidden bg-[#f7faf8]">
        {/* Abstract Premium Geometry */}
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-white rounded-full blur-[100px] opacity-80 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#d4af37] rounded-full blur-[150px] opacity-[0.03] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Cinematic Intro */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} 
            className="text-center max-w-3xl mx-auto mb-24 space-y-8"
          >
            <div className="flex items-center justify-center gap-6">
              <div className="w-16 h-[1px] bg-[#1b4d32]/40"></div>
              <span className="text-[#1b4d32] uppercase tracking-[0.25em] text-xs font-bold">Standards</span>
              <div className="w-16 h-[1px] bg-[#1b4d32]/40"></div>
            </div>
            
            <h2 className="font-serif text-5xl md:text-6xl text-[#0a2b18] leading-[1.15]">
              Prescribing <span className="italic text-[#1b4d32]">Equality</span> <br className="hidden md:block"/> & Discipline
            </h2>
            
            <p className="text-[#4a5568] text-xl font-light leading-[1.8]">
              Every student is expected to wear the prescribed school uniform neat, tidy, and clean. Wearing the correct uniform builds a sense of equality, discipline, and pride in representing Brotherhood School.
            </p>
          </motion.div>

          {/* Dynamic Uniform Details - Elegant Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-2 border-[#e2e8f0] border-t-[#d4af37] rounded-full animate-spin"></div>
            </div>
          ) : dailyUniform.length > 0 ? (
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} 
              className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-24"
            >
              {dailyUniform.map((item, idx) => (
                 <motion.div 
                   key={item.section} 
                   variants={fadeUp} 
                   className="relative group p-10 md:p-14 rounded-[3rem] bg-white border border-[#f1f6f3] shadow-[0_20px_50px_-20px_rgba(10,43,24,0.06)] hover:shadow-[0_30px_60px_-15px_rgba(10,43,24,0.12)] hover:-translate-y-2 transition-all duration-700 overflow-hidden"
                 >
                   {/* Ambient corner glow */}
                   <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#d4af37] rounded-full blur-[80px] opacity-[0.03] group-hover:opacity-[0.12] transition-opacity duration-700 pointer-events-none"></div>
                   
                   <div className="relative z-10">
                     <h3 className="font-serif text-3xl md:text-4xl text-[#0a2b18] mb-10 pb-8 border-b border-[#f1f6f3]">{item.section}</h3>
                     
                     <div className="space-y-12">
                       <div className="group/item">
                         <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-bold mb-4 flex items-center gap-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#1b4d32] group-hover/item:scale-150 transition-transform"></div> BOYS
                         </span>
                         <p className="text-[#2d3748] text-lg md:text-xl font-light leading-relaxed">{item.boys_uniform}</p>
                       </div>
                       
                       <div className="group/item">
                         <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-bold mb-4 flex items-center gap-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] group-hover/item:scale-150 transition-transform"></div> GIRLS
                         </span>
                         <p className="text-[#2d3748] text-lg md:text-xl font-light leading-relaxed">{item.girls_uniform}</p>
                       </div>
                     </div>
                   </div>
                 </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20 bg-white/50 border border-dashed border-[#e2e8f0] rounded-[3rem] mb-24">
              <p className="text-[#718096] font-light text-lg">No uniform rules configured.</p>
            </div>
          )}

          {/* Special Schedule - Wednesday Block */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} 
            className="w-full max-w-5xl mx-auto"
          >
            <div className="bg-[#05140b] rounded-[3rem] p-12 md:p-16 lg:p-24 relative overflow-hidden group text-center shadow-[0_40px_80px_-20px_rgba(5,20,11,0.6)]">
               
               {/* Glowing Background Overlay */}
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#d4af37_0%,transparent_60%)] opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-1000 pointer-events-none"></div>
               
               <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
                 {/* Premium Monogram Icon */}
                 <div className="w-20 h-20 rounded-full border border-[#d4af37]/30 flex items-center justify-center mb-10 relative group-hover:scale-110 transition-transform duration-700">
                   <div className="absolute inset-0 bg-[#d4af37] blur-[20px] opacity-20 rounded-full"></div>
                   <span className="text-[#d4af37] font-serif text-3xl italic">W</span>
                 </div>
                 
                 <span className="text-[#d4af37] uppercase tracking-[0.25em] text-[11px] font-bold block mb-5">Special Schedule</span>
                 <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-8">Wednesday Dress Code</h3>
                 <div className="w-12 h-[1px] bg-[#d4af37]/40 mb-8"></div>
                 
                 <p className="text-white/80 font-light leading-[1.8] text-xl">
                   White uniform trousers/skirts with white canvas shoes and house-coloured t-shirts for physical education and sports activities.
                 </p>
               </div>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
