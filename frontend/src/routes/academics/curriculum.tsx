import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { ArrowRight } from "lucide-react";
import aboutImage4 from "../../images/aboutimage4.jpeg";
import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export const Route = createFileRoute("/academics/curriculum")({
  head: () => ({
    meta: [
      { title: "Curriculum Details — Brotherhood School" },
      { name: "description", content: "Learn about the Tamil Nadu State Board Matriculation curriculum structure, evaluation system, and academic programs." },
    ],
  }),
  component: CurriculumPage,
});

function CurriculumPage() {
  const sectionsList = [
    {
      title: "Foundational",
      subtitle: "Pre-KG to UKG",
      desc: "Focus on fine motor skills, language development, basic numeracy, sensory play, and social interaction through activities inspired by standard early childhood methodologies.",
    },
    {
      title: "Primary",
      subtitle: "Classes I to V",
      desc: "Comprehensive study of Mathematics, English language and grammar, Tamil/Hindi languages, Environmental Studies, Computer Science, Drawing, Value Education, and physical training.",
    },
    {
      title: "Secondary",
      subtitle: "Classes VI to X",
      desc: "Deeper academic study focused on advanced Maths, Physics, Chemistry, Biology, Social Sciences (History & Geography), English Prose & Grammar, Languages (Tamil/Hindi), and Coding basics.",
    },
    {
      title: "Higher Secondary",
      subtitle: "Classes XI & XII",
      desc: "Specialized streams targeting competitive board and university entry levels. We offer double-track groups in Science and Commerce streams.",
    }
  ];

  const streams = [
    {
      group: "Group 2502: Science + CS",
      subjects: "Mathematics, Physics, Chemistry, Computer Science, English, Language (Tamil/Hindi).",
      careers: "Engineering, Computing, Data Science, Technology fields.",
    },
    {
      group: "Group 2503: Science + Biology",
      subjects: "Mathematics, Physics, Chemistry, Biology (Botany & Zoology), English, Language (Tamil/Hindi).",
      careers: "Medicine, Biotechnology, Agriculture, Allied Health Sciences.",
    },
    {
      group: "Group 2702: Commerce + Computer Apps",
      subjects: "Accountancy, Commerce, Economics, Computer Applications, English, Language (Tamil/Hindi).",
      careers: "Business Management, Finance, IT Applications, Entrepreneurship.",
    },
    {
      group: "Group 2708: Commerce + Business Maths",
      subjects: "Accountancy, Commerce, Economics, Business Mathematics & Statistics, English, Language (Tamil/Hindi).",
      careers: "Chartered Accountancy (CA), Actuarial Science, Financial Analytics.",
    }
  ];

  return (
    <>
      <PageHeader
        eyebrow="Academic Syllabus"
        title="Curriculum Details"
        subtitle="A balanced academic structure aligning standard-setting education with moral values."
      />

      {/* Intro Section */}
      <section className="py-24 md:py-32 px-6 bg-[#f7faf8] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
              className="lg:col-span-7 space-y-10"
            >
              <motion.div variants={fadeUp} className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-[1px] bg-[#1b4d32]"></div>
                  <span className="text-[#1b4d32] uppercase tracking-widest text-xs font-semibold">Affiliation</span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl text-[#0a2b18] leading-tight">
                  Academic Syllabus & <span className="italic text-[#1b4d32]">Curriculum</span>
                </h2>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-8 text-lg font-light text-[#6c8274] leading-relaxed border-l-2 border-[#1b4d32]/20 pl-6 md:pl-10">
                <p>
                  <span className="text-4xl font-serif text-[#0a2b18] float-left mr-3 mt-1 leading-none italic">B</span>rotherhood Matriculation Higher Secondary School is recognized by the Government of Tamil Nadu and follows the Matriculation School curriculum for lower levels, culminating in the Tamil Nadu State Board Syllabus for classes X, XI, and XII.
                </p>
                <p>
                  We implement a student-centric learning model where teacher instruction is paired with hands-on lab experiments, interactive smart-class modules, and remedial sessions. Equal emphasis is placed on formative quizzes, term exams, and project submissions to measure conceptual clarity.
                </p>
              </motion.div>
            </motion.div>

            {/* Visual Box */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-[0_20px_40px_-15px_rgba(10,43,24,0.2)] group">
                <img
                  src={aboutImage4}
                  alt="School Science Lab Experiments"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#0a2b18]/10 group-hover:bg-transparent transition-colors duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a2b18]/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                   <p className="font-serif text-2xl mb-1">Practical Learning</p>
                   <p className="text-sm font-light text-white/80 uppercase tracking-widest">Science Laboratory</p>
                </div>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Grade Segments - Dark Cinematic Layout */}
      <section className="py-24 md:py-32 bg-[#05140b] text-white px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#d4af37] rounded-full blur-[150px] opacity-[0.07] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#1b4d32] rounded-full blur-[150px] opacity-[0.1] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="mb-20 max-w-2xl"
          >
            <span className="text-[#d4af37] uppercase tracking-widest text-xs font-semibold">Educational Journey</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white mt-4 leading-tight">
              Grade Segment <span className="italic text-[#d4af37]">Structures</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {sectionsList.map((sec, idx) => (
              <motion.div
                key={sec.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="relative group p-10 lg:p-14 rounded-[3rem] bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden flex flex-col"
              >
                <div className="absolute -top-6 -right-6 text-9xl font-serif text-white/5 italic pointer-events-none group-hover:text-[#d4af37]/10 transition-colors duration-500">
                  0{idx + 1}
                </div>
                
                <div className="relative z-10 flex-1">
                  <span className="text-[#d4af37] border border-[#d4af37]/30 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-semibold mb-8 inline-block">{sec.subtitle}</span>
                  <h3 className="font-serif text-3xl md:text-4xl text-white mb-6 group-hover:translate-x-2 transition-transform duration-500">{sec.title}</h3>
                  <div className="w-12 h-[1px] bg-[#d4af37]/50 mb-8 group-hover:w-24 transition-all duration-500"></div>
                  <p className="text-white/60 text-lg font-light leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                    {sec.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Higher Secondary Streams Minimalist List */}
      <section className="py-24 md:py-32 px-6 bg-white border-t border-[#f1f6f3]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="mb-16 md:mb-24 text-center max-w-2xl mx-auto"
          >
            <span className="text-[#1b4d32] uppercase tracking-widest text-xs font-semibold">Specializations</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#0a2b18] mt-4 mb-4">Higher Secondary Streams</h2>
            <p className="text-[#6c8274] font-light">Class XI and XII students choose from four specialized streams to match their professional career aspirations.</p>
          </motion.div>

          <div className="flex flex-col gap-6 max-w-5xl mx-auto">
            {streams.map((stream, idx) => (
              <motion.div
                key={stream.group}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group p-8 md:p-10 rounded-[2.5rem] bg-[#f7faf8] border border-[#f1f6f3] hover:shadow-[0_15px_30px_rgba(10,43,24,0.06)] hover:-translate-y-1 transition-all duration-500 flex flex-col lg:flex-row gap-8 lg:items-center"
              >
                <div className="lg:w-1/3 shrink-0">
                  <h3 className="font-serif text-2xl text-[#0a2b18] mb-2">{stream.group}</h3>
                  <div className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">Ideal for: {stream.careers.split(',')[0]}</div>
                </div>
                
                <div className="lg:w-2/3 border-l-0 lg:border-l border-[#0a2b18]/10 pt-6 lg:pt-0 lg:pl-8">
                  <p className="text-[#6c8274] font-light text-lg leading-relaxed">
                    <strong className="text-[#0a2b18] font-medium block mb-2 text-sm uppercase tracking-wider">Syllabus Subjects</strong>
                    {stream.subjects}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
