import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Users, Award } from "lucide-react";
import aboutImage3 from "../../images/aboutimage3.jpg";

export const Route = createFileRoute("/student-life/student-leaders")({
  head: () => ({
    meta: [
      { title: "Student Leaders — Brotherhood School" },
      { name: "description", content: "Meet the Student Council and student leaders of Brotherhood School." },
    ],
  }),
  component: StudentLeadersPage,
});

function StudentLeadersPage() {
  const council = [
    { role: "School Head Boy", name: "Master Siddharth V.", grade: "Class XII - Science" },
    { role: "School Head Girl", name: "Miss Ananya R.", grade: "Class XII - Commerce" },
    { role: "Assistant Head Boy", name: "Master Tarun K.", grade: "Class XI - Computer Science" },
    { role: "Assistant Head Girl", name: "Miss Harini S.", grade: "Class XI - Biology Focus" },
    { role: "Sports Captain", name: "Master Rohan Kumar", grade: "Class XII - Science" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Student Council"
        title="Student Leaders"
        subtitle="Meet the student representatives elected to support our school community."
      />

      <section className="max-w-6xl mx-auto px-6 py-20 space-y-12">
        <h2 className="font-display text-3xl text-primary font-bold text-center">School Student Council</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {council.map((leader) => (
            <div key={leader.role} className="bg-card border border-border rounded-3xl p-8 shadow-sm hover-lift transition duration-300">
              <div className="h-10 w-10 rounded-xl bg-primary/5 grid place-items-center mb-6">
                <Users className="h-5 w-5 text-gold" />
              </div>
              <h4 className="text-xs uppercase tracking-widest text-gold font-semibold mb-2">{leader.role}</h4>
              <h3 className="font-display text-2xl text-primary font-bold mb-1">{leader.name}</h3>
              <p className="text-sm text-muted-foreground">{leader.grade}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-center mt-12 bg-muted/20 border border-border rounded-3xl p-8 sm:p-10 shadow-sm">
          <div className="md:col-span-7 text-muted-foreground leading-relaxed space-y-4">
            <h3 className="font-display text-2xl text-primary font-bold flex items-center gap-2">
              <Award className="h-6 w-6 text-gold" /> Leadership Responsibilities
            </h3>
            <p>
              The Student Council serves as the liaison between the school administration, faculty, and student body. They are elected annually through a democratic voting process in which students from Class IX to XII participate.
            </p>
            <p>
              Leaders maintain school discipline during morning assemblies, coordinate house events, organize inter-school festivals, and champion eco-friendly policies inside the campus.
            </p>
          </div>
          <div className="md:col-span-5 relative group img-hover-effect rounded-3xl overflow-hidden shadow-elegant border border-border">
            <img
              src={aboutImage3}
              alt="School Student Leaders assembly"
              className="w-full h-[250px] object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>
    </>
  );
}
