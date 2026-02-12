"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { SERVICES } from "@/data/constants";
import legsImg from "@/assets/imgs/legs.jpg";
import VanguardButton from "@/components/ui/VanguardButton";

export default function Services() {
  const whatsappMessage = encodeURIComponent(
    "Hola! Quiero informacion sobre la experiencia Vanguardia."
  );
  const whatsappUrl = `https://wa.me/542216497114?text=${whatsappMessage}`;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

      // Animación de scroll reveal de la imagen en desktop
      mm.add("(min-width: 1024px)", () => {
        const serviceItems = gsap.utils.toArray<HTMLElement>(".service-item");
        const imageContainer = document.querySelector(".service-image-container");

        if (serviceItems.length > 0 && imageContainer) {
          // Animar la posición de la imagen para que se "revele" mientras scrolleas
          gsap.fromTo(
            ".service-main-img",
            {
              objectPosition: "50% 0%",
            },
            {
              objectPosition: "50% 100%",
              ease: "none",
              scrollTrigger: {
                trigger: ".services-section",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
              },
            }
          );

          // Highlight del item activo
          serviceItems.forEach((item) => {
            ScrollTrigger.create({
              trigger: item,
              start: "center center",
              end: "center center",
              onEnter: () => {
                serviceItems.forEach((el) => el.classList.remove("active"));
                item.classList.add("active");
              },
              onEnterBack: () => {
                serviceItems.forEach((el) => el.classList.remove("active"));
                item.classList.add("active");
              },
            });
          });
        }
      });

      return () => mm.revert();
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="services-section relative z-10 bg-vanguard-black min-h-screen">
      <div className="container mx-auto px-4 lg:flex">
        {/* Left: Scrollable Text */}
        <div className="lg:w-1/2 py-24 flex flex-col gap-[25vh]">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="service-item min-h-[50vh] flex flex-col justify-center px-4 md:px-12 border-l-2 border-gray-900/50 transition-all duration-500"
            >
              <span className="text-vanguard-red font-bold text-xl mb-4">
                0{index + 1}.
              </span>
              <h3 className="text-4xl md:text-5xl font-black uppercase mb-6 tracking-tighter text-vanguard-white">
                {service.title}
              </h3>
              <p className="text-lg text-gray-400 font-light leading-relaxed tracking-wide">
                {service.description}
              </p>
            </div>
          ))}

          {/* Call to Action después del paso 4 */}
          <div className="min-h-[50vh] flex flex-col justify-center px-4 md:px-12 border-l-2 border-vanguard-red">
            <h3 className="text-3xl md:text-4xl font-black uppercase mb-6 tracking-tighter text-vanguard-white">
              ¿Lista para tu experiencia Vanguardia?
            </h3>
            <p className="text-lg text-gray-400 font-light leading-relaxed tracking-wide mb-8">
              Contactanos y comenzá tu transformación. Creamos experiencias únicas que celebran tu singularidad.
            </p>
            <VanguardButton
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              inverted
            >
              Mandanos un WhatsApp
            </VanguardButton>
          </div>
        </div>

        {/* Right: Sticky Image con scroll reveal */}
        <div className="hidden lg:flex lg:w-1/2 sticky top-24 self-start h-[calc(100vh-6rem)] items-start justify-center px-12 service-image-container">
          <div className="relative w-full h-full overflow-hidden bg-[#111]">
            <Image
              src={legsImg}
              alt="Fotografía Boudoir Vanguardia - Arte cinematográfico"
              fill
              className="service-main-img object-cover grayscale"
              style={{ objectPosition: "50% 0%" }}
              priority
            />
            {/* Overlay Vignette */}
            <div className="absolute inset-0 bg-linear-to-t from-vanguard-black via-transparent to-vanguard-black/40 pointer-events-none"></div>
            <div className="absolute inset-0 border border-vanguard-red/20 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
