import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Landmark, AlertCircle, Calendar, ShieldCheck, CheckCircle2, Clock } from "lucide-react";

export const Route = createFileRoute("/academics/school-fees")({
  head: () => ({
    meta: [
      { title: "School Fees — Brotherhood School" },
      { name: "description", content: "School fee structure, term schedules, payment deadlines, and financial guidelines for parents." },
    ],
  }),
  component: SchoolFeesPage,
});

export function SchoolFeesPage() {
  const terms = [
    {
      term: "I Term Fees",
      month: "June",
      due: "On or before June 15th",
      description: "Payable at the commencement of the academic year.",
    },
    {
      term: "II Term Fees",
      month: "October",
      due: "On or before October 15th",
      description: "Payable for the second academic block.",
    },
    {
      term: "III Term Fees",
      month: "January",
      due: "On or before January 12th",
      description: "Payable for the final academic term.",
    },
  ];

  const policies = [
    "Tuition fee is collected across three terms – June, October, and January as per the official schedule.",
    "II Term fees must be paid on or before October 15th.",
    "III Term fees must be paid on or before January 12th.",
    "All parents are expected to pay the fees promptly before the 15th of June, October and January failing which, a fine of Rs. 100/- will be charged for a month. This is to enforce promptness and regularity.",
    "Receipts for all fee payments must be collected from the school fee counter and retained for record verification.",
    "Students with outstanding fee balances may face restrictions on term exam hall tickets until cleared.",
    "Fees once paid are non-refundable and non-transferable under any circumstances.",
  ];

  return (
    <>
      <PageHeader
        eyebrow="Financial Guidelines"
        title="School Fees"
        subtitle="Tuition fee schedules, payment deadlines, and school financial regulations."
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-16">
        {/* Term Schedule Cards */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-[1px] bg-[#d4af37]"></div>
            <span className="text-[#d4af37] text-xs uppercase tracking-widest font-semibold">Payment Schedule</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#0a2b18]">
            Term-wise <span className="italic text-[#1b4d32]">Fee Schedule</span>
          </h2>
          <p className="text-[#6c8274] text-base font-light max-w-3xl leading-relaxed">
            Tuition fee is collected in three terms – June, October, and January as per the schedule below.
          </p>

          <div className="grid md:grid-cols-3 gap-6 pt-4">
            {terms.map((t) => (
              <div
                key={t.term}
                className="bg-white border border-[#e2e8f0] rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4af37]/10 rounded-full blur-2xl pointer-events-none"></div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-widest font-bold text-[#d4af37] bg-[#d4af37]/10 px-3 py-1 rounded-full">
                      {t.month}
                    </span>
                    <Calendar className="w-5 h-5 text-[#0a2b18]/40" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#0a2b18] font-bold mb-2">{t.term}</h3>
                  <p className="text-xs text-[#6c8274] leading-relaxed mb-6">{t.description}</p>
                </div>

                <div className="pt-4 border-t border-[#f1f5f3]">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#6c8274] block">Payment Deadline</span>
                  <span className="font-serif text-lg text-[#0a2b18] font-bold block mt-1 text-[#1b4d32]">{t.due}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Penalty / Promptness Notice */}
        <div className="rounded-3xl bg-[#0a2b18] text-white p-6 sm:p-10 border border-[#d4af37]/30 shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#d4af37] rounded-full blur-3xl opacity-20 pointer-events-none"></div>
          <div className="flex flex-col sm:flex-row items-start gap-5 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-[#d4af37]" />
            </div>
            <div className="space-y-3">
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-semibold">
                Promptness & Fine Policy
              </h3>
              <p className="text-white/80 font-light leading-relaxed text-base sm:text-lg">
                All parents are expected to pay the fees promptly before the 15th of June, October and January failing which, a fine of <strong className="text-[#d4af37]">Rs. 100/-</strong> will be charged for a month. This is to enforce promptness and regularity.
              </p>
            </div>
          </div>
        </div>

        {/* Policies and Bank Details Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* School Policies */}
          <div className="lg:col-span-8 bg-white border border-[#e2e8f0] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#1b4d32]" />
              <h3 className="font-serif text-2xl text-[#0a2b18] font-bold">School Fee Policies</h3>
            </div>
            <ul className="space-y-4">
              {policies.map((p, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#4a5568] leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Modes / Bank Details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#f7faf8] border border-[#e2e8f0] rounded-3xl p-6 sm:p-8 space-y-5">
              <h4 className="font-serif text-xl text-[#0a2b18] font-bold flex items-center gap-2">
                <Landmark className="w-5 h-5 text-[#d4af37]" /> Payment Modes
              </h4>
              <p className="text-xs text-[#6c8274] leading-relaxed">
                Fees may be paid online via NEFT/RTGS, UPI, or directly at the school accounts counter on working days.
              </p>

              <div className="divide-y divide-[#e2e8f0] text-sm pt-2">
                <div className="py-2.5 flex justify-between">
                  <span className="text-[#6c8274]">Beneficiary</span>
                  <span className="font-semibold text-[#0a2b18]">Brotherhood School</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-[#6c8274]">Bank</span>
                  <span className="font-semibold text-[#0a2b18]">Federal Bank</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-[#6c8274]">Branch</span>
                  <span className="font-semibold text-[#0a2b18]">Neelankarai, Chennai</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-[#6c8274]">Counter Timings</span>
                  <span className="font-semibold text-[#0a2b18]">09:00 AM – 03:00 PM</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/contact/contact-us"
                  className="block text-center text-xs font-semibold uppercase tracking-wider text-[#1b4d32] hover:text-[#d4af37] transition-colors"
                >
                  Contact School Accounts Office →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
