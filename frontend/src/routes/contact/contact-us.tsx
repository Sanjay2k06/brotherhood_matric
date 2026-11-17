import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Sparkles, Building, ChevronRight, Bus, Car, Navigation } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  const [focus, setFocus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Please fill in mandatory fields.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="bg-[#fdfdfc] text-[#2d3748] font-sans selection:bg-[#0a2b18] selection:text-white">
      <PageHeader
        eyebrow="Reach Out"
        title="Contact Us"
        subtitle="Get in touch with our helpdesk, office administration, or admissions director."
      />

      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden bg-[#05140b]">
        {/* Cinematic ambient lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#1b4d32_0%,transparent_50%)] opacity-20 pointer-events-none"></div>
        <div className="absolute top-1/2 left-0 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-[#d4af37] rounded-full blur-[100px] sm:blur-[150px] opacity-[0.05] -translate-y-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 grid xl:grid-cols-12 gap-12 sm:gap-16 lg:gap-24 items-start">
          
          {/* Contact Information (Left Column) */}
          <motion.div initial="hidden" animate="visible" variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }} className="xl:col-span-5 space-y-8 sm:space-y-12">
            
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-8 h-[1px] bg-[#d4af37]/60"></div>
                <span className="text-[#d4af37] uppercase tracking-[0.15em] text-xs font-semibold">Directory</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-4 sm:mb-6 break-words">School <span className="italic text-[#d4af37]">Offices</span></h2>
              <p className="text-white/60 font-light text-sm sm:text-base leading-relaxed">
                Whether you have a question about admissions, academics, or events, our dedicated team is here to assist you.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-4 sm:space-y-6">
              {[
                { icon: MapPin, label: "Campus Address", detail: "2nd Street, Kazura Garden, Neelankarai, Chennai 600041" },
                { icon: Phone, label: "Direct Lines & Directory", detail: "Helpdesk: 044-2440133 · 98842 04848\nPrimary Principal: 98415 27192\nSenior Principal: 98842 66448\nCoordinator: 98400 67274\nCampus Manager: 98845 50431\nDrivers: 72009 19168 / 96000 42447" },
                { icon: Mail, label: "Email Address", detail: "info@brotherhoodschool.edu.in" },
                { icon: Clock, label: "Working Hours", detail: "Mon – Fri: 8:30 AM – 3:30 PM\nSat: 9:00 AM – 12:30 PM" },
              ].map((info) => (
                <div key={info.label} className="group flex items-start gap-4 sm:gap-5 p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-[#d4af37]/30 transition-all duration-500 cursor-default">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-[#05140b] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-[#d4af37]/50 transition-transform duration-500">
                    <info.icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#d4af37]" />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold mb-1 group-hover:text-white/70 transition-colors">{info.label}</h4>
                    <div className="text-white/90 font-serif text-base sm:text-lg leading-snug whitespace-pre-line">{info.detail}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 pt-2 sm:pt-4">
              <a href="tel:0442440133" className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 rounded-full bg-[#d4af37] text-[#05140b] px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold tracking-widest uppercase overflow-hidden transition-all hover:scale-105">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                <Phone className="h-4 w-4 relative z-10" /> 
                <span className="relative z-10">Call Helpdesk</span>
              </a>
              <a href="https://wa.me/919884204848" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 rounded-full bg-white/[0.05] border border-white/10 text-white px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold tracking-widest uppercase overflow-hidden transition-all hover:bg-white/10 hover:border-[#25D366]/50">
                <MessageCircle className="h-4 w-4 text-[#25D366] relative z-10" /> 
                <span className="relative z-10">WhatsApp</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Contact Form (Right Column) */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }} className="xl:col-span-7 w-full">
            <div className="relative rounded-2xl sm:rounded-[2.5rem] bg-white p-6 sm:p-8 md:p-12 lg:p-16 shadow-[0_30px_60px_-15px_rgba(10,43,24,0.15)] overflow-hidden">
              {/* Form Graphic Background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#f4f7f5] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-10 sm:py-16"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#f4f7f5] border border-[#e2e8f0] flex items-center justify-center mx-auto mb-6 sm:mb-8 relative">
                      <div className="absolute inset-0 bg-[#d4af37]/20 rounded-full animate-ping opacity-50"></div>
                      <Send className="h-8 w-8 sm:h-10 sm:w-10 text-[#d4af37] ml-1" />
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#0a2b18] mb-3 sm:mb-4">Message Sent!</h2>
                    <p className="text-[#718096] font-light text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-md mx-auto">
                      Thank you for contacting us, <strong className="text-[#0a2b18] font-medium">{name}</strong>. Your query has been logged and our admissions team will email or call you shortly.
                    </p>
                    <div className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-[#f4f7f5] text-[10px] uppercase tracking-[0.2em] text-[#1b4d32] font-bold mb-8 sm:mb-10">
                      <Sparkles className="h-3 w-3 text-[#d4af37]" /> Ref: MSG-{Math.floor(1000 + Math.random() * 9000)}
                    </div>
                    <div>
                      <button
                        onClick={() => { setSubmitted(false); setName(""); setEmail(""); setPhone(""); setMessage(""); }}
                        className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#0a2b18] hover:text-[#d4af37] transition-colors"
                      >
                        Send Another <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit} 
                    className="relative z-10"
                  >
                    <div className="mb-8 sm:mb-10">
                      <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#0a2b18] mb-2 sm:mb-3">Online Enquiry</h3>
                      <p className="text-[#718096] font-light text-xs sm:text-sm">Please fill out the form below and we will get back to you promptly.</p>
                    </div>

                    <div className="space-y-6">
                      {/* Name & Phone Grid */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative">
                          <label className={`absolute left-0 transition-all duration-300 font-bold uppercase tracking-widest text-[10px] ${focus === 'name' || name ? '-top-5 text-[#d4af37]' : 'top-3 text-[#a0aec0]'}`}>Your Name *</label>
                          <input
                            type="text"
                            required
                            value={name}
                            onFocus={() => setFocus('name')}
                            onBlur={() => setFocus(null)}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-transparent border-b-2 border-[#e2e8f0] py-3 text-[#0a2b18] font-medium focus:outline-none focus:border-[#d4af37] transition-colors text-sm sm:text-base"
                          />
                        </div>
                        <div className="relative mt-6 md:mt-0">
                          <label className={`absolute left-0 transition-all duration-300 font-bold uppercase tracking-widest text-[10px] ${focus === 'phone' || phone ? '-top-5 text-[#d4af37]' : 'top-3 text-[#a0aec0]'}`}>Phone Number *</label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onFocus={() => setFocus('phone')}
                            onBlur={() => setFocus(null)}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-transparent border-b-2 border-[#e2e8f0] py-3 text-[#0a2b18] font-medium focus:outline-none focus:border-[#d4af37] transition-colors text-sm sm:text-base"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="relative pt-4">
                        <label className={`absolute left-0 transition-all duration-300 font-bold uppercase tracking-widest text-[10px] ${focus === 'email' || email ? 'top-0 text-[#d4af37]' : 'top-7 text-[#a0aec0]'}`}>Email Address</label>
                        <input
                          type="email"
                          value={email}
                          onFocus={() => setFocus('email')}
                          onBlur={() => setFocus(null)}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-transparent border-b-2 border-[#e2e8f0] py-3 text-[#0a2b18] font-medium focus:outline-none focus:border-[#d4af37] transition-colors mt-4 text-sm sm:text-base"
                        />
                      </div>

                      {/* Message */}
                      <div className="relative pt-4">
                        <label className={`absolute left-0 transition-all duration-300 font-bold uppercase tracking-widest text-[10px] ${focus === 'message' || message ? 'top-0 text-[#d4af37]' : 'top-7 text-[#a0aec0]'}`}>Message / Query *</label>
                        <textarea
                          rows={4}
                          required
                          value={message}
                          onFocus={() => setFocus('message')}
                          onBlur={() => setFocus(null)}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full bg-transparent border-b-2 border-[#e2e8f0] py-3 text-[#0a2b18] font-medium focus:outline-none focus:border-[#d4af37] transition-colors mt-4 resize-none text-sm sm:text-base"
                        />
                      </div>

                      {/* Submit */}
                      <div className="pt-6 sm:pt-8 flex justify-end">
                        <button
                          type="submit"
                          className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 rounded-full bg-[#05140b] text-white px-8 sm:px-10 py-3.5 sm:py-4 text-xs sm:text-sm font-bold tracking-widest uppercase overflow-hidden transition-all hover:bg-[#0a2b18] hover:shadow-[0_10px_20px_rgba(10,43,24,0.2)] hover:-translate-y-1"
                        >
                          <span className="relative z-10">Send Message</span>
                          <Send className="h-4 w-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Edge-to-Edge Map Section */}
      <section className="relative h-[80vh] min-h-[500px] sm:min-h-[600px] w-full bg-[#e2e8f0] overflow-hidden">
        <div className="absolute inset-0 bg-[#0a2b18]/10 pointer-events-none z-10"></div>
        <iframe
          title="Brotherhood School Google Map Location"
          src="https://www.google.com/maps?q=Neelankarai,+Palavakkam,+Chennai,+Tamil+Nadu+600041&output=embed"
          className="w-full h-full grayscale-[20%] contrast-[1.1] opacity-90"
          loading="lazy"
        />
        
        {/* Floating Campus Badge over Map */}
        <div className="absolute top-4 left-4 right-4 sm:right-auto sm:top-10 sm:left-10 md:left-20 z-20 bg-white/95 backdrop-blur-md p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl max-w-sm border border-white">
          <div className="w-14 h-14 rounded-full bg-[#1b4d32] flex items-center justify-center mb-6 shadow-lg">
            <Building className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-serif text-3xl text-[#0a2b18] mb-2">Neelankarai Campus</h3>
          <p className="text-[#718096] text-sm font-light leading-relaxed mb-6 pb-6 border-b border-[#e2e8f0]">2nd Street, Kazura Garden, Neelankarai, Palavakkam, Chennai, Tamil Nadu 600041</p>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <Bus className="h-5 w-5 text-[#d4af37] shrink-0" />
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-[#0a2b18] font-bold mb-1">By Bus</h4>
                <p className="text-[#718096] text-xs font-light leading-relaxed">Get down at Neelankarai Bus Stop on East Coast Road (ECR). The school is a 5-minute walk down 2nd Street.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Car className="h-5 w-5 text-[#d4af37] shrink-0" />
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-[#0a2b18] font-bold mb-1">By Car / Two-Wheeler</h4>
                <p className="text-[#718096] text-xs font-light leading-relaxed">Drive down ECR towards Neelankarai. Turn into Kazura Garden Street and proceed to 2nd Street.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Navigation className="h-5 w-5 text-[#d4af37] shrink-0" />
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-[#0a2b18] font-bold mb-1">Landmarks</h4>
                <p className="text-[#718096] text-xs font-light leading-relaxed">Located near Kazura Garden Children's Park.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
