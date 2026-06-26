import aboutImage4 from "../images/aboutimage4.jpeg";
import BlurText from "./BlurText";

export function PageHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section className="relative -mt-16 pt-16 overflow-hidden">
      {/* Untinted original color campus background image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${aboutImage4})` }} />
      <div className="relative max-w-7xl mx-auto px-6 py-20 sm:py-24 md:py-28 text-white text-shadow-premium">
        {eyebrow && (
          <div className="text-xs uppercase tracking-[0.25em] text-gold font-bold mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
            <BlurText text={eyebrow} animateBy="letters" delay={10} direction="bottom" />
          </div>
        )}
        <h1 className="font-display text-5xl md:text-6xl font-bold text-balance max-w-3xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
          <BlurText text={title} animateBy="words" delay={30} direction="top" />
        </h1>
        {subtitle && (
          <p className="mt-5 text-lg text-white/95 max-w-2xl font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            <BlurText text={subtitle} animateBy="words" delay={20} direction="bottom" />
          </p>
        )}
      </div>
    </section>
  );
}