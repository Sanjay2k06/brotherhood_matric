import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useNavigate,
  useLocation,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { pageTransitionVariants } from "../lib/motion";
import {
  GraduationCap,
  Sparkles,
  Phone,
  ArrowRight,
  Clock,
  BookOpen,
  MessageCircle,
  FileEdit,
  Award,
  Layers,
  Laptop,
} from "lucide-react";

import appCss from "../styles.css?url";
import { reportAppError } from "../lib/app-error-reporting";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import logoImg from "../images/brotherhoodtitle.jpg";
import bgImg from "../images/aboutimage4.jpeg";
import Lenis from "lenis";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportAppError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Brotherhood Matriculation Hr. Sec. School" },
      { name: "description", content: "Brotherhood Matriculation Hr. Sec. School, Chennai — shaping future leaders through quality education, discipline, and values since 1991." },
      { name: "author", content: "Brotherhood Matriculation Hr. Sec. School" },
      { property: "og:title", content: "Brotherhood Matriculation Hr. Sec. School" },
      { property: "og:description", content: "Character formation through quality education at Brotherhood Matriculation Hr. Sec. School, Chennai." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      {
        rel: "icon",
        href: logoImg,
        type: "image/jpeg",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize global Lenis smooth scroll
  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // spring-like easing
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  // Premium Fast Splash Screen State
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Disabled sessionStorage check temporarily for development so you can see it on every refresh!
    // const entered = sessionStorage.getItem("hasEntered") === "true";
    // if (entered) {
    //   setShowSplash(false);
    //   return;
    // }

    // High-class fast splash screen
    const enterTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        sessionStorage.setItem("hasEntered", "true");
        setShowSplash(false);
      }, 800); // 800ms ultra-smooth fade out
    }, 1800); // 1.8 seconds initial display

    return () => clearTimeout(enterTimer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {showSplash ? (
        <div
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#05140b] text-white transition-all duration-[800ms] ease-in-out ${
            fadeOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
          }`}
        >
          {/* Subtle atmospheric gold glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#d4af37]/5 blur-[120px] pointer-events-none" />

          <div className="relative z-10 w-full max-w-4xl px-6 text-center flex flex-col items-center">
            {/* Elegant Logo Reveal */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 shadow-2xl p-4">
                <img src={logoImg} className="w-full h-full object-contain drop-shadow-xl" alt="Brotherhood School" />
              </div>
            </motion.div>

            {/* Minimalist Cinematic Typography */}
            <motion.h1 
              initial={{ opacity: 0, letterSpacing: "0.05em" }}
              animate={{ opacity: 1, letterSpacing: "0.2em" }}
              transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
              className="font-serif text-3xl md:text-5xl font-light tracking-[0.2em] text-white mb-3 uppercase"
            >
              Brotherhood
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-xs uppercase tracking-[0.3em] text-[#d4af37]/80 font-medium"
            >
              Since 1991
            </motion.p>

            {/* Elegant loading accent */}
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "120px", opacity: 1 }}
              transition={{ delay: 0.6, duration: 1.2, ease: "circOut" }}
              className="h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent mt-8"
            />
          </div>
        </div>
      ) : null}
      
      {/* Main Content Wrapper - Animates in as splash fades out */}
      <div 
        className={`relative z-0 bg-[#05140b] transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          !showSplash || fadeOut 
            ? "blur-0 translate-y-0 scale-100" 
            : "blur-md translate-y-12 scale-105 pointer-events-none"
        }`}
      >
        <SiteHeader />
        <main key={location.pathname} className="min-h-screen page-reveal">
          <Outlet />
        </main>
        <SiteFooter />

        {/* Global Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4 items-end">
          {/* Floating Enquiry Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/admissions/enquiry-form"
              className="group flex items-center bg-white border border-gray-200 shadow-xl rounded-full p-1 hover:bg-[#0a2b18] hover:border-[#0a2b18] transition-all duration-500 ease-in-out hover:-translate-y-1"
            >
              <div className="h-10 w-10 bg-[#f7faf8] group-hover:bg-white/10 rounded-full flex items-center justify-center shrink-0 transition-colors">
                <FileEdit className="h-4 w-4 text-[#1b4d32] group-hover:text-white transition-colors" />
              </div>
              <span className="text-sm font-medium text-[#0a2b18] group-hover:text-white transition-all duration-500 ease-in-out max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 group-hover:px-3">Enquire Now</span>
            </Link>
          </motion.div>

          {/* Floating Call Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href="tel:0442440133"
              className="group flex items-center bg-white border border-gray-200 shadow-xl rounded-full p-1 hover:bg-[#0a2b18] hover:border-[#0a2b18] transition-all duration-500 ease-in-out hover:-translate-y-1"
            >
              <div className="h-10 w-10 bg-[#f7faf8] group-hover:bg-white/10 rounded-full flex items-center justify-center shrink-0 transition-colors">
                <Phone className="h-4 w-4 text-[#1b4d32] group-hover:text-white transition-colors" />
              </div>
              <span className="text-sm font-medium text-[#0a2b18] group-hover:text-white transition-all duration-500 ease-in-out max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 group-hover:px-3">Call Us</span>
            </a>
          </motion.div>

          {/* Floating WhatsApp Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href="https://wa.me/919884204848"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center bg-[#25D366] border border-[#25D366] shadow-[0_8px_16px_rgba(37,211,102,0.3)] rounded-full p-1 hover:bg-[#20ba5a] hover:border-[#20ba5a] transition-all duration-500 ease-in-out hover:-translate-y-1"
            >
              <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center shrink-0 transition-colors">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium text-white tracking-wide transition-all duration-500 ease-in-out max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 group-hover:px-3">WhatsApp</span>
            </a>
          </motion.div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
