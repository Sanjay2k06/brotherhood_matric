import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Award, ChevronRight, Users } from "lucide-react";
import { motion } from "motion/react";
import aboutImage3 from "../../images/aboutimage3.jpg";
import { API_BASE } from "@/config";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export const Route = createFileRoute("/students/student-leaders")({
  head: () => ({
    meta: [
      { title: "Student Leaders — Brotherhood School" },
      { name: "description", content: "Meet the Student Council and pupil leaders of Brotherhood School." },
    ],
  }),
  component: StudentLeadersPage,
});

const getRoleDescription = (role: string) => {
  const r = role.toLowerCase();
  if (r.includes('head boy') || r.includes('head girl')) {
    return "Responsible for representing the student body, assisting the administration, and leading all student council initiatives.";
  }
  if (r.includes('sports')) {
    return "Leading athletic events, promoting sportsmanship, and coordinating inter-house physical education activities.";
  }
  if (r.includes('house captain')) {
    return "Directing house activities, competitive sports events, assemblies, and managing house points allocation.";
  }
  if (r.includes('prefect')) {
    return "Supporting general campus discipline, classroom order, and assisting staff during assemblies and breaks.";
  }
  return "Dedicated to serving the student community, organizing events, and maintaining school discipline.";
};

function FlipCard({ leader, idx, isFlipped, onFlip }: { leader: any, idx: number, isFlipped: boolean, onFlip: () => void }) {
  const initial = leader.name.charAt(0) === 'M' ? (leader.name.split(' ')[1]?.charAt(0) || 'S') : leader.name.charAt(0);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: idx * 0.05 }}
      className="relative w-full h-[280px] cursor-pointer perspective-[1000px] group"
      onClick={onFlip}
    >
      <motion.div 
        className="w-full h-full relative [transform-style:preserve-3d] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front Side (Light) */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-white border border-[#f1f6f3] border-t-[6px] border-t-[#d4af37]/60 rounded-[2rem] p-6 flex flex-col justify-center items-center text-center group-hover:shadow-[0_15px_30px_rgba(10,43,24,0.06)] transition-shadow overflow-hidden">
          
          <div className="w-14 h-14 rounded-full bg-[#f4f7f5] border border-[#e2e8f0] flex items-center justify-center mb-4 relative mt-2">
            <div className="absolute inset-0 border border-[#d4af37] rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"></div>
            <span className="font-serif text-lg text-[#1b4d32]">{initial}</span>
          </div>

          <h4 className="text-[9px] uppercase tracking-[0.2em] text-[#d4af37] font-bold mb-2">{leader.role}</h4>
          <h3 className="font-serif text-xl text-[#0a2b18] mb-1">{leader.name}</h3>
          <p className="text-[#6c8274] font-light italic text-xs">{leader.grade}</p>
          
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <span className="text-[10px] uppercase tracking-widest text-[#6c8274] border-b border-[#6c8274]/20 pb-0.5 group-hover:text-[#1b4d32] group-hover:border-[#1b4d32]/50 transition-colors">Duties</span>
          </div>
        </div>

        {/* Back Side (Dark) */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#05140b] rounded-[2rem] p-6 flex flex-col justify-center items-center text-center shadow-2xl border border-[#1b4d32]/30 overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4af37] rounded-full blur-[50px] opacity-[0.15] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <Users className="h-6 w-6 text-[#d4af37] mb-4 opacity-80" strokeWidth={1.5} />
            <h4 className="text-[9px] uppercase tracking-widest text-[#d4af37] font-semibold mb-3 pb-2 border-b border-[#d4af37]/20">Core Responsibilities</h4>
            <p className="text-white/90 font-light leading-relaxed text-xs italic">
              "{getRoleDescription(leader.role)}"
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function StudentLeadersPage() {
  const [flippedIndex, setFlippedIndex] = useState<string | null>(null);
  const [primaryLeaders, setPrimaryLeaders] = useState<any[]>([]);
  const [seniorLeaders, setSeniorLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultCouncil = [
    // Primary Student Council
    { role: "Head Boy (Primary)", name: "Immanual Jefferson S.", grade: "Std V" },
    { role: "Head Girl (Primary)", name: "Inshika Shri S.", grade: "Std V" },
    { role: "Sports Captain (Primary - Boys)", name: "Harish S.", grade: "Std V" },
    { role: "Sports Captain (Primary - Girls)", name: "Yashika D.", grade: "Std V" },
    { role: "Cultural Leader (Primary)", name: "Keerthana V.", grade: "Std V" },
    { role: "Galileo House Captain (Primary)", name: "Pratheesh B.", grade: "Std V" },
    { role: "Galileo House Vice Captain (Primary)", name: "Nivedha N.", grade: "Std IV" },
    { role: "Zion House Captain (Primary)", name: "Jeshwanth S.", grade: "Std V" },
    { role: "Zion House Vice Captain (Primary)", name: "Jackin Nibola J.", grade: "Std IV" },
    { role: "Judah House Captain (Primary)", name: "Praveen Sai B.", grade: "Std V" },
    { role: "Judah House Vice Captain (Primary)", name: "Sree Dharshini I.", grade: "Std IV" },
    { role: "Bethel House Captain (Primary)", name: "Jayapreetha M.D.", grade: "Std V" },
    { role: "Bethel House Vice Captain (Primary)", name: "Deepa Sree R.", grade: "Std IV" },

    // Senior Student Council
    { role: "Head Boy", name: "P. Kishore", grade: "XII-A" },
    { role: "Head Girl", name: "M. Akshaya", grade: "XII-C" },
    { role: "Vice Head Boy", name: "B. Ashwanth", grade: "XII-A" },
    { role: "Vice Head Girl", name: "A. Monisha", grade: "XII-B" },
    { role: "Sports Secretary", name: "N. Divya Dharshini", grade: "XII-A" },
    { role: "Assistant Sports Secretary", name: "F. Calvin Mawia", grade: "XII-A" },
    { role: "Cultural Secretary", name: "R. Sripriya", grade: "XII-B" },
    { role: "Literary Secretary", name: "P. Gayathri", grade: "XII-C" },
    { role: "St. Matthew House Captain", name: "G. Ajith Kumar", grade: "XII" },
    { role: "St. Matthew House Vice Captain", name: "D. Sairathi", grade: "XI" },
    { role: "St. Mark House Captain", name: "R. Sree Hari", grade: "XII" },
    { role: "St. Mark House Vice Captain", name: "P. Akshaya", grade: "XI" },
    { role: "St. Luke House Captain", name: "B. Jaya Prakash", grade: "XII" },
    { role: "St. Luke House Vice Captain", name: "B. Priya Dharshini", grade: "XI" },
    { role: "St. John House Captain", name: "G. Nithish Kumar", grade: "XII" },
    { role: "St. John House Vice Captain", name: "K. Soniya", grade: "XI" },
    { role: "School Prefect", name: "G. Vijay Vignesh", grade: "XII" },
    { role: "School Prefect", name: "N. Raju Yogi", grade: "XII" },
    { role: "School Prefect", name: "Sathya Priya", grade: "XII" },
    { role: "School Prefect", name: "Karnika", grade: "XII" }
  ];

  useEffect(() => {
    fetch(`${API_BASE}/student-leaders/`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : (data.results || []);
        const targetList = list.length > 0 ? list : defaultCouncil;
        
        // Group by wing
        const primary = targetList.filter((item: any) => 
          item.role.toLowerCase().includes("primary") || 
          item.grade.toLowerCase().includes("std iv") || 
          item.grade.toLowerCase().includes("std v")
        );
        const senior = targetList.filter((item: any) => 
          !item.role.toLowerCase().includes("primary") && 
          !item.grade.toLowerCase().includes("std iv") && 
          !item.grade.toLowerCase().includes("std v")
        );
        
        setPrimaryLeaders(primary);
        setSeniorLeaders(senior);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching council leaders:", err);
        const primary = defaultCouncil.filter((item: any) => 
          item.role.toLowerCase().includes("primary") || 
          item.grade.toLowerCase().includes("std iv") || 
          item.grade.toLowerCase().includes("std v")
        );
        const senior = defaultCouncil.filter((item: any) => 
          !item.role.toLowerCase().includes("primary") && 
          !item.grade.toLowerCase().includes("std iv") && 
          !item.grade.toLowerCase().includes("std v")
        );
        setPrimaryLeaders(primary);
        setSeniorLeaders(senior);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#fdfdfc] text-[#2d3748] font-sans selection:bg-[#0a2b18] selection:text-white">
      <PageHeader
        eyebrow="Student Council"
        title="Student Leaders"
        subtitle="Meet the student representatives elected to support our school community."
      />

      <section className="py-20 px-6 bg-[#fdfdfc]">
        <div className="max-w-7xl mx-auto">
          
          {loading ? (
            <div className="text-center py-16">
              <div className="w-10 h-10 border-2 border-[#e2e8f0] border-t-[#d4af37] rounded-full animate-spin mx-auto"></div>
              <p className="text-xs text-[#718096] mt-4 uppercase tracking-widest font-semibold">Loading Council...</p>
            </div>
          ) : (
            <div className="space-y-24">
              
              {/* Senior Student Council */}
              <div className="space-y-10">
                <div className="border-b border-[#0a2b18]/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <span className="text-[#1b4d32] uppercase tracking-[0.2em] text-xs font-semibold block mb-2">Secondary & Higher Secondary</span>
                    <h2 className="font-serif text-3xl md:text-4xl text-[#0a2b18]">Pupil Leaders (2026–2027)</h2>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {seniorLeaders.map((leader, idx) => (
                    <FlipCard 
                      key={`sr-${leader.name}-${leader.role}`} 
                      leader={leader} 
                      idx={idx} 
                      isFlipped={flippedIndex === `sr-${idx}`}
                      onFlip={() => setFlippedIndex(flippedIndex === `sr-${idx}` ? null : `sr-${idx}`)}
                    />
                  ))}
                </div>
              </div>

              {/* Primary Student Council */}
              <div className="space-y-10 pt-10 border-t border-[#0a2b18]/10">
                <div className="pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <span className="text-[#1b4d32] uppercase tracking-[0.2em] text-xs font-semibold block mb-2">Primary Wing</span>
                    <h2 className="font-serif text-3xl md:text-4xl text-[#0a2b18]">Student Council (2026–2027)</h2>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {primaryLeaders.map((leader, idx) => (
                    <FlipCard 
                      key={`pr-${leader.name}-${leader.role}`} 
                      leader={leader} 
                      idx={idx} 
                      isFlipped={flippedIndex === `pr-${idx}`}
                      onFlip={() => setFlippedIndex(flippedIndex === `pr-${idx}` ? null : `pr-${idx}`)}
                    />
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </section>

      {/* Leadership Responsibilities */}
      <section className="py-24 md:py-32 bg-[#05140b] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#1b4d32_0%,transparent_50%)] opacity-20 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
           
           {/* Text Side */}
           <motion.div 
             initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} 
             className="w-full lg:w-[50%] space-y-10"
           >
              <div className="flex items-center gap-4">
                <div className="w-8 h-[1px] bg-[#d4af37]/60"></div>
                <span className="text-[#d4af37] uppercase tracking-[0.15em] text-xs font-semibold">Duties & Impact</span>
              </div>
              
              <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                Leadership <br/><span className="italic text-[#d4af37]">Responsibilities</span>
              </h3>
              
              <div className="space-y-6 text-white/70 font-light text-lg leading-[1.8]">
                <p>
                  The Student Council serves as the liaison between the school administration, faculty, and student body. They are elected or selected annually through leadership evaluations to develop cooperation and responsibility.
                </p>
                <p>
                  Leaders maintain school discipline during morning assemblies, coordinate house events, organize co-curricular activities, and guide student initiatives.
                </p>
              </div>
           </motion.div>

           {/* Image Side */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} 
             className="w-full lg:w-[50%]"
           >
             <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-[0_0_60px_rgba(212,175,55,0.1)] group border border-[#1b4d32]/30">
               <img
                 src={aboutImage3}
                 alt="School Student Leaders assembly"
                 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 sepia-[0.1]"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#05140b]/90 via-transparent to-transparent"></div>
               
               <div className="absolute bottom-10 left-10">
                  <Award className="h-12 w-12 text-[#d4af37] mb-5 opacity-80" strokeWidth={1} />
                  <p className="text-white font-serif text-2xl">Democratic Leadership</p>
               </div>
             </div>
           </motion.div>

         </div>
      </section>

    </div>
  );
}
