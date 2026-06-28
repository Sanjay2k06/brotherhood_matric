import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { ArrowRight, Info } from "lucide-react";
import aboutImage2 from "../../images/aboutimage2.jpg";
import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export const Route = createFileRoute("/academics/admission")({
  head: () => ({
    meta: [
      { title: "Admission Process — Brotherhood School" },
      { name: "description", content: "Overview of admissions guidelines, timelines, and registration details at Brotherhood School." },
    ],
  }),
  component: AcademicsAdmissionPage,
});

function AcademicsAdmissionPage() {
  const steps = [
    {
      num: "01",
      title: "Registration",
      desc: "Fill out the online Enquiry Form or register via the Admissions Portal to initiate your interest.",
    },
    {
      num: "02",
      title: "Interaction",
      desc: "An informal interactive session with parents and candidate to understand learning background and values.",
    },
    {
      num: "03",
      title: "Verification",
      desc: "Submission and verification of Birth Certificate, Transfer Certificate, and previous academic transcripts.",
    },
    {
      num: "04",
      title: "Enrollment",
      desc: "Confirmation of admission and payment of standard term fees to secure enrollment.",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Enrollment Pathways"
        title="Admission Process"
        subtitle="Step-by-step guidance on securing a place for your child at Brotherhood."
      />

      <section className="py-24 md:py-32 px-6 bg-[#f7faf8] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* Detailed Guidelines */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
              className="lg:col-span-7 space-y-10"
            >
              <motion.div variants={fadeUp} className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-[1px] bg-[#1b4d32]"></div>
                  <span className="text-[#1b4d32] uppercase tracking-widest text-xs font-semibold">Guidelines</span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl text-[#0a2b18] leading-tight">
                  General <span className="italic text-[#1b4d32]">Admissions</span> Criteria
                </h2>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-6 text-lg font-light text-[#6c8274] leading-relaxed border-l-2 border-[#1b4d32]/20 pl-6 md:pl-10">
                <p>
                  Admissions at Brotherhood Matriculation Higher Secondary School are conducted in compliance with standard regulations and availability of seats. We prioritize value-based character formation, and we encourage parents who share our vision of moral integrity and academic discipline to apply.
                </p>
                <p>
                  Admissions are open from Pre-KG up to Class XI. Choice of specialized streams in Class XI (Science with Biology/Computer Science or Commerce with Computer Applications/Business Maths) is offered based on previous Class X board performance and counseling.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_15px_40px_-15px_rgba(10,43,24,0.1)] border border-[#f1f6f3] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-bl-full transition-transform duration-700 group-hover:scale-150"></div>
                <div className="flex flex-col sm:flex-row gap-6 relative z-10">
                  <div className="w-14 h-14 rounded-full bg-[#f7faf8] flex items-center justify-center shrink-0 border border-[#f1f6f3]">
                     <Info className="h-6 w-6 text-[#d4af37]" />
                  </div>
                  <div className="space-y-6 w-full">
                    <p className="font-serif text-2xl text-[#0a2b18]">Age Criteria <span className="text-base text-[#6c8274] font-sans font-light block sm:inline sm:ml-2 mt-1 sm:mt-0">(as on June 1st)</span></p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                       <div className="bg-[#f7faf8] px-5 py-4 rounded-xl border border-[#0a2b18]/5">
                         <div className="text-xs text-[#6c8274] uppercase tracking-wider mb-2">Pre-KG</div>
                         <div className="font-serif text-[#0a2b18] text-xl">2.5 Yrs +</div>
                       </div>
                       <div className="bg-[#f7faf8] px-5 py-4 rounded-xl border border-[#0a2b18]/5">
                         <div className="text-xs text-[#6c8274] uppercase tracking-wider mb-2">LKG</div>
                         <div className="font-serif text-[#0a2b18] text-xl">3 Yrs +</div>
                       </div>
                       <div className="bg-[#f7faf8] px-5 py-4 rounded-xl border border-[#0a2b18]/5">
                         <div className="text-xs text-[#6c8274] uppercase tracking-wider mb-2">Class I</div>
                         <div className="font-serif text-[#0a2b18] text-xl">5.5 Yrs +</div>
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Visual Grid / Illustration box */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-2xl group">
                <img
                  src={aboutImage2}
                  alt="School Admissions Counter"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#0a2b18]/10 group-hover:bg-transparent transition-colors duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a2b18]/90 via-[#0a2b18]/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                   <p className="font-serif text-3xl mb-1">Campus Visit</p>
                   <p className="text-sm font-light text-white/80 uppercase tracking-widest">& Counseling Block</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Steps to Admissions */}
      <section className="py-24 md:py-32 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center space-y-4 max-w-2xl mx-auto mb-20"
          >
            <span className="text-[#1b4d32] uppercase tracking-widest text-xs font-semibold">Your Journey Begins</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#0a2b18]">Enrollment Process</h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="group relative p-8 rounded-[2.5rem] bg-[#f7faf8] border border-[#f1f6f3] hover:shadow-[0_20px_40px_rgba(10,43,24,0.06)] transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col"
              >
                <div className="absolute -right-6 -top-6 text-9xl font-serif text-[#0a2b18]/5 italic pointer-events-none group-hover:text-[#d4af37]/10 transition-colors duration-500">
                  {step.num}
                </div>
                <div className="relative z-10 flex-1">
                  <div className="w-14 h-14 rounded-full border border-[#d4af37]/30 flex items-center justify-center mb-8 font-serif text-[#d4af37] text-xl bg-white shadow-sm group-hover:bg-[#0a2b18] group-hover:text-white group-hover:border-[#0a2b18] transition-all duration-500">
                    {step.num}
                  </div>
                  <h3 className="font-serif text-2xl text-[#0a2b18] mb-4">{step.title}</h3>
                  <p className="text-[#6c8274] font-light leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Callouts */}
      <section className="py-24 px-6 bg-white">
         <div className="max-w-6xl mx-auto relative rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(10,43,24,0.3)] bg-[#05140b]">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#d4af37] rounded-full blur-[120px] opacity-[0.15] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1b4d32] rounded-full blur-[100px] opacity-20 translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
           
           <div className="relative z-10 px-8 py-20 md:py-24 text-center flex flex-col items-center">
             <h3 className="font-serif text-4xl md:text-5xl text-white mb-6 text-balance">Ready to begin your application?</h3>
             <p className="text-white/70 max-w-2xl mx-auto text-lg font-light mb-12 text-balance leading-relaxed">
               Complete our digital application form or schedule a tour of our Neelankarai campus to discuss standard-setting education pathways.
             </p>
             <div className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto">
               <Link
                 to="/admissions/apply-online"
                 className="inline-flex items-center justify-center gap-3 rounded-full bg-[#d4af37] text-[#0a2b18] hover:bg-white font-semibold px-8 py-4 transition-colors duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
               >
                 Apply Online <ArrowRight className="h-5 w-5" />
               </Link>
               <Link
                 to="/admissions/enquiry-form"
                 className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10 px-8 py-4 transition-colors duration-300"
               >
                 Inquire Now
               </Link>
             </div>
           </div>
         </div>
      </section>
    </>
  );
}
