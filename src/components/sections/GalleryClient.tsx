"use client";

import { useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CldImage } from "next-cloudinary";
import ImageModal from "@/components/ui/ImageModal";
import type { GalleryImage } from "@/lib/cloudinary";

type GalleryItem =
  | { type: "image"; image: GalleryImage }
  | { type: "phrase"; content: string };

interface GalleryClientProps {
  items: GalleryItem[];
}

export default function GalleryClient({ items }: GalleryClientProps) {
  const [selectedImage, setSelectedImage] = useState<{
    secureUrl: string;
    alt: string;
    width: number;
    height: number;
  } | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

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
      <div className="columns-1 md:columns-3 gap-8 overflow-clip">
        {items.map((item, i) => (
          <div
            key={i}
            className={`gallery-item ${item.type === "phrase" ? "" : "hover-trigger"} relative group break-inside-avoid mb-8`}
          >
            {item.type === "image" ? (
              <button
                type="button"
                onClick={() =>
                  setSelectedImage({
                    secureUrl: item.image.secureUrl,
                    alt: item.image.alt,
                    width: item.image.width,
                    height: item.image.height,
                  })
                }
                className="relative overflow-hidden w-full h-auto cursor-pointer"
                aria-label="Abrir imagen en tamaño completo"
              >
                <CldImage
                  src={item.image.publicId}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  className="w-full h-auto grayscale-0 md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-[1.04] transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="gallery-border absolute inset-0 border-2 border-vanguard-red opacity-0 scale-95 pointer-events-none"></div>
              </button>
            ) : (
              <div className="relative min-h-[200px] md:min-h-[250px] bg-vanguard-black flex items-center justify-center p-6 md:p-8">
                <h3 className="text-lg md:text-2xl lg:text-3xl font-black text-vanguard-red uppercase tracking-tighter text-center leading-tight">
                  {item.content}
                </h3>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedImage && (
        <ImageModal
          src={selectedImage.secureUrl}
          alt={selectedImage.alt}
          width={selectedImage.width}
          height={selectedImage.height}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}
