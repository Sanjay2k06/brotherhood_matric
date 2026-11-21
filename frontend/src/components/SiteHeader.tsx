import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Phone, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logoImg from "../images/brotherhoodtitle.jpg";

const sections = {
  about: [
    { to: "/about/about-school", label: "About School" },
    { to: "/about/vision-mission", label: "Vision & Mission" },
    { to: "/about/principal-message", label: "Principal's Message" },
    { to: "/about/correspondent-message", label: "Correspondent's Message" },
    { to: "/about/infrastructure", label: "Infrastructure" },
  ],
  academics: [
    { to: "/academics/admission", label: "Admission Process" },
    { to: "/academics/courses-offered", label: "Courses Offered" },
    { to: "/academics/curriculum", label: "Curriculum" },
    { to: "/events", label: "Academic Calendar" },
    { to: "/academics/school-fees", label: "School Fees" },
    { to: "/academics/school-timings", label: "School Timings" },
    { to: "/academics/management-committee", label: "Managing Committee" },
    { to: "/academics/founder-message", label: "Chairman's Message" },
  ],
  students: [
    { to: "/students/school-uniform", label: "School Uniform" },
    { to: "/students/best-student", label: "Best Student" },
    { to: "/students/houses", label: "Houses" },
    { to: "/students/student-leaders", label: "Student Leaders" },
    { to: "/students/achievements", label: "Results & Achievements" },
  ],
  association: [
    { to: "/association/alumni", label: "Alumni Association" },
    { to: "/association/registration", label: "Alumni Registration" },
  ],
  "co-curricular": [
    { to: "/co-curricular/sports", label: "Sports" },
    { to: "/co-curricular/choir", label: "Choir" },
    { to: "/co-curricular/eco-club", label: "Eco Club" },
    { to: "/co-curricular/literary-association", label: "Literary Association" },
    { to: "/co-curricular/rsp", label: "RSP" },
    { to: "/co-curricular/scouts-guides", label: "Scouts & Guides" },
  ],
  gallery: [{ to: "/gallery", label: "Photo Gallery", exact: true }],
} as const;

type SectionKey = keyof typeof sections;

const navItems: Array<
  | { label: string; to: string; exact?: boolean }
  | { label: string; key: SectionKey; submenu: true; badge?: string }
