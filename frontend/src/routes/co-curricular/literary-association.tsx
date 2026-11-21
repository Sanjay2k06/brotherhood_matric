import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Quote } from "lucide-react";
import { motion } from "motion/react";
import aboutImage2 from "../../images/aboutimage2.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
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
  return (
    <div className="bg-[#fcfdfa] text-[#1c2e24] font-sans selection:bg-[#0a2b18] selection:text-white min-h-screen">
      <PageHeader
        eyebrow="Communication Excellence"
        title="Literary Association"
        subtitle="Cultivating reading habits, public speaking confidence, and creative writing skills."
      />

      {/* Creative Arts & Eloquence / Expression & Literary Culture — Main Section with Scroll Reveal */}
      <section className="py-20 md:py-28 px-4 sm:px-6 md:px-10 lg:px-16 relative overflow-hidden bg-[#fdfdfc] border-b border-[#e2e8f0]">
         <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#f7faf8] rounded-full blur-[120px] opacity-80 pointer-events-none"></div>

         <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
             
           {/* Image Side with Hover Glow & Tilt */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.92, y: 30 }} 
             whileInView={{ opacity: 1, scale: 1, y: 0 }} 
             viewport={{ once: true, margin: "-40px" }} 
             transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} 
             className="w-full lg:w-[50%]"
           >
             <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl group border-2 border-[#e2e8f0] p-4 bg-white">
               <div className="w-full h-full rounded-[2.3rem] overflow-hidden relative">
                 <img 
                   src={aboutImage2} 
                   alt="Students Reading in Library" 
                   className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-95"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0a2b18]/85 via-[#0a2b18]/20 to-transparent"></div>
                 
                 <div className="absolute bottom-8 left-8 right-8 text-white">
                    <Quote className="h-10 w-10 text-[#d4af37] mb-4 opacity-90" />
                    <p className="font-serif text-3xl mb-1 font-bold">School Library</p>
                    <p className="text-[#d4af37] uppercase tracking-widest text-xs font-semibold">
                      Research, Reading &amp; Literary Forums
                    </p>
                 </div>
               </div>
             </div>
           </motion.div>

           {/* Text Side with Staggered Scroll Reveal */}
           <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-40px" }}
             variants={staggerContainer}
             className="w-full lg:w-[50%] space-y-8"
           >
              <motion.div variants={fadeUp} className="flex items-center gap-4">
                <div className="w-8 h-[1px] bg-[#1b4d32]"></div>
                <span className="text-[#1b4d32] uppercase tracking-[0.2em] text-xs font-bold">
                  Creative Arts &amp; Eloquence
                </span>
              </motion.div>
              
              <motion.h2 variants={fadeUp} className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#0a2b18] leading-[1.15] font-normal">
                Expression <span className="italic text-[#1b4d32]">&amp;</span> <br/>
                Literary Culture
              </motion.h2>
              
              <motion.div variants={fadeUp} className="space-y-6 text-[#55695d] font-light text-base sm:text-lg leading-relaxed">
                <p>
                  The Literary Association is dedicated to helping students build eloquence, stage confidence, and precise grammar skills. We coordinate separate branches for English and Tamil/Hindi language pursuits.
                </p>
                <p>
                  The club publishes the annual school magazine, organizes story-telling assemblies for primary sections, and hosts the annual Literary Week filled with vocabulary quizzes and writing competitions.
                </p>
              </motion.div>
           </motion.div>
         </div>
      </section>

      {/* Literary Callout Quote */}
      <section className="py-20 md:py-28 px-6 bg-[#f7faf8] relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Quote className="h-14 w-14 text-[#d4af37]/30 mx-auto mb-6" />
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#0a2b18] leading-relaxed italic mb-6">
              &ldquo;Words have the power to illuminate the mind, shape character, and ignite the human spirit.&rdquo;
            </p>
            <div className="w-16 h-[2px] bg-[#1b4d32] mx-auto"></div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
