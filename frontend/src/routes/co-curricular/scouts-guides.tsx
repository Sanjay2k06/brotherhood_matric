import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Compass, Quote } from "lucide-react";
import { motion } from "motion/react";
import aboutImage4 from "../../images/aboutimage4.jpeg";

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export const Route = createFileRoute("/co-curricular/scouts-guides")({
  head: () => ({
    meta: [
      { title: "Scouts & Guides — Brotherhood School" },
      {
        name: "description",
        content:
          "Details of Bharat Scouts & Guides cadet training, annual camps, and badge achievements at Brotherhood Matriculation Higher Secondary School.",
      },
    ],
  }),
  component: ScoutsGuidesPage,
});

function ScoutsGuidesPage() {
  return (
    <div className="bg-[#fcfdfa] text-[#1c2e24] font-sans selection:bg-[#0a2b18] selection:text-white min-h-screen">
      <PageHeader
        eyebrow="Character & Service"
        title="Scouts & Guides"
        subtitle="Be prepared. Developing mental alerts, physical strength, and helpful attitudes."
      />

      {/* Bharat Scouts & Guides Unit — Main Showcase with Scroll Reveal */}
      <section className="py-20 md:py-28 px-4 sm:px-6 md:px-10 lg:px-16 relative overflow-hidden bg-[#fdfdfc] border-b border-[#e2e8f0]">
         <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-[#f7faf8] rounded-full blur-[120px] opacity-70 pointer-events-none"></div>

         <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
             
           {/* Text Side */}
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
                  Bharat Scouts &amp; Guides Unit
                </span>
              </motion.div>
              
              <motion.h2 variants={fadeUp} className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#0a2b18] leading-[1.15] font-normal">
                Outdoor <br/>
                <span className="italic text-[#1b4d32]">Leadership</span> &amp; Honor
              </motion.h2>
              
              <motion.div variants={fadeUp} className="space-y-6 text-[#55695d] font-light text-base sm:text-lg leading-relaxed">
                <p>
                  The Bharat Scouts and Guides unit at Brotherhood School provides training in citizenship, self-reliance, and outdoor leadership. The squad holds weekly drills and regular campouts under standard Scoutmasters.
                </p>
                <p>
                  Cadets work towards earning the prestigious <strong className="font-serif italic text-[#1b4d32]">Rajya Puraskar</strong> (State Award) and <strong className="font-serif italic text-[#1b4d32]">Rashtrapati Award</strong> (President&apos;s Scout/Guide Certificate), which are highly recognized in higher education streams.
                </p>
              </motion.div>

              {/* Scout Motto Badge */}
              <motion.div variants={fadeUp} className="pt-2 flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#f0f6f2] border border-[#d2e2d7] flex items-center justify-center text-[#1b4d32] shadow-sm hover:scale-105 hover:border-[#d4af37] transition-all duration-300 group">
                  <Compass className="w-7 h-7 text-[#d4af37] group-hover:rotate-45 transition-transform duration-500" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] block">
                    Scout Motto
                  </span>
                  <span className="font-serif font-bold text-2xl text-[#0a2b18]">
                    Be Prepared
                  </span>
                </div>
              </motion.div>
           </motion.div>

           {/* Image Side with Hover Scale */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.92, y: 30 }} 
             whileInView={{ opacity: 1, scale: 1, y: 0 }} 
             viewport={{ once: true, margin: "-40px" }} 
             transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} 
             className="w-full lg:w-[50%]"
           >
             <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl group border-2 border-[#e2e8f0] bg-white">
               <img 
                 src={aboutImage4} 
                 alt="Scouts Tent Camping Pitching" 
                 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-95"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a2b18]/85 via-transparent to-transparent"></div>
               
               <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="w-10 h-[2px] bg-[#d4af37] mb-3"></div>
                  <p className="font-serif text-2xl font-bold mb-1">Scouts Campsite</p>
                  <p className="text-[#d4af37] uppercase tracking-widest text-xs font-semibold">
                    Assembly Ground, Tent Pitching &amp; Drill
                  </p>
               </div>
             </div>
           </motion.div>
         </div>
      </section>

      {/* Inspirational Service Callout */}
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
              &ldquo;The most worthwhile thing is to try to put happiness into the lives of others.&rdquo;
            </p>
            <div className="w-16 h-[2px] bg-[#1b4d32] mx-auto"></div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
