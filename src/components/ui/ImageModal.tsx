"use client";

import { useState } from "react";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import type { StaticImageData } from "next/image";

interface ImageModalProps {
  src: string | StaticImageData;
  alt?: string;
  onClose: () => void;
}

export default function ImageModal({
  src,
  alt = "Imagen en tamaño completo",
  onClose,
}: ImageModalProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className="fixed inset-0 z-9998 bg-black/90 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-vanguard-red bg-vanguard-black/80 text-vanguard-red text-3xl md:text-4xl font-black leading-none hover:text-white hover:border-white transition-colors duration-300 flex items-center justify-center"
        aria-label="Cerrar modal"
      >
        ×
      </button>

      <div
        className="relative max-w-full max-h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-2 border-vanguard-red/30 border-t-vanguard-red rounded-full animate-spin" />
          </div>
        )}

        {typeof src === "string" ? (
          <CldImage
            src={src}
            alt={alt}
            width={2000}
            height={3000}
            className={`w-auto h-auto max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] md:max-w-[calc(100vw-4rem)] md:max-h-[calc(100vh-4rem)] object-contain transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
            priority
            onLoad={() => setIsLoading(false)}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={2000}
            height={3000}
            className={`w-auto h-auto max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] md:max-w-[calc(100vw-4rem)] md:max-h-[calc(100vh-4rem)] object-contain transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
            priority
            onLoad={() => setIsLoading(false)}
          />
        )}
      </div>
    </div>
  );
}
