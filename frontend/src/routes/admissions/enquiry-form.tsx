import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { MessageSquareReply, Sparkles } from "lucide-react";
import aboutImage3 from "../../images/aboutimage3.jpg";

export const Route = createFileRoute("/admissions/enquiry-form")({
  head: () => ({
    meta: [
      { title: "Enquiry Form — Brotherhood School" },
      { name: "description", content: "Submit an admission query or general enquiry to Brotherhood School." },
    ],
  }),
  component: EnquiryFormPage,
});

function EnquiryFormPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    parentName: "",
    studentName: "",
    phone: "",
    email: "",
    gradeInterest: "Pre-KG",
    message: "",
  });

  const grades = [
    "Pre-KG", "LKG", "UKG",
    "Class I to V",
    "Class VI to X",
    "Class XI & XII"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName || !formData.phone || !formData.studentName) {
      alert("Please fill in all mandatory fields.");
      return;
    }
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <PageHeader
        eyebrow="Admissions Portal"
        title="Enquiry Form"
        subtitle="Submit a quick question or query about academic intakes and campus visits."
      />

      <section className="max-w-7xl mx-auto px-6 py-20">
        {submitted ? (
          <div className="bg-card border border-gold/40 rounded-3xl p-10 text-center shadow-elegant animate-fade-up max-w-xl mx-auto">
            <div className="h-16 w-16 rounded-full bg-primary/5 grid place-items-center mx-auto mb-6">
              <MessageSquareReply className="h-8 w-8 text-gold" />
            </div>
            <h2 className="font-display text-3xl text-primary font-bold mb-4">Enquiry Received!</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Thank you for reaching out, <strong className="text-primary">{formData.parentName}</strong>. Our admissions helpdesk has received your enquiry regarding Class <strong className="text-primary">{formData.gradeInterest}</strong> admissions and will call you on <strong className="text-primary">{formData.phone}</strong> shortly.
            </p>
            <div className="text-xs uppercase tracking-widest text-gold font-semibold flex items-center justify-center gap-1.5">
              <Sparkles className="h-4 w-4" /> Ticket Reference: ENQ-{Math.floor(10000 + Math.random() * 90000)}
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-8 rounded-full bg-primary text-white hover:bg-primary/95 px-6 py-2.5 text-xs font-semibold"
            >
              Send Another Enquiry
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <form onSubmit={handleSubmit} className="lg:col-span-8 bg-card border border-border rounded-3xl p-8 sm:p-12 shadow-sm space-y-6">
            <h3 className="font-display text-2xl text-primary font-bold border-b border-border pb-4 mb-6">Admission Enquiry Form</h3>

            {/* Parent Name */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">Parent / Guardian Name *</label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                required
                placeholder="Parent's Full Name"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold text-sm"
              />
            </div>

            {/* Student Name */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">Student Name *</label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                required
                placeholder="Student's Name"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold text-sm"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* Contact Number */}
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

              {/* Class Interested In */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">Class Interested In *</label>
                <select
                  name="gradeInterest"
                  value={formData.gradeInterest}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold text-sm"
                >
                  {grades.map((grade) => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email ID"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold text-sm"
              />
            </div>

            {/* Message / Query */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">Message / Admission Query</label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your specific queries here..."
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-gradient-gold text-navy-deep hover:opacity-95 shadow-gold font-semibold transition duration-300"
            >
              Submit Enquiry Ticket
            </button>
          </form>
          <div className="lg:col-span-4 relative group img-hover-effect rounded-3xl overflow-hidden shadow-elegant border border-border h-full min-h-[450px]">
            <img
              src={aboutImage3}
              alt="School Main Gate Entrance"
              className="w-full h-full min-h-[450px] object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 bg-navy-deep/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur">
              School Campus Gateway
            </div>
          </div>
        </div>
        )}
      </section>
    </>
  );
}
