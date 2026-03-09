import { getGalleryImages } from "@/lib/cloudinary";
import { GALLERY_PHRASES } from "@/data/constants";
import GalleryClient from "@/components/sections/GalleryClient";

type GalleryItem =
  | { type: "image"; image: Awaited<ReturnType<typeof getGalleryImages>>[number] }
  | { type: "phrase"; content: string };

function buildGalleryItems(
  images: Awaited<ReturnType<typeof getGalleryImages>>,
  phrases: string[]
): GalleryItem[] {
  const items: GalleryItem[] = [];

  // Distribuye las frases de forma equitativa según la cantidad de imágenes
  const interval = Math.max(2, Math.floor(images.length / phrases.length));
  let phraseIndex = 0;

  images.forEach((image, i) => {
    items.push({ type: "image", image });

    if ((i + 1) % interval === 0 && phraseIndex < phrases.length) {
      items.push({ type: "phrase", content: phrases[phraseIndex++] });
    }

  });

  return items;
}

export default async function Gallery() {
  const images = await getGalleryImages();
  const items = buildGalleryItems(images, GALLERY_PHRASES);

  return (
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

        <GalleryClient items={items} />

        <div className="mt-20 text-center">
          <a
            href="/assets/Portfolio-Vanguardia-FEBRERO-2026.pdf"
            download
            className="hover-trigger relative px-5 sm:px-8 py-3.5 sm:py-4 border border-vanguard-red text-white text-[11px] sm:text-sm tracking-[0.14em] sm:tracking-widest uppercase leading-none whitespace-nowrap transition-all duration-300 hover:bg-vanguard-red hover:text-black font-bold group overflow-hidden inline-flex items-center justify-center gap-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 pointer-events-none"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span className="relative z-10 pointer-events-none">
              Descargar Portfolio
            </span>
            <div className="absolute inset-0 bg-vanguard-red transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out z-0 pointer-events-none"></div>
          </a>
        </div>
      </div>
    </section>
  );
}
