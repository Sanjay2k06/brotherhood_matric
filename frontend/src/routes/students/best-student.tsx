import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { motion } from "motion/react";
import { Award, Star } from "lucide-react";
import { API_BASE } from "@/config";
import { getMergedAchievements } from "@/lib/achievementsData";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export const Route = createFileRoute("/students/best-student")({
  head: () => ({
    meta: [
      { title: "Best Student Awards — Brotherhood School" },
      { name: "description", content: "Details of student-of-the-month and annual student excellence honors at Brotherhood." },
    ],
  }),
  component: BestStudentPage,
});

function FlipCard({ student, idx, isFlipped, onFlip }: { student: any, idx: number, isFlipped: boolean, onFlip: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: idx * 0.1 }}
      className="relative w-full h-[360px] cursor-pointer perspective-[1000px] group"
      onClick={onFlip}
    >
      <motion.div 
        className="w-full h-full relative [transform-style:preserve-3d] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front Side (Light) */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-white border border-[#f1f6f3] rounded-[2.5rem] p-10 shadow-[0_15px_30px_rgba(10,43,24,0.04)] flex flex-col justify-center items-center text-center group-hover:shadow-[0_20px_40px_rgba(10,43,24,0.1)] transition-shadow">
          <div className="w-16 h-16 rounded-full bg-[#f7faf8] border border-[#f1f6f3] flex items-center justify-center mb-6 relative">
            <div className="absolute inset-0 rounded-full border border-[#d4af37]/30 scale-[1.2]"></div>
            <Star className="h-6 w-6 text-[#d4af37]" fill="currentColor" />
          </div>
          <h4 className="text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold mb-3">{student.title}</h4>
          <h3 className="font-serif text-3xl text-[#0a2b18] leading-snug mb-1">{student.name}</h3>
          <p className="font-serif text-[#718096] italic text-lg">{student.grade}</p>
          
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <span className="text-[11px] uppercase tracking-widest text-[#6c8274] border-b border-[#6c8274]/20 pb-1 group-hover:text-[#1b4d32] group-hover:border-[#1b4d32]/50 transition-colors">Click to view achievement</span>
          </div>
        </div>

        {/* Back Side (Dark) */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#05140b] rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center shadow-2xl border border-[#1b4d32]/30 overflow-hidden">
          {/* Subtle Back Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37] rounded-full blur-[60px] opacity-[0.15] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <Award className="h-8 w-8 text-[#d4af37] mb-6 opacity-80" strokeWidth={1.5} />
            <h4 className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-6 pb-4 border-b border-[#d4af37]/20">Citation of Excellence</h4>
            <p className="text-white/90 font-light leading-relaxed text-[17px] italic">"{student.reason}"</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function BestStudentPage() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [currentAwardees, setCurrentAwardees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultAwardees = [
    { title: "Best Student of the Month", name: "Master R. Sai Ganesh", grade: "Class XI-A", reason: "Outstanding programming project in Computer Science and leadership in STEM club." },
    { title: "Best Student of the Month", name: "Miss S. Kavitha", grade: "Class XI-B", reason: "Excellent leadership in Commerce club activities and consistent academic support to peers." },
    { title: "Best Student of the Month", name: "Master M. Vignesh", grade: "Class XI-C", reason: "Academic consistency and top scores in chemistry laboratory worksheets." },
    { title: "Best Student of the Month", name: "Miss P. Harini", grade: "Class XII-A", reason: "Exemplary discipline, high attendance, and centum score in mathematics mock examinations." },
    { title: "Best Student of the Month", name: "Master V. Rajesh", grade: "Class XII-B", reason: "Outstanding public speaking in the debate tournament and active commerce club volunteer." },
    { title: "Best Student of the Month", name: "Miss K. Sneha", grade: "Class XII-C", reason: "Consistent academic performance of 95%+ marks and dedicated library club student helper." },
  ];

  useEffect(() => {
    fetch(`${API_BASE}/student-achievements/`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        const results = Array.isArray(data) ? data : (data.results || []);
        const merged = getMergedAchievements(results).bestStudents;
        setCurrentAwardees(merged);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching achievements:", err);
        setCurrentAwardees(getMergedAchievements().bestStudents);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#fcfdfc] text-[#2d3748] font-sans selection:bg-[#0a2b18] selection:text-white">
      <PageHeader
        eyebrow="Student Honors"
        title="Best Student Awards"
        subtitle="Recognising students who display outstanding character, values, and academic progress."
      />

      <section className="py-24 md:py-32 px-6 relative overflow-hidden bg-[#f7faf8]">
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-white rounded-full blur-[100px] opacity-60 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} 
            className="text-center max-w-2xl mx-auto mb-20 space-y-6"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-[#1b4d32]"></div>
              <span className="text-[#1b4d32] uppercase tracking-widest text-xs font-semibold">Excellence</span>
              <div className="w-12 h-[1px] bg-[#1b4d32]"></div>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-[#0a2b18]">
              Monthly Student <span className="italic text-[#1b4d32]">Honors</span>
            </h2>
          </motion.div>

          {/* Interactive Flip Cards */}
          {loading ? (
            <div className="text-center py-16">
              <div className="w-10 h-10 border-2 border-[#e2e8f0] border-t-[#d4af37] rounded-full animate-spin mx-auto"></div>
              <p className="text-xs text-[#718096] mt-4 uppercase tracking-widest font-semibold font-sans">Loading Honorees...</p>
            </div>
          ) : currentAwardees.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto">
              {currentAwardees.map((student, idx) => (
                <FlipCard 
                  key={student.name} 
                  student={student} 
                  idx={idx} 
                  isFlipped={flippedIndex === idx}
                  onFlip={() => setFlippedIndex(flippedIndex === idx ? null : idx)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/50 border border-dashed border-[#e2e8f0] rounded-[2.5rem]">
              <p className="text-[#718096] font-light">No Best Student award nominations registered for this period.</p>
            </div>
          )}
        </div>
      </section>

      {/* Annual Best Student Award (Don Bosco Trophy) - Redesigned as a luxurious horizontal split */}
      <section className="py-24 md:py-32 bg-[#05140b] relative overflow-hidden">
        {/* Cinematic ambient lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#1b4d32_0%,transparent_50%)] opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#d4af37_0%,transparent_50%)] opacity-10 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
           <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
             
             {/* Content Side */}
             <motion.div 
               initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} 
               className="w-full lg:w-[60%] space-y-10"
             >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-[#d4af37]/60"></div>
                  <span className="text-[#d4af37] uppercase tracking-[0.15em] text-xs font-semibold">The Highest Honor</span>
                </div>
                
                <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                  Annual Best <br className="hidden lg:block"/> Student <span className="italic text-[#d4af37]">Award</span>
                </h3>
                
                <div className="space-y-6 text-white/70 font-light text-lg leading-[1.8] max-w-2xl">
                  <p>
                    The Don Bosco Trophy for the Overall Best Student is awarded at the end of the academic year during the Annual Valedictory function.
                  </p>
                  <p>
                    The selection is meticulously made by a panel of teachers and is based on a student's consistent academic excellence, active participation in clubs, sportsmanship, and overall adherence to the school motto: <span className="text-[#d4af37] italic font-medium block mt-3">"Character Formation Through Quality Education"</span>
                  </p>
                </div>
             </motion.div>

             {/* Emblem Side */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} 
               className="w-full lg:w-[40%] flex justify-center lg:justify-end"
             >
               <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-[3rem] border border-[#d4af37]/30 bg-[#0a2b18]/40 backdrop-blur-md flex flex-col items-center justify-center p-12 shadow-[0_0_60px_rgba(212,175,55,0.15)] group overflow-hidden">
                 
                 <div className="absolute -top-24 -right-24 text-[200px] text-[#d4af37] opacity-[0.03] font-serif rotate-12 pointer-events-none select-none">
                   DB
                 </div>

                 {/* Elegant Trophy Graphic */}
                 <div className="relative mb-10 group-hover:scale-110 transition-transform duration-700">
                    <div className="absolute inset-0 bg-[#d4af37] blur-[40px] opacity-20 rounded-full"></div>
                    <Award className="h-32 w-32 text-[#d4af37] relative z-10" strokeWidth={0.5} />
                 </div>
                 
                 <h4 className="font-serif text-4xl text-white text-center leading-none mb-4">Don Bosco</h4>
                 <div className="w-12 h-[1px] bg-[#d4af37]/50 mb-4"></div>
                 <p className="text-[#d4af37] uppercase tracking-[0.25em] text-[11px] font-semibold text-center">Trophy of Excellence</p>
               </div>
             </motion.div>

           </div>
        </div>
      </section>
    </div>
  );
}
