"use client";

import { useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CldImage } from "next-cloudinary";
import { SERVICES } from "@/data/constants";
import VanguardButton from "@/components/ui/VanguardButton";
import ImageModal from "@/components/ui/ImageModal";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

function preloadCloudinaryImage(publicId: string) {
  if (typeof window === "undefined" || !CLOUD_NAME) return;
  const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto,f_auto,w_2000/${publicId}`;
  const img = new window.Image();
  img.src = url;
}

export default function Services() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const whatsappMessage = encodeURIComponent(
    "Hola! Quiero informacion sobre la experiencia Vanguardia."
  );
  const whatsappUrl = `https://wa.me/542216497114?text=${whatsappMessage}`;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

      // Parallax en mobile/tablet
      mm.add("(max-width: 1023px)", () => {
        SERVICES.forEach((_, index) => {
          gsap.to(`.service-image-${index}`, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
              trigger: `.service-item-${index}`,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
      });

      mm.add("(min-width: 1024px)", () => {
        // Efecto parallax para cada imagen
        SERVICES.forEach((_, index) => {
          const imageSelector = `.service-image-${index}`;
          const triggerSelector = `.service-item-${index}`;
          
          gsap.to(imageSelector, {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
              trigger: triggerSelector,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });

        // Highlight del item activo cuando llega al centro
        const serviceItems = gsap.utils.toArray<HTMLElement>(".service-item-container");
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
      });

      return () => mm.revert();
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style jsx>{`
        .service-item-container.active .service-text-content {
          border-left-color: #972528;
        }
        .service-item-container.active .service-title {
          color: #972528;
        }
      `}</style>
      <section
        id="servicios-boudoir"
        aria-labelledby="services-heading"
        className="services-section relative z-10 bg-vanguard-black py-24"
      >
      <div className="container mx-auto px-4">
        {/* Título de la sección */}
        <div className="text-center mb-24">
          <h2 
            id="services-heading" 
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-vanguard-white mb-4"
          >
            El Dispositivo EN ACCIÓN
          </h2>
          <div className="w-24 h-1 bg-vanguard-red mx-auto"></div>
        </div>

        {/* Lista de servicios */}
        <div className="space-y-32">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className={`service-item-${index} service-item-container grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 0 ? "" : "lg:grid-flow-dense"
              }`}
            >
              {/* Texto del servicio */}
              <div className={`${index % 2 === 0 ? "" : "lg:col-start-2"}`}>
                <div className="service-text-content px-4 md:px-8 border-l-2 border-gray-900/50 transition-all duration-500">
                  <span className="service-number text-vanguard-red font-bold text-xl mb-4 block transition-all duration-500">
                    0{index + 1}.
                  </span>
                  <h3 className="service-title text-4xl md:text-5xl font-black uppercase mb-6 tracking-tighter text-vanguard-white transition-all duration-500">
                    {service.title}
                  </h3>
                  <p className="service-description text-lg text-gray-400 font-light leading-relaxed tracking-wide transition-all duration-500">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Imagen con efecto parallax */}
              <div className={`${index % 2 === 0 ? "" : "lg:col-start-1 lg:row-start-1"} relative h-[60vh] lg:h-[70vh] overflow-hidden`}>
                <button
                  type="button"
                  className="hover-trigger relative w-full h-full"
                  onClick={() => setSelectedImage(service.img)}
                  onMouseEnter={() => preloadCloudinaryImage(service.img)}
                  aria-label={`Ver ${service.title} en tamaño completo`}
                >
                  <div className={`service-image-${index} absolute inset-0 -top-[15%] -bottom-[15%]`}>
                    <CldImage
                      src={service.img}
                      alt={`${service.title} - Vanguardia Boudoir`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  {/* Overlay decorativo */}
                  <div className="absolute inset-0 bg-linear-to-t from-vanguard-black/60 via-transparent to-vanguard-black/20 pointer-events-none"></div>
                  <div className="absolute inset-0 border border-vanguard-red/20 pointer-events-none"></div>
                </button>
              </div>
            </div>
          ))}

          {/* Call to Action después del paso 4 */}
          <div className="mt-32 text-center max-w-3xl mx-auto">
            <div className="px-4 md:px-8">
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
        </div>
      </div>
    </section>

      {selectedImage && (
        <ImageModal
          src={selectedImage}
          alt={`${SERVICES.find((s) => s.img === selectedImage)?.title ?? "Servicio"} - Vanguardia Boudoir`}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}
