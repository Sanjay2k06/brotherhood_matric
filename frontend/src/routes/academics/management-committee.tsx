import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { ShieldCheck, Award } from "lucide-react";
import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export const Route = createFileRoute("/academics/management-committee")({
  head: () => ({
    meta: [
      { title: "Managing Committee — Brotherhood School" },
      { name: "description", content: "Meet the executive committee and advisory board members of Brotherhood Matriculation Hr. Sec. School." },
    ],
  }),
  component: ManagementCommitteePage,
});

function FlipCard({ member, idx, isFlipped, onFlip }: { member: any, idx: number, isFlipped: boolean, onFlip: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: idx * 0.1 }}
      className="relative w-full h-[320px] cursor-pointer perspective-[1000px] group"
      onClick={onFlip}
    >
      <motion.div 
        className="w-full h-full relative [transform-style:preserve-3d] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front Side (Light) */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-white border border-[#f1f6f3] rounded-[2.5rem] p-10 shadow-[0_15px_30px_rgba(10,43,24,0.04)] flex flex-col justify-center items-center text-center group-hover:shadow-[0_20px_40px_rgba(10,43,24,0.1)] transition-shadow">
          <div className="w-16 h-16 rounded-full bg-[#f7faf8] flex items-center justify-center mb-6">
            <Award className="h-7 w-7 text-[#d4af37]" />
          </div>
          <h4 className="text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold mb-3">{member.role}</h4>
          <h3 className="font-serif text-2xl text-[#0a2b18] leading-snug">{member.name}</h3>
          
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <span className="text-[11px] uppercase tracking-widest text-[#6c8274] border-b border-[#6c8274]/20 pb-1 group-hover:text-[#1b4d32] group-hover:border-[#1b4d32]/50 transition-colors">Click to flip</span>
          </div>
        </div>

        {/* Back Side (Dark) */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#05140b] rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center shadow-2xl border border-[#1b4d32]/30 overflow-hidden">
          {/* Subtle Back Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37] rounded-full blur-[60px] opacity-[0.15] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#1b4d32] rounded-full blur-[60px] opacity-[0.2] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <ShieldCheck className="h-6 w-6 text-[#d4af37] mb-4 opacity-50" />
            <h4 className="text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold mb-4">{member.name}</h4>
            <p className="text-white/80 font-light leading-relaxed text-[15px]">{member.desc}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ManagementCommitteePage() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const members = [
    { role: "Founder & Chairman", name: "Rev. Fr. Anton Cruz", desc: "Founder and Chairman of Brotherhood Matriculation Higher Secondary School, steering the institution since 1991." },
    { role: "Chairperson", name: "Mrs. Jesintha Cruz", desc: "Chairperson of the school management, directing long-term development initiatives and holistic student care policies." },
    { role: "Vice Chairman", name: "Mr. Samuel Keithson Cruz", desc: "Vice Chairman of the school committee, focusing on technology integration and modern infrastructure upgrades." },
    { role: "Correspondent", name: "Mr. J. Jeyakumar", desc: "Correspondent of the school, overseeing daily administration, government recognitions, and compliance affairs." },
    { role: "Principal (Primary)", name: "Mrs. Helen Johnson", desc: "Principal of the Primary Wing, coordinating pre-primary and foundational primary school academic programs." },
    { role: "Principal (Higher Secondary)", name: "Mrs. Shima Newton", desc: "Principal of the Higher Secondary Wing, directing classes, board exam prep, and higher secondary streams." },
    { role: "Academic Coordinator", name: "Mr. S. Solomon Devadoss", desc: "Academic Coordinator of the school, organizing subject syllabi, smart-board lessons, and co-curricular programs." }
  ];

  return (
    <>
      <PageHeader
        eyebrow="Governance & Leadership"
        title="Managing Committee"
        subtitle="The administrative and advisory board guiding Brotherhood's development pathways."
      />

      <section className="py-24 md:py-32 px-6 bg-[#f7faf8] relative overflow-hidden">
        {/* Ambient background blur for premium feel */}
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-white rounded-full blur-[100px] opacity-60 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Intro */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="max-w-3xl mx-auto text-center space-y-8 mb-20"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-[#1b4d32]"></div>
              <span className="text-[#1b4d32] uppercase tracking-widest text-xs font-semibold">Leadership</span>
              <div className="w-12 h-[1px] bg-[#1b4d32]"></div>
            </div>
            
            <h2 className="font-serif text-4xl md:text-5xl text-[#0a2b18] leading-tight">
              Governing <span className="italic text-[#1b4d32]">Structure</span>
            </h2>
            
            <p className="text-[#6c8274] text-lg font-light leading-relaxed">
              Brotherhood School operates under the guidance of the Executive Committee of the Brotherhood Educational and Charitable Trust. The board meets quarterly to review academic achievements, facility upgrades, and teacher performance structures, ensuring alignment with our core founding values.
            </p>
          </motion.div>

          {/* 3D Flip Cards Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {members.map((m, idx) => (
              <FlipCard 
                key={m.name} 
                member={m} 
                idx={idx} 
                isFlipped={flippedIndex === idx}
                onFlip={() => setFlippedIndex(flippedIndex === idx ? null : idx)}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
