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
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultHouses = [
    // Primary Wing Houses
    { name: "Galileo House", motto: "Knowledge and Exploration", color_code: "bg-blue-600", points: 350, description: "Primary Wing Galileo house - inspiring research and logic." },
    { name: "Zion House", motto: "Strength and Faith", color_code: "bg-amber-500", points: 390, description: "Primary Wing Zion house - focus on moral character." },
    { name: "Judah House", motto: "Courage and Praise", color_code: "bg-red-500", points: 360, description: "Primary Wing Judah house - encouraging endurance and sportsmanship." },
    { name: "Bethel House", motto: "House of Peace", color_code: "bg-emerald-500", points: 380, description: "Primary Wing Bethel house - focus on ecological harmony." },
    
    // Senior Wing Houses
    { name: "St. Matthew House", motto: "Grace and Wisdom", color_code: "bg-blue-600", points: 410, description: "Senior Wing St. Matthew house - encouraging mathematical logic." },
    { name: "St. Mark House", motto: "Courage and Action", color_code: "bg-red-500", points: 385, description: "Senior Wing St. Mark house - focused on athletics and sports." },
    { name: "St. Luke House", motto: "Healing and Service", color_code: "bg-emerald-500", points: 430, description: "Senior Wing St. Luke house - focus on biology and charity." },
    { name: "St. John House", motto: "Love and Truth", color_code: "bg-amber-500", points: 405, description: "Senior Wing St. John house - prioritizing literacy and speech." }
  ];

  const defaultCouncil = [
    // Primary Student Council
    { role: "Galileo House Captain (Primary)", name: "Pratheesh B.", grade: "Std V" },
    { role: "Galileo House Vice Captain (Primary)", name: "Nivedha N.", grade: "Std IV" },
    { role: "Zion House Captain (Primary)", name: "Jeshwanth S.", grade: "Std V" },
    { role: "Zion House Vice Captain (Primary)", name: "Jackin Nibola J.", grade: "Std IV" },
    { role: "Judah House Captain (Primary)", name: "Praveen Sai B.", grade: "Std V" },
    { role: "Judah House Vice Captain (Primary)", name: "Sree Dharshini I.", grade: "Std IV" },
    { role: "Bethel House Captain (Primary)", name: "Jayapreetha M.D.", grade: "Std V" },
    { role: "Bethel House Vice Captain (Primary)", name: "Deepa Sree R.", grade: "Std IV" },

    // Senior House Leaders
    { role: "St. Matthew House Captain", name: "G. Ajith Kumar", grade: "XII" },
    { role: "St. Matthew House Vice Captain", name: "D. Sairathi", grade: "XI" },
    { role: "St. Mark House Captain", name: "R. Sree Hari", grade: "XII" },
    { role: "St. Mark House Vice Captain", name: "P. Akshaya", grade: "XI" },
    { role: "St. Luke House Captain", name: "B. Jaya Prakash", grade: "XII" },
    { role: "St. Luke House Vice Captain", name: "B. Priya Dharshini", grade: "XI" },
    { role: "St. John House Captain", name: "G. Nithish Kumar", grade: "XII" },
    { role: "St. John House Vice Captain", name: "K. Soniya", grade: "XI" },
  ];

  useEffect(() => {
    Promise.all([
      fetch("http://127.0.0.1:8000/api/student-houses/").then((res) => res.json()),
      fetch("http://127.0.0.1:8000/api/student-leaders/").then((res) => res.json())
    ])
      .then(([housesData, leadersData]) => {
        const hList = Array.isArray(housesData) ? housesData : (housesData.results || []);
        const lList = Array.isArray(leadersData) ? leadersData : (leadersData.results || []);
        setHouseData(hList.length > 0 ? hList : defaultHouses);
        setLeaders(lList.length > 0 ? lList : defaultCouncil);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching houses details:", err);
        setHouseData(defaultHouses);
        setLeaders(defaultCouncil);
        setLoading(false);
      });
  }, []);

  const getHouseLeaders = (houseName: string) => {
    const prefix = houseName.replace(" House", "").trim();
    const captain = leaders.find((l) => 
      l.role.toLowerCase().includes(prefix.toLowerCase()) && 
      l.role.toLowerCase().includes("captain") && 
      !l.role.toLowerCase().includes("vice")
    );
    const viceCaptain = leaders.find((l) => 
      l.role.toLowerCase().includes(prefix.toLowerCase()) && 
      l.role.toLowerCase().includes("vice captain")
    );
    return {
      captain: captain ? `${captain.name} (${captain.grade})` : "To be elected",
      viceCaptain: viceCaptain ? `${viceCaptain.name} (${viceCaptain.grade})` : "To be elected"
    };
  };

  const primaryHouses = houseData.filter(h => 
    h.name.includes("Galileo") || h.name.includes("Zion") || h.name.includes("Judah") || h.name.includes("Bethel")
  );
  
  const seniorHouses = houseData.filter(h => 
    h.name.includes("St. Matthew") || h.name.includes("St. Mark") || h.name.includes("St. Luke") || h.name.includes("St. John")
  );

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
          ) : (
            <div className="space-y-20">
              {/* Primary Wing */}
              {primaryHouses.length > 0 && (
                <div className="space-y-10">
                  <div className="border-b border-[#e2e8f0] pb-4">
                    <h3 className="font-serif text-3xl text-[#0a2b18] flex items-center gap-3">
                      Primary Wing <span className="text-xs font-sans uppercase font-bold tracking-wider text-[#d4af37] bg-[#05140b] px-3 py-1 rounded-full">Classes I – V</span>
                    </h3>
                  </div>
                  <motion.div 
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
                  >
                    {primaryHouses.map((house) => {
                      const colors = getHouseColors(house.color_code || 'bg-slate-400');
                      const { captain, viceCaptain } = getHouseLeaders(house.name);
                      
                      return (
                        <motion.div 
                          key={house.name} 
                          variants={fadeUp} 
                          className="relative group p-10 lg:p-12 rounded-[2.5rem] bg-white border border-[#f1f6f3] shadow-[0_15px_40px_-15px_rgba(10,43,24,0.04)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col items-center text-center"
                        >
                          <div className={`absolute top-0 left-0 w-full h-2 ${colors.bgGlow} opacity-80`}></div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[180px] font-serif opacity-[0.02] pointer-events-none select-none group-hover:scale-110 transition-transform duration-700">
                            {house.name.charAt(0)}
                          </div>
                          
                          <div className="relative z-10 w-full flex flex-col items-center h-full justify-between">
                            <div className="w-full">
                              <div className={`w-20 h-20 mx-auto rounded-full ${colors.lightBg} border ${colors.border} border-opacity-30 flex items-center justify-center mb-8 relative group-hover:scale-110 transition-transform duration-700`}>
                                <Shield className={`h-8 w-8 ${colors.text} opacity-90`} strokeWidth={1.5} />
                                <div className={`absolute inset-0 rounded-full ${colors.bgGlow} blur-[20px] opacity-0 group-hover:opacity-20 transition-opacity duration-700`}></div>
                              </div>

                              <h3 className="font-serif text-2xl text-[#0a2b18] mb-1">{house.name}</h3>
                              <p className={`uppercase tracking-[0.2em] text-[10px] font-bold mb-4 ${colors.text}`}>Motto: {house.motto}</p>
                              
                              <p className="text-[#718096] font-light leading-relaxed text-[14px] mb-6">{house.description}</p>
                            </div>
                            
                            <div className="w-full pt-4 border-t border-border/60 text-left text-xs space-y-2 bg-[#fcfdfc] p-4 rounded-2xl border mt-auto">
                              <div className="flex justify-between items-center">
                                <span className="font-semibold text-[#0a2b18]">House Captain:</span>
                                <span className="text-[#718096] font-medium">{captain}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="font-semibold text-[#0a2b18]">Vice Captain:</span>
                                <span className="text-[#718096] font-medium">{viceCaptain}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>
              )}

              {/* Senior Wing */}
              {seniorHouses.length > 0 && (
                <div className="space-y-10">
                  <div className="border-b border-[#e2e8f0] pb-4">
                    <h3 className="font-serif text-3xl text-[#0a2b18] flex items-center gap-3">
                      Senior Wing <span className="text-xs font-sans uppercase font-bold tracking-wider text-[#d4af37] bg-[#05140b] px-3 py-1 rounded-full">Classes VI – XII</span>
                    </h3>
                  </div>
                  <motion.div 
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
                  >
                    {seniorHouses.map((house) => {
                      const colors = getHouseColors(house.color_code || 'bg-slate-400');
                      const { captain, viceCaptain } = getHouseLeaders(house.name);
                      
                      return (
                        <motion.div 
                          key={house.name} 
                          variants={fadeUp} 
                          className="relative group p-10 lg:p-12 rounded-[2.5rem] bg-white border border-[#f1f6f3] shadow-[0_15px_40px_-15px_rgba(10,43,24,0.04)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col items-center text-center"
                        >
                          <div className={`absolute top-0 left-0 w-full h-2 ${colors.bgGlow} opacity-80`}></div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[180px] font-serif opacity-[0.02] pointer-events-none select-none group-hover:scale-110 transition-transform duration-700">
                            {house.name.charAt(0)}
                          </div>
                          
                          <div className="relative z-10 w-full flex flex-col items-center h-full justify-between">
                            <div className="w-full">
                              <div className={`w-20 h-20 mx-auto rounded-full ${colors.lightBg} border ${colors.border} border-opacity-30 flex items-center justify-center mb-8 relative group-hover:scale-110 transition-transform duration-700`}>
                                <Shield className={`h-8 w-8 ${colors.text} opacity-90`} strokeWidth={1.5} />
                                <div className={`absolute inset-0 rounded-full ${colors.bgGlow} blur-[20px] opacity-0 group-hover:opacity-20 transition-opacity duration-700`}></div>
                              </div>

                              <h3 className="font-serif text-2xl text-[#0a2b18] mb-1">{house.name}</h3>
                              <p className={`uppercase tracking-[0.2em] text-[10px] font-bold mb-4 ${colors.text}`}>Motto: {house.motto}</p>
                              
                              <p className="text-[#718096] font-light leading-relaxed text-[14px] mb-6">{house.description}</p>
                            </div>
                            
                            <div className="w-full pt-4 border-t border-border/60 text-left text-xs space-y-2 bg-[#fcfdfc] p-4 rounded-2xl border mt-auto">
                              <div className="flex justify-between items-center">
                                <span className="font-semibold text-[#0a2b18]">House Captain:</span>
                                <span className="text-[#718096] font-medium">{captain}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="font-semibold text-[#0a2b18]">Vice Captain:</span>
                                <span className="text-[#718096] font-medium">{viceCaptain}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>
              )}
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
