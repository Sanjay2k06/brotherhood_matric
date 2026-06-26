import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { FileEdit, ClipboardList, Download, BookOpen } from "lucide-react";
import aboutImage4 from "../../images/aboutimage4.jpeg";

export const Route = createFileRoute("/academics/courses-offered")({
  head: () => ({
    meta: [
      { title: "Courses Offered — Brotherhood School" },
      { name: "description", content: "XI & XII course groups, streams, and subject combinations at Brotherhood." },
    ],
  }),
  component: CoursesOfferedPage,
});

function CoursesOfferedPage() {
  const groups = [
    {
      code: "Group 2502",
      stream: "Science Stream (Computer Science Focus)",
      subjects: [
        "Physics",
        "Chemistry",
        "Mathematics",
        "Computer Science"
      ]
    },
    {
      code: "Group 2503",
      stream: "Science Stream (Biology Focus)",
      subjects: [
        "Physics",
        "Chemistry",
        "Mathematics",
        "Biology"
      ]
    },
    {
      code: "Group 2702",
      stream: "Commerce Stream (Computer Focus)",
      subjects: [
        "Commerce",
        "Accountancy",
        "Economics",
        "Computer Applications"
      ]
    },
    {
      code: "Group 2708",
      stream: "Commerce Stream (Mathematics Focus)",
      subjects: [
        "Commerce",
        "Accountancy",
        "Economics",
        "Business Mathematics"
      ]
    }
  ];

  const handleDownload = () => {
    alert("Brochure download initiated successfully!");
  };

  return (
    <>
      <PageHeader
        eyebrow="Streams of Study"
        title="Courses Offered"
        subtitle="Subject combinations and group selections for Classes XI & XII."
      />

      <section className="max-w-7xl mx-auto px-6 py-20 space-y-12">
        <h2 className="font-display text-3xl text-primary font-bold text-center">Courses Offered in XI & XII</h2>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 grid gap-6 md:grid-cols-2">
            {groups.map((group) => (
              <div key={group.code} className="rounded-3xl border border-border bg-card p-8 shadow-sm hover-lift transition duration-300 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-semibold mb-4">
                    <BookOpen className="h-3.5 w-3.5 text-gold" /> {group.stream}
                  </div>
                  <h3 className="font-display text-2xl text-primary font-bold mb-4">{group.code}</h3>
                  <ul className="space-y-2.5">
                    {group.subjects.map((sub) => (
                      <li key={sub} className="text-muted-foreground text-sm flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4 relative group img-hover-effect rounded-3xl overflow-hidden shadow-elegant border border-border">
            <img
              src={aboutImage4}
              alt="Classroom Study"
              className="w-full h-[450px] object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 bg-navy-deep/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur">
              Smart Desks & Modern Labs
            </div>
          </div>
        </div>

        {/* Form and CTA buttons */}
        <div className="pt-8 border-t border-border flex flex-wrap gap-4 justify-center">
          <Link
            to="/admissions/enquiry-form"
            className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary/95 px-6 py-3.5 text-sm font-semibold text-white transition duration-300"
          >
            <FileEdit className="h-4 w-4 text-gold" /> Enquire Now
          </Link>
          
          <Link
            to="/admissions/apply-online"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3.5 text-sm font-semibold text-navy-deep hover:opacity-95 shadow-gold transition duration-300"
          >
            <ClipboardList className="h-4 w-4" /> Apply Now
          </Link>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card hover:bg-muted px-6 py-3.5 text-sm font-semibold text-foreground transition duration-300"
          >
            <Download className="h-4 w-4 text-gold" /> Download Brochure
          </button>
        </div>
      </section>
    </>
  );
}