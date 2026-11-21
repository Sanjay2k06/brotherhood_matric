import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { motion } from "motion/react";
import antonPhoto from "../../images/father_anton_cruz.jpg";
import correspondentPhoto from "../../images/correspondent_image.jpeg";
import shimaPhoto from "../../images/Shima Picture corrected (1).jpeg";
import helenPhoto from "../../images/principal_primary_halen.jpeg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export const Route = createFileRoute("/academics/management-committee")({
  head: () => ({
    meta: [
      { title: "The Managing Committee — Brotherhood School" },
      { name: "description", content: "Meet the executive managing committee and governing members of Brotherhood Matriculation Hr. Sec. School." },
    ],
  }),
  component: ManagementCommitteePage,
});

export function ManagementCommitteePage() {
  const committeeMembers = [
    {
      name: "Rev. M. Anton Cruz",
      designation: "Founder / Chairman",
      image: antonPhoto,
      initials: "AC",
    },
    {
      name: "Mrs. Jesintha Cruz",
      designation: "Chairperson",
      image: null,
      initials: "JC",
    },
    {
      name: "Mr. Samuel Keithson Cruz",
      designation: "Vice Chairman",
      image: null,
      initials: "SC",
    },
    {
      name: "Mr. J. Jeyakumar",
      designation: "Correspondent",
      image: correspondentPhoto,
      initials: "JJ",
    },
    {
      name: "Ms. Shima Newton",
      designation: "Principal (Hr. Sec.)",
      image: shimaPhoto,
      initials: "SN",
    },
    {
      name: "Mrs. Helen Johnson",
      designation: "Principal (Primary)",
      image: helenPhoto,
      initials: "HJ",
    },
    {
      name: "Mr. S. Solomon Devadoss",
      designation: "Academic Co-ordinator",
      image: null,
      initials: "SD",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Governance & Leadership"
        title="The Managing Committee"
        subtitle="The administrative and governing body of Brotherhood Matriculation Higher Secondary School."
      />

      <section className="py-20 md:py-28 px-4 sm:px-6 bg-[#f7faf8] text-[#0a2b18] relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10 space-y-12">
          {/* Header intro */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-[1px] bg-[#d4af37]"></div>
              <span className="text-[#d4af37] text-xs uppercase tracking-widest font-semibold">Leadership Roster</span>
              <div className="w-10 h-[1px] bg-[#d4af37]"></div>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0a2b18]">
              The Managing <span className="italic text-[#1b4d32]">Committee</span>
            </h2>
            <p className="text-[#6c8274] text-sm sm:text-base font-light leading-relaxed">
              Brotherhood School operates under the direction of the Managing Committee of the Brotherhood Educational and Charitable Trust, dedicated to academic excellence, discipline, and moral values.
            </p>
          </motion.div>

          {/* Committee Card Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {committeeMembers.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-white rounded-[2rem] border border-[#e2e8f0] p-8 shadow-sm hover:shadow-xl hover:border-[#d4af37]/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center group relative overflow-hidden"
              >
                {/* Background ambient corner glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4af37]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#d4af37]/20 transition-all duration-500"></div>

                {/* Logo-format circular image placeholder */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-white border-2 border-[#d4af37]/50 shadow-md group-hover:scale-105 group-hover:border-[#d4af37] transition-all duration-300 flex items-center justify-center overflow-hidden mb-6 shrink-0">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0a2b18] to-[#1b4d32] text-[#d4af37] flex items-center justify-center font-serif font-bold text-lg sm:text-xl tracking-wider">
                      <span>{member.initials}</span>
                    </div>
                  )}
                </div>

                {/* Member Name */}
                <h3 className="font-serif text-xl sm:text-2xl text-[#0a2b18] font-bold mb-3 leading-snug group-hover:text-[#1b4d32] transition-colors">
                  {member.name}
                </h3>

                {/* Subtle divider */}
                <div className="w-8 h-[1.5px] bg-[#d4af37] mb-4 group-hover:w-16 transition-all duration-300"></div>

                {/* Designation badge */}
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#d4af37]/15 text-[#0a2b18] border border-[#d4af37]/30 group-hover:bg-[#d4af37] group-hover:text-white transition-colors duration-300">
                  {member.designation}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
