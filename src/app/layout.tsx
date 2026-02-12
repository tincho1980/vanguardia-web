import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "./services.css";

// Configuración de la fuente Montserrat
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "800", "900"], // Pesos especificados en .cursorrules (Light, Regular, ExtraBold, Black)
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vanguardiabynegrovski.com"),
  title: {
    default:
      "Vanguardia by Negrovski | Arte Boudoir Conceptual de Alta Gama",
    template: "%s | Vanguardia by Negrovski",
  },
  description:
    "Equipo interdisciplinario de artistas profesionales en boudoir conceptual. Experiencias de alta gama con metodo estructurado en entrevista, preproduccion, produccion y curaduria artistica.",
  applicationName: "Vanguardia by Negrovski",
  keywords: [
    "fotografia boudoir",
    "arte boudoir conceptual",
    "boudoir argentina",
    "experiencia boudoir alta gama",
    "equipo interdisciplinario de artistas",
    "direccion creativa boudoir",
    "preproduccion y curaduria artistica",
    "book boudoir profesional",
    "fotografo boudoir la plata",
    "fotografo boudoir buenos aires",
    "sesion boudoir premium personalizada",
    "fotografia artistica transformadora",
    "vanguardia by negrovski",
    "negrovski fotografo filmmaker",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "es-AR": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: "Vanguardia by Negrovski",
    title: "Vanguardia by Negrovski | Arte Boudoir Conceptual de Alta Gama",
    description:
      "Obras boudoir conceptuales con potencial transformador, direccion creativa y produccion integral de alto valor artistico.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Vanguardia by Negrovski - Fotografia Boudoir de Alta Gama",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vanguardia by Negrovski | Arte Boudoir Conceptual de Alta Gama",
    description:
      "Experiencia boudoir de alta gama con metodo estructurado y direccion creativa interdisciplinaria.",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

// JSON-LD Schema.org para SEO de marca de lujo (ProfessionalService)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Vanguardia by Negrovski",
  slogan: "Enemigos radicales del arte mediocre.",
  description:
    "Equipo interdisciplinario de artistas profesionales especializado en arte boudoir conceptual de alta gama, con metodo estructurado, direccion creativa y curaduria artistica.",
  url: "https://vanguardiabynegrovski.com",
  image: "https://vanguardiabynegrovski.com/opengraph-image",
  founder: {
    "@type": "Person",
    name: "Alexis (Negrovski)",
    jobTitle: "Director Creativo, Fotografo y Filmmaker",
  },
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "La Plata",
    addressRegion: "Buenos Aires",
    addressCountry: "AR",
  },
  telephone: "+54-221-649-7114",
  email: "vanguardiabynegrovski@gmail.com",
  sameAs: ["https://instagram.com/vanguardia.boudoir.oficial"],
  areaServed: {
    "@type": "Country",
    name: "Argentina",
  },
  serviceType: [
    "Fotografia Boudoir",
    "Direccion Creativa",
    "Arte Conceptual",
    "Curaduria Artistica",
    "Produccion Audiovisual",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Metodo Vanguardia",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Entrevista Inicial y Cotizacion Detallada",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Preproduccion Conceptual y Direccion Creativa",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Produccion de Sesion Boudoir de Alta Gama",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Postproduccion y Curaduria Artistica",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${montserrat.variable} antialiased md:cursor-none`}>
        {children}
      </body>
    </html>
  );
}
