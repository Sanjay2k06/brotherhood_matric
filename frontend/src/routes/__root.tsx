import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
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

  // State to control Splash Screen display
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const handleEnter = (targetPath?: string) => {
    setFadeOut(true);
    setTimeout(() => {
      sessionStorage.setItem("hasEntered", "true");
      setShowSplash(false);
      if (targetPath) {
        navigate({ to: targetPath });
      }
    }, 600); // matches the transition-all duration-500
  };

  useEffect(() => {
    // Check if user has already entered in this session
    const entered = sessionStorage.getItem("hasEntered") === "true";
    if (entered) {
      setShowSplash(false);
      return;
    }

    // Progress bar animation: 0 to 100 in 6.4 seconds (to finish just before auto-dismiss)
    const duration = 6400; // 6.4 seconds
    const intervalTime = 30; // update every 30ms
    const step = 100 / (duration / intervalTime);

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    // Automatically enter after 7 seconds
    const enterTimer = setTimeout(() => {
      handleEnter();
    }, 7000);

    return () => {
      clearInterval(interval);
      clearTimeout(enterTimer);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {showSplash ? (
        <div
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-navy-deep text-white transition-all duration-700 ease-in-out ${
            fadeOut ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
          }`}
        >
          {/* Animated Campus Image Background */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={bgImg}
              alt="School Campus Background"
              className="absolute inset-0 w-full h-full object-cover scale-105 animate-kenburns"
            />
            {/* Dark green overlay to blend with branding and ensure high contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/80 via-navy-deep/85 to-navy-deep/95 backdrop-blur-[2px]" />
            {/* Ambient gold glow elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/10 blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/20 blur-[120px]" />
          </div>

          <div className="relative z-10 w-full max-w-4xl px-6 text-center flex flex-col items-center">
            {/* School Logo Badge */}
            <div className="mb-8 flex items-center justify-center p-4 sm:p-5 rounded-2xl bg-white shadow-elegant border border-gold/30 animate-float max-w-[280px] sm:max-w-[340px]">
              <img
                src={logoImg}
                className="h-12 sm:h-16 w-auto object-contain"
                alt="Brotherhood School Logo"
              />
            </div>

            {/* School Name and Tagline */}
            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white mb-2 leading-tight drop-shadow-md">
              Brotherhood
            </h1>
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-gold font-semibold mb-3">
              Matriculation Higher Secondary School
            </p>
            <p className="italic text-base sm:text-lg text-white/70 max-w-lg mb-8 font-light">
              "Shaping Future Leaders Since 1991"
            </p>

            {/* Loading progress bar */}
            <div className="w-64 mb-12 animate-fade-in">
              <div className="flex justify-between items-center text-xs text-white/50 mb-2">
                <span>Preparing Excellence...</span>
                <span>{Math.round(loadingProgress)}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-gold transition-all duration-100 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className={`${showSplash ? "opacity-0 pointer-events-none" : "opacity-100 transition-opacity duration-700"}`}>
        <SiteHeader />
        <main className="min-h-screen pt-16 page-reveal">
          <Outlet />
        </main>
        <SiteFooter />

        {/* Global Floating Action Buttons (Enquiry, Call, WhatsApp) */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3.5 items-end">
          {/* Floating Enquiry Button */}
          <Link
            to="/admissions/enquiry-form"
            className="flex items-center gap-3 bg-navy-deep/75 hover:bg-navy-deep border border-white/20 text-white pl-5 pr-2 py-1.5 rounded-full shadow-elegant backdrop-blur-md transition-all hover:-translate-y-0.5"
          >
            <span className="text-xs font-bold text-white tracking-wide text-shadow-premium">
              Enquire Now
            </span>
            <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center border border-gold/40 shadow-sm">
              <FileEdit className="h-4.5 w-4.5 text-gold" />
            </div>
          </Link>

          {/* Floating Call Button */}
          <a
            href="tel:0442440133"
            className="flex items-center gap-3 bg-navy-deep/75 hover:bg-navy-deep border border-white/20 text-white pl-5 pr-2 py-1.5 rounded-full shadow-elegant backdrop-blur-md transition-all hover:-translate-y-0.5"
          >
            <span className="text-xs font-bold text-white tracking-wide text-shadow-premium">
              Call Us
            </span>
            <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center border border-white/20 shadow-sm">
              <Phone className="h-4.5 w-4.5 text-gold" />
            </div>
          </a>

          {/* Floating WhatsApp Button */}
          <a
            href="https://wa.me/919884204848"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-navy-deep/75 hover:bg-navy-deep border border-white/20 text-white pl-5 pr-2 py-1.5 rounded-full shadow-elegant backdrop-blur-md transition-all hover:-translate-y-0.5"
          >
            <span className="text-xs font-bold text-white tracking-wide text-shadow-premium">
              WhatsApp
            </span>
            <div className="h-9 w-9 rounded-full bg-[#25D366] flex items-center justify-center border border-white/20 shadow-sm hover:bg-[#20ba5a] transition-colors">
              <MessageCircle className="h-4.5 w-4.5 fill-white text-[#25D366]" />
            </div>
          </a>
        </div>
      </div>
    </QueryClientProvider>
  );
}
