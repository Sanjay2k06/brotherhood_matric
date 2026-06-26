import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import principalImage from "../../images/principal_portrait (2).png";

export const Route = createFileRoute("/about/principal-message")({
  head: () => ({
    meta: [
      { title: "Principal's Message — Brotherhood School" },
      { name: "description", content: "Official message and welcome note from the Principal of Brotherhood Matriculation Hr. Sec. School." },
    ],
  }),
  component: PrincipalMessagePage,
});

function PrincipalMessagePage() {
  return (
    <>
      <PageHeader
        eyebrow="Leadership Welcome"
        title="Principal's Message"
        subtitle="Read the welcome statement and educational vision from our head of school."
      />

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Principal Photograph */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative group w-full max-w-[400px]">
              <div className="absolute inset-0 rounded-3xl bg-gradient-gold opacity-10 group-hover:opacity-20 blur-[10px] transition duration-300" />
              <div className="relative h-[450px] sm:h-[550px] rounded-3xl overflow-hidden border border-gold/30 shadow-elegant bg-card flex items-center justify-center p-1">
                <img
                  src={principalImage}
                  alt="School Principal"
                  className="max-w-full max-h-full object-contain rounded-2xl transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-display text-xl text-primary font-bold">Dr. Joseph Raj, M.Sc., M.Ed., Ph.D.</h3>
                <p className="text-xs uppercase tracking-widest text-gold font-semibold mt-1">Principal</p>
              </div>
            </div>
          </div>

          {/* Principal Message & Signature */}
          <div className="lg:col-span-8 space-y-6 text-muted-foreground leading-relaxed text-base sm:text-lg">
            <p className="font-medium text-primary">
              Dear Parents, Students, and Well-Wishers,
            </p>
            <p>
              Welcome to Brotherhood Matriculation Higher Secondary School. As we journey together in shaping the lives of young minds, we are constantly reminded of the profound responsibility that rests upon us. Our education model is designed not merely to fill classrooms with instruction, but to ignite a lifelong passion for learning, integrity, and social duty.
            </p>
            <p>
              Following the timeless educational philosophy of Don Bosco, we believe that education is a matter of the heart. By fostering an atmosphere of mutual trust, constructive discipline, and holistic care, we empower our students to stand tall in character and intellect.
            </p>
            <p>
              Through modern STEM resources, smart classrooms, sports pursuits, and active clubs, we build pathways for every student to find their unique voice and succeed in a rapidly evolving world. We invite you to join us in this noble partnership of character formation and scholastic excellence.
            </p>

            {/* Signature Section */}
            <div className="pt-8 border-t border-border">
              <div className="font-display text-2xl text-primary italic font-semibold">Dr. Joseph Raj</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Principal</div>
              <div className="text-xs text-muted-foreground">Brotherhood Matriculation Higher Secondary School</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
