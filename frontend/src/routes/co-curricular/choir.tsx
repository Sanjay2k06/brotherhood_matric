import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Music, Star, Quote } from "lucide-react";
import { motion } from "motion/react";
import choirImg from "../../images/choir.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export const Route = createFileRoute("/co-curricular/choir")({
  head: () => ({
    meta: [
      { title: "School Choir — Brotherhood School" },
      { name: "description", content: "Details of the Brotherhood School choir, music programs, and carol events." },
    ],
  }),
  component: ChoirPage,
});

function ChoirPage() {
  return (
    <div className="bg-[#fdfdfc] text-[#2d3748] font-sans selection:bg-[#0a2b18] selection:text-white">
      <PageHeader
        eyebrow="Musical Training"
        title="School Choir"
        subtitle="Raising voices in harmony, celebrating regional awards and carol events."
      />

      {/* Cinematic Dark Section */}
      <section className="py-24 md:py-32 bg-[#05140b] relative overflow-hidden">
        {/* Cinematic ambient lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#1b4d32_0%,transparent_50%)] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[#d4af37] rounded-full blur-[150px] opacity-[0.05] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
           
           {/* Image Side */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} 
             className="w-full lg:w-[50%]"
           >
             <div className="relative aspect-[4/5] md:aspect-square rounded-[3rem] overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.08)] group border border-[#1b4d32]/30">
               <img
                 src={choirImg}
                 alt="School Choir Performing"
                 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-85 sepia-[0.1]"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#05140b] via-[#05140b]/20 to-transparent"></div>
               
               <div className="absolute bottom-10 left-10 right-10">
                  <div className="w-16 h-16 rounded-full border border-[#d4af37]/30 flex items-center justify-center mb-6 bg-[#05140b]/50 backdrop-blur-sm">
                    <Music className="h-6 w-6 text-[#d4af37]" />
                  </div>
                  <p className="text-white font-serif text-3xl mb-2">Vocal Harmony</p>
                  <p className="text-[#d4af37] uppercase tracking-widest text-xs font-bold">Live Performance at Auditorium</p>
               </div>
             </div>
           </motion.div>

           {/* Text Side */}
           <motion.div 
             initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} 
             className="w-full lg:w-[50%] space-y-10"
           >
              <div className="flex items-center gap-4">
                <div className="w-8 h-[1px] bg-[#d4af37]/60"></div>
                <span className="text-[#d4af37] uppercase tracking-[0.15em] text-xs font-semibold">Vocal Ensemble</span>
              </div>
              
              <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
                Choral Music <br/><span className="italic text-[#d4af37]">& Training</span>
              </h3>
              
              <div className="space-y-6 text-white/70 font-light text-lg md:text-xl leading-[1.8]">
                <p>
                  The Brotherhood School Choir is a highly respected vocal group performing at morning assemblies, annual days, and state-level carol competitions. We guide students in classical choral scales, pitch modulation, and four-part harmony (Soprano, Alto, Tenor, and Bass).
                </p>
                <p>
                  Under professional guidance, student batches discover their vocal pitch, learn basic keyboard notes, and develop team-based musical synchronization.
                </p>
              </div>

              {/* Featured Event Card */}
              <div className="mt-12 bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 md:p-10 relative overflow-hidden group hover:border-[#d4af37]/30 transition-colors duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37] rounded-full blur-[50px] opacity-[0.05] group-hover:opacity-[0.15] transition-opacity duration-500"></div>
                
                <div className="flex items-start gap-5 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-[#1b4d32] flex items-center justify-center shrink-0">
                    <Star className="h-5 w-5 text-[#d4af37]" />
                  </div>
                  <div>
                    <h4 className="text-white font-serif text-xl mb-3">Featured Event</h4>
                    <p className="text-white/70 font-light leading-relaxed">
                      The <strong className="text-[#d4af37] font-medium">Annual Christmas Carol Festival</strong>, featuring joint performances with alumni groups and visiting schools.
                    </p>
                  </div>
                </div>
              </div>
           </motion.div>

        </div>
      </section>

      {/* Inspirational Quote */}
      <section className="py-24 px-6 bg-[#f7faf8] relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Quote className="h-16 w-16 text-[#d4af37]/20 mx-auto mb-8" />
            <p className="font-serif text-3xl md:text-4xl text-[#0a2b18] leading-relaxed italic mb-8">
              "Music gives a soul to the universe, wings to the mind, flight to the imagination and life to everything."
            </p>
            <div className="w-12 h-[1px] bg-[#1b4d32] mx-auto"></div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
