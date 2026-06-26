import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Sparkles } from "lucide-react";
import aboutImage2 from "../../images/aboutimage2.jpg";

export const Route = createFileRoute("/contact/contact-us")({
  head: () => ({
    meta: [
      { title: "Contact Us — Brotherhood School" },
      { name: "description", content: "Contact info, address, telephone numbers, emails, and enquiry form for Brotherhood Matriculation School." },
    ],
  }),
  component: ContactUsPage,
});

function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Please fill in mandatory fields.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <>
      <PageHeader
        eyebrow="Reach Out"
        title="Contact Us"
        subtitle="Get in touch with our helpdesk, office administration, or admissions director."
      />

      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="font-display text-3xl text-primary font-bold mb-6">Contact Information</h2>

          {[
            { icon: MapPin, label: "Campus Address", detail: "2nd Street, Kazura Garden, Neelankarai, Palavakkam, Chennai, Tamil Nadu 600041" },
            { icon: Phone, label: "Phone Numbers", detail: "044-2440133  ·  98842 04848" },
            { icon: Mail, label: "Email Address", detail: "info@brotherhoodschool.edu.in" },
            { icon: Clock, label: "Office Timings", detail: "Monday – Friday: 8:30 AM – 3:30 PM  ·  Saturday: 9:00 AM – 12:30 PM" },
          ].map((info) => (
            <div key={info.label} className="flex gap-4 bg-card border border-border rounded-2xl p-6 shadow-sm">
              <div className="h-11 w-11 rounded-xl bg-primary/5 grid place-items-center shrink-0">
                <info.icon className="h-5 w-5 text-gold" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-gold font-semibold">{info.label}</h4>
                <div className="text-foreground text-sm sm:text-base mt-1 font-medium">{info.detail}</div>
              </div>
            </div>
          ))}

          {/* Quick Buttons */}
          <div className="flex flex-wrap gap-4 pt-6">
            <a
              href="tel:0442440133"
              className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary/95 text-white px-6 py-3.5 text-sm font-semibold transition duration-300 animate-pulse"
            >
              <Phone className="h-4 w-4 text-gold" /> Call Office
            </a>
            <a
              href="https://wa.me/919884204848"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3.5 text-sm font-semibold transition duration-300"
            >
              <MessageCircle className="h-4 w-4 fill-white text-[#25D366]" /> Chat on WhatsApp
            </a>
          </div>

          {/* Visual Image Banner */}
          <div className="relative group img-hover-effect rounded-3xl overflow-hidden shadow-elegant border border-border mt-8">
            <img
              src={aboutImage2}
              alt="School Reception Courtyard"
              className="w-full h-[220px] object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-3 left-3 bg-navy-deep/80 text-white text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full backdrop-blur">
              Campus Reception Walkway
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          {submitted ? (
            <div className="bg-card border border-gold/40 rounded-3xl p-10 text-center shadow-elegant animate-fade-up">
              <div className="h-16 w-16 rounded-full bg-primary/5 grid place-items-center mx-auto mb-6">
                <Send className="h-8 w-8 text-gold" />
              </div>
              <h2 className="font-display text-3xl text-primary font-bold mb-4">Message Sent!</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Thank you for contacting us, <strong className="text-primary">{name}</strong>. Your query has been logged. We will email or call you shortly.
              </p>
              <div className="text-xs uppercase tracking-widest text-gold font-semibold flex items-center justify-center gap-1.5">
                <Sparkles className="h-4 w-4" /> Message Ref: MSG-{Math.floor(1000 + Math.random() * 9000)}
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-8 rounded-full bg-primary text-white hover:bg-primary/95 px-6 py-2.5 text-xs font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-sm space-y-5">
              <h3 className="font-display text-2xl text-primary font-bold mb-4">Send Us a Message</h3>

              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email ID"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Mobile Number"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you today?"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-gold text-navy-deep hover:opacity-95 shadow-gold font-semibold transition duration-300"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Google Map Section */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="font-display text-3xl text-primary font-bold text-center mb-8">Our Campus Location</h2>
        <div className="rounded-3xl overflow-hidden border border-border shadow-elegant aspect-[16/7] bg-card">
          <iframe
            title="Brotherhood School Google Map Location"
            src="https://www.google.com/maps?q=Neelankarai,+Palavakkam,+Chennai,+Tamil+Nadu+600041&output=embed"
            className="w-full h-full"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
}
