import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { ClipboardCheck, Sparkles, MessageCircle, Send, CheckCircle2, ArrowRight } from "lucide-react";
import aboutImage4 from "../../images/aboutimage4.jpeg";

export const Route = createFileRoute("/association/registration")({
  head: () => ({
    meta: [
      { title: "Alumni Registration — Brotherhood School" },
      {
        name: "description",
        content:
          "Online registration form to join the Brotherhood Matriculation Higher Secondary School Alumni Association registry.",
      },
    ],
  }),
  component: AlumniRegistrationPage,
});

function AlumniRegistrationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState("");
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

    // Format text message for WhatsApp to 9751071333
    const textMessage =
      `*🎓 New Alumni Registration — Brotherhood Matriculation School*\n\n` +
      `👤 *Full Name:* ${formData.fullName}\n` +
      `📅 *Year of Passing (Batch):* ${formData.batchYear}\n` +
      `📞 *Mobile Phone:* ${formData.phone}\n` +
      `✉️ *Email Address:* ${formData.email}\n` +
      `💼 *Occupation:* ${formData.occupation || "Not Specified"}\n` +
      `🏢 *Organization / College:* ${formData.organization || "Not Specified"}\n` +
      `📝 *Message / Remarks:* ${formData.message || "None"}\n\n` +
      `_Submitted via Brotherhood School Alumni Portal_`;

    const targetNumber = "919751071333";
    const waUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(textMessage)}`;
    setWhatsappLink(waUrl);
    setSubmitted(true);

    // Try to open WhatsApp directly
    try {
      window.open(waUrl, "_blank");
    } catch (err) {
      console.log("Auto-open blocked, user can click the button", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#fcfdfa] text-[#1c2e24]">
      <PageHeader
        eyebrow="Alumni Registry"
        title="Alumni Registration"
        subtitle="Stay in touch, network with batches, and contribute back to your school community."
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-24">
        {submitted ? (
          <div className="bg-white border-2 border-[#d4af37]/50 rounded-[2.5rem] p-8 sm:p-14 text-center shadow-2xl animate-fade-up max-w-2xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="w-20 h-20 rounded-full bg-[#f0f9f4] border-2 border-[#25D366] flex items-center justify-center mx-auto mb-6 shadow-md text-[#25D366]">
              <MessageCircle className="w-10 h-10" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#f4f7f5] text-[#1b4d32] border border-[#e2e8f0] text-xs font-semibold mb-4">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
              Form Details Ready for Dispatch
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#0a2b18] font-bold mb-3">
              Registration Recorded!
            </h2>

            <p className="text-[#55695d] text-sm sm:text-base leading-relaxed mb-6 max-w-lg mx-auto">
              Thank you, <strong className="text-[#0a2b18]">{formData.fullName}</strong>. Your alumni details for Batch <strong className="text-[#0a2b18]">{formData.batchYear}</strong> have been prepared for WhatsApp notification to the school administration at <strong className="text-[#0a2b18]">+91 9751071333</strong>.
            </p>

            {/* Direct WhatsApp Action Button */}
            <div className="space-y-4 mb-8">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-base shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Send Registration via WhatsApp (+91 9751071333)</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <p className="text-xs text-[#7a8c80]">
                If WhatsApp didn&apos;t open automatically, click the button above to deliver your details directly.
              </p>
            </div>

            <div className="p-4 bg-[#f8faf8] border border-[#e2e8f0] rounded-2xl text-left space-y-2 text-xs text-[#55695d] mb-8">
              <div className="font-bold text-[#0a2b18] pb-1 border-b border-[#e2e8f0] flex justify-between">
                <span>Summary of Information:</span>
                <span className="text-[#d4af37]">Code: AL-{Math.floor(10000 + Math.random() * 90000)}</span>
              </div>
              <div><strong>Name:</strong> {formData.fullName}</div>
              <div><strong>Batch Year:</strong> {formData.batchYear}</div>
              <div><strong>Phone:</strong> {formData.phone}</div>
              <div><strong>Email:</strong> {formData.email}</div>
              {formData.occupation && <div><strong>Occupation:</strong> {formData.occupation}</div>}
              {formData.organization && <div><strong>Organization:</strong> {formData.organization}</div>}
              {formData.message && <div><strong>Remarks:</strong> {formData.message}</div>}
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  fullName: "",
                  batchYear: "",
                  phone: "",
                  email: "",
                  occupation: "",
                  organization: "",
                  message: "",
                });
              }}
              className="rounded-full bg-[#0a2b18] text-white hover:bg-[#1b4d32] px-6 py-2.5 text-xs font-semibold tracking-wider transition-colors"
            >
              Register Another Member
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-8 bg-white border border-[#e2e8f0] rounded-[2.5rem] p-8 sm:p-12 shadow-sm space-y-6"
            >
              <div className="border-b border-[#e2e8f0] pb-4 mb-6">
                <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#d4af37] mb-1">
                  <Sparkles className="w-3.5 h-3.5" /> Alumni Directory & Networking
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#0a2b18] font-bold">
                  Alumni Registry Form
                </h3>
                <p className="text-xs sm:text-sm text-[#6c8274] mt-1">
                  Please provide your latest contact and professional details to stay connected with the Brotherhood alumni network.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#0a2b18] font-bold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl border border-[#d6ded8] bg-[#f7faf8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1b4d32]/20 focus:border-[#1b4d32] text-sm text-[#0a2b18] transition-all"
                  />
                </div>

                {/* Batch Year */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#0a2b18] font-bold mb-2">
                    Year of Passing (Batch) *
                  </label>
                  <input
                    type="number"
                    name="batchYear"
                    min="1991"
                    max="2026"
                    value={formData.batchYear}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 2015"
                    className="w-full px-4 py-3 rounded-xl border border-[#d6ded8] bg-[#f7faf8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1b4d32]/20 focus:border-[#1b4d32] text-sm text-[#0a2b18] transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#0a2b18] font-bold mb-2">
                    Contact Phone (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 9876543210"
                    className="w-full px-4 py-3 rounded-xl border border-[#d6ded8] bg-[#f7faf8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1b4d32]/20 focus:border-[#1b4d32] text-sm text-[#0a2b18] transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#0a2b18] font-bold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="e.g. yourname@gmail.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#d6ded8] bg-[#f7faf8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1b4d32]/20 focus:border-[#1b4d32] text-sm text-[#0a2b18] transition-all"
                  />
                </div>

                {/* Occupation */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#0a2b18] font-bold mb-2">
                    Current Occupation
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="e.g. Senior Software Engineer / Doctor"
                    className="w-full px-4 py-3 rounded-xl border border-[#d6ded8] bg-[#f7faf8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1b4d32]/20 focus:border-[#1b4d32] text-sm text-[#0a2b18] transition-all"
                  />
                </div>

                {/* Organization */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#0a2b18] font-bold mb-2">
                    Organization / University
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="e.g. Tata Consultancy Services / IIT"
                    className="w-full px-4 py-3 rounded-xl border border-[#d6ded8] bg-[#f7faf8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1b4d32]/20 focus:border-[#1b4d32] text-sm text-[#0a2b18] transition-all"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#0a2b18] font-bold mb-2">
                  Special Remarks / Message to Alma Mater
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share your fondest school memory or how you wish to mentor current students..."
                  className="w-full px-4 py-3 rounded-xl border border-[#d6ded8] bg-[#f7faf8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1b4d32]/20 focus:border-[#1b4d32] text-sm text-[#0a2b18] transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#1b4d32] via-[#0a2b18] to-[#1b4d32] text-white hover:opacity-95 shadow-lg shadow-[#0a2b18]/20 font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#d4af37]" />
                <span>Submit Registration</span>
              </button>
            </form>

            <div className="lg:col-span-4 relative group rounded-[2.5rem] overflow-hidden shadow-xl border border-[#e2e8f0] h-full min-h-[460px] bg-white">
              <img
                src={aboutImage4}
                alt="School Classrooms"
                className="w-full h-full min-h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a2b18]/90 via-[#0a2b18]/30 to-transparent flex flex-col justify-end p-8 text-white space-y-2">
                <span className="text-[#d4af37] text-xs uppercase font-bold tracking-widest">
                  Brotherhood Alumni Fellowship
                </span>
                <h4 className="font-serif text-2xl font-bold">
                  Once a Student, Always a Brother
                </h4>
                <p className="text-white/80 text-xs font-light leading-relaxed">
                  Join hundreds of accomplished graduates serving across medicine, technology, civil services, and academia globally.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
