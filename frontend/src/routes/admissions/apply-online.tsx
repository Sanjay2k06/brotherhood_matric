import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { ClipboardCheck, Sparkles } from "lucide-react";
import aboutImage4 from "../../images/aboutimage4.jpeg";

export const Route = createFileRoute("/admissions/apply-online")({
  head: () => ({
    meta: [
      { title: "Apply Online — Brotherhood School" },
      { name: "description", content: "Online admission application form for class admissions at Brotherhood Matriculation Hr. Sec. School." },
    ],
  }),
  component: ApplyOnlinePage,
});

function ApplyOnlinePage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    candidateName: "",
    dob: "",
    gender: "Male",
    gradeApplied: "Pre-KG",
    fatherName: "",
    motherName: "",
    phone: "",
    email: "",
    address: "",
  });

  const grades = [
    "Pre-KG", "LKG", "UKG",
    "Class I", "Class II", "Class III", "Class IV", "Class V",
    "Class VI", "Class VII", "Class VIII", "Class IX", "Class X",
    "Class XI - Group 2502 (Science + Comp Sci)",
    "Class XI - Group 2503 (Science + Biology)",
    "Class XI - Group 2702 (Commerce + Comp App)",
    "Class XI - Group 2708 (Commerce + Business Maths)",
    "Class XII - Group 2502 (Science + Comp Sci)",
    "Class XII - Group 2503 (Science + Biology)",
    "Class XII - Group 2702 (Commerce + Comp App)",
    "Class XII - Group 2708 (Commerce + Business Maths)"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.candidateName || !formData.dob || !formData.fatherName || !formData.phone) {
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
        title="Apply Online"
        subtitle="Submit candidate academic details to apply for standard-setting class intakes."
      />

      <section className="max-w-7xl mx-auto px-6 py-20">
        {submitted ? (
          <div className="bg-card border border-gold/40 rounded-3xl p-10 text-center shadow-elegant animate-fade-up max-w-xl mx-auto">
            <div className="h-16 w-16 rounded-full bg-primary/5 grid place-items-center mx-auto mb-6">
              <ClipboardCheck className="h-8 w-8 text-gold" />
            </div>
            <h2 className="font-display text-3xl text-primary font-bold mb-4">Application Submitted!</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Thank you for applying to Brotherhood School. Our admissions coordinator will review the application and contact you on <strong className="text-primary">{formData.phone}</strong> within 48 working hours.
            </p>
            <div className="text-xs uppercase tracking-widest text-gold font-semibold flex items-center justify-center gap-1.5">
              <Sparkles className="h-4 w-4" /> Application Code: BS-{Math.floor(100000 + Math.random() * 900000)}
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-8 rounded-full bg-primary text-white hover:bg-primary/95 px-6 py-2.5 text-xs font-semibold"
            >
              Submit Another Form
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <form onSubmit={handleSubmit} className="lg:col-span-8 bg-card border border-border rounded-3xl p-8 sm:p-12 shadow-sm space-y-6">
            <h3 className="font-display text-2xl text-primary font-bold border-b border-border pb-4 mb-6">Online Application Form</h3>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* Candidate Name */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">Candidate Name *</label>
                <input
                  type="text"
                  name="candidateName"
                  value={formData.candidateName}
                  onChange={handleChange}
                  required
                  placeholder="Full Name of Student"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold text-sm"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">Date of Birth *</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold text-sm"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold text-sm"
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              {/* Grade Applied For */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">Grade Applied For *</label>
                <select
                  name="gradeApplied"
                  value={formData.gradeApplied}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold text-sm"
                >
                  {grades.map((grade) => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>

              {/* Father Name */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">Father's Name *</label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  required
                  placeholder="Father's Full Name"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold text-sm"
                />
              </div>

              {/* Mother Name */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">Mother's Name *</label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  required
                  placeholder="Mother's Full Name"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold text-sm"
                />
              </div>

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

              {/* Email Address */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Parent's Email ID"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold text-sm"
                />
              </div>
            </div>

            {/* Residential Address */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">Residential Address *</label>
              <textarea
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Complete postal address..."
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-gradient-gold text-navy-deep hover:opacity-95 shadow-gold font-semibold transition duration-300"
            >
              Submit Application Form
            </button>
          </form>
          <div className="lg:col-span-4 relative group img-hover-effect rounded-3xl overflow-hidden shadow-elegant border border-border h-full min-h-[450px]">
            <img
              src={aboutImage4}
              alt="School Classroom Environment"
              className="w-full h-full min-h-[450px] object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 bg-navy-deep/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur">
              Interactive Smart Desks
            </div>
          </div>
        </div>
        )}
      </section>
    </>
  );
}
