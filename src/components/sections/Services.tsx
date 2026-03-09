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
                <span className="inline-flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.855L.057 23.5l5.797-1.52A11.93 11.93 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.651-.502-5.178-1.379l-.371-.22-3.44.902.918-3.352-.241-.386A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  <span>Mandanos un WhatsApp</span>
                </span>
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
