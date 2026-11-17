import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { ShieldCheck, Users, Clock, Shield } from "lucide-react";
import { motion } from "motion/react";
import aboutImage3 from "../../images/aboutimage3.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export const Route = createFileRoute("/co-curricular/rsp")({
  head: () => ({
    meta: [
      { title: "Road Safety Patrol (RSP) — Brotherhood School" },
      { name: "description", content: "Learn about the school Road Safety Patrol (RSP) team, traffic control training, and community campaigns." },
    ],
  }),
  component: RSPPage,
});

function RSPPage() {
  const duties = [
    { title: "Traffic Control Support", desc: "Assisting local traffic police officers during peak morning and evening dispersal hours outside the school gate on East Coast Road.", icon: Clock },
    { title: "Awareness Campaigns", desc: "Conducting helmet awareness, zebra crossing safety, and road discipline campaigns in the Neelankarai neighborhood.", icon: ShieldCheck },
    { title: "Campus Dispersal Patrol", desc: "Regulating vehicle movements and ensuring safe passage for primary section kids inside the school parking spaces.", icon: Users }
  ];

  return (
    <div className="bg-[#fdfdfc] text-[#2d3748] font-sans selection:bg-[#0a2b18] selection:text-white">
      <PageHeader
        eyebrow="Civic Duty & Safety"
        title="Road Safety Patrol (RSP)"
        subtitle="Serving the community, maintaining traffic discipline, and building safety awareness."
      />

      {/* Cinematic Dark Section */}
      <section className="py-24 md:py-32 bg-[#05140b] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#1b4d32_0%,transparent_50%)] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#d4af37] rounded-full blur-[150px] opacity-[0.05] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
           
           {/* Text Side */}
           <motion.div 
             initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} 
             className="w-full lg:w-[50%] space-y-10"
           >
              <div className="flex items-center gap-4">
                <div className="w-8 h-[1px] bg-[#d4af37]/60"></div>
                <span className="text-[#d4af37] uppercase tracking-[0.15em] text-xs font-semibold">Leadership & Discipline</span>
              </div>
              
              <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
                Patrol Squad <br/><span className="italic text-[#d4af37]">& Training</span>
              </h3>
              
              <div className="space-y-6 text-white/70 font-light text-lg md:text-xl leading-[1.8]">
                <p>
                  The Road Safety Patrol (RSP) at Brotherhood School is a select volunteer force of students from Classes IX to XI. RSP cadets are trained by local traffic police personnel to understand standard traffic signals, pedestrian rights, and first aid basics.
                </p>
                <p>
                  Being an RSP cadet fosters deep civic responsibility, self-discipline, and concern for public safety. Cadets wear a distinct white-and-navy patrol uniform and help manage school gate crowds.
                </p>
              </div>

              {/* Authority Badge */}
              <div className="mt-12 flex items-center gap-6">
                <div className="w-16 h-16 rounded-full border border-[#d4af37]/30 flex items-center justify-center bg-white/[0.02]">
                  <Shield className="h-6 w-6 text-[#d4af37]" />
                </div>
                <div>
                  <p className="text-[#d4af37] uppercase tracking-widest text-[10px] font-bold mb-1">Official Mandate</p>
                  <p className="text-white font-serif text-xl">Civic Protection Cadets</p>
                </div>
              </div>
           </motion.div>

           {/* Image Side */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} 
             className="w-full lg:w-[50%]"
           >
             <div className="relative aspect-[4/5] md:aspect-square rounded-[3rem] overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.08)] group border border-[#1b4d32]/30">
               <img
                 src={aboutImage3}
                 alt="RSP Patrol Squad Parade"
                 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-85 sepia-[0.1]"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#05140b] via-[#05140b]/20 to-transparent"></div>
               
               <div className="absolute bottom-10 left-10 right-10">
                  <div className="w-12 h-[1px] bg-[#d4af37] mb-5"></div>
                  <p className="text-white font-serif text-3xl mb-2">Morning Assembly</p>
                  <p className="text-[#d4af37] uppercase tracking-widest text-xs font-bold">RSP Cadet Parade</p>
               </div>
             </div>
           </motion.div>

        </div>
      </section>

      {/* Feature Highlights - Duties */}
      <section className="py-24 md:py-32 px-6 relative bg-[#fdfdfc]">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#f7faf8] rounded-full blur-[100px] -translate-y-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} 
            className="text-center max-w-3xl mx-auto mb-20 space-y-6"
          >
             <h2 className="font-serif text-4xl md:text-5xl text-[#0a2b18]">
               Core <span className="italic text-[#1b4d32]">Duties</span>
             </h2>
             <div className="w-16 h-[1px] bg-[#d4af37] mx-auto"></div>
             <p className="text-[#718096] font-light text-lg">The primary responsibilities of an RSP Cadet.</p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} 
            className="grid md:grid-cols-3 gap-8 lg:gap-12"
          >
            {duties.map((duty, idx) => {
              const Icon = duty.icon;
              return (
                <motion.div 
                  key={duty.title} 
                  variants={fadeUp} 
                  className="relative group p-10 lg:p-12 rounded-[2.5rem] bg-white border border-[#f1f6f3] shadow-[0_15px_40px_-15px_rgba(10,43,24,0.04)] hover:shadow-[0_20px_50px_-15px_rgba(10,43,24,0.12)] hover:-translate-y-2 transition-all duration-700 overflow-hidden flex flex-col justify-between h-full"
                >
                  <div className="absolute -top-10 -right-10 text-[180px] font-serif text-[#f4f7f5] group-hover:text-[#d4af37]/5 transition-colors duration-500 pointer-events-none select-none leading-none">
                    0{idx + 1}
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full bg-[#f4f7f5] border border-[#e2e8f0] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-700">
                      <Icon className="h-6 w-6 text-[#1b4d32]" />
                    </div>
                    <h3 className="font-serif text-2xl text-[#0a2b18] mb-4">{duty.title}</h3>
                    
                    <div className="w-8 h-[1px] bg-[#e2e8f0] mb-6 group-hover:w-16 transition-all duration-700"></div>
                    
                    <p className="text-[#718096] font-light leading-relaxed text-[15px]">{duty.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
