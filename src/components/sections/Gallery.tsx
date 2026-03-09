"use client";

import { useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { GALLERY_ITEMS } from "@/data/constants";
import type { StaticImageData } from "next/image";
import ImageModal from "@/components/ui/ImageModal";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | StaticImageData | null>(null);
  const getGalleryAlt = (position: number) =>
    `Portfolio boudoir Vanguardia by Negrovski - fotografia artistica ${position} en estilo cinematografico`;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

      // Animaciones de reveal solo en desktop
      mm.add("(min-width: 768px)", () => {
        const galleryItems = gsap.utils.toArray<HTMLElement>(".gallery-item");
        galleryItems.forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 92%",
              },
              onComplete: () => {
                const border = item.querySelector(".gallery-border");
                if (border)
                  gsap.to(border, { scale: 1, opacity: 1, duration: 0.5 });
              },
            }
          );
        });
      });

      // En mobile, fade simple sin y
      mm.add("(max-width: 767px)", () => {
        const galleryItems = gsap.utils.toArray<HTMLElement>(".gallery-item");
        galleryItems.forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.6,
              scrollTrigger: {
                trigger: item,
                start: "top 95%",
              },
            }
          );
        });
      });

      return () => mm.revert();
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="portfolio-boudoir"
        aria-labelledby="gallery-heading"
        className="gallery-section pt-32 pb-16 px-4 md:px-12 bg-vanguard-black relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <h2
            id="gallery-heading"
            className="text-4xl md:text-6xl font-black mb-24 text-center uppercase tracking-tighter text-vanguard-white"
          >
            Manifiesto Visual
          </h2>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 overflow-clip">
            {GALLERY_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`gallery-item ${item.type === "phrase" ? "" : "hover-trigger"} relative group break-inside-avoid mb-8`}
              >
                {item.type === "image" ? (
                  <button
                    type="button"
                    onClick={() => setSelectedImage(item.content as string | StaticImageData)}
                    className="relative overflow-hidden w-full h-auto cursor-pointer"
                    aria-label="Abrir imagen en tamaño completo"
                  >
                    <Image
                      src={item.content}
                      alt={getGalleryAlt(i + 1)}
                      className="w-full h-auto grayscale-0 md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-[1.04] transition-all duration-700"
                      placeholder="blur"
                    />
                    {/* Animated Red Border */}
                    <div className="gallery-border absolute inset-0 border-2 border-vanguard-red opacity-0 scale-95 pointer-events-none"></div>
                  </button>
                ) : (
                  <div className="relative min-h-[200px] md:min-h-[250px] bg-vanguard-black flex items-center justify-center p-6 md:p-8">
                    <h3 className="text-lg md:text-2xl lg:text-3xl font-black text-vanguard-red uppercase tracking-tighter text-center leading-tight">
                      {String(item.content)}
                    </h3>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <ImageModal
          src={selectedImage}
          alt="Imagen de portfolio en tamaño completo"
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}
