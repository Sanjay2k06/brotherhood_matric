import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Quote } from "lucide-react";
import { motion } from "motion/react";
import ecoImg from "../../images/ecoclub.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export const Route = createFileRoute("/co-curricular/eco-club")({
  head: () => ({
    meta: [
      { title: "Eco Club — Brotherhood School" },
      { name: "description", content: "Details of school environment drives, waste recycling projects, and organic gardening by Eco Club." },
    ],
  }),
  component: EcoClubPage,
});

function EcoClubPage() {
  return (
    <div className="bg-[#fcfdfa] text-[#1c2e24] font-sans selection:bg-[#0a2b18] selection:text-white min-h-screen">
      <PageHeader
        eyebrow="Green Initiatives"
        title="Eco Club"
        subtitle="Raising awareness, planting trees, and cultivating green habits for life."
      />

      {/* Environmental Guardians — Main Showcase Section with Scroll Reveal */}
      <section className="py-20 md:py-28 px-4 sm:px-6 md:px-10 lg:px-16 relative overflow-hidden bg-[#f7faf8] border-b border-[#e2e8f0]">
         <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-white rounded-full blur-[120px] opacity-70 pointer-events-none"></div>

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
                  Environmental Guardians
                </span>
              </motion.div>
              
              <motion.h2 variants={fadeUp} className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#0a2b18] leading-[1.15] font-normal">
                Sustainable <br/>
                <span className="italic text-[#1b4d32]">Living</span> &amp; Action
              </motion.h2>
              
              <motion.div variants={fadeUp} className="space-y-6 text-[#55695d] font-light text-base sm:text-lg leading-relaxed">
                <p>
                  The Eco Club at Brotherhood School encourages students to translate environment lessons into tangible actions. By managing the school composting pit, nurturing native herbs, and monitoring water consumption, club members learn standard sustainable habits.
                </p>
                <p>
                  The club organizes drawing competitions, plastic-free rallies in the neighborhood, and coordinates with local environmental agencies to keep our campus and surrounding spaces green.
                </p>
              </motion.div>
           </motion.div>

           {/* Image Side with Hover Scale & Ambient Card */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.92, y: 30 }} 
             whileInView={{ opacity: 1, scale: 1, y: 0 }} 
             viewport={{ once: true, margin: "-40px" }} 
             transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} 
             className="w-full lg:w-[50%]"
           >
             <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl group border-2 border-[#e2e8f0] bg-white">
               <img 
                 src={ecoImg} 
                 alt="School Eco Club Planting Trees" 
                 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a2b18]/85 via-transparent to-transparent"></div>
               
               <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="w-10 h-[2px] bg-[#d4af37] mb-3"></div>
                  <p className="font-serif text-2xl font-bold mb-1">Botanical Grounds</p>
                  <p className="text-[#d4af37] uppercase tracking-widest text-xs font-semibold">
                    Composting &amp; Gardening Assembly
                  </p>
               </div>
             </div>
           </motion.div>
         </div>
      </section>

      {/* Inspirational Environmental Callout */}
      <section className="py-20 md:py-28 px-6 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Quote className="h-14 w-14 text-[#d4af37]/30 mx-auto mb-6" />
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#0a2b18] leading-relaxed italic mb-6">
              &ldquo;The Earth does not belong to us: we belong to the Earth. Cultivating stewardship and care in young minds.&rdquo;
            </p>
            <div className="w-16 h-[2px] bg-[#1b4d32] mx-auto"></div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
