import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { ClipboardCheck, Sparkles } from "lucide-react";
import aboutImage4 from "../../images/aboutimage4.jpeg";

export const Route = createFileRoute("/association/registration")({
  head: () => ({
    meta: [
      { title: "Alumni Registration — Brotherhood School" },
      { name: "description", content: "Online registration form to join the Brotherhood School Alumni Association registry." },
    ],
  }),
  component: AlumniRegistrationPage,
});

function AlumniRegistrationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    batchYear: "",
    phone: "",
    email: "",
    occupation: "",
    organization: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.batchYear || !formData.phone || !formData.email) {
      alert("Please fill in all mandatory fields.");
      return;
    }
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <PageHeader
        eyebrow="Alumni Registry"
        title="Alumni Registration"
        subtitle="Stay in touch, network with batches, and contribute back to your school community."
      />

      <section className="max-w-7xl mx-auto px-6 py-20">
        {submitted ? (
          <div className="bg-card border border-gold/40 rounded-3xl p-10 text-center shadow-elegant animate-fade-up max-w-xl mx-auto">
            <div className="h-16 w-16 rounded-full bg-primary/5 grid place-items-center mx-auto mb-6">
              <ClipboardCheck className="h-8 w-8 text-gold" />
            </div>
            <h2 className="font-display text-3xl text-primary font-bold mb-4">Registration Completed!</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Thank you for registering, <strong className="text-primary">{formData.fullName}</strong>. We have saved your details under batch <strong className="text-primary">{formData.batchYear}</strong>. You will receive email newsletters on future alumni reunions.
            </p>
            <div className="text-xs uppercase tracking-widest text-gold font-semibold flex items-center justify-center gap-1.5">
              <Sparkles className="h-4 w-4" /> Member Code: AL-{Math.floor(10000 + Math.random() * 90000)}
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-8 rounded-full bg-primary text-white hover:bg-primary/95 px-6 py-2.5 text-xs font-semibold"
            >
              Register Another Member
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <form onSubmit={handleSubmit} className="lg:col-span-8 bg-card border border-border rounded-3xl p-8 sm:p-12 shadow-sm space-y-6">
              <h3 className="font-display text-2xl text-primary font-bold border-b border-border pb-4 mb-6">Alumni Registry Form</h3>

              <div className="grid gap-6 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Full Name"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold text-sm"
                  />
                </div>

                {/* Batch Year */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">Year of Passing (Batch) *</label>
                  <input
                    type="number"
                    name="batchYear"
                    min="1991"
                    max="2026"
                    value={formData.batchYear}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 2012"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold text-sm"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">Contact Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Mobile Number"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold text-sm"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email ID"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold text-sm"
                  />
                </div>

                {/* Occupation */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">Current Occupation</label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineer"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold text-sm"
                  />
                </div>

                {/* Organization */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">Organization / Company</label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="e.g. Google"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold text-sm"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">Special Remarks / Message to school</label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share a memory or how you want to support..."
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-gold text-navy-deep hover:opacity-95 shadow-gold font-semibold transition duration-300"
              >
                Register Registry Profile
              </button>
            </form>

            <div className="lg:col-span-4 relative group img-hover-effect rounded-3xl overflow-hidden shadow-elegant border border-border h-full min-h-[420px]">
              <img
                src={aboutImage4}
                alt="School Classrooms"
                className="w-full h-full min-h-[420px] object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 bg-navy-deep/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur">
                School Interactive Smart Boards
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
