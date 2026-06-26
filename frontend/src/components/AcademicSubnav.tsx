import { Link } from "@tanstack/react-router";

const items = [
  { to: "/academics", label: "Overview", exact: true },
  { to: "/academics/courses-offered", label: "Courses Offered" },
  { to: "/academics/school-fees", label: "School Fees" },
  { to: "/academics/school-timings", label: "School Timings" },
  { to: "/academics/management-committee", label: "Managing Committee" },
];

export function AcademicSubnav() {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          activeOptions={item.exact ? { exact: true } : undefined}
          className="rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground/75 transition hover:border-gold/60 hover:text-primary data-[status=active]:border-gold data-[status=active]:bg-primary data-[status=active]:text-primary-foreground"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}