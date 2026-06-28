import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Shield } from "lucide-react";
import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export const Route = createFileRoute("/students/houses")({
  head: () => ({
    meta: [
      { title: "School Houses — Brotherhood School" },
      { name: "description", content: "Details about the four school houses - Red, Blue, Green, and Gold." },
    ],
  }),
  component: HousesPage,
});

const getHouseColors = (colorStr: string) => {
  if (colorStr.includes('red')) return { border: 'border-red-500', text: 'text-red-700', bgGlow: 'bg-red-500', lightBg: 'bg-red-50/50' };
  if (colorStr.includes('blue')) return { border: 'border-blue-500', text: 'text-blue-700', bgGlow: 'bg-blue-500', lightBg: 'bg-blue-50/50' };
  if (colorStr.includes('emerald') || colorStr.includes('green')) return { border: 'border-emerald-500', text: 'text-emerald-700', bgGlow: 'bg-emerald-500', lightBg: 'bg-emerald-50/50' };
  if (colorStr.includes('amber') || colorStr.includes('gold') || colorStr.includes('yellow')) return { border: 'border-amber-500', text: 'text-amber-600', bgGlow: 'bg-amber-500', lightBg: 'bg-amber-50/50' };
  return { border: 'border-slate-400', text: 'text-slate-700', bgGlow: 'bg-slate-400', lightBg: 'bg-slate-50' };
};

