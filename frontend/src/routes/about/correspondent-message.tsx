import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import correspondentImage from "../../images/correspondent_image.jpeg"; 
import heroImage from "../../images/aboutimage3.jpg"; 
import { PageHeader } from "@/components/PageHeader";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { API_BASE } from "@/config";

export const Route = createFileRoute("/about/correspondent-message")({
  head: () => ({
    meta: [
      { title: "Correspondent's Message — Brotherhood School" },
      { name: "description", content: "Official welcoming statement and vision details from the Correspondent, Mr. J. Jeyakumar." },
    ],
  }),
  component: CorrespondentMessagePage,
});

function CorrespondentMessagePage() {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_BASE}/pages/correspondent-message/`)
      .then(res => res.json())
      .then(data => {
        if (data && data.content_blocks) {
          setPageData(data);
        }
      })
      .catch(err => console.error("Error loading dynamic page content:", err));
  }, []);

  const heroTitle = pageData?.hero_title || "Mr. J. Jeyakumar";
  const heroSubtitle = pageData?.hero_subtitle || "Correspondent";
  const introText = pageData?.content_blocks?.intro || "I am delighted and privileged to welcome all students, parents, and teachers to Brotherhood Matriculation Higher Secondary School and to a new academic year filled with opportunities for learning and growth.";
  const messageP1 = pageData?.content_blocks?.message_p1 || "Our institution is committed to providing every child with the highest level of care, encouragement, and academic support. We believe that education should inspire curiosity, confidence, and excellence while nurturing strong moral values. Our experienced and highly qualified teaching faculty adopts modern and innovative teaching methodologies to make learning meaningful, engaging, and student-centered.";
  const messageP2 = pageData?.content_blocks?.message_p2 || "Our vision is to help every child discover their unique strengths, unlock their full potential, and confidently face the challenges of an ever-changing world. Alongside academic excellence, we emphasize character formation, leadership, discipline, creativity, and social responsibility. We sincerely seek the continued cooperation, blessings, and support of parents and well-wishers in fulfilling our shared mission of shaping responsible, compassionate, and successful future citizens.";

  return (
    <div className="bg-[#fdfdfc] text-[#2d3748] font-sans selection:bg-[#0a2b18] selection:text-white">
      
      {/* 1. Hero Banner */}
      <PageHeader 
        eyebrow="Correspondent"
        title={heroTitle}
        subtitle={heroSubtitle}
        backgroundImage={heroImage}
      />

      {/* 2. Profile section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden">
        <div className="flex flex-col md:flex-row gap-12 sm:gap-16 lg:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
            className="w-full md:w-[45%] relative group max-w-md mx-auto"
          >
            <div className="absolute inset-0 bg-[#d4af37] rounded-3xl translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 opacity-20 transition-transform duration-500 group-hover:translate-x-5 group-hover:translate-y-5"></div>
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-[#0a2b18] border-2 border-[#d4af37]/30">
               <img 
                 src={pageData?.featured_image || correspondentImage} 
                 alt="Mr. J. Jeyakumar — Correspondent" 
                 loading="eager"
                 decoding="async"
                 className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a2b18]/60 via-transparent to-transparent opacity-80 pointer-events-none"></div>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="w-full md:w-[55%] space-y-6 sm:space-y-8"
          >
            <motion.div variants={fadeUp}>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#f4f7f5] flex items-center justify-center mb-6 sm:mb-8 border border-[#e2e8f0]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a2b18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0a2b18] mb-2 break-words">{heroTitle}</h2>
              <p className="text-[#d4af37] uppercase tracking-widest text-xs font-semibold">{heroSubtitle}</p>
            </motion.div>

            <motion.p variants={fadeUp} className="text-[#4a5568] text-lg font-light leading-relaxed">
              {introText}
            </motion.p>
            
            <motion.div variants={fadeUp} className="pt-4">
              <div className="font-serif italic text-3xl text-[#0a2b18]/70" style={{ fontFamily: 'Georgia, serif', transform: 'rotate(-2deg)' }}>
                Mr. J. Jeyakumar
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* 3. Highlighted Vision Statement (Quote) */}
      <section className="py-32 px-6 bg-[#f4f7f5] text-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <div className="text-[120px] font-serif text-[#d4af37] opacity-20 leading-none absolute -top-16 left-1/2 -translate-x-1/2 select-none">
            "
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-[#0a2b18] leading-[1.4] italic relative z-10 pt-8">
            Nurturing moral values, <br className="hidden md:block"/> confidence and excellence.
          </h2>
          <div className="w-24 h-[1px] bg-[#d4af37] mx-auto mt-12"></div>
        </motion.div>
      </section>

      {/* 4. Main Letter */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[760px] mx-auto">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
            className="space-y-10 text-[19px] leading-[1.9] text-[#2d3748] font-light"
          >
            <motion.p variants={fadeUp} className="font-serif text-2xl md:text-3xl text-[#0a2b18] pb-8 border-b border-[#e2e8f0]">
              Correspondent's Welcome Message
            </motion.p>
            
            <motion.p variants={fadeUp} className="pt-4">
              {messageP1}
            </motion.p>
            
            <motion.p variants={fadeUp}>
              {messageP2}
            </motion.p>
            
            {/* 5. Signature Block */}
            <motion.div variants={fadeUp} className="mt-20 pt-12 border-t border-[#e2e8f0] flex flex-col items-center md:items-start text-center md:text-left">
              <div className="font-serif italic text-4xl text-[#0a2b18] mb-4 opacity-90" style={{ fontFamily: 'Georgia, serif', transform: 'rotate(-2deg)' }}>
                J. Jeyakumar
              </div>
              <p className="text-[#0a2b18] font-medium text-lg">Correspondent</p>
              <p className="text-[#718096] text-sm uppercase tracking-widest mt-1">Brotherhood Matriculation Higher Secondary School</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 6. Related Navigation CTA */}
      <section className="py-20 px-6 bg-[#f4f7f5] border-t border-[#e2e8f0]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#718096] uppercase tracking-widest text-xs font-semibold mb-8 block">Continue Exploring</span>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link to="/about/about-school" className="w-full sm:w-auto group flex items-center justify-between gap-4 px-8 py-4 bg-white border border-[#e2e8f0] rounded-full hover:border-[#0a2b18]/30 hover:shadow-lg transition-all duration-300">
              <span className="text-[#0a2b18] font-medium">About the School</span>
              <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link to="/about/principal-message" className="w-full sm:w-auto group flex items-center justify-between gap-4 px-8 py-4 bg-white border border-[#e2e8f0] rounded-full hover:border-[#0a2b18]/30 hover:shadow-lg transition-all duration-300">
              <span className="text-[#0a2b18] font-medium">Principal's Message</span>
              <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link to="/academics/founder-message" className="w-full sm:w-auto group flex items-center justify-between gap-4 px-8 py-4 bg-[#0a2b18] border border-[#0a2b18] rounded-full hover:bg-[#1b4d32] transition-colors duration-300">
              <span className="text-white font-medium">Chairman's Message</span>
              <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
