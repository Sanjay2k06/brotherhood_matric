import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { useState, useEffect } from "react";
import principalImage from "../../images/Principal-Photo.jpg";
import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export const Route = createFileRoute("/about/principal-message")({
  head: () => ({
    meta: [
      { title: "Principal's Message — Brotherhood School" },
      { name: "description", content: "Official message and welcome note from the Principal of Brotherhood Matriculation Hr. Sec. School." },
    ],
  }),
  component: PrincipalMessagePage,
});

function PrincipalMessagePage() {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/pages/principal-message/")
      .then(res => res.json())
      .then(data => {
        if (data && data.content_blocks) {
          setPageData(data);
        }
      })
      .catch(err => console.error("Error loading dynamic page content:", err));
  }, []);

  const heroTitle = pageData?.hero_title || "Principal's Message";
  const heroSubtitle = pageData?.hero_subtitle || "Read the welcome statement and educational vision from our head of school.";
  
  const primaryTitle = pageData?.content_blocks?.primary_title || "Mrs. Helen Johnson — Principal (Primary Wing)";
  const primaryP1 = pageData?.content_blocks?.primary_message_p1 || "Welcome to Brotherhood Primary Wing, where every child's educational journey begins with love, care, and inspiration. We are committed to creating a safe, nurturing, joyful, and stimulating learning environment that encourages children to explore, imagine, and develop a lifelong love for learning.";
  const primaryP2 = pageData?.content_blocks?.primary_message_p2 || "Our dedicated team of teachers works tirelessly to foster curiosity, creativity, confidence, communication, and independent thinking through activity-based learning, hands-on experiences, and positive social interactions. We believe that every child possesses unique talents and abilities, and our goal is to help each learner grow academically, emotionally, socially, and morally.";
  const primaryP3 = pageData?.content_blocks?.primary_message_p3 || "We value the strong partnership between home and school and encourage parents to remain actively involved in their child's educational journey. Together, we can create meaningful learning experiences that help every child build a strong foundation for future success. Thank you for placing your trust in Brotherhood Primary Wing. We look forward to making every school year joyful, memorable, and enriching for every child.";

  const secondaryTitle = pageData?.content_blocks?.secondary_title || "Mrs. Shima Newton — Principal (Higher Secondary Wing)";
  const secondaryP1 = pageData?.content_blocks?.secondary_message_p1 || "Education is not merely the acquisition of knowledge but the development of life skills, values, character, and personality. At Brotherhood Matriculation Higher Secondary School, we are committed to providing value-based education that empowers students to become responsible, compassionate, and confident individuals.";
  const secondaryP2 = pageData?.content_blocks?.secondary_message_p2 || "Our teaching-learning environment encourages academic excellence while nurturing creativity, innovation, leadership, and social awareness. We strive to instill compassion and sensitivity toward the less fortunate so that our students grow into socially responsible citizens capable of bringing positive change to society.";
  const secondaryP3 = pageData?.content_blocks?.secondary_message_p3 || "The warm, caring, and disciplined atmosphere within our school creates an environment where every child can learn with confidence and enthusiasm. Our dedicated teachers motivate each student to achieve their highest potential, while the continued support and cooperation of parents remain essential to our success. Together, we continue to fulfill our Founder's vision of providing quality education rooted in values, discipline, and excellence.";

  return (
    <>
      <PageHeader
        eyebrow="Leadership Welcome"
        title={heroTitle}
        subtitle={heroSubtitle}
      />

      <section className="py-24 md:py-32 px-6 bg-[#f7faf8] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start relative">
            
            {/* Background Accent */}
            <div className="hidden lg:block absolute top-0 left-[41.666%] -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#d4af37]/20 to-transparent"></div>

            {/* Principal Photograph */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(10,43,24,0.2)] aspect-[3/4] bg-white p-2">
                <div className="w-full h-full rounded-[2rem] overflow-hidden relative group">
                  <img
                    src={principalImage}
                    alt="School Principals"
                    className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#0a2b18]/10 mix-blend-multiply transition-colors duration-700 group-hover:bg-transparent"></div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-8 -right-4 md:-right-12 bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-[0_20px_40px_-15px_rgba(10,43,24,0.15)] max-w-[280px] border border-[#f1f6f3] z-10">
                <p className="font-serif text-lg text-[#0a2b18] leading-tight mb-2">Mrs. Shima Newton</p>
                <div className="w-10 h-[1px] bg-[#d4af37] mt-4 mb-2"></div>
                <p className="text-[#0a2b18] text-sm font-medium uppercase tracking-widest">Principal (Higher Secondary)</p>
              </div>
            </motion.div>

            {/* Principal Message */}
            <div className="lg:col-span-7 lg:pl-10 xl:pl-16 pt-12 md:pt-0">
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
                }}
                className="space-y-10"
              >
                
                <motion.div variants={fadeUp} className="relative">
                  <span className="absolute -top-16 -left-8 text-9xl font-serif text-[#d4af37]/20 leading-none select-none">"</span>
                  <p className="font-serif text-3xl md:text-4xl text-[#0a2b18] leading-[1.2] relative z-10 text-balance italic">
                    Messages from our School Principals
                  </p>
                </motion.div>

                <motion.div variants={fadeUp} className="space-y-12 text-base font-light text-[#6c8274] leading-relaxed">
                  <div className="border-l-2 border-[#d4af37] pl-6 py-2 space-y-4">
                    <h4 className="font-serif text-2xl text-[#0a2b18] mb-2 font-semibold">{secondaryTitle}</h4>
                    <p>{secondaryP1}</p>
                    <p>{secondaryP2}</p>
                    <p>{secondaryP3}</p>
                  </div>
                  
                  <div className="border-l-2 border-[#1b4d32] pl-6 py-2 space-y-4">
                    <h4 className="font-serif text-2xl text-[#0a2b18] mb-2 font-semibold">{primaryTitle}</h4>
                    <p>{primaryP1}</p>
                    <p>{primaryP2}</p>
                    <p>{primaryP3}</p>
                  </div>
                </motion.div>

                {/* Signature Section */}
                <motion.div variants={fadeUp} className="pt-10 border-t border-[#0a2b18]/10 mt-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="font-serif text-xl text-[#0a2b18] italic font-semibold mb-2">Mrs. Shima Newton & Mrs. Helen Johnson</div>
                    <div className="text-xs uppercase tracking-widest text-[#6c8274] font-semibold mb-1">Principals</div>
                    <div className="text-sm text-[#0a2b18] opacity-70">Brotherhood Matriculation Higher Secondary School</div>
                  </div>
                  {/* Decorative Stamp */}
                  <div className="w-24 h-24 rounded-full border border-[#d4af37]/30 flex items-center justify-center shrink-0">
                    <div className="w-20 h-20 rounded-full border border-[#d4af37]/80 border-dashed animate-[spin_30s_linear_infinite] flex items-center justify-center">
                       <span className="text-[#d4af37] font-serif italic text-lg select-none">B</span>
                    </div>
                  </div>
                </motion.div>

              </motion.div>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
}
