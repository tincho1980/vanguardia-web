"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLenis } from "@/context/LenisContext";
import heroImg from "@/assets/imgs/hero.jpg";
import logoSolo from "@/assets/imgs/logo_solo.png";

export default function Hero() {
  const lenis = useLenis();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      // Efecto Ken Burns en la imagen de fondo
      gsap.to(".hero-bg-image", {
        scale: 1.2,
        x: -50,
        y: -30,
        duration: 15,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Responsive animations con matchMedia
      const mm = gsap.matchMedia();

      // Solo en desktop
      mm.add("(min-width: 768px)", () => {
        gsap.to(".hero-content", {
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          yPercent: 50,
          opacity: 0,
        });
      });

      return () => mm.revert();
    });

    return () => ctx.revert();
  }, []);

  const handleStartExperience = () => {
    const target = document.querySelector(".manifesto-section") as HTMLElement;
    if (lenis && target) {
      lenis.scrollTo(target, { offset: -50, duration: 1.5 });
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Dark Background con Ken Burns effect */}
      <div className="absolute inset-0 z-0 opacity-40 select-none pointer-events-none overflow-hidden">
        <Image
          src={heroImg}
          alt="Fotografía Boudoir Vanguardia, estilo cinematográfico low-key"
          fill
          className="hero-bg-image object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-vanguard-black via-transparent to-black/80"></div>
      </div>

      <div className="hero-content relative z-10 text-center px-4">
        <p className="text-sm md:text-base tracking-widest text-gray-400 mb-6 uppercase">
          Fotografía Boudoir de Alta Gama
        </p>
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-4 uppercase leading-none tracking-tighter text-vanguard-white">
          Vanguardia <br />
          <span
            className="text-transparent stroke-white"
            style={{ WebkitTextStroke: "1px #fff" }}
          >
            es la
          </span>{" "}
          <br />
          Rev
          <span className="inline-flex items-center align-middle mx-[0.02em] -translate-y-[0.08em]">
            <Image
              src={logoSolo}
              alt="O de Revolución representada por el logo Vanguardia"
              className="w-[0.68em] h-[0.68em] object-contain"
            />
          </span>
          lución
        </h1>
        <p className="text-xl md:text-2xl font-light italic text-gray-300 mt-6 mb-12">
          Que nadie se atrevió a proclamar.
        </p>

        <button
          onClick={handleStartExperience}
          className="hover-trigger relative px-8 py-4 border border-vanguard-red text-white text-sm tracking-widest uppercase transition-all duration-300 hover:bg-vanguard-red hover:text-black font-bold group overflow-hidden inline-block"
        >
          <span className="relative z-10 pointer-events-none">
            Iniciar Experiencia
          </span>
          <div className="absolute inset-0 bg-vanguard-red transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out z-0 pointer-events-none"></div>
        </button>
      </div>
    </section>
  );
}
