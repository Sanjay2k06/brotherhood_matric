import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Trophy, Shield, Star, Calendar } from "lucide-react";
import { motion } from "motion/react";
import sportsImg from "../../images/sports.png";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export const Route = createFileRoute("/co-curricular/sports")({
  head: () => ({
    meta: [
      { title: "Sports & Games — Brotherhood School" },
      { name: "description", content: "Explore the athletic coaching, sports matches, and school trophies at Brotherhood." },
    ],
  }),
  component: SportsPage,
});

function SportsPage() {
  const events = [
    { title: "Annual Sports Meet", desc: "Our hallmark event involving athletic track meets, relays, and march pasts by the four houses." },
    { title: "Inter-School Leagues", desc: "Participating in zonal football tournaments, chess leagues, and local table tennis meets." },
    { title: "Specialist Coaching", desc: "Weekly professional training sessions for cricket, football, karate, and yoga practices." }
  ];

  return (
    <div className="bg-[#fdfdfc] text-[#2d3748] font-sans selection:bg-[#0a2b18] selection:text-white">
      <PageHeader
        eyebrow="Athletics & Games"
        title="Sports Programs"
        subtitle="Cultivating team spirit, sportsmanship, and physical health in every student."
      />

      {/* Cinematic Intro */}
      <section className="py-24 md:py-32 px-6 relative overflow-hidden bg-[#f7faf8]">
         {/* Geometry */}
         <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-white rounded-full blur-[100px] opacity-80 pointer-events-none"></div>

         <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
             
           {/* Text Side */}
           <motion.div 
             initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} 
             className="w-full lg:w-[50%] space-y-10"
           >
              <div className="flex items-center gap-4">
                <div className="w-8 h-[1px] bg-[#1b4d32]/60"></div>
                <span className="text-[#1b4d32] uppercase tracking-[0.15em] text-xs font-bold">Endurance & Strategy</span>
              </div>
              
              <h2 className="font-serif text-5xl md:text-6xl text-[#0a2b18] leading-[1.15]">
                Physical <br/><span className="italic text-[#1b4d32]">Education</span> & Health
              </h2>
              
              <div className="space-y-6 text-[#4a5568] font-light text-lg md:text-xl leading-[1.8]">
                <p>
                  At Brotherhood, sports is an integral part of standard character formation. We believe that physical endurance builds mental strength, teaches cooperation, and instills a constructive attitude towards victory and defeat alike.
                </p>
                <p>
                  The school playground is equipped with standard football fields, volleyball nets, and indoor tables for chess and table tennis. Under the guidance of our Physical Director, students are selected for regional and state-level sports competitions.
                </p>
              </div>
           </motion.div>

           {/* Image Side */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} 
             className="w-full lg:w-[50%]"
           >
             <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(10,43,24,0.15)] group border border-[#1b4d32]/10">
               <img 
                 src={sportsImg} 
                 alt="School Football Training Ground" 
                 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-95 sepia-[0.05]"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a2b18]/80 via-transparent to-transparent"></div>
               
               <div className="absolute bottom-8 left-8 right-8 flex flex-col justify-end">
                  <div className="w-12 h-[1px] bg-[#d4af37] mb-4"></div>
                  <p className="text-white font-serif text-2xl md:text-3xl mb-1">Athletic Grounds</p>
                  <p className="text-[#d4af37] uppercase tracking-widest text-[10px] font-bold">School Football Training</p>
               </div>
             </div>
           </motion.div>
         </div>
      </section>

      {/* Feature Highlights - Programs */}
      <section className="py-24 md:py-32 px-6 relative bg-[#fdfdfc]">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} 
            className="text-center max-w-3xl mx-auto mb-20 space-y-6"
          >
             <h2 className="font-serif text-4xl md:text-5xl text-[#0a2b18]">
               Key <span className="italic text-[#1b4d32]">Programs</span>
             </h2>
             <div className="w-16 h-[1px] bg-[#d4af37] mx-auto"></div>
             <p className="text-[#718096] font-light text-lg">Comprehensive athletic training and competitive events.</p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} 
            className="grid md:grid-cols-3 gap-8 lg:gap-12"
          >
            {events.map((ev, idx) => (
              <motion.div 
                key={ev.title} 
                variants={fadeUp} 
                className="relative group p-10 lg:p-12 rounded-[2.5rem] bg-white border border-[#f1f6f3] shadow-[0_15px_40px_-15px_rgba(10,43,24,0.04)] hover:shadow-[0_20px_50px_-15px_rgba(10,43,24,0.12)] hover:-translate-y-2 transition-all duration-700 overflow-hidden flex flex-col justify-between h-full"
              >
                <div className="absolute -top-10 -right-10 text-[180px] font-serif text-[#f4f7f5] group-hover:text-[#d4af37]/5 transition-colors duration-500 pointer-events-none select-none leading-none">
                  0{idx + 1}
                </div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-[#f4f7f5] border border-[#e2e8f0] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-700">
                    <Trophy className="h-6 w-6 text-[#d4af37]" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#0a2b18] mb-4">{ev.title}</h3>
                  
                  <div className="w-8 h-[1px] bg-[#e2e8f0] mb-6 group-hover:w-16 transition-all duration-700"></div>
                  
                  <p className="text-[#718096] font-light leading-relaxed text-[15px]">{ev.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
