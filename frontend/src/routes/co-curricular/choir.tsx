import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Music, Award, Star } from "lucide-react";
import choirImg from "../../images/choir.png";

export const Route = createFileRoute("/co-curricular/choir")({
  head: () => ({
    meta: [
      { title: "School Choir — Brotherhood School" },
      { name: "description", content: "Details of the Brotherhood School choir, music programs, and carol events." },
    ],
  }),
  component: ChoirPage,
});

function ChoirPage() {
  return (
    <>
      <PageHeader
        eyebrow="Musical Training"
        title="School Choir"
        subtitle="Raising voices in harmony, celebrating regional awards and carol events."
      />

      <section className="max-w-6xl mx-auto px-6 py-20 space-y-16">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-muted-foreground leading-relaxed text-sm sm:text-base">
            <h2 className="font-display text-3xl text-primary font-bold">Choral Music & Training</h2>
            <p>
              The Brotherhood School Choir is a highly respected vocal group performing at morning assemblies, annual days, and state-level carol competitions. We guide students in classical choral scales, pitch modulation, and four-part harmony (Soprano, Alto, Tenor, and Bass).
            </p>
            <p>
              Under professional guidance, student batches discover their vocal pitch, learn basic keyboard notes, and develop team-based musical synchronization.
            </p>
            <div className="rounded-2xl bg-primary/5 p-5 border border-gold/20 flex gap-3 text-sm">
              <Star className="h-5 w-5 text-gold shrink-0 mt-0.5" />
              <p>
                <strong className="text-primary">Featured Event:</strong> The Annual Christmas Carol Festival, featuring joint performances with alumni groups and visiting schools.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative group border border-gold/30 rounded-3xl overflow-hidden shadow-elegant img-hover-effect">
            <img
              src={choirImg}
              alt="School Choir Performing"
              className="w-full h-[320px] object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 bg-navy-deep/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur">
              Vocal Harmony Performance at Audit
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
