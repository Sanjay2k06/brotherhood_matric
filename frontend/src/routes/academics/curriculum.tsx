import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { BookOpen, GraduationCap, Laptop, Landmark, Sparkles, Languages } from "lucide-react";
import aboutImage4 from "../../images/aboutimage4.jpeg";

export const Route = createFileRoute("/academics/curriculum")({
  head: () => ({
    meta: [
      { title: "Curriculum Details — Brotherhood School" },
      { name: "description", content: "Learn about the Tamil Nadu State Board Matriculation curriculum structure, evaluation system, and academic programs." },
    ],
  }),
  component: CurriculumPage,
});

function CurriculumPage() {
  const sectionsList = [
    {
      title: "Foundational (Pre-KG to UKG)",
      desc: "Focus on fine motor skills, language development, basic numeracy, sensory play, and social interaction through activities inspired by standard early childhood methodologies.",
      icon: Sparkles,
      color: "border-amber-200 bg-amber-500/5 hover:border-amber-400"
    },
    {
      title: "Primary (Classes I to V)",
      desc: "Comprehensive study of Mathematics, English language and grammar, Tamil/Hindi languages, Environmental Studies, Computer Science, Drawing, Value Education, and physical training.",
      icon: Languages,
      color: "border-blue-200 bg-blue-500/5 hover:border-blue-400"
    },
    {
      title: "Secondary (Classes VI to X)",
      desc: "Deeper academic study focused on advanced Maths, Physics, Chemistry, Biology, Social Sciences (History & Geography), English Prose & Grammar, Languages (Tamil/Hindi), and Coding basics.",
      icon: BookOpen,
      color: "border-emerald-200 bg-emerald-500/5 hover:border-emerald-400"
    },
    {
      title: "Higher Secondary (Classes XI & XII)",
      desc: "Specialized streams targeting competitive board and university entry levels. We offer double-track groups in Science and Commerce streams.",
      icon: GraduationCap,
      color: "border-purple-200 bg-purple-500/5 hover:border-purple-400"
    }
  ];

  const streams = [
    {
      group: "Group 2502: Science + CS",
      subjects: "Mathematics, Physics, Chemistry, Computer Science, English, Language (Tamil/Hindi).",
      careers: "Engineering, Computing, Data Science, Technology fields.",
      icon: Laptop
    },
    {
      group: "Group 2503: Science + Biology",
      subjects: "Mathematics, Physics, Chemistry, Biology (Botany & Zoology), English, Language (Tamil/Hindi).",
      careers: "Medicine, Biotechnology, Agriculture, Allied Health Sciences.",
      icon: BookOpen
    },
    {
      group: "Group 2702: Commerce + Computer Apps",
      subjects: "Accountancy, Commerce, Economics, Computer Applications, English, Language (Tamil/Hindi).",
      careers: "Business Management, Finance, IT Applications, Entrepreneurship.",
      icon: Landmark
    },
    {
      group: "Group 2708: Commerce + Business Maths",
      subjects: "Accountancy, Commerce, Economics, Business Mathematics & Statistics, English, Language (Tamil/Hindi).",
      careers: "Chartered Accountancy (CA), Actuarial Science, Financial Analytics.",
      icon: GraduationCap
    }
  ];

  return (
    <>
      <PageHeader
        eyebrow="Academic Syllabus"
        title="Curriculum Details"
        subtitle="A balanced academic structure aligning standard-setting education with moral values."
      />

      <section className="max-w-7xl mx-auto px-6 py-20 space-y-16">
        {/* Intro Section */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-muted-foreground leading-relaxed">
            <h2 className="font-display text-3xl text-primary font-bold">Academic Syllabus & Affiliation</h2>
            <p>
              Brotherhood Matriculation Higher Secondary School is recognized by the Government of Tamil Nadu and follows the Matriculation School curriculum for lower levels, culminating in the Tamil Nadu State Board Syllabus for classes X, XI, and XII.
            </p>
            <p>
              We implement a student-centric learning model where teacher instruction is paired with hands-on lab experiments, interactive smart-class modules, and remedial sessions. Equal emphasis is placed on formative quizzes, term exams, and project submissions to measure conceptual clarity.
            </p>
          </div>
          <div className="lg:col-span-5 relative group img-hover-effect rounded-3xl overflow-hidden shadow-elegant border border-border">
            <img
              src={aboutImage4}
              alt="School Science Lab Experiments"
              className="w-full h-[320px] object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 bg-navy-deep/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur">
              Practical Science Laboratory Class
            </div>
          </div>
        </div>

        {/* Grade Divisions */}
        <div className="space-y-8 pt-8">
          <h2 className="font-display text-3xl text-primary font-bold text-center">Grade Segment Structures</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sectionsList.map((sec) => (
              <div key={sec.title} className={`bg-card border rounded-2xl p-6 shadow-sm transition duration-300 ${sec.color}`}>
                <sec.icon className="h-8 w-8 text-gold mb-4" />
                <h3 className="font-display text-lg text-primary font-bold mb-2">{sec.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{sec.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Higher Secondary Streams */}
        <div className="space-y-8 pt-8">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="font-display text-3xl text-primary font-bold">Higher Secondary Specializations</h2>
            <p className="text-sm text-muted-foreground">
              Class XI and XII students choose from four specialized streams to match their professional career aspirations.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {streams.map((stream) => (
              <div key={stream.group} className="bg-card border border-border rounded-3xl p-8 shadow-sm hover:border-gold/60 transition duration-300 flex flex-col sm:flex-row gap-6">
                <div className="h-12 w-12 rounded-2xl bg-primary/5 grid place-items-center shrink-0">
                  <stream.icon className="h-6 w-6 text-gold" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-display text-xl text-primary font-bold">{stream.group}</h3>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Syllabus Subjects:</strong> {stream.subjects}
                  </p>
                  <p className="text-xs text-gold font-semibold uppercase tracking-wider">
                    Ideal Careers: {stream.careers}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
