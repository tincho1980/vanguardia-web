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
        const manifestoTracks = gsap.utils.toArray<HTMLElement>(".manifesto-track");
        manifestoTracks.forEach((track, i) => {
          const goesLeft = i % 2 === 0;
          gsap.fromTo(
            track,
            { xPercent: goesLeft ? 0 : -25 },
            {
              xPercent: goesLeft ? -distance : -25 + distance,
              ease: "none",
              scrollTrigger: {
                trigger: ".manifesto-section",
                start: "top bottom",
                end: "bottom top",
                scrub,
              },
            }
          );
        });
      };

      mm.add("(min-width: 768px)", () => {
        animateRows(6, 5);
      });

      mm.add("(max-width: 767px)", () => {
        animateRows(6, 1);
      });

      return () => mm.revert();
    });

    return () => ctx.revert();
  }, []);

  const handlePhilosophyClick = () => {
    const pdfUrl = "/assets/Cosmovisi%C3%B3n-Vanguardia-Boudoir.pdf";
    window.open(pdfUrl, "_blank", "noopener,noreferrer");
  };

  const loopCount = 4;
  const rowContent = [
    {
      text: "Vanguardia.",
      repeat: 14,
      className:
        "text-4xl md:text-7xl font-black text-gray-700 opacity-50 uppercase tracking-tighter pr-6",
    },
    {
      text: "Es la revolución.",
      repeat: 10,
      className:
        "text-4xl md:text-7xl font-black text-gray-600 uppercase tracking-tighter pr-6",
    },
    {
      text: "Del Arte Boudoir.",
      repeat: 10,
      className:
        "text-4xl md:text-7xl font-black text-gray-400 uppercase tracking-tighter pr-6",
    },
  ];

  return (
    <section
      id="manifiesto"
      aria-labelledby="manifiesto-heading"
      className="manifesto-section pt-32 pb-16 md:pt-64 md:pb-32 relative z-10 bg-vanguard-black overflow-hidden flex flex-col gap-8 md:gap-16"
    >
      {rowContent.map((row, rowIndex) => (
        <div key={row.text} className="manifesto-row overflow-hidden whitespace-nowrap select-none">
          <div className="manifesto-track inline-flex min-w-max will-change-transform">
            {Array.from({ length: loopCount }).map((_, i) => (
              <h2 key={`${rowIndex}-${i}`} className={row.className}>
                {`${row.text} `.repeat(row.repeat)}
              </h2>
            ))}
          </div>
        </div>
      ))}
      <div className="manifesto-row static-row text-center px-4 mt-12">
        <p className="max-w-3xl mx-auto text-base md:text-lg font-light leading-relaxed tracking-wide text-gray-400 mb-12">
            Nuestro Boudoir NO cosifica. NO devalúa. NO estandariza.
        </p>
        <h2
          id="manifiesto-heading"
          className="text-5xl md:text-8xl font-black text-vanguard-red uppercase tracking-tighter shadow-red-glow mb-12"
        >
          Humaniza, Enaltece <br />
          y <br />
          Transforma.
        </h2>
        <button
          onClick={handlePhilosophyClick}
          className="hover-trigger relative px-8 py-4 border border-vanguard-red text-white text-sm tracking-widest uppercase transition-all duration-300 hover:bg-vanguard-red hover:text-black font-bold group overflow-hidden inline-block"
        >
          <span className="relative z-10 pointer-events-none">
            Nuestra Cosmovisión
          </span>
          <div className="absolute inset-0 bg-vanguard-red transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out z-0 pointer-events-none"></div>
        </button>
      </div>
    </section>
  );
}
