import { v2 as cloudinary } from "cloudinary";
import { unstable_cache } from "next/cache";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface GalleryImage {
  publicId: string;
  secureUrl: string;
  alt: string;
  width: number;
  height: number;
}

async function fetchGalleryImages(): Promise<GalleryImage[]> {
  const result = await cloudinary.search
    .expression("folder:gallery")
    .with_field("context")
    .sort_by("created_at", "desc")
    .max_results(100)
    .execute();

  return result.resources.map(
    (r: {
      public_id: string;
      secure_url: string;
      context?: { custom?: { alt?: string; caption?: string } };
      width: number;
      height: number;
    }) => ({
      publicId: r.public_id,
      secureUrl: r.secure_url,
      alt:
        r.context?.custom?.alt ??
        r.context?.custom?.caption ??
        r.public_id
          .replace("gallery/", "")
          .replace(/[-_]/g, " "),
      width: r.width,
      height: r.height,
    })
  );
}

// Caché de 1 hora; se revalida en background automáticamente
export const getGalleryImages = unstable_cache(
  fetchGalleryImages,
  ["gallery-images"],
  { revalidate: 3600, tags: ["gallery"] }
);
