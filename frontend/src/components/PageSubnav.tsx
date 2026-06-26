import { Link, useLocation } from "@tanstack/react-router";

const sections = {
  about: [
    { to: "/about/about-school", label: "About School" },
    { to: "/about/vision-mission", label: "Vision & Mission" },
    { to: "/about/principal-message", label: "Principal's Message" },
    { to: "/about/infrastructure", label: "Infrastructure" },
  ],
  academics: [
    { to: "/academics/admission", label: "Admission Process" },
    { to: "/academics/courses-offered", label: "Courses Offered" },
    { to: "/academics/curriculum", label: "Curriculum" },
    { to: "/academics/school-fees", label: "School Fees" },
    { to: "/academics/school-timings", label: "School Timings" },
    { to: "/academics/management-committee", label: "Managing Committee" },
    { to: "/academics/founder-message", label: "Founder's Message" },
    { to: "/academics/father-cruze-profile", label: "Father Anton Cruze" },
  ],
  students: [
    { to: "/students/school-uniform", label: "School Uniform" },
    { to: "/students/best-student", label: "Best Student" },
    { to: "/students/houses", label: "Houses" },
    { to: "/students/student-leaders", label: "Student Leaders" },
    { to: "/students/achievements", label: "Results & Achievements" },
  ],
  association: [
    { to: "/association/alumni", label: "Alumni Association" },
    { to: "/association/registration", label: "Alumni Registration" },
  ],
  "co-curricular": [
    { to: "/co-curricular/sports", label: "Sports" },
    { to: "/co-curricular/choir", label: "Choir" },
    { to: "/co-curricular/eco-club", label: "Eco Club" },
    { to: "/co-curricular/literary-association", label: "Literary Association" },
    { to: "/co-curricular/rsp", label: "RSP" },
    { to: "/co-curricular/scouts-guides", label: "Scouts & Guides" },
  ],
  gallery: [
    { to: "/gallery", label: "Photo Gallery", exact: true },
  ],
  contact: [
    { to: "/contact/contact-us", label: "Contact Us" },
    { to: "/contact/location", label: "Location" },
  ],
};

export function PageSubnav() {
  const location = useLocation();
  const path = location.pathname;

  // Find which section the current path belongs to
  const sectionKey = Object.keys(sections).find((key) => 
    path.startsWith(`/${key}/`) || path === `/${key}`
  ) as keyof typeof sections;

  if (!sectionKey) return null;

  const items = sections[sectionKey];

  return (
    <div className="bg-card border-b border-border/50 py-3.5 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-2 justify-center">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="rounded-full border border-border/80 bg-background px-4 py-2 text-xs font-semibold tracking-wide text-foreground/70 transition-all hover:border-gold/60 hover:bg-primary/5 hover:text-primary data-[status=active]:border-primary data-[status=active]:bg-primary data-[status=active]:text-primary-foreground data-[status=active]:shadow-sm"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
