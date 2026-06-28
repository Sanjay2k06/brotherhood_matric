import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { BookOpen, Edit, Mic, Quote } from "lucide-react";
import { motion } from "motion/react";
import aboutImage2 from "../../images/aboutimage2.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export const Route = createFileRoute("/co-curricular/literary-association")({
  head: () => ({
    meta: [
      { title: "Literary Association — Brotherhood School" },
      { name: "description", content: "Details of creative writing, essay debates, public speaking, and reading clubs at Brotherhood." },
    ],
  }),
  component: LiteraryAssociationPage,
});

function LiteraryAssociationPage() {
  const categories = [
    { title: "Public Speaking & Debates", desc: "Weekly classroom mock-debates, declamations, and panel discussions preparing students for inter-school cups.", icon: Mic },
    { title: "Creative Writing", desc: "Workshops on short-story writing, essay composing, poetry creation, and grammar excellence guides.", icon: Edit },
    { title: "Reading Circles", desc: "A reading club based in the library, where members analyze classic novels, biography reviews, and essays.", icon: BookOpen }
  ];

  return (
    <div className="bg-[#fdfdfc] text-[#2d3748] font-sans selection:bg-[#0a2b18] selection:text-white">
      <PageHeader
        eyebrow="Communication Excellence"
        title="Literary Association"
        subtitle="Cultivating reading habits, public speaking confidence, and creative writing skills."
      />

      {/* Cinematic Intro - Literary Themed */}
      <section className="py-24 md:py-32 px-6 relative overflow-hidden bg-[#fdfdfc]">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#f7faf8] rounded-full blur-[100px] opacity-80 pointer-events-none"></div>

         <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
             
           {/* Image Side */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} 
             className="w-full lg:w-[50%]"
           >
             <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(10,43,24,0.15)] group border border-[#1b4d32]/10 p-4 bg-white">
               <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative">
                 <img 
                   src={aboutImage2} 
                   alt="Students Reading in Library" 
                   className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 sepia-[0.1]"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0a2b18]/90 via-[#0a2b18]/20 to-transparent"></div>
                 
                 <div className="absolute bottom-10 left-10 right-10">
                    <Quote className="h-10 w-10 text-[#d4af37] mb-5 opacity-80" />
                    <p className="text-white font-serif text-3xl mb-1">School Library</p>
                    <p className="text-[#d4af37] uppercase tracking-widest text-[10px] font-bold">Research & Reading Desks</p>
                 </div>
               </div>
             </div>
           </motion.div>

           {/* Text Side - Classic Typography */}
           <motion.div 
             initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} 
             className="w-full lg:w-[50%] space-y-10"
           >
              <div className="flex items-center gap-4">
                <div className="w-8 h-[1px] bg-[#1b4d32]/60"></div>
                <span className="text-[#1b4d32] uppercase tracking-[0.15em] text-xs font-bold">Creative Arts</span>
              </div>
              
              <h2 className="font-serif text-5xl md:text-6xl text-[#0a2b18] leading-[1.15]">
                Expression <span className="italic text-[#1b4d32]">&</span> <br/> Literature
              </h2>
              
              <div className="space-y-6 text-[#4a5568] font-light text-lg md:text-xl leading-[1.8] relative">
                <p className="first-letter:text-6xl first-letter:font-serif first-letter:text-[#1b4d32] first-letter:float-left first-letter:mr-3 first-letter:-mt-2">
                  The Literary Association is dedicated to helping students build eloquence, stage confidence, and precise grammar skills. We coordinate separate branches for English and Tamil/Hindi language pursuits.
                </p>
                <p>
                  The club publishes the annual school magazine, organizes story-telling assemblies for primary sections, and hosts the annual Literary Week filled with vocabulary quizzes and writing competitions.
                </p>
              </div>
           </motion.div>
         </div>
      </section>

      {/* Feature Highlights - Categories */}
      <section className="py-24 md:py-32 px-6 relative bg-[#f7faf8]">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} 
            className="text-center max-w-3xl mx-auto mb-20 space-y-6"
          >
             <h2 className="font-serif text-4xl md:text-5xl text-[#0a2b18]">
               Core <span className="italic text-[#1b4d32]">Disciplines</span>
             </h2>
             <div className="w-16 h-[1px] bg-[#d4af37] mx-auto"></div>
             <p className="text-[#718096] font-light text-lg">Focus areas of our literary program.</p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} 
            className="grid md:grid-cols-3 gap-8 lg:gap-12"
          >
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <motion.div 
                  key={cat.title} 
                  variants={fadeUp} 
                  className="relative group p-10 lg:p-12 rounded-[2.5rem] bg-white border border-[#f1f6f3] shadow-[0_15px_40px_-15px_rgba(10,43,24,0.04)] hover:shadow-[0_20px_50px_-15px_rgba(10,43,24,0.12)] hover:-translate-y-2 transition-all duration-700 overflow-hidden flex flex-col justify-between h-full"
                >
                  {/* Background Serif Graphic */}
                  <div className="absolute -top-10 -right-10 text-[180px] font-serif text-[#f4f7f5] group-hover:text-[#d4af37]/5 transition-colors duration-500 pointer-events-none select-none leading-none italic">
                    &
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full bg-[#f4f7f5] border border-[#e2e8f0] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-700">
                      <Icon className="h-6 w-6 text-[#1b4d32]" />
                    </div>
                    <h3 className="font-serif text-2xl text-[#0a2b18] mb-4">{cat.title}</h3>
                    
                    <div className="w-8 h-[1px] bg-[#e2e8f0] mb-6 group-hover:w-16 transition-all duration-700"></div>
                    
                    <p className="text-[#718096] font-light leading-relaxed text-[15px]">{cat.desc}</p>
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
