import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import principalImage from "../../images/principal_portrait (2).png";
import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export const Route = createFileRoute("/about/principal-message")({
  head: () => ({
    meta: [
      { title: "Principal's Message — Brotherhood School" },
      { name: "description", content: "Official message and welcome note from the Principal of Brotherhood Matriculation Hr. Sec. School." },
    ],
  }),
  component: PrincipalMessagePage,
});

function PrincipalMessagePage() {
  return (
    <>
      <PageHeader
        eyebrow="Leadership Welcome"
        title="Principal's Message"
        subtitle="Read the welcome statement and educational vision from our head of school."
      />

      <section className="py-24 md:py-32 px-6 bg-[#f7faf8] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start relative">
            
            {/* Background Accent */}
            <div className="hidden lg:block absolute top-0 left-[41.666%] -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#d4af37]/20 to-transparent"></div>

            {/* Principal Photograph */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(10,43,24,0.2)] aspect-[3/4] bg-white p-2">
                <div className="w-full h-full rounded-[2rem] overflow-hidden relative group">
                  <img
                    src={principalImage}
                    alt="Dr. Joseph Raj - Principal"
                    className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#0a2b18]/10 mix-blend-multiply transition-colors duration-700 group-hover:bg-transparent"></div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-8 -right-4 md:-right-12 bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-[0_20px_40px_-15px_rgba(10,43,24,0.15)] max-w-[280px] border border-[#f1f6f3] z-10">
                <p className="font-serif text-xl md:text-2xl text-[#0a2b18] leading-tight mb-2">Dr. Joseph Raj</p>
                <p className="text-[#6c8274] text-xs uppercase tracking-wider font-semibold">M.Sc., M.Ed., Ph.D.</p>
                <div className="w-10 h-[1px] bg-[#d4af37] mt-4 mb-2"></div>
                <p className="text-[#0a2b18] text-sm font-medium uppercase tracking-widest">Principal</p>
              </div>
            </motion.div>

            {/* Principal Message */}
            <div className="lg:col-span-7 lg:pl-10 xl:pl-16 pt-12 md:pt-0">
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
                }}
                className="space-y-10"
              >
                
                <motion.div variants={fadeUp} className="relative">
                  <span className="absolute -top-16 -left-8 text-9xl font-serif text-[#d4af37]/20 leading-none select-none">"</span>
                  <p className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#0a2b18] leading-[1.2] relative z-10 text-balance italic">
                    Dear Parents, Students, and Well-Wishers,
                  </p>
                </motion.div>

                <motion.div variants={fadeUp} className="space-y-8 text-lg font-light text-[#6c8274] leading-relaxed">
                  <p>
                    <span className="text-5xl font-serif text-[#0a2b18] float-left mr-3 mt-1 leading-none italic">W</span>elcome to Brotherhood Matriculation Higher Secondary School. As we journey together in shaping the lives of young minds, we are constantly reminded of the profound responsibility that rests upon us. Our education model is designed not merely to fill classrooms with instruction, but to ignite a lifelong passion for learning, integrity, and social duty.
                  </p>
                  
                  <p>
                    Following the timeless educational philosophy of Don Bosco, we believe that education is a matter of the heart. By fostering an atmosphere of mutual trust, constructive discipline, and holistic care, we empower our students to stand tall in character and intellect.
                  </p>
                  
                  <p>
                    Through modern STEM resources, smart classrooms, sports pursuits, and active clubs, we build pathways for every student to find their unique voice and succeed in a rapidly evolving world. We invite you to join us in this noble partnership of character formation and scholastic excellence.
                  </p>
                </motion.div>

                {/* Signature Section */}
                <motion.div variants={fadeUp} className="pt-10 border-t border-[#0a2b18]/10 mt-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="font-serif text-3xl md:text-4xl text-[#0a2b18] italic font-semibold mb-2">Dr. Joseph Raj</div>
                    <div className="text-xs uppercase tracking-widest text-[#6c8274] font-semibold mb-1">Principal</div>
                    <div className="text-sm text-[#0a2b18] opacity-70">Brotherhood Matriculation Hr. Sec. School</div>
                  </div>
                  {/* Decorative Stamp */}
                  <div className="w-24 h-24 rounded-full border border-[#d4af37]/30 flex items-center justify-center shrink-0">
                    <div className="w-20 h-20 rounded-full border border-[#d4af37]/80 border-dashed animate-[spin_30s_linear_infinite] flex items-center justify-center">
                       <span className="text-[#d4af37] font-serif italic text-lg select-none">B</span>
                    </div>
                  </div>
                </motion.div>

              </motion.div>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
}
