import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import heroImage2 from "../images/aboutimage2.jpg";
import heroImageStatic from "../images/aboutimage4.jpeg";
import { BookOpen, Sparkles, ArrowRight, Phone, ChevronRight, Calendar, Clock, Megaphone } from "lucide-react";
import BlurText from "@/components/BlurText";
import { useScrollReveal } from "../hooks/useScrollReveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brotherhood Matriculation Hr. Sec. School — Chennai" },
      { name: "description", content: "Shaping future leaders since 1991. Character formation through quality education — Pre-KG to XII, Neelankarai, Chennai." },
      { property: "og:title", content: "Brotherhood Matriculation Hr. Sec. School" },
      { property: "og:description", content: "Empowering students with knowledge, discipline, innovation, and values since 1991." },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [latestEvents, setLatestEvents] = useState<any[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  const defaultUpcoming = [
    { date: "June 25, 2026", title: "Inaugural School Assembly", desc: "Welcoming candidate intakes for the 2026-27 term with blessings and values orientation." },
    { date: "July 12, 2026", title: "Inter-House Debate Cup", desc: "Red, Blue, Green, and Gold house debate groups contesting public speaking topics." },
    { date: "August 15, 2026", title: "Independence Day Parade", desc: "March past from Scouts & Guides, Road Safety Patrol cadets, and national flag ceremonies." }
  ];

  const defaultLatest = [
    { date: "May 20, 2026", title: "Board Examination Results", desc: "Announcing standard-setting 100% pass results with record centum holders in Maths and Chemistry." },
    { date: "April 15, 2026", title: "Science & Robotics Exhibition", desc: "STEM project models, robot pathfinders, and math models presented by senior batches." }
  ];

  const defaultAnnouncements = [
    { title: "Emergency Drill", message: "Tomorrow morning at 10 AM." },
    { title: "Admissions Open 2026-2027", message: "Registrations are currently open for all streams. Contact the admin office for details." }
  ];

  useEffect(() => {
    // Announcements
    fetch("http://127.0.0.1:8000/api/announcements/")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : (data.results || []);
        const active = list.filter((a: any) => a.status === "Active");
        setAnnouncements(active.length > 0 ? active : defaultAnnouncements);
      })
      .catch((err) => {
        console.error("Error fetching announcements:", err);
        setAnnouncements(defaultAnnouncements);
      });

    // Events
    fetch("http://127.0.0.1:8000/api/events/")
      .then((res) => res.json())
      .then((data) => {
        const eventsList = Array.isArray(data) ? data : (data.results || []);
        if (eventsList.length > 0) {
          const todayStr = new Date().toISOString().split("T")[0];
          
          const upcoming = eventsList
            .filter((ev: any) => ev.event_date > todayStr && ev.status === "Published")
            .map((ev: any) => ({
              date: new Date(ev.event_date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
              title: ev.title,
              desc: ev.description
            }));
            
          const latest = eventsList
            .filter((ev: any) => ev.event_date <= todayStr && ev.status === "Published")
            .map((ev: any) => ({
              date: new Date(ev.event_date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
              title: ev.title,
              desc: ev.description
            }));

          setUpcomingEvents(upcoming.length > 0 ? upcoming : defaultUpcoming);
          setLatestEvents(latest.length > 0 ? latest : defaultLatest);
        } else {
          setUpcomingEvents(defaultUpcoming);
          setLatestEvents(defaultLatest);
        }
        setEventsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events on homepage:", err);
        setUpcomingEvents(defaultUpcoming);
        setLatestEvents(defaultLatest);
        setEventsLoading(false);
      });
  }, []);

  return (
    <>
      <Hero announcements={announcements} />
      <Stats />
      <About />
      <Academics />
      <EventsTimeline upcomingEvents={upcomingEvents} latestEvents={latestEvents} loading={eventsLoading} />
      <Testimonial />
      <CTA />
    </>
  );
}

