import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { ArrowRight, Download, Clock } from "lucide-react";
import aboutImage2 from "../../images/aboutimage2.jpg";
import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export const Route = createFileRoute("/academics/school-timings")({
  head: () => ({
    meta: [
      { title: "School Timings — Brotherhood School" },
      { name: "description", content: "Daily schedule, period timings, lunch breaks, and special classes timetable." },
    ],
  }),
  component: SchoolTimingsPage,
});

function SchoolTimingsPage() {
  const timings = [
    { label: "Pre-KG Schedule", time: "08:45 AM – 12:00 PM", type: "event" },
    { label: "LKG Schedule", time: "08:45 AM – 12:30 PM", type: "event" },
    { label: "UKG Schedule", time: "08:45 AM – 03:00 PM", type: "event" },
    { label: "Classes I – V (Primary)", time: "08:45 AM – 03:30 PM", type: "class" },
    { label: "Classes VI – IX (Secondary)", time: "08:45 AM – 03:40 PM", type: "class" },
    { label: "Classes X – XII (Board Coaching)", time: "03:40 PM – 04:30 PM", type: "class" }
  ];

  const handleDownload = () => {
    alert("Timetable download initiated successfully!");
  };

  return (
    <>
      <PageHeader
        eyebrow="Daily Timetable"
        title="School Timings"
        subtitle="Bell structures, classes, lunch recess, and special instructions."
      />

      {/* Main Timetable Section */}
      <section className="py-24 md:py-32 px-6 bg-[#05140b] relative">
        {/* Ambient Lights - contained to prevent scrollbars without breaking sticky */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#d4af37] rounded-full blur-[150px] opacity-[0.08] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#1b4d32] rounded-full blur-[150px] opacity-[0.1] translate-y-1/3 -translate-x-1/4"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left Col: Timetable */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              className="lg:col-span-7"
            >
              <motion.div variants={fadeUp} className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-[1px] bg-[#d4af37]"></div>
                  <span className="text-[#d4af37] uppercase tracking-widest text-xs font-semibold">Standard Schedule</span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
                  Daily <span className="italic text-[#d4af37]">Timetable</span>
                </h2>
              </motion.div>

              <div className="flex flex-col">
                {timings.map((t, idx) => (
                  <motion.div 
                    key={t.label} 
                    variants={fadeUp}
                    className={`group flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-white/10 last:border-0 hover:bg-white/[0.02] transition-colors duration-500 rounded-2xl px-6 -mx-6
                      ${t.type === 'break' ? 'bg-[#1b4d32]/10 border-l-2 border-l-[#d4af37]' : ''}
                      ${t.type === 'event' ? 'bg-white/[0.03]' : ''}
                    `}
                  >
                    <div className="flex items-center gap-6 mb-2 sm:mb-0 w-full sm:w-1/2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-colors duration-500
                        ${t.type === 'break' ? 'border-[#d4af37]/30 text-[#d4af37]' : 'border-white/10 text-white/40 group-hover:border-[#d4af37]/30 group-hover:text-[#d4af37]'}
                      `}>
                         {t.type === 'break' ? <Clock className="w-4 h-4" /> : <span className="font-serif italic text-sm">{idx + 1}</span>}
                      </div>
                      <span className={`font-serif text-2xl transition-transform duration-500 group-hover:translate-x-2 
                        ${t.type === 'break' ? 'text-[#d4af37] italic' : 'text-white'}`}>
                        {t.label}
                      </span>
                    </div>
                    <div className="sm:w-1/2 sm:text-right pl-16 sm:pl-0">
                      <span className={`font-light tracking-wide text-lg transition-colors duration-500
                        ${t.type === 'break' ? 'text-white/80' : 'text-white/50 group-hover:text-white/90'}`}>
                        {t.time}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Col: Image & Actions */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
              className="lg:col-span-5 relative"
            >
              <div className="sticky top-32 space-y-8">
                {/* Image */}
                <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] group">
                  <img
                    src={aboutImage2}
                    alt="School Courtyard Entrance"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#0a2b18]/20 group-hover:bg-transparent transition-colors duration-700"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05140b]/90 via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                     <p className="font-serif text-2xl mb-1">Assembly Area</p>
                     <p className="text-sm font-light text-white/70 uppercase tracking-widest">Morning Gatherings</p>
                  </div>
                </div>

                {/* Actions Box */}
                <div className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 backdrop-blur-sm">
                   <h3 className="font-serif text-2xl text-white mb-2">Need a copy?</h3>
                   <p className="text-white/60 font-light mb-6 text-sm">Download the official schedule for your records or contact us for specific timing inquiries.</p>
                   
                   <div className="flex flex-col gap-4">
                     <button onClick={handleDownload} className="w-full inline-flex items-center justify-between rounded-full bg-[#d4af37] text-[#0a2b18] hover:bg-white px-6 py-4 text-sm font-semibold uppercase tracking-widest transition-colors duration-500 group">
                       <span>Download Timetable</span>
                       <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-500" />
                     </button>
                     <Link to="/contact/contact-us" className="w-full inline-flex items-center justify-between rounded-full border border-white/20 bg-transparent text-white hover:bg-white/[0.05] px-6 py-4 text-sm font-semibold uppercase tracking-widest transition-colors duration-300 group">
                       <span>Contact School</span>
                       <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
                     </Link>
                   </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}