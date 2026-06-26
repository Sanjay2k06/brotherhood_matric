import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Info, Shirt, ShieldCheck } from "lucide-react";
import uniformImg from "../../images/schooluniform.png";

import { useState, useEffect } from "react";

export const Route = createFileRoute("/students/school-uniform")({
  head: () => ({
    meta: [
      { title: "School Uniform — Brotherhood School" },
      { name: "description", content: "School dress code, daily uniform specifications, and footwear regulations." },
    ],
  }),
  component: SchoolUniformPage,
});

function SchoolUniformPage() {
  const [dailyUniform, setDailyUniform] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultUniform = [
    { section: "Primary (Classes I to V)", boys_uniform: "Navy blue shorts, light blue shirts, black shoes, school belt & tie.", girls_uniform: "Navy blue pinafore, light blue shirts, black shoes, school belt & tie." },
    { section: "Secondary (Classes VI to XII)", boys_uniform: "Navy blue trousers, light blue shirts, black shoes, school belt & tie.", girls_uniform: "Navy blue salwar suit with light blue dupatta and black shoes." },
  ];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/school-uniforms/")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : (data.results || []);
        setDailyUniform(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching uniforms:", err);
        setDailyUniform(defaultUniform);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Dress Code"
        title="School Uniform"
        subtitle="Dress regulations and daily uniform guide for students at Brotherhood."
      />

      <section className="max-w-6xl mx-auto px-6 py-20 space-y-12">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Uniform Image Gallery */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-[360px]">
              <div className="absolute inset-0 rounded-3xl bg-gradient-gold opacity-10 group-hover:opacity-20 blur-[10px] transition duration-300" />
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-gold/30 shadow-elegant bg-card img-hover-effect">
                <img
                  src={uniformImg}
                  alt="School Uniform Showcase"
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
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

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto"></div>
              </div>
            ) : dailyUniform.length > 0 ? (
              <div className="space-y-4">
                {dailyUniform.map((item) => (
                  <div key={item.section} className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                    <h3 className="font-display text-xl text-primary font-bold mb-3">{item.section}</h3>
                    <div className="grid gap-2 text-sm text-muted-foreground">
                      <p><strong className="text-foreground">Boys:</strong> {item.boys_uniform}</p>
                      <p><strong className="text-foreground">Girls:</strong> {item.girls_uniform}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-muted/10 border border-dashed border-border rounded-2xl">
                <p className="text-muted-foreground text-sm">No uniform rules configured.</p>
              </div>
            )}


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