function Hero({ announcements }: { announcements: any[] }) {
  return (
    <section className="relative h-[80vh] sm:h-[85vh] md:h-[90vh] w-full overflow-hidden -mt-16 bg-navy-deep flex items-center pt-16">
      {/* Background Image */}
      <img
        src={heroImageStatic}
        alt="Brotherhood School Campus"
        className="absolute inset-0 w-full h-full object-cover animate-kenburns"
      />

      {/* Elegant overlays to guarantee readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy-deep/75 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-black/25 z-10" />

      {/* Floating Announcement Bar */}
      {announcements && announcements.length > 0 && (
        <div className="absolute top-[88px] sm:top-[96px] md:top-[104px] left-1/2 -translate-x-1/2 w-full max-w-5xl px-6 z-30 animate-fade-up">
          <div className="backdrop-blur-md bg-white/10 border border-white/10 rounded-full shadow-lg flex items-center py-2 px-4 group overflow-hidden gap-4">
            {/* Label Badge */}
            <div className="inline-flex shrink-0 items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A017] text-white text-xs font-bold uppercase tracking-wider shadow-sm select-none">
              <Megaphone className="h-3.5 w-3.5 text-white animate-pulse" />
              <span>Important Notice</span>
            </div>
            
            {/* Scrolling Marquee */}
            <div className="flex-1 overflow-hidden relative h-6 flex items-center">
              <div className="absolute whitespace-nowrap animate-marquee flex gap-12 text-sm text-white font-medium group-hover:[animation-play-state:paused] cursor-pointer">
                {announcements.map((a, i) => (
                  <span key={a.id || i} className="inline-flex items-center gap-2">
                    <span className="text-[#D4A017] font-semibold uppercase tracking-wider">{a.title}:</span>
                    <span>{a.message}</span>
                    {i < announcements.length - 1 && <span className="text-white/40 mx-4">|</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-white pt-12">
        <div className="max-w-2xl space-y-6 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4A017] to-[#F3C23C] text-white text-xs font-semibold uppercase tracking-wider shadow-md hover:scale-[1.03] transition-all duration-300 cursor-default select-none max-w-fit">
            <Sparkles className="h-3.5 w-3.5 text-white animate-pulse" />
            <span>Admissions Open 2026-2027</span>
          </div>
          
          <div className="space-y-2">
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.15] drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
              Brotherhood <br />
              <span className="text-transparent bg-clip-text bg-gradient-gold">School</span>
            </h1>
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#D4A017] font-bold opacity-95">
              Matriculation Higher Secondary School
            </p>
          </div>
          
          <p className="text-base sm:text-lg text-white/90 leading-relaxed font-medium text-balance max-w-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
            Shaping future leaders through academic excellence, character formation, and values since 1991.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button asChild size="lg" className="rounded-full bg-gradient-gold text-navy-deep hover:opacity-95 font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] border border-white/10 px-8 py-6">
              <Link to="/admissions/apply-online">Apply Online</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white hover:text-navy-deep transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] px-8 py-6">
              <Link to="/contact"><Phone className="h-4 w-4 mr-2" /> Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const { ref, hasRevealed } = useScrollReveal();
  const items = [
    { v: "5000+", l: "Students Educated" },
    { v: "200+", l: "Faculty Members" },
    { v: "34", l: "Years of Excellence" },
    { v: "100%", l: "Board Pass Rate" },
  ];
  return (
    <section ref={ref as any} className={`bg-muted/40 border-y border-border transition-all duration-1000 transform ${hasRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((i) => (
          <div key={i.l} className="text-center">
            <div className="font-display text-4xl md:text-5xl text-primary font-semibold">{i.v}</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{i.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  const { ref, hasRevealed } = useScrollReveal();
  return (
    <section ref={ref as any} className={`max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-14 items-center transition-all duration-1000 transform ${hasRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div>
        <div className="text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-4">
          <BlurText text="About the School" animateBy="letters" delay={10} direction="bottom" />
        </div>
        <h2 className="font-display text-4xl md:text-5xl text-primary mb-6 text-balance">
          <BlurText text="A legacy of character, scholarship and service." animateBy="words" delay={25} direction="top" />
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Founded in 1991, Brotherhood Matriculation Higher Secondary School has grown into one of Chennai's most respected institutions — blending rigorous academics with timeless Christian values and the inspiration of Don Bosco's educational philosophy.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-8">
          From Pre-KG to Class XII, our students discover their voice, master their craft, and prepare to lead in a rapidly changing world.
        </p>
        <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          <Link to="/about">Read our story <ChevronRight className="h-4 w-4 ml-1" /></Link>
        </Button>
      </div>
      <div className="relative">
        <div
          className="aspect-[4/5] rounded-2xl bg-cover bg-center shadow-elegant"
          style={{ backgroundImage: `url(${heroImage2})` }}
        />
        <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-elegant max-w-[220px]">
          <div className="text-gold text-xs uppercase tracking-widest mb-1">Our Motto</div>
          <div className="font-display text-lg leading-snug">"Character Formation Through Quality Education"</div>
        </div>
      </div>
    </section>
  );
}

function Academics() {
  const { ref, hasRevealed } = useScrollReveal();
  const programs = [
    { t: "Pre-KG to V", d: "Foundational years rooted in play, curiosity and confidence.", n: "01" },
    { t: "Classes VI–X", d: "Strong core curriculum with labs, sports, and clubs.", n: "02" },
    { t: "Classes XI–XII", d: "Science · Commerce · Computer Science streams.", n: "03" },
  ];
  return (
    <section ref={ref as any} className={`max-w-7xl mx-auto px-6 py-24 transition-all duration-1000 transform ${hasRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-3">
            <BlurText text="Academics" animateBy="letters" delay={10} direction="bottom" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-primary text-balance max-w-xl">
            <BlurText text="A curriculum built for the world ahead." animateBy="words" delay={25} direction="top" />
          </h2>
        </div>
        <Button asChild variant="ghost" className="text-primary hover:bg-primary/5">
          <Link to="/academics">View all programs <ArrowRight className="h-4 w-4 ml-1" /></Link>
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {programs.map((p) => (
          <div key={p.t} className="bg-primary text-primary-foreground rounded-2xl p-8 relative overflow-hidden group">
            <div className="absolute -top-10 -right-6 font-display text-[140px] text-gold/15 leading-none select-none">{p.n}</div>
            <BookOpen className="h-6 w-6 text-gold mb-6" />
            <h3 className="font-display text-2xl mb-3">{p.t}</h3>
            <p className="text-sm text-white/75 leading-relaxed">{p.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


function Testimonial() {
  const { ref, hasRevealed } = useScrollReveal();
  return (
    <section ref={ref as any} className={`max-w-5xl mx-auto px-6 py-24 text-center transition-all duration-1000 transform ${hasRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <Sparkles className="h-8 w-8 text-gold mx-auto mb-6" />
      <blockquote className="font-display text-2xl md:text-4xl text-primary leading-snug text-balance italic">
        <BlurText 
          text='"Brotherhood gave my daughter more than an education — it gave her confidence, character, and a community for life."' 
          animateBy="words" 
          delay={15} 
          direction="bottom" 
        />
      </blockquote>
      <div className="mt-8 text-sm text-muted-foreground">
        <div className="font-semibold text-foreground">Mrs. Lakshmi R.</div>
        Parent · Class XII (2024)
      </div>
    </section>
  );
}

function CTA() {
  const { ref, hasRevealed } = useScrollReveal();
  return (
    <section ref={ref as any} className={`max-w-7xl mx-auto px-6 pb-24 transition-all duration-1000 transform ${hasRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-12 md:p-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,oklch(0.7679_0.1778_81.65/0.25),transparent_60%)]" />
        <div className="relative grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-5xl mb-4 text-balance">
              <BlurText text="Begin your child's journey at Brotherhood." animateBy="words" delay={25} direction="top" />
            </h2>
            <p className="text-white/75 max-w-lg">Applications for the 2026–27 academic year are now open. Visit our campus or apply online today.</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button asChild size="lg" className="bg-gradient-gold text-navy-deep hover:opacity-90 font-semibold shadow-gold">
              <Link to="/admissions">Apply Online</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary">
              <Link to="/contact"><Phone className="h-4 w-4 mr-1" /> Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function EventsTimeline({ upcomingEvents, latestEvents, loading }: { upcomingEvents: any[]; latestEvents: any[]; loading: boolean }) {
  const { ref, hasRevealed } = useScrollReveal();
  return (
    <section ref={ref as any} className={`bg-card border-y border-border py-24 relative overflow-hidden transition-all duration-1000 transform ${hasRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,oklch(0.7679_0.1778_81.65/0.05),transparent_55%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 space-y-16 relative z-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 text-xs font-bold text-gold tracking-widest uppercase">
            <Calendar className="h-3.5 w-3.5" /> Campus Calendar
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-primary font-bold">Events & Highlights</h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Stay updated with our upcoming schedules and explore recent updates from our school assemblies, athletic meets, and academic activities.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Upcoming Events */}
          <div className="space-y-6">
            <h3 className="font-display text-2xl text-primary font-bold flex items-center gap-2 border-b border-border pb-3">
              <Clock className="h-5 w-5 text-gold" /> Upcoming Events
            </h3>
            <div className="relative border-l-2 border-primary/20 pl-6 space-y-8 py-1">
              {upcomingEvents.slice(0, 3).map((ev) => (
                <div key={ev.title} className="relative group">
                  <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full bg-gold ring-4 ring-card transition-transform duration-300 group-hover:scale-125" />
                  <div className="text-xs text-gold font-bold">{ev.date}</div>
                  <h4 className="font-display text-lg text-primary font-bold mt-1 group-hover:text-gold transition-colors">{ev.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{ev.desc}</p>
                </div>
              ))}
              {upcomingEvents.length === 0 && (
                <p className="text-xs text-muted-foreground italic">No upcoming events scheduled.</p>
              )}
            </div>
          </div>

          {/* Latest Highlights */}
          <div className="space-y-6">
            <h3 className="font-display text-2xl text-primary font-bold flex items-center gap-2 border-b border-border pb-3">
              <Sparkles className="h-5 w-5 text-gold" /> Latest Events & Results
            </h3>
            <div className="relative border-l-2 border-primary/20 pl-6 space-y-8 py-1">
              {latestEvents.slice(0, 3).map((ev) => (
                <div key={ev.title} className="relative group">
                  <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full bg-primary ring-4 ring-card transition-transform duration-300 group-hover:scale-125" />
                  <div className="text-xs text-gold font-bold">{ev.date}</div>
                  <h4 className="font-display text-lg text-primary font-bold mt-1 group-hover:text-gold transition-colors">{ev.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{ev.desc}</p>
                </div>
              ))}
              {latestEvents.length === 0 && (
                <p className="text-xs text-muted-foreground italic">No recent events or highlights.</p>
              )}
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <Button asChild variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-5">
            <Link to="/gallery">View Gallery & All Events <ArrowRight className="h-4 w-4 ml-2" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
