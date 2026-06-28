import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, GraduationCap, Facebook, Instagram, Youtube } from "lucide-react";
import { motion } from "motion/react";
import logoImg from "../images/brotherhoodtitle.jpg";

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <img src={logoImg} className="h-10 w-10 object-contain" alt="Brotherhood School Logo" />
            <div>
              <div className="font-display font-semibold">Brotherhood</div>
              <div className="text-[10px] uppercase tracking-widest text-white/60">Est. 1991</div>
            </div>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            Character Formation Through Quality Education — shaping future leaders for over three decades.
          </p>
          <div className="flex gap-3 mt-5">
            <motion.a whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }} className="h-9 w-9 rounded-full bg-white/10 hover:bg-gold hover:text-navy-deep grid place-items-center transition-colors duration-300" href="#"><Facebook className="h-4 w-4" /></motion.a>
            <motion.a whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }} className="h-9 w-9 rounded-full bg-white/10 hover:bg-gold hover:text-navy-deep grid place-items-center transition-colors duration-300" href="#"><Instagram className="h-4 w-4" /></motion.a>
            <motion.a whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }} className="h-9 w-9 rounded-full bg-white/10 hover:bg-gold hover:text-navy-deep grid place-items-center transition-colors duration-300" href="#"><Youtube className="h-4 w-4" /></motion.a>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gold uppercase tracking-widest mb-4">Explore</h4>
          <ul className="space-y-2.5 text-sm text-white/75">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/academics">Academics</Link></li>
            <li><Link to="/student-life">Student Life</Link></li>
            <li><Link to="/achievements">Achievements</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/admissions">Admissions</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/scroll-stack-demo">Pillars of Excellence</Link></li>
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
            <li className="flex gap-2"><MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" /> 2nd Street, Kazura Garden, Neelankarai, Palavakkam, Chennai 600041</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 text-gold shrink-0 mt-0.5" /> 044-2440133 · 98842 04848</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 text-gold shrink-0 mt-0.5" /> info@brotherhoodschool.edu.in</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between gap-2 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Brotherhood Matriculation Higher Secondary School. All rights reserved.</p>
          <p>Designed by School Technology Team</p>
        </div>
      </div>
    </footer>
  );
}