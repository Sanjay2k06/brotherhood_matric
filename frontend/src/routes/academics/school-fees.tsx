import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { CreditCard, Landmark, FileText, Info, Award } from "lucide-react";

export const Route = createFileRoute("/academics/school-fees")({
  head: () => ({
    meta: [
      { title: "School Fees — Brotherhood School" },
      { name: "description", content: "Details of terms fees, modes of payment, deadlines, and fee concession guidelines." },
    ],
  }),
  component: SchoolFeesPage,
});

function SchoolFeesPage() {
  const terms = [
    { name: "Term I", due: "Before May 15th", scope: "Includes admission registration, library charges, and tuition fee for first block." },
    { name: "Term II", due: "Before September 15th", scope: "Includes term science lab charges, exam sheets, and second block tuition." },
    { name: "Term III", due: "Before January 15th", scope: "Includes final term tuition and computer training/annual cultural charges." }
  ];

  return (
    <>
      <PageHeader
        eyebrow="Financial Guidelines"
        title="School Fees Schedule"
        subtitle="Term fees structure, payment schedules, and instructions for parents."
      />

      <section className="max-w-7xl mx-auto px-6 py-20 space-y-16">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Fee Payment Guidelines */}
          <div className="lg:col-span-8 space-y-6 text-muted-foreground leading-relaxed">
            <h2 className="font-display text-3xl text-primary font-bold">General Payment Guidelines</h2>
            <p>
              The school academic year is divided into three terms, and school fees must be paid at the commencement of each term on or before the dates stipulated below. Prompt payment ensures the smooth function of our academic infrastructure and facility support.
            </p>
            
            <div className="space-y-4 pt-4">
              {terms.map((t) => (
                <div key={t.name} className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div>
                    <h3 className="font-display text-xl text-primary font-bold">{t.name} Payment</h3>
                    <p className="text-xs text-muted-foreground mt-1 max-w-md">{t.scope}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs uppercase tracking-widest text-gold font-bold">Due Date</span>
                    <div className="text-primary font-bold">{t.due}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-primary/5 p-5 border border-gold/20 flex gap-3 text-sm">
              <Info className="h-5 w-5 text-gold shrink-0 mt-0.5" />
              <p>
                <strong className="text-primary">Late Fee Penalty:</strong> A late fee of ₹100 per week is applicable after the due date. Receipts for payments must be preserved by parents for future reference and verification.
              </p>
            </div>
          </div>

          {/* Payment Methods and Bank details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-6">
              <h3 className="font-display text-2xl text-primary font-bold flex items-center gap-2">
                <Landmark className="h-5 w-5 text-gold" /> Bank Account Details
              </h3>
              <p className="text-xs text-muted-foreground">
                Parents can pay online via NEFT/RTGS or directly at our school fee counter via credit/debit card.
              </p>

              <div className="divide-y divide-border text-sm">
                <div className="py-2.5 flex justify-between">
                  <span className="text-muted-foreground">Beneficiary Name</span>
                  <span className="font-semibold text-primary">Brotherhood School</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-muted-foreground">Bank Name</span>
                  <span className="font-semibold text-primary">Federal Bank</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-muted-foreground">Account Number</span>
                  <span className="font-semibold text-primary">12340200056789</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-muted-foreground">IFSC Code</span>
                  <span className="font-semibold text-primary">FDRL0001234</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-muted-foreground">Branch</span>
                  <span className="font-semibold text-primary">Neelankarai, Chennai</span>
                </div>
              </div>
            </div>

            {/* Concessions Box */}
            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-4">
              <h3 className="font-display text-2xl text-primary font-bold flex items-center gap-2">
                <Award className="h-5 w-5 text-gold" /> Fee Concessions
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Need-based fee concessions are offered to students from underprivileged backgrounds, siblings studying in the same institution, and children of staff members, subject to management approval.
              </p>
              <Link to="/contact/contact-us" className="text-xs text-primary font-bold hover:underline block">
                Apply for fee assistance →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
