import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import image2 from "../../images/aboutimage2.jpg";
import image3 from "../../images/aboutimage3.jpg";
import image4 from "../../images/aboutimage4.jpeg";
import { Laptop, BookOpen, Compass, Trophy, Microscope, MessageSquare, Tv, Beaker, Bus } from "lucide-react";
import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export const Route = createFileRoute("/about/infrastructure")({
  head: () => ({
    meta: [
      { title: "Infrastructure — Brotherhood School" },
      { name: "description", content: "Learn about the advanced campus infrastructure at Brotherhood, including labs, library, smart classes, and sports grounds." },
    ],
  }),
  component: InfrastructurePage,
});

function InfrastructurePage() {
  const infraItems = [
    {
      name: "Computer Lab",
      desc: "Brotherhood Matriculation Higher Secondary School provides dedicated computer laboratories equipped with modern computer systems to develop digital literacy, typing skills, programming knowledge, internet awareness, and practical computer education.",
      icon: Laptop,
    },
    {
      name: "Science Laboratories",
      desc: "Well-equipped Physics, Chemistry, and Biology laboratories provide students with practical scientific learning through experiments, demonstrations, observations, and research-based activities aligned with the curriculum.",
      icon: Beaker,
    },
    {
      name: "Mathematics Laboratory",
      desc: "The Mathematics Laboratory encourages experiential learning through mathematical models, activities, puzzles, games, charts, and practical demonstrations that help students understand mathematical concepts with confidence and creativity.",
      icon: Microscope,
    },
    {
      name: "English Laboratory",
      desc: "The English Language Laboratory enhances listening, speaking, pronunciation, vocabulary, grammar, reading, and communication skills through audio-visual learning, interactive activities, and language development exercises.",
      icon: MessageSquare,
    },
    {
      name: "Robotics Laboratory",
      desc: "The Robotics Laboratory introduces students to robotics, STEM education, coding, programming, innovation, automation, and problem-solving skills, encouraging creativity and technological thinking from an early age.",
      icon: Compass,
    },
    {
      name: "Library",
      desc: "The school library offers an extensive collection of academic books, reference materials, journals, newspapers, magazines, and digital resources that cultivate reading habits, research skills, and lifelong learning.",
      icon: BookOpen,
    },
    {
      name: "Smart Classrooms",
      desc: "Our smart classrooms integrate multimedia technology, interactive digital content, educational videos, presentations, animations, and visual learning tools to make every lesson engaging, interactive, and student-centered.",
      icon: Tv,
    },
    {
      name: "Playground",
      desc: "Offers spacious outdoor playgrounds, football field, basketball court, and equipment for student athletics and games.",
      icon: Trophy,
    },
    {
      name: "School Transport",
      desc: "Safe and reliable bus transport services connecting the campus to various key residential neighborhoods across Chennai.",
      icon: Bus,
    },
  ];

  const campusPhotos = [
    { src: image2, caption: "Spacious green courtyards" },
    { src: image3, caption: "Main academic building" },
    { src: image4, caption: "Interactive student spaces" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Campus Resources"
        title="Infrastructure"
        subtitle="Explore the facilities, learning labs, and sports arenas built for student success."
      />

      {/* Facilities Staggered Grid */}
      <section className="py-24 md:py-32 px-6 bg-[#f7faf8] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="mb-16 md:mb-24 max-w-2xl"
          >
            <span className="text-[#1b4d32] uppercase tracking-widest text-xs font-semibold">Facilities</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#0a2b18] mt-4">Environments <span className="italic text-[#1b4d32]">Designed</span> to Inspire</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-20">
            {infraItems.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="relative group"
              >
                {/* Large Background Number */}
                <div className="absolute -top-12 -left-6 font-serif text-8xl md:text-9xl text-[#0a2b18]/5 italic pointer-events-none group-hover:text-[#d4af37]/10 transition-colors duration-700">
                  0{idx + 1}
                </div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full border border-[#d4af37]/30 flex items-center justify-center mb-8 group-hover:bg-[#0a2b18] group-hover:border-[#0a2b18] transition-all duration-500 shadow-sm">
                    <item.icon className="w-7 h-7 text-[#d4af37] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="font-serif text-3xl md:text-4xl text-[#0a2b18] mb-6 group-hover:translate-x-2 transition-transform duration-500">
                    {item.name}
                  </h3>
                  
                  <div className="w-12 h-[1px] bg-[#d4af37] mb-6 group-hover:w-24 transition-all duration-700"></div>
                  
                  <p className="text-[#6c8274] text-lg font-light leading-relaxed max-w-md">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cinematic Campus Gallery */}
      <section className="py-24 md:py-32 bg-[#05140b] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#d4af37] rounded-full blur-[150px] opacity-[0.05] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
          >
            <div className="space-y-4">
              <span className="text-[#d4af37] uppercase tracking-widest text-xs font-semibold">Gallery</span>
              <h2 className="font-serif text-4xl md:text-5xl text-white">Campus <span className="italic text-[#d4af37]">Environment</span></h2>
            </div>
          </motion.div>
          
          <div className="grid md:grid-cols-12 gap-6 h-auto md:h-[600px]">
             {/* Large left image */}
             <motion.div 
               initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
               className="md:col-span-8 h-[300px] md:h-full rounded-[2rem] overflow-hidden group relative"
             >
               <img src={campusPhotos[0].src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={campusPhotos[0].caption} />
               <div className="absolute inset-0 bg-gradient-to-t from-[#05140b]/90 via-[#05140b]/20 to-transparent"></div>
               <div className="absolute bottom-8 left-8">
                 <p className="font-serif text-2xl text-white">{campusPhotos[0].caption}</p>
               </div>
             </motion.div>

             {/* Two stacked right images */}
             <motion.div 
               initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
               className="md:col-span-4 flex flex-col gap-6 h-[600px] md:h-full"
             >
               <div className="flex-1 rounded-[2rem] overflow-hidden group relative">
                 <img src={campusPhotos[1].src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={campusPhotos[1].caption} />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#05140b]/90 via-transparent to-transparent"></div>
                 <div className="absolute bottom-6 left-6">
                   <p className="font-serif text-lg text-white">{campusPhotos[1].caption}</p>
                 </div>
               </div>
               <div className="flex-1 rounded-[2rem] overflow-hidden group relative">
                 <img src={campusPhotos[2].src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={campusPhotos[2].caption} />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#05140b]/90 via-transparent to-transparent"></div>
                 <div className="absolute bottom-6 left-6">
                   <p className="font-serif text-lg text-white">{campusPhotos[2].caption}</p>
                 </div>
               </div>
             </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
