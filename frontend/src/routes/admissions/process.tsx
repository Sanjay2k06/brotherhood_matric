import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { CheckCircle2 } from "lucide-react";
import aboutImage2 from "../../images/aboutimage2.jpg";

export const Route = createFileRoute("/admissions/process")({
  head: () => ({
    meta: [
      { title: "Admission Process — Brotherhood School" },
      { name: "description", content: "Details of steps, timeline, and document requirements for admission at Brotherhood School." },
    ],
  }),
  component: AdmissionProcessPage,
});

function AdmissionProcessPage() {
  const steps = [
    { num: 1, title: "Registration", desc: "Obtain and submit the registration form at the school office." },
    { num: 2, title: "Interaction / Entrance Test", desc: "An informal interaction for Kindergarten and Primary levels, or an entrance test for higher levels to assess student readiness." },
    { num: 3, title: "Document Verification", desc: "Verification of necessary certificates, academic records, and personal documents." },
    { num: 4, title: "Provisional Admission", desc: "Issuance of admission offer letter upon meeting the eligibility criteria." },
    { num: 5, title: "Fee Payment & Enrollment", desc: "Completing admission formalities by paying fees and submitting final enrollment details." },
  ];

  const documents = [
    "Completed Registration Form",
    "Student Birth Certificate (Original & Copy)",
    "Transfer Certificate (TC) (with EMIS number, from previous school)",
    "Report Card / Mark Sheet (from previous school)",
    "Student Aadhaar Card Copy",
    "Parent Aadhaar Card Copies",
    "Community Certificate (if applicable)",
    "Passport-sized Photographs (Student: 4, Father: 2, Mother: 2)"
  ];

  return (
    <>
      <PageHeader
        eyebrow="Admissions Guidance"
        title="Admission Process"
        subtitle="A step-by-step checklist of requirements and timelines to join our school."
      />

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Stages of Admission */}
          <div className="space-y-6 bg-card border border-border rounded-3xl p-8 shadow-sm">
            <h2 className="font-display text-2xl text-primary font-bold mb-4">Stages of Admission</h2>
            <div className="space-y-6">
              {steps.map((step) => (
                <div key={step.num} className="flex gap-4 items-start">
                  <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-gold text-navy-deep grid place-items-center font-bold text-xs shadow-sm">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-primary font-semibold">{step.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents */}
          <div className="bg-card border border-border rounded-3xl p-8 shadow-sm h-full flex flex-col justify-between">
            <div>
              <h3 className="font-display text-2xl text-primary font-bold mb-6">Required Documents</h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-muted-foreground">
                {documents.map((doc) => (
                  <li key={doc} className="flex gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-gold shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Image Column */}
          <div className="relative group img-hover-effect rounded-3xl overflow-hidden shadow-elegant border border-border h-full min-h-[400px]">
            <img
              src={aboutImage2}
              alt="Admissions Desk Courtyard Entrance"
              className="w-full h-full min-h-[400px] object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 bg-navy-deep/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur">
              Admissions Office & Reception Area
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
