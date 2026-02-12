"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import quienSoyImg from "@/assets/imgs/quien_soy.jpg";

export default function About() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

      // Efecto Ken Burns en la imagen
      gsap.to(".about-image", {
        scale: 1.15,
        x: 30,
        y: -20,
        duration: 15,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Animaciones en desktop
      mm.add("(min-width: 1024px)", () => {
        // Fade in del texto
        gsap.fromTo(
          ".about-text",
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".about-section",
              start: "top 70%",
            },
          }
        );
      });

      return () => mm.revert();
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sobre-vanguardia"
      aria-labelledby="about-heading"
      className="about-section relative z-10 bg-vanguard-black min-h-screen pt-12 pb-24 md:py-0"
    >
      <div className="container mx-auto px-4 lg:flex lg:items-center lg:min-h-screen">
        {/* Izquierda: Imagen sticky */}
        <div className="lg:w-1/2 lg:h-screen lg:sticky lg:top-0 flex items-center justify-center p-8 md:p-12">
          <div className="relative w-full max-w-[500px] aspect-3/4 overflow-hidden bg-vanguard-black rounded-[40%]">
            <Image
              src={quienSoyImg}
              alt="Negrovski - Fotógrafo Boudoir Vanguardia"
              fill
              className="about-image object-cover grayscale"
              style={{ objectPosition: "80% 35%" }}
              priority
            />
            {/* Degradado intenso: 100% (bordes) → 10% (centro) - Bordes visibles solo 30% */}
            <div className="absolute inset-0 bg-linear-to-b from-vanguard-black via-vanguard-black/10 to-vanguard-black pointer-events-none"></div>
            <div className="absolute inset-0 bg-linear-to-r from-vanguard-black via-vanguard-black/10 to-vanguard-black pointer-events-none"></div>
          </div>
        </div>

        {/* Derecha: Texto scrollable */}
        <div className="lg:w-1/2 py-16 md:py-24 lg:py-32 px-4 md:px-12 about-text">
          <span className="text-vanguard-red font-bold text-sm md:text-base tracking-widest uppercase block mb-6">
            El Visionario
          </span>
          
          <h2
            id="about-heading"
            className="text-4xl md:text-6xl lg:text-7xl font-black uppercase mb-8 tracking-tighter text-vanguard-white leading-none"
          >
            NEGROVSKI
          </h2>

          <div className="space-y-6 text-gray-300 font-light text-base md:text-lg leading-relaxed tracking-wide">
            <p className="text-xl md:text-2xl font-normal text-vanguard-white italic mb-8">
              Visionario. Transgresor. Artífice de lo sublime.
            </p>

            <p>
              Cada sesión es un <span className="text-vanguard-red font-bold">acto de insurrección</span> contra lo convencional. 
              No busco retratar belleza. Busco desvelar lo legendario de tu semblante.
            </p>

            <p>
              Mi cámara no cosifica. <span className="text-vanguard-white font-bold">Humaniza. Enaltece.</span> 
              Cada encuadre es un manifiesto contra el arte mediocre que inunda la industria.
            </p>

            <p>
              Vanguardia nace de la convicción de que el Boudoir debe ser una experiencia transformadora, 
              no un catálogo de poses vacías. Creamos <span className="text-vanguard-red">historias sublimes</span> que 
              honran tu singularidad.
            </p>

            <p className="text-sm md:text-base text-gray-500 italic pt-6 border-t border-gray-800">
              "El verdadero arte no estandariza. Se inspira en la singularidad de cada ser."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
