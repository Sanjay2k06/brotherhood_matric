import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Trophy, ArrowRight, Quote } from "lucide-react";
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

export const Route = createFileRoute("/association/alumni")({
  head: () => ({
    meta: [
      { title: "Alumni Association — Brotherhood School" },
      { name: "description", content: "Learn about the Brotherhood School Alumni Association network, achievements, and testimonials." },
    ],
  }),
  component: AlumniPage,
});

function AlumniPage() {
  const achievements = [
    { name: "Dr. Sandeep Rajan", batch: "Batch of 2004", field: "Medical Officer, Apollo Hospitals", desc: "Leading post-graduate medical research initiatives and community clinical health drives in Chennai." },
    { name: "Mrs. Priya Srinivasan", batch: "Batch of 2008", field: "Senior Lead Engineer, Google", desc: "Developing state-of-the-art consumer applications and advocating for women in STEM careers globally." },
    { name: "Mr. Imran Khan", batch: "Batch of 2012", field: "Founder & CEO, GreenSpaces", desc: "Established a leading eco-friendly waste management startup featured in national enterprise listings." }
  ];

  const testimonials = [
    {
      quote: "The discipline, respect, and academic vigor instilled in me during my years at Brotherhood School paved the way for my medical career. It really is a family.",
      author: "Dr. Sandeep Rajan",
      desc: "Batch of 2004 · Cardiologist"
    },
    {
      quote: "At Brotherhood, I wasn't just taught standard courses; I was guided to think. The computer lab classes sparked my passion for software engineering.",
      author: "Mrs. Priya Srinivasan",
      desc: "Batch of 2008 · Tech Lead"
    }
  ];

  return (
    <div className="bg-[#fdfdfc] text-[#2d3748] font-sans selection:bg-[#0a2b18] selection:text-white">
      <PageHeader
        eyebrow="Alumni Network"
        title="Alumni Association"
        subtitle="Staying connected, celebrating alumni achievements, and supporting the school's growth."
      />

      {/* Intro Section - The Legacy */}
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
                <span className="text-[#1b4d32] uppercase tracking-[0.15em] text-xs font-bold">Heritage & Network</span>
              </div>
              
              <h2 className="font-serif text-5xl md:text-6xl text-[#0a2b18] leading-[1.15]">
                The Brotherhood <br/><span className="italic text-[#1b4d32]">Legacy</span>
              </h2>
              
              <div className="space-y-6 text-[#4a5568] font-light text-lg md:text-xl leading-[1.8]">
                <p>
                  Since our first graduating batch, Brotherhood School has sent thousands of qualified young men and women into the professional streams. The Alumni Association serves as a network to mentor current student batches, offer career seminars, and support campus infrastructure projects.
                </p>
                <p>
                  Whether you are working in technology, healthcare, public administration, or starting your own venture, you remain a key part of our motto: <span className="text-[#d4af37] italic font-medium block mt-3">"Character Formation Through Quality Education"</span>
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
                 src={aboutImage2} 
                 alt="School Alumni Meeting" 
                 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 sepia-[0.1]"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a2b18]/80 via-transparent to-transparent"></div>
               
               <div className="absolute bottom-8 left-8 right-8 flex flex-col justify-end">
                  <div className="w-12 h-[1px] bg-[#d4af37] mb-4"></div>
                  <p className="text-white font-serif text-2xl md:text-3xl mb-1">Annual Alumni Assembly</p>
                  <p className="text-[#d4af37] uppercase tracking-widest text-[10px] font-bold">Courtyard Network Event</p>
               </div>
             </div>
           </motion.div>
         </div>
      </section>

      {/* Hall of Fame / Achievements */}
      <section className="py-24 md:py-32 px-6 relative bg-[#fdfdfc]">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} 
            className="text-center max-w-3xl mx-auto mb-20 space-y-6"
          >
             <h2 className="font-serif text-4xl md:text-5xl text-[#0a2b18]">
               Hall of <span className="italic text-[#1b4d32]">Fame</span>
             </h2>
             <div className="w-16 h-[1px] bg-[#d4af37] mx-auto"></div>
             <p className="text-[#718096] font-light text-lg">Celebrating the extraordinary achievements of our global alumni.</p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} 
            className="grid md:grid-cols-3 gap-8 lg:gap-12"
          >
            {achievements.map((item, idx) => (
              <motion.div 
                key={item.name} 
                variants={fadeUp} 
                className="relative group p-10 lg:p-12 rounded-[2.5rem] bg-white border border-[#f1f6f3] shadow-[0_15px_40px_-15px_rgba(10,43,24,0.04)] hover:shadow-[0_20px_50px_-15px_rgba(10,43,24,0.12)] hover:-translate-y-2 transition-all duration-700 overflow-hidden flex flex-col justify-between h-full"
              >
                {/* Number Watermark */}
                <div className="absolute -top-10 -right-10 text-[180px] font-serif text-[#f4f7f5] group-hover:text-[#d4af37]/5 transition-colors duration-500 pointer-events-none select-none leading-none">
                  0{idx + 1}
                </div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-[#f4f7f5] border border-[#e2e8f0] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-700">
                    <Trophy className="h-6 w-6 text-[#d4af37]" />
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-[#0a2b18] mb-3">{item.name}</h3>
                  <p className="text-[#1b4d32] uppercase tracking-[0.15em] text-[10px] font-bold mb-6">{item.batch} · {item.field}</p>
                  
                  <div className="w-8 h-[1px] bg-[#e2e8f0] mb-6 group-hover:w-16 transition-all duration-700"></div>
                  
                  <p className="text-[#718096] font-light leading-relaxed text-[15px]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 px-6 relative bg-[#f7faf8] overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-white rounded-full blur-[100px] -translate-y-1/2 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} 
            className="text-center max-w-3xl mx-auto mb-20 space-y-6"
          >
             <h2 className="font-serif text-4xl md:text-5xl text-[#0a2b18]">
               Alumni <span className="italic text-[#1b4d32]">Voices</span>
             </h2>
             <div className="w-12 h-[1px] bg-[#d4af37] mx-auto"></div>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} 
            className="grid lg:grid-cols-2 gap-8 lg:gap-16"
          >
            {testimonials.map((test, index) => {
              // Extract the initial for the avatar (e.g. "S" from "Dr. Sandeep Rajan")
              const nameParts = test.author.split(' ');
              const initial = nameParts[nameParts.length - 1]?.charAt(0) || test.author.charAt(0);
              
              return (
                <motion.div 
                  key={index} 
                  variants={fadeUp} 
                  className="relative p-10 md:p-12 bg-white rounded-[3rem] shadow-[0_20px_50px_-20px_rgba(10,43,24,0.06)] border border-[#f1f6f3] group hover:border-[#d4af37]/30 hover:shadow-2xl transition-all duration-500"
                >
                  <Quote className="absolute top-12 right-12 h-20 w-20 text-[#f4f7f5] group-hover:text-[#d4af37]/10 transition-colors duration-500 select-none pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="w-8 h-[1px] bg-[#d4af37] mb-8"></div>
                    <blockquote className="font-serif text-[#2d3748] text-xl md:text-2xl leading-[1.8] italic mb-10">
                      "{test.quote}"
                    </blockquote>
                    
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-full bg-[#1b4d32] flex items-center justify-center">
                         <span className="font-serif text-white text-xl">{initial}</span>
                      </div>
                      <div>
                        <div className="font-serif text-xl text-[#0a2b18]">{test.author}</div>
                        <div className="text-[11px] uppercase tracking-[0.2em] text-[#d4af37] font-bold mt-1.5">{test.desc}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} 
          className="max-w-5xl mx-auto"
        >
          <div className="bg-[#05140b] rounded-[3rem] p-12 md:p-16 lg:p-24 relative overflow-hidden group text-center shadow-[0_40px_80px_-20px_rgba(5,20,11,0.6)]">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#d4af37_0%,transparent_60%)] opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-1000 pointer-events-none"></div>
             
             <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
               <span className="text-[#d4af37] uppercase tracking-[0.25em] text-[11px] font-bold block mb-5">Join the Registry</span>
               <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight">
                 Are you a Brotherhood graduate?
               </h3>
               
               <p className="text-white/70 font-light leading-[1.8] text-lg mb-12">
                 Register your profile with the digital alumni portal to network with peers, share job opportunities, and mentor senior school batches.
               </p>

               <Link
                 to="/association/registration"
                 className="inline-flex items-center gap-4 rounded-full bg-transparent border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#05140b] font-bold uppercase tracking-widest text-xs px-10 py-5 transition-all duration-500 group/btn"
               >
                 Access Alumni Portal <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
               </Link>
             </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
