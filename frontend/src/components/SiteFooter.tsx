import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, GraduationCap, Facebook, Instagram, Youtube } from "lucide-react";
import { motion } from "motion/react";
import logoImg from "../images/brotherhoodtitle.jpg";

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-primary-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
        <div className="sm:col-span-2 md:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <img src={logoImg} className="h-10 w-10 object-contain" alt="Brotherhood School Logo" />
            <div>
              <div className="font-display font-semibold">Brotherhood</div>
              <div className="text-[10px] uppercase tracking-widest text-white/60">Est. 1991</div>
            </div>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            Established in 1991, Brotherhood Matriculation Higher Secondary School is committed to providing quality education that nurtures knowledge, values, leadership, and character while preparing students for a successful future.
          </p>
          <div className="flex gap-3 mt-5">
            <motion.a whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }} className="h-9 w-9 rounded-full bg-white/10 hover:bg-gold hover:text-navy-deep grid place-items-center transition-colors duration-300" href="#"><Facebook className="h-4 w-4" /></motion.a>
            <motion.a whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }} className="h-9 w-9 rounded-full bg-white/10 hover:bg-gold hover:text-navy-deep grid place-items-center transition-colors duration-300" href="#"><Instagram className="h-4 w-4" /></motion.a>
            <motion.a whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }} className="h-9 w-9 rounded-full bg-white/10 hover:bg-gold hover:text-navy-deep grid place-items-center transition-colors duration-300" href="#"><Youtube className="h-4 w-4" /></motion.a>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gold uppercase tracking-widest mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-sm text-white/75">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/academics">Academics</Link></li>
            <li><Link to="/about/infrastructure">Facilities</Link></li>
            <li><Link to="/admissions">Admissions</Link></li>
            <li><Link to="/contact/contact-us">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gold uppercase tracking-widest mb-4">Portals</h4>
          <ul className="space-y-2.5 text-sm text-white/75">
            <li>Parent Portal</li>
            <li>Student Portal</li>
            <li>Alumni Network</li>
            <li>Careers</li>
            <li>Downloads</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gold uppercase tracking-widest mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex gap-2"><MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" /> <span className="break-words">2nd Street, Kazura Garden, Neelankarai, Palavakkam, Chennai 600041</span></li>
            <li className="flex gap-2"><Phone className="h-4 w-4 text-gold shrink-0 mt-0.5" /> <span className="break-words">044-2440133 · 98842 04848</span></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 text-gold shrink-0 mt-0.5" /> <span className="break-all">info@brotherhoodschool.edu.in</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/50 text-center md:text-left">
          <p>© {new Date().getFullYear()} Brotherhood Matriculation Higher Secondary School. All rights reserved.</p>
          <p>Designed by School Technology Team</p>
        </div>
      </div>
    </footer>
  );
}