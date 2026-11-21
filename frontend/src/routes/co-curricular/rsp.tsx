import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Shield, Award } from "lucide-react";
import { motion } from "motion/react";
import aboutImage3 from "../../images/aboutimage3.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export const Route = createFileRoute("/co-curricular/rsp")({
  head: () => ({
    meta: [
      { title: "Road Safety Patrol (RSP) — Brotherhood School" },
      {
        name: "description",
        content:
          "Learn about the school Road Safety Patrol (RSP) team, traffic control training, and community safety awareness at Brotherhood Matriculation Higher Secondary School.",
      },
    ],
  }),
  component: RSPPage,
});

function RSPPage() {
  return (
    <div className="bg-[#fcfdfa] text-[#1c2e24] font-sans min-h-screen">
      <PageHeader
        eyebrow="Civic Duty & Safety"
        title="Road Safety Patrol (RSP)"
        subtitle="Serving the community, maintaining traffic discipline, and building safety awareness."
      />

      {/* Patrol Squad & Training — White Theme Section with Scroll Reveal */}
      <section className="py-20 md:py-28 px-4 sm:px-6 md:px-10 lg:px-16 bg-white relative overflow-hidden border-b border-[#e2e8f0]">
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
              <div className="w-8 h-[1px] bg-[#d4af37]"></div>
              <span className="text-[#d4af37] uppercase tracking-[0.2em] text-xs font-bold">
                Leadership &amp; Discipline
              </span>
            </motion.div>

            <motion.h2 variants={fadeUp} className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#0a2b18] leading-[1.15] font-normal">
              Patrol Squad <br />
              <span className="italic text-[#1b4d32]">&amp; Training</span>
            </motion.h2>

            <motion.div variants={fadeUp} className="space-y-6 text-[#55695d] font-light text-base sm:text-lg leading-relaxed">
              <p>
                The Road Safety Patrol (RSP) at Brotherhood School is a select volunteer force of students from Classes IX to XI. RSP cadets are trained by local traffic police personnel to understand standard traffic signals, pedestrian rights, and first aid basics.
              </p>
              <p>
                Being an RSP cadet fosters deep civic responsibility, self-discipline, and concern for public safety. Cadets wear a distinct white-and-navy patrol uniform and help manage school gate crowds.
              </p>
            </motion.div>

            {/* Official Authority Badge with Hover Effect */}
            <motion.div variants={fadeUp} className="pt-2 flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl border-2 border-[#d4af37]/40 bg-[#f7faf8] flex items-center justify-center text-[#1b4d32] shadow-sm hover:scale-105 hover:border-[#d4af37] transition-all duration-300">
                <Shield className="h-7 w-7 text-[#d4af37]" />
              </div>
              <div>
                <p className="text-[#d4af37] uppercase tracking-widest text-[11px] font-bold mb-1">
                  Official Mandate
                </p>
                <p className="text-[#0a2b18] font-serif font-bold text-xl">
                  Civic Protection Cadets
                </p>
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
                src={aboutImage3}
                alt="RSP Patrol Squad Parade"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a2b18]/85 via-transparent to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="w-10 h-[2px] bg-[#d4af37] mb-3"></div>
                <p className="font-serif text-2xl font-bold mb-1">Morning Assembly</p>
                <p className="text-[#d4af37] uppercase tracking-widest text-xs font-semibold">
                  RSP Cadet Parade &amp; School Safety Squad
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Safety & Service Institutional Note with Reveal */}
      <section className="py-20 md:py-28 px-4 sm:px-6 bg-white relative">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            <div className="w-12 h-12 rounded-full bg-[#f0f6f2] border border-[#d2e2d7] flex items-center justify-center mx-auto text-[#1b4d32] shadow-sm">
              <Award className="w-6 h-6 text-[#d4af37]" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#0a2b18]">
              Commitment to Community Road Safety
            </h3>
            <p className="text-[#55695d] text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Through continuous drills and traffic guidance workshops, our cadets embody vigilance, helpfulness, and civic order every morning along the East Coast Road campus corridor.
            </p>
            <div className="w-16 h-[2px] bg-[#d4af37] mx-auto mt-4"></div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
