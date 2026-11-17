import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import principalImage from "../../images/principal_portrait (2).jpg"; 
import heroImage from "../../images/aboutimage3.jpg"; 
import { PageHeader } from "@/components/PageHeader";
import { fadeUp, staggerContainer } from "../../lib/motion";

export const Route = createFileRoute("/academics/founder-message")({
  head: () => ({
    meta: [
      { title: "Chairman's Message — Brotherhood School" },
      { name: "description", content: "Official welcoming statement and vision details from the Chairman, Rev. Fr. Anton Cruz." },
    ],
  }),
  component: FounderMessagePage,
});

function FounderMessagePage() {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/pages/founder-message/")
      .then(res => res.json())
      .then(data => {
        if (data && data.content_blocks) {
          setPageData(data);
        }
      })
      .catch(err => console.error("Error loading dynamic page content:", err));
  }, []);

  const heroTitle = pageData?.hero_title || "Rev. Fr. Anton Cruz";
  const heroSubtitle = pageData?.hero_subtitle || "A Vision That Continues To Inspire Generations";
  
  const name = pageData?.content_blocks?.name || "Rev. Fr. Anton Cruz";
  const designation = pageData?.content_blocks?.designation || "Founder & Chairman";
  const servingSince = pageData?.content_blocks?.serving_since || "Serving Since 1991";
  const introText = pageData?.content_blocks?.intro || "With a profound commitment to holistic education and moral integrity, Rev. Fr. Anton Cruz laid the foundations of Brotherhood Matriculation Higher Secondary School. His visionary leadership established an enduring sanctuary of learning where every child is empowered through quality instruction, reason, and faith.";
  const quoteText = pageData?.content_blocks?.quote || "Character Formation Through Quality Education";
  const messageTitle = pageData?.content_blocks?.message_title || "Chairman & Founder's Visionary Message";
  const messageP1 = pageData?.content_blocks?.message_p1 || "Be strong in spiritual values. Every building speaks of the sacrifices made by your parents and grandparents. Every window represents the freedom of your thoughts in your future journey. Every classroom is the inner womb where your destiny is shaped. Every school bag carries your dreams, ambitions, and vision for the future. Every student is the architect of innovation and new discoveries, and every line written in your notebook contributes to the destiny of our nation. Every teacher you meet becomes the blueprint of your inner quest for knowledge and wisdom.";
  const messageP2 = pageData?.content_blocks?.message_p2 || "You are the builder of your own future, while your parents, teachers, and principal serve as your guides and mentors. Every school is the birthplace of God's love. Cherish it, nurture it, and let it transform your life. My prayer is that Brotherhood Group of Schools continues to raise future leaders with strong human and Godly values, expands its mission to every state of India and beyond, and reaches poor and needy children through quality education. Every child is truly a precious gift from God.";

  // Format first letter to drop cap
  const firstLetter = messageP1.charAt(0);
  const remainingText = messageP1.slice(1);

  return (
    <div className="bg-[#fdfdfc] text-[#2d3748] font-sans selection:bg-[#0a2b18] selection:text-white">
      
      {/* 1. Hero Banner */}
      <PageHeader 
        eyebrow="Chairman"
        title={heroTitle}
        subtitle={`"${heroSubtitle.replace(/"/g, "")}"`}
        backgroundImage={heroImage}
      />

      {/* 2. Founder Profile */}
      <section className="py-24 md:py-32 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
            className="w-full md:w-[45%] relative group"
          >
            <div className="absolute inset-0 bg-[#d4af37] rounded-3xl translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 opacity-20 transition-transform duration-500 group-hover:translate-x-5 group-hover:translate-y-5"></div>
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-[#0a2b18]">
               <img src={principalImage} alt={name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 sepia-[0.1]" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a2b18]/60 via-transparent to-transparent opacity-80"></div>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="w-full md:w-[55%] space-y-8"
          >
            <motion.div variants={fadeUp}>
              <div className="w-16 h-16 rounded-full bg-[#f4f7f5] flex items-center justify-center mb-8 border border-[#e2e8f0]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a2b18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h2 className="font-serif text-4xl text-[#0a2b18] mb-2">{name}</h2>
              <p className="text-[#d4af37] uppercase tracking-widest text-xs font-semibold">{designation}</p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-widest text-[#718096] border border-[#cbd5e1] rounded-full px-4 py-1">{servingSince}</span>
            </motion.div>

            <motion.p variants={fadeUp} className="text-[#4a5568] text-lg font-light leading-relaxed">
              {introText}
            </motion.p>
            
            <motion.div variants={fadeUp} className="pt-4">
              <div className="font-serif italic text-3xl text-[#0a2b18]/70" style={{ fontFamily: 'Georgia, serif', transform: 'rotate(-2deg)' }}>
                {name}
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
            {quoteText}
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
              {messageTitle}
            </motion.p>
            
            <motion.p variants={fadeUp} className="pt-4">
              <span className="float-left text-7xl font-serif text-[#0a2b18] pr-5 pt-3 leading-none">{firstLetter}</span>
              {remainingText}
            </motion.p>
            
            <motion.p variants={fadeUp}>
              {messageP2}
            </motion.p>
            
            {/* 5. Signature Block */}
            <motion.div variants={fadeUp} className="mt-20 pt-12 border-t border-[#e2e8f0] flex flex-col items-center md:items-start text-center md:text-left">
              <div className="font-serif italic text-4xl text-[#0a2b18] mb-4 opacity-90" style={{ fontFamily: 'Georgia, serif', transform: 'rotate(-2deg)' }}>
                {name}
              </div>
              <p className="text-[#0a2b18] font-medium text-lg">{designation}</p>
              <p className="text-[#718096] text-sm uppercase tracking-widest mt-1">Brotherhood Educational and Charitable Trust</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 6. Related Navigation CTA */}
      <section className="py-20 px-6 bg-[#f4f7f5] border-t border-[#e2e8f0]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#718096] uppercase tracking-widest text-xs font-semibold mb-8 block">Continue Exploring</span>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link to="/about/vision-mission" className="w-full sm:w-auto group flex items-center justify-between gap-4 px-8 py-4 bg-white border border-[#e2e8f0] rounded-full hover:border-[#0a2b18]/30 hover:shadow-lg transition-all duration-300">
              <span className="text-[#0a2b18] font-medium">Vision & Mission</span>
              <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link to="/about/principal-message" className="w-full sm:w-auto group flex items-center justify-between gap-4 px-8 py-4 bg-white border border-[#e2e8f0] rounded-full hover:border-[#0a2b18]/30 hover:shadow-lg transition-all duration-300">
              <span className="text-[#0a2b18] font-medium">Principal's Message</span>
              <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link to="/about/about-school" className="w-full sm:w-auto group flex items-center justify-between gap-4 px-8 py-4 bg-[#0a2b18] border border-[#0a2b18] rounded-full hover:bg-[#1b4d32] transition-colors duration-300">
              <span className="text-white font-medium">About the School</span>
              <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
