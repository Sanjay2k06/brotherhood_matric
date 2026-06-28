import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { ArrowRight, Download } from "lucide-react";
import aboutImage4 from "../../images/aboutimage4.jpeg";
import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export const Route = createFileRoute("/academics/courses-offered")({
  head: () => ({
    meta: [
      { title: "Courses Offered — Brotherhood School" },
      { name: "description", content: "XI & XII course groups, streams, and subject combinations at Brotherhood." },
    ],
  }),
  component: CoursesOfferedPage,
});

function CoursesOfferedPage() {
  const groups = [
    {
      code: "Group 2502",
      stream: "Science Stream (Computer Science)",
      subjects: [
        "Physics",
        "Chemistry",
        "Mathematics",
        "Computer Science"
      ]
    },
    {
      code: "Group 2503",
      stream: "Science Stream (Biology)",
      subjects: [
        "Physics",
        "Chemistry",
        "Mathematics",
        "Biology"
      ]
    },
    {
      code: "Group 2702",
      stream: "Commerce Stream (Computer Focus)",
      subjects: [
        "Commerce",
        "Accountancy",
        "Economics",
        "Computer Applications"
      ]
    },
    {
      code: "Group 2708",
      stream: "Commerce Stream (Math Focus)",
      subjects: [
        "Commerce",
        "Accountancy",
        "Economics",
        "Business Mathematics"
      ]
    }
  ];

  const handleDownload = () => {
    alert("Brochure download initiated successfully!");
  };

  return (
    <>
      <PageHeader
        eyebrow="Streams of Study"
        title="Courses Offered"
        subtitle="Subject combinations and group selections for Classes XI & XII."
      />

      {/* Courses Grid */}
      <section className="py-24 md:py-32 px-6 bg-[#f7faf8] text-[#0a2b18] relative overflow-hidden">
        {/* Ambient Lights */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#d4af37] rounded-full blur-[150px] opacity-[0.15] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1b4d32] rounded-full blur-[150px] opacity-[0.05] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} 
            className="mb-20 max-w-2xl"
          >
            <span className="text-[#1b4d32] uppercase tracking-widest text-xs font-semibold">Higher Secondary</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#0a2b18] mt-4 leading-tight">
              Courses Offered in <span className="italic text-[#1b4d32]">XI & XII</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
            {groups.map((group, idx) => (
              <motion.div 
                key={group.code}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: (idx % 2) * 0.1 }}
                className="group relative p-10 lg:p-14 rounded-[3rem] bg-white border border-[#f1f6f3] hover:shadow-[0_20px_40px_rgba(10,43,24,0.06)] hover:border-[#1b4d32]/20 transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Huge Background Code */}
                <div className="absolute -bottom-12 -right-8 text-9xl md:text-[180px] font-serif text-[#0a2b18]/[0.02] italic pointer-events-none group-hover:text-[#d4af37]/10 transition-colors duration-700 select-none leading-none">
                  {group.code.replace('Group ', '')}
                </div>
                
                <div className="relative z-10 flex-1">
                  <div className="flex items-center justify-between mb-10">
                     <span className="text-[#1b4d32] border border-[#1b4d32]/30 px-5 py-2 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#1b4d32]/5">{group.code}</span>
                  </div>
                  
                  <h3 className="font-serif text-3xl md:text-4xl text-[#0a2b18] mb-8 group-hover:translate-x-2 transition-transform duration-500 w-[85%] leading-snug">{group.stream}</h3>
                  
                  <div className="w-12 h-[1px] bg-[#d4af37] mb-10 group-hover:w-32 transition-all duration-700"></div>
                  
                  <ul className="space-y-5">
                    {group.subjects.map((sub, i) => (
                      <li key={sub} className="text-[#6c8274] font-light flex items-center gap-5 text-lg">
                        <span className="text-[#d4af37] font-serif italic text-sm">0{i + 1}</span>
                        <span className="group-hover:text-[#0a2b18] transition-colors duration-300">{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Split CTA Section */}
      <section className="py-24 px-6 bg-[#05140b] relative">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#d4af37] rounded-full blur-[120px] opacity-[0.1] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1b4d32] rounded-full blur-[100px] opacity-[0.1] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-0 items-stretch bg-white rounded-[3rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] overflow-hidden relative z-10">
           
           <motion.div 
             initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
             className="h-[400px] lg:h-auto relative group overflow-hidden"
           >
             <img src={aboutImage4} alt="Classroom Study" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
             <div className="absolute inset-0 bg-[#0a2b18]/10 group-hover:bg-transparent transition-colors duration-700"></div>
             <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-[#f1f6f3]">
               <p className="text-[#0a2b18] font-serif text-lg">Smart Desks & Modern Labs</p>
             </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
             className="p-10 lg:p-20 flex flex-col justify-center"
           >
             <div className="w-12 h-[1px] bg-[#d4af37] mb-8"></div>
             <h3 className="font-serif text-4xl md:text-5xl text-[#0a2b18] mb-8 leading-tight">Take the <span className="italic text-[#1b4d32]">Next Step</span></h3>
             <p className="text-[#6c8274] font-light leading-relaxed mb-12 text-lg">
               Whether you're ready to apply directly or just want to explore our brochure to learn more about our curriculum and faculty, our team is ready to guide you.
             </p>
             
             <div className="flex flex-col gap-5">
               <Link to="/admissions/apply-online" className="inline-flex items-center justify-between rounded-full bg-[#d4af37] text-[#0a2b18] hover:bg-[#0a2b18] hover:text-white px-8 py-5 text-sm font-semibold uppercase tracking-widest transition-colors duration-500 group shadow-[0_10px_20px_-10px_rgba(212,175,55,0.5)]">
                 <span>Apply Online</span>
                 <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
               </Link>
               
               <button onClick={handleDownload} className="inline-flex items-center justify-between rounded-full border border-[#0a2b18]/10 bg-transparent text-[#0a2b18] hover:bg-[#f7faf8] hover:border-[#0a2b18]/30 px-8 py-5 text-sm font-semibold uppercase tracking-widest transition-colors duration-300 group">
                 <span>Download Brochure</span>
                 <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-500" />
               </button>
             </div>
           </motion.div>
         </div>
      </section>
    </>
  );
}