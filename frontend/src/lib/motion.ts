import { type Variants } from "motion/react";

/**
 * Premium Easing Curves
 * Inspired by Apple, Linear, and Vercel.
 * Provides a buttery smooth, non-linear acceleration and deceleration.
 */
export const premiumEase = [0.22, 1, 0.36, 1];
export const springEase = [0.17, 0.67, 0.83, 0.67]; // Gentle spring-like

/**
 * Global Page Transitions
 * For use with <AnimatePresence mode="wait"> wrapping the <Outlet />
 */
export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: premiumEase,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(4px)",
    transition: {
      duration: 0.4,
      ease: premiumEase,
    },
  },
};

/**
 * Common Section Reveal Animations
 * For use with whileInView and viewport={{ once: true, margin: "-100px" }}
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: premiumEase } 
  }
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: premiumEase } 
  }
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: premiumEase } 
  }
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.8, ease: premiumEase } 
  }
};

/**
 * Stagger Container
 * Apply to a parent to stagger the 'visible' state of its children.
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

/**
 * Micro-interactions
 */
export const buttonHover = {
  scale: 1.02,
  transition: { duration: 0.2, ease: premiumEase }
};

export const buttonTap = {
  scale: 0.98,
  transition: { duration: 0.1, ease: premiumEase }
};

export const cardHover = {
  y: -5,
  boxShadow: "0 20px 40px -10px rgba(10,43,24,0.1)",
  transition: { duration: 0.4, ease: premiumEase }
};
