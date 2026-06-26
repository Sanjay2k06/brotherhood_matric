import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Clock, Phone, Download, FileEdit } from "lucide-react";
import aboutImage2 from "../../images/aboutimage2.jpg";

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
    { label: "I Bell", time: "8:40 AM" },
    { label: "II Bell", time: "8:50 AM" },
    { label: "Assembly", time: "8:50 AM to 9:00 AM" },
    { label: "1st Period", time: "9:00 AM to 9:40 AM" },
    { label: "2nd Period", time: "9:40 AM to 10:20 AM" },
    { label: "Break", time: "10:20 AM to 10:30 AM" },
    { label: "3rd Period", time: "10:30 AM to 11:10 AM" },
    { label: "4th Period", time: "11:10 AM to 11:50 AM" },
    { label: "5th Period", time: "11:50 AM to 12:30 PM" },
    { label: "Lunch", time: "12:30 PM to 01:00 PM" },
    { label: "6th Period", time: "01:00 PM to 01:40 PM" },
    { label: "7th Period", time: "01:40 PM to 02:20 PM" },
    { label: "8th Period", time: "02:30 PM to 03:00 PM" },
    { label: "9th Period", time: "03:00 PM to 03:40 PM" },
    { label: "Special Classes", time: "After 03:40 PM" },
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

      <section className="max-w-7xl mx-auto px-6 py-20 space-y-12">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-card border border-border rounded-3xl p-8 sm:p-12 shadow-sm">
            <div className="flex items-center gap-3 border-b border-border pb-6 mb-8">
              <Clock className="h-6 w-6 text-gold" />
              <h2 className="font-display text-2xl text-primary font-bold">Standard Daily Timetable</h2>
            </div>

            <div className="divide-y divide-border">
              {timings.map((t) => (
                <div key={t.label} className="py-3.5 flex justify-between items-center text-sm sm:text-base">
                  <span className="font-medium text-foreground">{t.label}</span>
                  <span className="font-semibold text-primary">{t.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 relative group img-hover-effect rounded-3xl overflow-hidden shadow-elegant border border-border">
            <img
              src={aboutImage2}
              alt="School Courtyard Entrance"
              className="w-full h-[620px] object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 bg-navy-deep/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur">
              School Hours Assembly Area
            </div>
          </div>
        </div>

        {/* Timings Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/contact/contact-us"
            className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary/95 px-6 py-3.5 text-sm font-semibold text-white transition duration-300"
          >
            <Phone className="h-4 w-4 text-gold" /> Contact School
          </Link>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card hover:bg-muted px-6 py-3.5 text-sm font-semibold text-foreground transition duration-300"
          >
            <Download className="h-4 w-4 text-gold" /> Download Timetable
          </button>

          <Link
            to="/admissions/enquiry-form"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3.5 text-sm font-semibold text-navy-deep hover:opacity-95 shadow-gold transition duration-300"
          >
            <FileEdit className="h-4 w-4" /> Enquire Now
          </Link>
        </div>
      </section>
    </>
  );
}