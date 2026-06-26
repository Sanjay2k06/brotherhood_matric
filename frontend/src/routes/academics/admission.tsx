import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Calendar, CheckCircle2, FileText, Info, ArrowRight } from "lucide-react";
import aboutImage2 from "../../images/aboutimage2.jpg";

export const Route = createFileRoute("/academics/admission")({
  head: () => ({
    meta: [
      { title: "Admission Process — Brotherhood School" },
      { name: "description", content: "Overview of admissions guidelines, timelines, and registration details at Brotherhood School." },
    ],
  }),
  component: AcademicsAdmissionPage,
});

function AcademicsAdmissionPage() {
  const steps = [
    {
      num: "01",
      title: "Online Inquiry / Registration",
      desc: "Fill out the online Enquiry Form or register directly via the Admissions Portal to initiate interest.",
    },
    {
      num: "02",
      title: "Interaction & Assessment",
      desc: "An informal interactive session with parents and candidate to understand learning background and values.",
    },
    {
      num: "03",
      title: "Document Verification",
      desc: "Submission and verification of Birth Certificate, Transfer Certificate, and previous academic transcripts.",
    },
    {
      num: "04",
      title: "Seat Allocation & Fee payment",
      desc: "Confirmation of admission and payment of standard term fees to secure enrollment.",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Enrollment Pathways"
        title="Admission Process"
        subtitle="Step-by-step guidance on securing a place for your child at Brotherhood."
      />

      <section className="max-w-7xl mx-auto px-6 py-20 space-y-16">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Detailed Guidelines */}
          <div className="lg:col-span-7 space-y-6 text-muted-foreground leading-relaxed">
            <h2 className="font-display text-3xl text-primary font-bold">General Admissions Guidelines</h2>
            <p>
              Admissions at Brotherhood Matriculation Higher Secondary School are conducted in compliance with standard regulations and availability of seats. We prioritize value-based character formation, and we encourage parents who share our vision of moral integrity and academic discipline to apply.
            </p>
            <p>
              Admissions are open from Pre-KG up to Class XI. Choice of specialized streams in Class XI (Science with Biology/Computer Science or Commerce with Computer Applications/Business Maths) is offered based on previous Class X board performance and counseling.
            </p>

            <div className="rounded-2xl bg-primary/5 p-6 border border-gold/20 flex gap-4 text-sm">
              <Info className="h-6 w-6 text-gold shrink-0 mt-0.5" />
              <div className="space-y-2 text-muted-foreground">
                <p><strong className="text-primary">Age Criteria (as on June 1st):</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Pre-KG: 2.5 Years +</li>
                  <li>LKG: 3 Years +</li>
                  <li>Class I: 5.5 Years +</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Visual Grid / Illustration box */}
          <div className="lg:col-span-5 relative group img-hover-effect rounded-3xl overflow-hidden shadow-elegant border border-border">
            <img
              src={aboutImage2}
              alt="School Admissions Counter"
              className="w-full h-[350px] object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 bg-navy-deep/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur">
              Campus Visit & Counseling Block
            </div>
          </div>
        </div>

        {/* Steps to Admissions */}
        <div className="space-y-8 pt-8">
          <h2 className="font-display text-3xl text-primary font-bold text-center">Enrollment Process Steps</h2>
          <div className="grid gap-6 md:grid-cols-4">
            {steps.map((step) => (
              <div key={step.num} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:border-gold/60 transition duration-300 relative overflow-hidden group">
                <div className="absolute top-2 right-4 text-6xl font-bold text-gold/10 font-display select-none group-hover:text-gold/25 transition duration-300">{step.num}</div>
                <h3 className="font-display text-lg text-primary font-bold mb-3 mt-4 pr-6">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Callouts */}
        <div className="bg-primary text-primary-foreground rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center shadow-elegant">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,oklch(0.7679_0.1778_81.65/0.18),transparent_60%)]" />
          <h3 className="font-display text-3xl mb-4">Ready to begin your application?</h3>
          <p className="text-white/85 max-w-xl mx-auto text-sm sm:text-base mb-8">
            Complete our digital application form or schedule a tour of our Neelankarai campus to discuss standard-setting education pathways.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/admissions/apply-online"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-gold text-navy-deep hover:opacity-95 font-bold shadow-gold px-6 py-3 text-sm transition duration-300"
            >
              Apply Online <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/admissions/enquiry-form"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white hover:text-primary px-6 py-3 text-sm transition duration-300"
            >
              Inquire Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
