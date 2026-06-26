import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { ShieldCheck, Award, GraduationCap, Users } from "lucide-react";

export const Route = createFileRoute("/academics/management-committee")({
  head: () => ({
    meta: [
      { title: "Managing Committee — Brotherhood School" },
      { name: "description", content: "Meet the executive committee and advisory board members of Brotherhood Matriculation Hr. Sec. School." },
    ],
  }),
  component: ManagementCommitteePage,
});

function ManagementCommitteePage() {
  const members = [
    { role: "Founder & Chairman", name: "Rev. Father Anton Cruze", desc: "Visionary educator with 40+ years of social development and scholastic leadership." },
    { role: "Correspondent", name: "Mrs. Clara Cruze", desc: "Oversees daily institutional administration, financial compliance, and welfare systems." },
    { role: "Principal", name: "Dr. Joseph Raj", desc: "Academically guides the institution, stream operations, and teacher training schedules." },
    { role: "Advisory Board Member", name: "Rev. Fr. Maria Arokiam, SDB", desc: "Don Bosco educational advisor guiding pedagogical principles." },
    { role: "Advisory Board Member", name: "Dr. L. S. Ganesh", desc: "Former Professor, IIT Madras, advising on curriculum standards and STEM integrations." },
    { role: "Parent Representative", name: "Mr. Rajasekar K.", desc: "Elected parental voice contributing feedback on facilities and co-curricular programs." }
  ];

  return (
    <>
      <PageHeader
        eyebrow="Governance & Leadership"
        title="Managing Committee"
        subtitle="The administrative and advisory board guiding Brotherhood's development pathways."
      />

      <section className="max-w-6xl mx-auto px-6 py-20 space-y-16">
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center space-y-6 text-muted-foreground leading-relaxed">
          <h2 className="font-display text-3xl text-primary font-bold">Governing Structure</h2>
          <p>
            Brotherhood School operates under the guidance of the Executive Committee of the Brotherhood Educational and Charitable Trust. The board meets quarterly to review academic achievements, facility upgrades, and teacher performance structures, ensuring alignment with our core founding values.
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-6">
          {members.map((m) => (
            <div key={m.name} className="bg-card border border-border rounded-3xl p-8 shadow-sm hover-lift transition duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-10 w-10 rounded-xl bg-primary/5 grid place-items-center">
                  <ShieldCheck className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gold font-semibold mb-1">{m.role}</h4>
                  <h3 className="font-display text-2xl text-primary font-bold">{m.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pt-2">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
