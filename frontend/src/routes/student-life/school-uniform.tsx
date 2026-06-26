import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { ShieldCheck, Info, Calendar, Shirt } from "lucide-react";

export const Route = createFileRoute("/student-life/school-uniform")({
  head: () => ({
    meta: [
      { title: "School Uniform — Brotherhood School" },
      { name: "description", content: "School dress code, daily uniform specifications, and footwear regulations." },
    ],
  }),
  component: SchoolUniformPage,
});

function SchoolUniformPage() {
  const dailyUniform = [
    { section: "Primary (I to V)", boys: "Navy blue shorts, light blue shirts, black shoes, school belt & tie.", girls: "Navy blue pinafore, light blue shirts, black shoes, school belt & tie." },
    { section: "Secondary (VI to XII)", boys: "Navy blue trousers, light blue shirts, black shoes, school belt & tie.", girls: "Navy blue salwar suit with light blue dupatta and black shoes." },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Dress Code"
        title="School Uniform"
        subtitle="Dress regulations and daily uniform guide for students at Brotherhood."
      />

      <section className="max-w-6xl mx-auto px-6 py-20 space-y-12">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Uniform Image replacement with vector icon */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-[360px]">
              <div className="absolute inset-0 rounded-3xl bg-gradient-gold opacity-10 group-hover:opacity-20 blur-[10px] transition duration-300" />
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-gold/30 shadow-elegant bg-gradient-to-br from-navy-deep to-primary/20 flex flex-col items-center justify-center p-6 animate-float">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.7679_0.1778_81.65/0.12),transparent_65%)]" />
                <Shirt className="h-32 w-32 text-gold drop-shadow-[0_4px_12px_rgba(212,175,55,0.35)]" />
                <span className="text-xs tracking-widest uppercase text-white/50 mt-6 font-semibold">Standard Dress Code</span>
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center italic">Official School Dress Code Guide</p>
            </div>
          </div>

          {/* Guidelines */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-display text-3xl text-primary font-bold">Dress Code Standards</h2>
            <p className="text-muted-foreground leading-relaxed">
              Every student is expected to wear the prescribed school uniform neat, tidy, and clean. Wearing the correct uniform builds a sense of equality, discipline, and pride in representing Brotherhood School.
            </p>

            <div className="space-y-4">
              {dailyUniform.map((item) => (
                <div key={item.section} className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                  <h3 className="font-display text-xl text-primary font-bold mb-3">{item.section}</h3>
                  <div className="grid gap-2 text-sm text-muted-foreground">
                    <p><strong className="text-foreground">Boys:</strong> {item.boys}</p>
                    <p><strong className="text-foreground">Girls:</strong> {item.girls}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-primary/5 p-5 border border-gold/20 flex gap-3 text-sm text-muted-foreground">
              <Info className="h-5 w-5 text-gold shrink-0 mt-0.5" />
              <p>
                <strong className="text-primary">Wednesday Dress Code:</strong> White uniform trousers/skirts with white canvas shoes and house-coloured t-shirts for physical education and sports activities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
