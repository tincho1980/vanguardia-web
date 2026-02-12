"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Manifesto() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

      const animateRows = (distance: number, scrub: number) => {
        const manifestoRows = gsap.utils.toArray<HTMLElement>(".manifesto-row");
        manifestoRows.forEach((row, i) => {
          const direction = i % 2 === 0 ? -1 : 1;
          if (!row.classList.contains("static-row")) {
            gsap.fromTo(
              row,
              { xPercent: direction * -distance },
              {
                xPercent: direction * distance,
                ease: "none",
                scrollTrigger: {
                  trigger: ".manifesto-section",
                  start: "top bottom",
                  end: "bottom top",
                  scrub,
                },
              }
            );
          }
        });
      };

      // Desktop
      mm.add("(min-width: 768px)", () => {
        animateRows(30, 1);
      });

      // Mobile (más liviano)
      mm.add("(max-width: 767px)", () => {
        animateRows(16, 0.6);
      });

      return () => mm.revert();
    });

    return () => ctx.revert();
  }, []);

  const handlePhilosophyClick = () => {
    const driveDownloadUrl =
      "https://drive.google.com/uc?export=download&id=1W6XWySEL3k8wK24p5OrKnpeIDR_11BUj";
    window.open(driveDownloadUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="manifesto-section pt-32 pb-16 md:pt-64 md:pb-32 relative z-10 bg-vanguard-black overflow-hidden flex flex-col gap-8 md:gap-16">
      <div className="manifesto-row whitespace-nowrap select-none">
        <h2 className="text-4xl md:text-7xl font-black text-gray-700 opacity-50 uppercase tracking-tighter">
          No Cosifica. No Cosifica. No Cosifica. No Cosifica.
        </h2>
      </div>
      <div className="manifesto-row whitespace-nowrap flex justify-end select-none">
        <h2 className="text-4xl md:text-7xl font-black text-gray-600 uppercase tracking-tighter">
          No Devalúa. No Devalúa. No Devalúa. No Devalúa.
        </h2>
      </div>
      <div className="manifesto-row whitespace-nowrap select-none">
        <h2 className="text-4xl md:text-7xl font-black text-gray-400 uppercase tracking-tighter">
          No Estandariza. No Estandariza. No Estandariza.
        </h2>
      </div>
      <div className="manifesto-row static-row text-center px-4 mt-12">
        <h2 className="text-5xl md:text-8xl font-black text-vanguard-red uppercase tracking-tighter shadow-red-glow mb-12">
          Humaniza y Enaltece.
        </h2>
        <p className="max-w-3xl mx-auto text-base md:text-lg font-light leading-relaxed tracking-wide text-gray-400 mb-12">
          Vanguardia es la revolución que nadie se atrevió a proclamar en el
          universo del arte Boudoir. Enemigos radicales del arte mediocre.
        </p>
        <button
          onClick={handlePhilosophyClick}
          className="hover-trigger relative px-8 py-4 border border-vanguard-red text-white text-sm tracking-widest uppercase transition-all duration-300 hover:bg-vanguard-red hover:text-black font-bold group overflow-hidden inline-block"
        >
          <span className="relative z-10 pointer-events-none">
            Nuestra Filosofía
          </span>
          <div className="absolute inset-0 bg-vanguard-red transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out z-0 pointer-events-none"></div>
        </button>
      </div>
    </section>
  );
}
