"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function VanguardiaDistinta() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        ".vanguardia-distinta-content > *",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".vanguardia-distinta-section",
            start: "top 70%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const scrollToContactSection = () => {
    const contactSection = document.getElementById("contacto");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="vanguardia-distinta"
      aria-labelledby="vanguardia-distinta-heading"
      className="vanguardia-distinta-section relative z-10 bg-vanguard-black py-24 md:py-36"
    >
      <div className="container mx-auto px-6 max-w-3xl vanguardia-distinta-content">
        <span className="text-vanguard-red font-bold text-sm md:text-base tracking-widest uppercase block mb-6">
          La Propuesta
        </span>

        <h2
          id="vanguardia-distinta-heading"
          className="text-4xl md:text-6xl lg:text-7xl font-black uppercase mb-10 tracking-tighter text-vanguard-white leading-none"
        >
          Vanguardia es <br />
          <span className="text-vanguard-red">DISTINTA A TODO.</span>
        </h2>

        <div className="space-y-6 text-gray-300 font-light text-base md:text-lg leading-relaxed tracking-wide">
          <p>
            No somos un estudio ni empresa fotográfica convencional.
          </p>

          <p>
            Somos un equipo de profesionales que crea{" "}
            <span className="text-vanguard-white font-semibold">
              experiencias artísticas personalizadas
            </span>{" "}
            y{" "}
            <span className="text-vanguard-red font-semibold">
              obras conceptuales de alto valor simbólico
            </span>
            .
          </p>

          <p>
            Te convocamos a un proceso creativo en el que no sólo sos la{" "}
            <span className="text-vanguard-red font-semibold">musa inspiradora</span>, sino
            también la{" "}
            <span className="text-vanguard-white font-semibold">
              co-autora de tu propia obra
            </span>
            .
          </p>

          <p>
            Una puesta en escena{" "}
            <span className="text-vanguard-white font-semibold">performativa</span> que
            integra lo{" "}
            <span className="text-vanguard-red font-semibold">
              biográfico, lo conceptual, lo emocional y lo visual
            </span>
            , configurando un verdadero{" "}
            <span className="text-vanguard-white font-semibold">
              ritual de transformación subjetiva
            </span>
            .
          </p>

          <p>
            En nuestras producciones la obra de arte es tu{" "}
            <span className="text-vanguard-red font-semibold">impronta singular</span>; y su
            belleza radica en el poder de la{" "}
            <span className="text-vanguard-white font-semibold">sublimación artística</span>{" "}
            como camino de{" "}
            <span className="text-vanguard-red font-semibold">
              afirmación y expansión consciente de tu identidad
            </span>
            .
          </p>
        </div>

        <div className="pt-10 text-center md:text-left">
          <button
            type="button"
            onClick={scrollToContactSection}
            className="hover-trigger relative mx-auto md:mx-0 px-5 sm:px-8 py-3.5 sm:py-4 border border-vanguard-red text-white text-[11px] sm:text-sm tracking-[0.14em] sm:tracking-widest uppercase leading-none whitespace-nowrap transition-all duration-300 hover:text-black font-bold group overflow-hidden inline-flex items-center justify-center"
          >
            <span className="relative z-10 pointer-events-none">
              Agendar Entrevista
            </span>
            <div className="absolute inset-0 bg-vanguard-red transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out z-0 pointer-events-none" />
          </button>
        </div>
      </div>
    </section>
  );
}
