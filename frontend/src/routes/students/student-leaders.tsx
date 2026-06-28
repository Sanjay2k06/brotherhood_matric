import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Award, ChevronRight, Users } from "lucide-react";
import { motion } from "motion/react";
import aboutImage3 from "../../images/aboutimage3.png";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export const Route = createFileRoute("/students/student-leaders")({
  head: () => ({
    meta: [
      { title: "Student Leaders — Brotherhood School" },
      { name: "description", content: "Meet the Student Council and student leaders of Brotherhood School." },
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
  return "Dedicated to serving the student community, organizing events, and maintaining school discipline.";
};

function FlipCard({ leader, idx, isFlipped, onFlip }: { leader: any, idx: number, isFlipped: boolean, onFlip: () => void }) {
  const initial = leader.name.charAt(0) === 'M' ? (leader.name.split(' ')[1]?.charAt(0) || 'S') : leader.name.charAt(0);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: idx * 0.1 }}
      className="relative w-full h-[380px] cursor-pointer perspective-[1000px] group"
      onClick={onFlip}
    >
      <motion.div 
        className="w-full h-full relative [transform-style:preserve-3d] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front Side (Light) */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-white border border-[#f1f6f3] border-t-[6px] border-t-[#d4af37]/60 rounded-[2.5rem] p-10 shadow-[0_15px_30px_rgba(10,43,24,0.04)] flex flex-col justify-center items-center text-center group-hover:shadow-[0_20px_40px_rgba(10,43,24,0.1)] transition-shadow overflow-hidden">
          
          <div className="w-20 h-20 rounded-full bg-[#f4f7f5] border border-[#e2e8f0] flex items-center justify-center mb-6 relative mt-2">
            <div className="absolute inset-0 border border-[#d4af37] rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"></div>
            <span className="font-serif text-2xl text-[#1b4d32]">{initial}</span>
          </div>

          <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-bold mb-3">{leader.role}</h4>
          <h3 className="font-serif text-2xl text-[#0a2b18] mb-2">{leader.name}</h3>
          <p className="text-[#718096] font-light italic text-sm">{leader.grade}</p>
          
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <span className="text-[11px] uppercase tracking-widest text-[#6c8274] border-b border-[#6c8274]/20 pb-1 group-hover:text-[#1b4d32] group-hover:border-[#1b4d32]/50 transition-colors">Click to view duties</span>
          </div>
        </div>

        {/* Back Side (Dark) */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#05140b] rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center shadow-2xl border border-[#1b4d32]/30 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37] rounded-full blur-[60px] opacity-[0.15] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <Users className="h-8 w-8 text-[#d4af37] mb-6 opacity-80" strokeWidth={1.5} />
            <h4 className="text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold mb-6 pb-4 border-b border-[#d4af37]/20">Core Responsibilities</h4>
            <p className="text-white/90 font-light leading-relaxed text-[15px] italic">
              "{getRoleDescription(leader.role)}"
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function StudentLeadersPage() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [council, setCouncil] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultCouncil = [
    { role: "School Head Boy", name: "Master Siddharth V.", grade: "Class XII - Science" },
    { role: "School Head Girl", name: "Miss Ananya R.", grade: "Class XII - Commerce" },
    { role: "Assistant Head Boy", name: "Master Tarun K.", grade: "Class XI - Computer Science" },
    { role: "Assistant Head Girl", name: "Miss Harini S.", grade: "Class XI - Biology Focus" },
    { role: "Sports Captain", name: "Master Rohan Kumar", grade: "Class XII - Science" },
  ];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/student-leaders/")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : (data.results || []);
        setCouncil(list.length > 0 ? list : defaultCouncil);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching council leaders:", err);
        setCouncil(defaultCouncil);
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

      <section className="py-24 md:py-32 px-6 relative overflow-hidden bg-[#fdfdfc]">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#f4f7f5] rounded-full blur-[120px] opacity-80 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Cinematic Intro */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} 
            className="text-center max-w-3xl mx-auto mb-24 space-y-6"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-[#1b4d32]"></div>
              <span className="text-[#1b4d32] uppercase tracking-[0.2em] text-xs font-semibold">Student Council</span>
              <div className="w-12 h-[1px] bg-[#1b4d32]"></div>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#0a2b18]">
              School <span className="italic text-[#1b4d32]">Leaders</span>
            </h2>
          </motion.div>

          {/* Grid */}
          {loading ? (
            <div className="text-center py-16">
              <div className="w-10 h-10 border-2 border-[#e2e8f0] border-t-[#d4af37] rounded-full animate-spin mx-auto"></div>
              <p className="text-xs text-[#718096] mt-4 uppercase tracking-widest font-semibold font-sans">Loading Council...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
              {council.map((leader, idx) => (
                <FlipCard 
                  key={leader.role} 
                  leader={leader} 
                  idx={idx} 
                  isFlipped={flippedIndex === idx}
                  onFlip={() => setFlippedIndex(flippedIndex === idx ? null : idx)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Leadership Responsibilities */}
      <section className="py-24 md:py-32 bg-[#05140b] relative overflow-hidden">
        {/* Cinematic ambient lighting */}
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
                  The Student Council serves as the liaison between the school administration, faculty, and student body. They are elected annually through a rigorous democratic voting process in which students from Class IX to XII participate.
                </p>
                <p>
                  Leaders maintain school discipline during morning assemblies, coordinate prestigious house events, organize inter-school festivals, and champion eco-friendly policies inside the campus.
                </p>
              </div>

              <button className="flex items-center gap-3 text-[#d4af37] group uppercase tracking-widest text-xs font-bold mt-8">
                <span className="border-b border-[#d4af37]/30 pb-1 group-hover:border-[#d4af37] transition-colors">Read Full Charter</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
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
