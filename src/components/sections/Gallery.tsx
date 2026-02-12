"use client";

import { useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { GALLERY_ITEMS } from "@/data/constants";
import type { StaticImageData } from "next/image";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | StaticImageData | null>(null);

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
            { opacity: 0, y: 100 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
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
      <section className="gallery-section pt-32 pb-16 px-4 md:px-12 bg-vanguard-black relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-24 text-center uppercase tracking-tighter text-vanguard-white">
            Manifiesto Visual
          </h2>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {GALLERY_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`gallery-item ${item.type === "phrase" ? "" : "hover-trigger"} relative group break-inside-avoid`}
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
                      alt="Fotografía Boudoir Vanguardia, estilo cinematográfico low-key"
                      className="w-full h-auto grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700"
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
        <div
          className="fixed inset-0 z-9998 bg-black/90 flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-vanguard-red bg-vanguard-black/80 text-vanguard-red text-3xl md:text-4xl font-black leading-none hover:text-white hover:border-white transition-colors duration-300 flex items-center justify-center"
            aria-label="Cerrar modal"
          >
            ×
          </button>

          <div
            className="relative max-w-full max-h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Imagen de portfolio en tamaño completo"
              width={2000}
              height={3000}
              className="w-auto h-auto max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] md:max-w-[calc(100vw-4rem)] md:max-h-[calc(100vh-4rem)] object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