function HousesPage() {
  const [houseData, setHouseData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultHouses = [
    { name: "Red House", motto: "Charity", color_code: "bg-red-500", description: "Instilling deep compassion, volunteer service, and caring attitudes." },
    { name: "Blue House", motto: "Faith", color_code: "bg-blue-500", description: "Focusing on trust, resilience, dedication, and integrity in challenges." },
    { name: "Green House", motto: "Hope", color_code: "bg-emerald-500", description: "Inspiring environmental care, growth, positive attitudes, and optimism." },
    { name: "Gold House", motto: "Wisdom", color_code: "bg-amber-500", description: "Prioritizing scholastic research, sound judgment, and lifelong study." },
  ];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/student-houses/")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : (data.results || []);
        setHouseData(list.length > 0 ? list : defaultHouses);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching houses:", err);
        setHouseData(defaultHouses);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#fdfdfc] text-[#2d3748] font-sans selection:bg-[#0a2b18] selection:text-white">
      <PageHeader
        eyebrow="Co-curricular Houses"
        title="School Houses"
        subtitle="Our house system fosters healthy competition, teamwork, and leadership."
      />

      <section className="py-24 md:py-32 px-6 relative overflow-hidden bg-[#f7faf8]">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-white rounded-full blur-[100px] opacity-60 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} 
            className="text-center max-w-2xl mx-auto mb-20 space-y-6"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-[#1b4d32]"></div>
              <span className="text-[#1b4d32] uppercase tracking-widest text-xs font-semibold">House System</span>
              <div className="w-12 h-[1px] bg-[#1b4d32]"></div>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-[#0a2b18]">
              The Four <span className="italic text-[#1b4d32]">School Houses</span>
            </h2>
          </motion.div>

          {loading ? (
            <div className="text-center py-16">
              <div className="w-10 h-10 border-2 border-[#e2e8f0] border-t-[#d4af37] rounded-full animate-spin mx-auto"></div>
              <p className="text-xs text-[#718096] mt-4 uppercase tracking-widest font-semibold font-sans">Loading Houses...</p>
            </div>
          ) : houseData.length > 0 ? (
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
            >
              {houseData.map((house) => {
                const colors = getHouseColors(house.color_code || 'bg-slate-400');
                
                return (
                  <motion.div 
                    key={house.name} 
                    variants={fadeUp} 
                    className="relative group p-10 lg:p-12 rounded-[2.5rem] bg-white border border-[#f1f6f3] shadow-[0_15px_40px_-15px_rgba(10,43,24,0.04)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col items-center text-center"
                  >
                    {/* Top colored edge */}
                    <div className={`absolute top-0 left-0 w-full h-2 ${colors.bgGlow} opacity-80`}></div>
                    
                    {/* Background Letter Watermark */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[180px] font-serif opacity-[0.02] pointer-events-none select-none group-hover:scale-110 transition-transform duration-700">
                      {house.name.charAt(0)}
                    </div>

                    <div className="relative z-10">
                      <div className={`w-20 h-20 mx-auto rounded-full ${colors.lightBg} border ${colors.border} border-opacity-30 flex items-center justify-center mb-8 relative group-hover:scale-110 transition-transform duration-700`}>
                        <Shield className={`h-8 w-8 ${colors.text} opacity-90`} strokeWidth={1.5} />
                        <div className={`absolute inset-0 rounded-full ${colors.bgGlow} blur-[20px] opacity-0 group-hover:opacity-20 transition-opacity duration-700`}></div>
                      </div>

                      <h3 className="font-serif text-2xl text-[#0a2b18] mb-3">{house.name}</h3>
                      <p className={`uppercase tracking-[0.2em] text-[10px] font-bold mb-6 ${colors.text}`}>Motto: {house.motto}</p>
                      
                      <div className="w-8 h-[1px] bg-[#f1f6f3] mx-auto mb-6 group-hover:w-16 transition-all duration-700"></div>
                      
                      <p className="text-[#718096] font-light leading-relaxed text-[15px]">{house.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <div className="text-center py-16 bg-white/50 border border-dashed border-[#e2e8f0] rounded-[2.5rem]">
              <p className="text-[#718096] font-light">No school houses registered yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Inter-House Championship - Redesigned Cinematic Section */}
      <section className="py-24 md:py-32 bg-[#05140b] relative overflow-hidden">
        {/* Cinematic ambient lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,#1b4d32_0%,transparent_50%)] opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#d4af37_0%,transparent_50%)] opacity-10 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
           <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
             
             {/* Content Side */}
             <motion.div 
               initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} 
               className="w-full lg:w-[60%] space-y-10"
             >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-[#d4af37]/60"></div>
                  <span className="text-[#d4af37] uppercase tracking-[0.15em] text-xs font-semibold">Competitive Spirit</span>
                </div>
                
                <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                  Inter-House <br className="hidden lg:block"/> <span className="italic text-[#d4af37]">Championship</span>
                </h3>
                
                <div className="space-y-6 text-white/70 font-light text-lg leading-[1.8] max-w-2xl">
                  <p>
                    Throughout the academic term, students earn points for their respective houses through sports matches, athletic meets, academic quizzes, and cultural projects.
                  </p>
                  <p>
                    At the close of the academic year, the house securing the highest accumulated points is honored with the prestigious <span className="text-[#d4af37] italic font-medium block mt-3 text-xl">Cock House Trophy</span> during the annual Sports Day celebration.
                  </p>
                </div>
             </motion.div>

             {/* Shield Graphic Side */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} 
               className="w-full lg:w-[40%] flex justify-center lg:justify-end"
             >
               <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-[3rem] border border-[#d4af37]/20 bg-[#0a2b18]/40 backdrop-blur-md flex flex-col items-center justify-center p-12 shadow-[0_0_60px_rgba(212,175,55,0.15)] group overflow-hidden">
                 
                 {/* Elegant Shield/Trophy Graphic */}
                 <div className="relative mb-10 group-hover:scale-110 transition-transform duration-700">
                    <div className="absolute inset-0 bg-[#d4af37] blur-[50px] opacity-20 rounded-full"></div>
                    <Shield className="h-32 w-32 text-[#d4af37] relative z-10" strokeWidth={0.5} />
                    
                    {/* Inner star overlay */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] z-20">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#05140b" stroke="#d4af37" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    </div>
                 </div>
                 
                 <h4 className="font-serif text-3xl text-white text-center leading-none mb-4">Cock House</h4>
                 <div className="w-12 h-[1px] bg-[#d4af37]/50 mb-4"></div>
                 <p className="text-[#d4af37] uppercase tracking-[0.25em] text-[11px] font-semibold text-center">Champion's Trophy</p>
               </div>
             </motion.div>

           </div>
        </div>
      </section>
    </div>
  );
}