> = [
  { label: "Home", to: "/", exact: true },
  { label: "About Us", key: "about", submenu: true },
  { label: "Academics", key: "academics", submenu: true },
  { label: "Teachers", to: "/teachers" },
  { label: "Students", key: "students", submenu: true },
  { label: "Association", key: "association", submenu: true },
  { label: "Co-Curricular", key: "co-curricular", submenu: true },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact/contact-us" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const menuTimeoutRef = useRef<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const isSectionActive = (key: SectionKey) => {
    const path = location.pathname;
    return path === `/${key}` || path.startsWith(`/${key}/`);
  };

  const handleMenuEnter = (key: string) => {
    if (menuTimeoutRef.current) {
      window.clearTimeout(menuTimeoutRef.current);
      menuTimeoutRef.current = null;
    }
    setActiveMenu(key);
  };

  const handleMenuLeave = () => {
    menuTimeoutRef.current = window.setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  return (
    <>
      <nav
        className={`hidden lg:block fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled ? "pt-2" : "pt-3"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5">
          <div
            className={`relative rounded-2xl transition-all duration-300 ${
              scrolled ? "bg-white/92 shadow-2xl shadow-black/10" : "bg-white/82"
            } backdrop-blur-2xl border border-white/50 px-5 h-[68px] flex items-center gap-4`}
          >
            <Link to="/" className="flex items-center gap-2.5 group cursor-pointer flex-shrink-0">
              <div className="w-[46px] h-[46px] bg-white rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-200 flex-shrink-0">
                <img
                  src={logoImg}
                  alt="Brotherhood School Logo"
                  className="w-[38px] h-[38px] object-contain"
                />
              </div>
            </Link>

            <div className="w-px h-7 bg-[#0F172A]/10 flex-shrink-0" />

            <div className="flex items-center justify-between flex-1 min-w-0">
              <div className="flex items-center justify-between flex-1 min-w-0 gap-1">
                {navItems.map((item) => {
                  if ("submenu" in item) {
                    return (
                      <div
                        key={item.key}
                        className="relative"
                        onMouseEnter={() => handleMenuEnter(item.key)}
                        onMouseLeave={handleMenuLeave}
                      >
                        <button
                          className={`relative group flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11.5px] font-semibold tracking-wide transition-colors duration-200 whitespace-nowrap z-10 ${
                            activeMenu === item.key || isSectionActive(item.key)
                              ? "text-[#C8940F]"
                              : "text-[#0F172A]/65 hover:text-[#0F172A]"
                          }`}
                          onMouseEnter={() => handleMenuEnter(item.key)}
                          type="button"
                        >
                          {(activeMenu === item.key || isSectionActive(item.key)) && (
                            <motion.div
                              layoutId="nav-active"
                              className="absolute inset-0 bg-[#D4A017]/10 rounded-lg -z-10"
                              transition={{ type: "spring", stiffness: 350, damping: 30 }}
                            />
                          )}
                          {item.label}
                          {item.badge ? (
                            <span className="ml-1 px-1.5 py-0.5 bg-gradient-to-r from-[#D4A017] to-[#B8860B] text-white text-[9.5px] rounded-full font-bold">
                              {item.badge}
                            </span>
                          ) : null}
                          <ChevronDown
                            size={12}
                            className={`opacity-50 transition-transform duration-200 ${
                              activeMenu === item.key || isSectionActive(item.key) ? "rotate-180 opacity-80" : ""
                            }`}
                          />
                        </button>

                        {activeMenu === item.key ? <div className="absolute top-full left-0 right-0 h-3" /> : null}

                        <AnimatePresence>
                          {activeMenu === item.key ? (
                            <motion.div
                              initial={{ opacity: 0, y: 8, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.15 } }}
                              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                              className="absolute left-1/2 top-full z-50 w-[320px] -translate-x-1/2 pt-3"
                              onMouseEnter={() => handleMenuEnter(item.key)}
                              onMouseLeave={handleMenuLeave}
                            >
                              <div className="rounded-3xl border border-border/70 bg-white/98 p-2 shadow-2xl shadow-black/10 backdrop-blur-xl">
                                <div className="px-3 py-2">
                                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#0F172A]/40">
                                    {item.label}
                                  </p>
                                  <p className="mt-1 text-[11px] text-[#0F172A]/55">
                                    Explore the key pages in this section.
                                  </p>
                                </div>
                                <div className="grid gap-1">
                                  {sections[item.key].map((subItem) => (
                                    <Link
                                      key={subItem.to}
                                      to={subItem.to}
                                      className="rounded-2xl px-3 py-2.5 text-[12px] font-semibold text-[#0F172A]/78 transition-all hover:bg-[#D4A017]/8 hover:text-[#0F172A]"
                                      activeProps={{ className: "bg-[#D4A017]/10 text-[#C8940F]" }}
                                    >
                                      {subItem.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onMouseEnter={() => handleMenuEnter(item.to)}
                      onMouseLeave={handleMenuLeave}
                      activeOptions={item.exact ? { exact: true } : undefined}
                      className={`relative flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11.5px] font-semibold tracking-wide transition-colors duration-200 whitespace-nowrap z-10 ${
                        activeMenu === item.to || isActive(item.to, item.exact)
                          ? "text-[#C8940F]"
                          : "text-[#0F172A]/65 hover:text-[#0F172A]"
                      }`}
                    >
                      {(activeMenu === item.to || isActive(item.to, item.exact)) && (
                        <motion.div
                          layoutId="nav-active"
                          className="absolute inset-0 bg-[#D4A017]/10 rounded-lg -z-10"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="w-px h-7 bg-[#0F172A]/10 flex-shrink-0" />

            <div className="flex items-center gap-1 flex-shrink-0">
              {/* <button
                className="p-2 hover:bg-[#D4A017]/10 rounded-lg transition-colors duration-200 group"
                aria-label="Search"
                type="button"
              >
                <Search size={16} className="text-[#0F172A]/50 group-hover:text-[#C8940F] transition-colors duration-200" />
              </button> */}

              <a
                href="tel:0442440133"
                className="p-2 hover:bg-[#D4A017]/10 rounded-lg transition-colors duration-200 group"
                aria-label="Call us"
              >
                <Phone size={16} className="text-[#0F172A]/50 group-hover:text-[#C8940F] transition-colors duration-200" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="lg:hidden fixed top-0 left-0 right-0 z-[100] bg-white/92 backdrop-blur-2xl border-b border-[#0F172A]/8">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <img
                src={logoImg}
                alt="Brotherhood School Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="text-sm font-bold text-[#0F172A] hidden xs:inline tracking-tight">
              Brotherhood
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <button className="p-2.5 hover:bg-[#D4A017]/10 rounded-lg transition-colors" type="button" aria-label="Search">
              <Search size={18} className="text-[#0F172A]/55" />
            </button>
            <button
              onClick={() => setIsOpen((current) => !current)}
              className="p-2.5 hover:bg-[#D4A017]/10 rounded-lg transition-colors"
              type="button"
              aria-label="Menu"
            >
              {isOpen ? <X size={22} className="text-[#0F172A]" /> : <Menu size={22} className="text-[#0F172A]" />}
            </button>
          </div>
        </div>

        {isOpen ? (
          <div className="border-t border-[#0F172A]/8 bg-white/98 backdrop-blur-xl shadow-lg">
            <div className="max-h-[80vh] overflow-y-auto px-4 py-4">
              <div className="grid gap-2">
                {navItems.map((item) => {
                  if ("submenu" in item) {
                    return (
                      <details key={item.key} className="group rounded-2xl border border-[#0F172A]/8 bg-white">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-[#D4A017]/6">
                          <span>{item.label}</span>
                          <ChevronDown className="h-4 w-4 text-[#0F172A]/55 transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="px-3 pb-3">
                          <div className="grid gap-1.5">
                            {sections[item.key].map((subItem) => (
                              <Link
                                key={subItem.to}
                                to={subItem.to}
                                onClick={() => setIsOpen(false)}
                                className="rounded-xl border border-[#0F172A]/8 bg-white px-3.5 py-2.5 text-xs font-semibold text-[#0F172A]/80 transition-colors hover:bg-[#D4A017]/6 hover:text-[#0F172A]"
                                activeProps={{ className: "border-[#C8940F]/20 bg-[#D4A017]/10 text-[#C8940F]" }}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </details>
                    );
                  }

                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      activeOptions={item.exact ? { exact: true } : undefined}
                      className="rounded-2xl border border-[#0F172A]/8 bg-white px-4 py-3.5 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-[#D4A017]/6 hover:text-[#0F172A] flex items-center justify-between"
                      activeProps={{ className: "border-[#C8940F]/20 bg-[#D4A017]/10 text-[#C8940F]" }}
                    >
                      <span>{item.label}</span>
                      <span className="text-[#C8940F]/60 text-xs">→</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}