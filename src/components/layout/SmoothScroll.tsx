"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { LenisProvider } from "@/context/LenisContext";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
      touchMultiplier: 2,
    });

    lenisRef.current = lenisInstance;
    setLenis(lenisInstance);

    // Exponer globalmente para compatibilidad (opcional)
    if (typeof window !== "undefined") {
      (window as Window & { lenis?: Lenis }).lenis = lenisInstance;
    }

    // Sincronizar Lenis con ScrollTrigger
    lenisInstance.on("scroll", ScrollTrigger.update);

    // Loop con requestAnimationFrame (patrón estándar Lenis)
    const raf = (time: number) => {
      lenisInstance.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
      cancelAnimationFrame(rafRef.current);
      if (typeof window !== "undefined") {
        delete (window as Window & { lenis?: Lenis }).lenis;
      }
    };
  }, []);

  return <LenisProvider lenis={lenis}>{children}</LenisProvider>;
}
