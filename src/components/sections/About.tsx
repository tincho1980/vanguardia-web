"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CldImage } from "next-cloudinary";

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
            <CldImage
              src="about_negrovski"
              alt="Negrovski - Fotógrafo Boudoir Vanguardia"
              fill
              className="about-image object-cover grayscale"
              style={{ objectPosition: "80% 35%" }}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Degradado intenso: 100% (bordes) → 10% (centro) - Bordes visibles solo 30% */}
            <div className="absolute inset-0 bg-linear-to-b from-vanguard-black via-vanguard-black/10 to-vanguard-black pointer-events-none"></div>
            <div className="absolute inset-0 bg-linear-to-r from-vanguard-black via-vanguard-black/10 to-vanguard-black pointer-events-none"></div>
          </div>
        </div>

        {/* Derecha: Texto scrollable */}
        <div className="lg:w-1/2 py-16 md:py-24 lg:py-32 px-4 md:px-12 about-text">
          <span className="text-vanguard-red font-bold text-sm md:text-base tracking-widest uppercase block mb-6">
            El Autor
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
              Su visión va más allá del abordaje superfluo de cuerpos y belleza: irrumpe como un{" "}
              <span className="text-vanguard-red font-bold">manifiesto simbólico</span> contra la{" "}
              <span className="text-vanguard-white font-bold">cosificación, la estandarización visual y la mercantilización del arte</span>.
            </p>

            <p>
              El <span className="text-vanguard-red font-bold">Boudoir Conceptual</span> que inaugura revaloriza la historia
              de las mujeres desde su <span className="text-vanguard-white font-bold">potencial transformador</span>, subvierte
              los cánones dominantes con una mirada auténtica, recupera desde la creatividad la{" "}
              <span className="text-vanguard-red">ética de la estética</span>, y allana el camino en la búsqueda de{" "}
              <span className="text-vanguard-white font-bold">subjetividades libres</span> a través del arte.
            </p>

            <p>
              Para Negrovski el boudoir no es un catálogo de poses: es un{" "}
              <span className="text-vanguard-red font-bold">dispositivo escénico</span> capaz de transformar la experiencia
              en obra, y la obra en manifestación de{" "}
              <span className="text-vanguard-white font-bold">tus verdades, tu autoestima y tu poder</span>.
            </p>

            <div className="pt-8">
              <a
                id="whatsapp-about-btn"
                href={`https://wa.me/542216497114?text=${encodeURIComponent("Hola Negrovski, quiero saber más sobre las sesiones Vanguardia.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-vanguard-red text-vanguard-white font-bold uppercase tracking-widest text-sm px-8 py-4 hover:bg-vanguard-white hover:text-vanguard-black transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.855L.057 23.5l5.797-1.52A11.93 11.93 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.651-.502-5.178-1.379l-.371-.22-3.44.902.918-3.352-.241-.386A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                Chateá con Negrovski
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
