import aboutImage4 from "../images/aboutimage4.jpeg";
import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "../lib/motion";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export function PageHeader({ eyebrow, title, subtitle, backgroundImage = aboutImage4 }: PageHeaderProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#05140b] pt-16 min-h-[75vh] md:min-h-screen flex items-center">
      {/* Cinematic Background Image with entry animation */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.15, filter: "blur(10px)" }}
        animate={{ scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={backgroundImage}
          alt="Header Background"
          decoding="async"
          fetchPriority="high"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Dramatic Multi-layered Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a2b18]/95 via-[#0a2b18]/70 to-[#0a2b18]/30 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05140b] via-transparent to-transparent z-10 opacity-95" />
      <div className="absolute inset-0 bg-[#05140b]/30 mix-blend-multiply z-10" />
      
      {/* Decorative Orbs for Premium feel */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#d4af37]/15 rounded-full blur-[100px] sm:blur-[120px] mix-blend-screen pointer-events-none z-10"></div>
      <div className="absolute -bottom-20 -left-20 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-[#1b4d32]/40 rounded-full blur-[80px] sm:blur-[100px] mix-blend-screen pointer-events-none z-10"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full py-16 sm:py-24 md:py-32 flex flex-col justify-center h-full">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl space-y-4 sm:space-y-6 flex flex-col items-start"
        >
          {eyebrow && (
            <motion.div variants={fadeUp} className="inline-flex items-center gap-3 sm:gap-4">
              <div className="h-[1px] w-6 sm:w-8 bg-[#d4af37]"></div>
              <span className="text-[#d4af37] text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold">
                {eyebrow}
              </span>
              <div className="h-[1px] w-6 sm:w-8 bg-[#d4af37]"></div>
            </motion.div>
          )}
          
          <motion.h1 variants={fadeUp} className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-[4.5rem] font-normal text-white text-balance drop-shadow-2xl leading-[1.12] sm:leading-[1.05] tracking-tight break-words">
            {title}
          </motion.h1>
          
          {subtitle && (
            <motion.div variants={fadeUp} className="border-l-2 border-[#d4af37]/40 pl-4 sm:pl-6 py-1 mt-2">
              <p className="text-[#e2e8f0] text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-2xl opacity-90 text-balance">
                {subtitle}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Elegant Scroll Indicator */}
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 2.5, duration: 1 }}
         className="absolute bottom-12 left-6 lg:left-12 flex flex-col items-center gap-4 z-20 hidden md:flex"
      >
         <span className="uppercase text-[9px] tracking-[0.4em] text-white/50 -rotate-90 origin-bottom whitespace-nowrap mb-8 font-medium">Scroll</span>
         <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
            <motion.div 
              animate={{ y: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-white/80 to-transparent"
            />
         </div>
      </motion.div>
    </section>
  );
}