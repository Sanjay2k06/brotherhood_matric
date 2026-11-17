import React, { useLayoutEffect, useEffect, useRef, useCallback, ReactNode } from 'react';
import Lenis from 'lenis';

export interface ScrollStackItemProps {
  children: ReactNode;
  itemClassName?: string;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ 
  children, 
  itemClassName = '', 
  className = '', 
  style = {},
  ...props 
}) => {
  const combinedClass = `scroll-stack-card relative w-full my-6 p-6 sm:p-8 md:p-12 rounded-[28px] sm:rounded-[36px] shadow-[0_20px_50px_rgba(0,0,0,0.35)] box-border origin-top will-change-transform ${itemClassName} ${className}`.trim();

  return (
    <div
      className={combinedClass}
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string | number;
  scaleEndPosition?: string | number;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  dimAmount?: number;
  holdDistance?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

export const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 80,
  itemScale = 0.03,
  itemStackDistance = 24,
  stackPosition = '18%',
  scaleEndPosition = '8%',
  baseScale = 0.88,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  dimAmount = 0.12,
  holdDistance = 300,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(new Map<number, { translateY: number; scale: number; rotation: number; blur: number; brightness: number; opacity: number }>());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  const getScrollData = useCallback(() => {
    if (typeof window === 'undefined') {
      return { scrollTop: 0, containerHeight: 800, scrollContainer: null };
    }
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY || window.pageYOffset || document.documentElement.scrollTop,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller ? scroller.scrollTop : 0,
        containerHeight: scroller ? scroller.clientHeight : 0,
        scrollContainer: scroller
      };
    }
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (element: HTMLElement) => {
      if (typeof window === 'undefined' || !element) return 0;
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect();
        return rect.top + (window.scrollY || window.pageYOffset || document.documentElement.scrollTop);
      } else {
        return element.offsetTop;
      }
    },
    [useWindowScroll]
  );

  const updateCardTransforms = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        card.style.transform = 'none';
        card.style.filter = 'none';
        card.style.opacity = '1';
      });
      return;
    }

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scrollerRef.current?.querySelector('.scroll-stack-end');

    const endElementTop = endElement ? getElementOffset(endElement as HTMLElement) : 0;

    // Determine the top (frontmost) active pinned card index
    let topCardIndex = 0;
    cardsRef.current.forEach((jCard, j) => {
      if (!jCard) return;
      const jCardTop = getElementOffset(jCard);
      const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
      if (scrollTop >= jTriggerStart) {
        topCardIndex = j;
      }
    });

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = getElementOffset(card);
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2 + (holdDistance || 0);

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? (i % 2 === 0 ? 1 : -1) * rotationAmount * scaleProgress : 0;

      // Blur & Dimming calculations for depth
      const depthInStack = Math.max(0, topCardIndex - i);
      
      let blur = 0;
      if (blurAmount && depthInStack > 0) {
        blur = Math.min(8, depthInStack * blurAmount);
      }

      let brightness = 1;
      let opacity = 1;
      if (dimAmount && depthInStack > 0) {
        brightness = Math.max(0.35, 1 - depthInStack * dimAmount);
        opacity = Math.max(0.45, 1 - depthInStack * (dimAmount * 0.4));
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
        brightness: Math.round(brightness * 100) / 100,
        opacity: Math.round(opacity * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1 ||
        Math.abs(lastTransform.brightness - newTransform.brightness) > 0.02 ||
        Math.abs(lastTransform.opacity - newTransform.opacity) > 0.02;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        
        let filterParts: string[] = [];
        if (newTransform.blur > 0) filterParts.push(`blur(${newTransform.blur}px)`);
        if (newTransform.brightness < 1) filterParts.push(`brightness(${newTransform.brightness})`);
        const filter = filterParts.join(' ');

        card.style.transform = transform;
        card.style.filter = filter || 'none';
        card.style.opacity = `${newTransform.opacity}`;

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    dimAmount,
    holdDistance,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    if (typeof window === 'undefined') return;

    if (useWindowScroll) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.8,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075
      });

      lenis.on('scroll', handleScroll);

      const raf = (time: number) => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    } else {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.8,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075
      });

      lenis.on('scroll', handleScroll);

      const raf = (time: number) => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    }
  }, [handleScroll, useWindowScroll]);

  // Hook layout effect for SSR and client
  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const scroller = scrollerRef.current;
    if (!scroller && !useWindowScroll) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scroller?.querySelectorAll('.scroll-stack-card') || []
    ) as HTMLElement[];

    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter, opacity';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      // @ts-ignore
      card.style.WebkitBackfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      // @ts-ignore
      card.style.WebkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      // @ts-ignore
      card.style.WebkitPerspective = '1000px';
    });

    setupLenis();
    updateCardTransforms();

    const handleWindowResize = () => {
      updateCardTransforms();
    };
    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    dimAmount,
    holdDistance,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    updateCardTransforms,
    handleScroll
  ]);

  const containerStyles: React.CSSProperties = useWindowScroll
    ? {
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)'
      }
    : {
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        willChange: 'scroll-position'
      };

  const containerClassName = useWindowScroll
    ? `relative w-full ${className}`.trim()
    : `relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim();

  return (
    <div className={containerClassName} ref={scrollerRef} style={containerStyles}>
      <div className={`scroll-stack-inner ${useWindowScroll ? 'pt-8 sm:pt-12 md:pt-16 px-4 sm:px-6 md:px-10 lg:px-16' : 'pt-[15vh] px-6 sm:px-12 md:px-20 pb-[40rem] min-h-screen'}`}>
        {children}
        {/* Spacer so the stacked items pin cleanly and hold as configured */}
        <div 
          className="scroll-stack-end w-full" 
          style={{ height: `${Math.max(120, holdDistance || 300)}px` }} 
        />
      </div>
    </div>
  );
};

export default ScrollStack;
