import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Music, Quote } from "lucide-react";
import { motion } from "motion/react";
import choirImg from "../../images/choir.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export const Route = createFileRoute("/co-curricular/choir")({
  head: () => ({
    meta: [
      { title: "School Choir — Brotherhood School" },
      { name: "description", content: "Details of the Brotherhood School choir, vocal training, and choral performances." },
    ],
  }),
  component: ChoirPage,
});

function ChoirPage() {
  return (
    <div className="bg-[#fcfdfa] text-[#1c2e24] font-sans selection:bg-[#0a2b18] selection:text-white min-h-screen">
      <PageHeader
        eyebrow="Musical Training"
        title="School Choir"
        subtitle="Raising voices in harmony, celebrating regional awards and choral events."
      />

      {/* Vocal Ensemble & Discipline — White Background Section */}
      <section className="py-20 md:py-28 px-4 sm:px-6 md:px-10 lg:px-16 bg-white relative overflow-hidden border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Text Side with Scroll Reveal */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
            className="w-full lg:w-[50%] space-y-8"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <div className="w-8 h-[1px] bg-[#d4af37]"></div>
              <span className="text-[#d4af37] uppercase tracking-[0.2em] text-xs font-bold">
                Vocal Ensemble &amp; Discipline
              </span>
            </motion.div>
            
            <motion.h2 variants={fadeUp} className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#0a2b18] leading-[1.15] font-normal">
              Choral Music <br/>
              <span className="italic text-[#1b4d32]">&amp; Training</span>
            </motion.h2>
            
            <motion.div variants={fadeUp} className="space-y-6 text-[#55695d] font-light text-base sm:text-lg leading-relaxed">
              <p>
                The Brotherhood School Choir is a highly respected vocal group performing at morning assemblies, annual days, and state-level choral competitions. We guide students in classical choral scales, pitch modulation, and four-part harmony (Soprano, Alto, Tenor, and Bass).
              </p>
              <p>
                Under professional guidance, student batches discover their natural vocal pitch, learn basic keyboard notes, and develop team-based musical synchronization.
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
                src={choirImg}
                alt="School Choir Performing"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a2b18]/85 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="w-10 h-[2px] bg-[#d4af37] mb-3"></div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-[#d4af37]">
                    <Music className="w-4 h-4" />
                  </div>
                  <p className="font-serif text-2xl font-bold">Vocal Harmony</p>
                </div>
                <p className="text-[#d4af37] uppercase tracking-widest text-xs font-semibold">
                  Live Performance &amp; Choral Ensemble
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Inspirational Quote with Reveal Animation */}
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
              &ldquo;Music gives a soul to the universe, wings to the mind, flight to the imagination and life to everything.&rdquo;
            </p>
            <div className="w-16 h-[2px] bg-[#1b4d32] mx-auto"></div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
