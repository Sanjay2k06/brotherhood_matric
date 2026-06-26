import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Music, Play, Radio, Calendar } from "lucide-react";

export const Route = createFileRoute("/student-life/choir")({
  head: () => ({
    meta: [
      { title: "School Choir — Brotherhood School" },
      { name: "description", content: "Details about the Brotherhood School Choir, rehearsal schedules, and achievements." },
    ],
  }),
  component: ChoirPage,
});

function ChoirPage() {
  const rehearsalSchedule = [
    { day: "Tuesday", time: "3:45 PM – 4:45 PM", venue: "Music Hall A" },
    { day: "Thursday", time: "3:45 PM – 4:45 PM", venue: "Music Hall A" },
    { day: "Saturday (Pre-event)", time: "9:00 AM – 11:30 AM", venue: "Main Auditorium" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Performing Arts"
        title="School Choir"
        subtitle="Our vocal ensemble blends harmonies, choral traditions, and modern music."
      />

      <section className="max-w-5xl mx-auto px-6 py-20 space-y-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-display text-3xl text-primary font-bold">Vocal Harmony & Legacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Brotherhood School Choir is a highly regarded vocal group composed of talented singers from Classes VI through XII. Our choir performs at all school events, including our Annual Day, Christmas Pageant, and Independence Day ceremonies.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Under the guidance of professional choral directors, students are trained in breath control, vocal warm-ups, multi-part harmony (Soprano, Alto, Tenor, Bass), and pitch accuracy.
            </p>
          </div>
          <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
            <h3 className="font-display text-2xl text-primary font-bold mb-6 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gold" /> Rehearsal Schedule
            </h3>
            <div className="space-y-4">
              {rehearsalSchedule.map((sched) => (
                <div key={sched.day} className="flex justify-between border-b border-border pb-3 text-sm">
                  <div>
                    <div className="font-semibold text-foreground">{sched.day}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{sched.venue}</div>
                  </div>
                  <div className="font-medium text-primary text-right">{sched.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Choral Performances & Events with Image */}
        <div className="grid md:grid-cols-12 gap-8 items-center rounded-3xl border border-border bg-primary/5 p-8 sm:p-12 mt-12">
          <div className="md:col-span-7 text-muted-foreground leading-relaxed space-y-4">
            <h3 className="font-display text-2xl text-primary font-bold flex items-center gap-2">
              <Music className="h-6 w-6 text-gold" /> Choral Performances & Events
            </h3>
            <p>
              The choir participates in several prestigious inter-school musical competitions and choral festivals across Tamil Nadu, consistently bringing home top honors.
            </p>
            <p>
              Students learn a diverse repertoire, including classical compositions, traditional hymns, patriotic arrangements, and contemporary acoustic songs.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="relative group rounded-2xl overflow-hidden border border-gold/30 shadow-elegant bg-gradient-to-br from-navy-deep to-primary/20 flex flex-col items-center justify-center p-6 min-h-[250px] animate-float">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.7679_0.1778_81.65/0.12),transparent_65%)]" />
              <Music className="h-24 w-24 text-gold drop-shadow-[0_4px_12px_rgba(212,175,55,0.35)]" />
              <span className="text-xs tracking-widest uppercase text-white/50 mt-4 font-semibold">School Vocal Ensemble</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
