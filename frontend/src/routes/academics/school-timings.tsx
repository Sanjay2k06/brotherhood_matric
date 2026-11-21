import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { ArrowRight, Clock, Coffee, Utensils, BookOpen, Quote } from "lucide-react";
import aboutImage2 from "../../images/aboutimage2.jpg";
import { motion } from "motion/react";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export const Route = createFileRoute("/academics/school-timings")({
  head: () => ({
    meta: [
      { title: "School Timings — Brotherhood School" },
      { name: "description", content: "Daily schedule, period timings, lunch breaks, and special coaching classes timetable." },
    ],
  }),
  component: SchoolTimingsPage,
});

export function SchoolTimingsPage() {
  const [activeTab, setActiveTab] = useState<"primary" | "secondary">("primary");

  const primaryTimetable = [
    { period: "1st Period", from: "09:00 AM", to: "09:45 AM", type: "class" },
    { period: "2nd Period", from: "09:45 AM", to: "10:30 AM", type: "class" },
    { period: "Break", from: "10:30 AM", to: "10:40 AM", type: "break" },
    { period: "3rd Period", from: "10:40 AM", to: "11:25 AM", type: "class" },
    { period: "4th Period", from: "11:25 AM", to: "12:10 PM", type: "class" },
    { period: "Lunch", from: "12:10 PM", to: "12:45 PM", type: "lunch" },
    { period: "5th Period", from: "12:45 PM", to: "01:25 PM", type: "class" },
    { period: "6th Period", from: "01:25 PM", to: "02:20 PM", type: "class" },
    { period: "Break", from: "02:20 PM", to: "02:30 PM", type: "break" },
    { period: "7th Period", from: "02:30 PM", to: "03:05 PM", type: "class" },
    { period: "8th Period", from: "03:05 PM", to: "03:30 PM", type: "class" },
  ];

  const secondaryTimetable = [
    { period: "1st Period", from: "09:00 AM", to: "09:45 AM", type: "class" },
    { period: "2nd Period", from: "09:45 AM", to: "10:30 AM", type: "class" },
    { period: "Break", from: "10:30 AM", to: "10:40 AM", type: "break" },
    { period: "3rd Period", from: "10:40 AM", to: "11:25 AM", type: "class" },
    { period: "4th Period", from: "11:25 AM", to: "12:10 PM", type: "class" },
    { period: "5th Period", from: "12:10 PM", to: "12:55 PM", type: "class" },
    { period: "Lunch", from: "12:55 PM", to: "01:25 PM", type: "lunch" },
    { period: "6th Period", from: "01:25 PM", to: "02:10 PM", type: "class" },
    { period: "7th Period", from: "02:10 PM", to: "02:55 PM", type: "class" },
    { period: "8th Period", from: "02:55 PM", to: "03:40 PM", type: "class" },
  ];

  const classWiseTimings = [
    { classGroup: "STD VI to IX", timing: "08:45 AM – 03:40 PM", highlight: false },
    { classGroup: "STD X to XII", timing: "03:40 PM – 04:30 PM", highlight: true, note: "Board Exam Coaching Class" },
  ];

  const currentList = activeTab === "primary" ? primaryTimetable : secondaryTimetable;

  return (
    <>
      <PageHeader
        eyebrow="Daily Timetable"
        title="School Timings"
        subtitle="Bell structures, period schedules, breaks, and board exam coaching classes."
      />

      <section className="py-20 md:py-28 px-4 sm:px-6 bg-[#05140b] relative text-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#d4af37] rounded-full blur-[150px] opacity-[0.08] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#1b4d32] rounded-full blur-[150px] opacity-[0.1] translate-y-1/3 -translate-x-1/4"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 space-y-16">
          {/* Class-wise Timings Banner */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-white/[0.04] border border-[#d4af37]/30 rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-md"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <span className="text-[#d4af37] text-xs uppercase tracking-widest font-semibold">School Timings – Higher Secondary</span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">Class-wise School Timings</h3>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {classWiseTimings.map((item) => (
                <div
                  key={item.classGroup}
                  className={`rounded-2xl p-6 border transition-all ${
                    item.highlight
                      ? "bg-[#d4af37]/10 border-[#d4af37]/50"
                      : "bg-white/[0.02] border-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-serif text-xl sm:text-2xl text-white font-semibold">{item.classGroup}</span>
                    <Clock className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <div className="text-[#d4af37] text-lg sm:text-xl font-medium tracking-wide">{item.timing}</div>
                  {item.note && (
                    <span className="inline-block mt-3 text-xs uppercase tracking-wider text-white/80 bg-white/10 px-3 py-1 rounded-full">
                      {item.note}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Main Timetable with Tabs */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="lg:col-span-8 space-y-8"
            >
              {/* Tab Switcher */}
              <div className="flex flex-wrap items-center gap-3 p-1.5 bg-white/[0.05] border border-white/10 rounded-2xl w-fit">
                <button
                  type="button"
                  onClick={() => setActiveTab("primary")}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                    activeTab === "primary"
                      ? "bg-[#d4af37] text-[#0a2b18] shadow-lg shadow-[#d4af37]/20"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  Daily Timetable – STD 1 to 5
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("secondary")}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                    activeTab === "secondary"
                      ? "bg-[#d4af37] text-[#0a2b18] shadow-lg shadow-[#d4af37]/20"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  Daily Timetable – STD VI to IX
                </button>
              </div>

              {/* Title Header */}
              <div className="border-b border-white/10 pb-4">
                <h3 className="font-serif text-2xl sm:text-3xl text-white">
                  {activeTab === "primary" ? "Daily Timetable – STD 1 to 5" : "Daily Timetable – STD VI to IX"}
                </h3>
                <p className="text-white/60 text-sm mt-1">
                  {activeTab === "primary" ? "Primary Wing academic bell timings & recesses" : "Secondary & Higher Secondary bell timings & coaching"}
                </p>
              </div>

              {/* Timetable Table */}
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/[0.05] border-b border-white/10 text-[#d4af37] text-xs uppercase tracking-widest font-semibold">
                      <th className="py-4 px-6">Activity</th>
                      <th className="py-4 px-6">From</th>
                      <th className="py-4 px-6">To</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm sm:text-base">
                    {currentList.map((row) => {
                      const isBreak = row.type === "break";
                      const isLunch = row.type === "lunch";

                      return (
                        <tr
                          key={`${row.period}-${row.from}`}
                          className={`transition-colors ${
                            isBreak
                              ? "bg-[#d4af37]/10 text-[#d4af37] font-medium"
                              : isLunch
                              ? "bg-[#1b4d32]/30 text-[#d4af37] font-medium"
                              : "hover:bg-white/[0.02] text-white/90"
                          }`}
                        >
                          <td className="py-4 px-6 flex items-center gap-3">
                            {isBreak ? (
                              <Coffee className="w-4 h-4 text-[#d4af37] shrink-0" />
                            ) : isLunch ? (
                              <Utensils className="w-4 h-4 text-[#d4af37] shrink-0" />
                            ) : (
                              <BookOpen className="w-4 h-4 text-white/40 shrink-0" />
                            )}
                            <span className={isBreak || isLunch ? "font-serif italic text-base" : "font-medium"}>
                              {row.period}
                            </span>
                          </td>
                          <td className="py-4 px-6 font-mono text-sm tracking-wide text-white/80">{row.from}</td>
                          <td className="py-4 px-6 font-mono text-sm tracking-wide text-white/80">{row.to}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Right Column: Campus Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="lg:col-span-4"
            >
              <div className="sticky top-28 space-y-6">
                <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-2xl border border-white/10 group">
                  <img
                    src={aboutImage2}
                    alt="School Assembly and Timetable"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05140b]/90 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="font-serif text-xl mb-1">Morning Assembly</p>
                    <p className="text-xs text-white/70 uppercase tracking-widest">Punctuality & Discipline</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-white/70 space-y-2">
                  <p className="font-semibold text-white text-sm">Bell Protocol</p>
                  <p>Students are requested to be seated inside classrooms 5 minutes prior to the first bell at 08:45 AM.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Page Footer Quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pt-16 border-t border-white/10 text-center max-w-3xl mx-auto"
          >
            <Quote className="w-10 h-10 text-[#d4af37]/40 mx-auto mb-4" />
            <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-white italic leading-relaxed text-balance">
              "It is a miracle that curiosity survives formal education."
            </blockquote>
            <p className="text-[#d4af37] text-xs uppercase tracking-widest font-semibold mt-4">
              Brotherhood Matriculation Higher Secondary School
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
