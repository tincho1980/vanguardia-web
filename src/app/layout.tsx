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
  title: "VANGUARDIA by Negrovski",
  description: "Arte Boudoir de Alta Gama. Enemigos radicales del arte mediocre.",
};

// JSON-LD Schema.org para SEO de marca de lujo (ProfessionalService)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Vanguardia by Negrovski",
  description:
    "Fotografía Boudoir de alta gama. Enemigos radicales del arte mediocre. Revolución estética y empoderamiento.",
  url: "https://vanguardiabynegrovski.com",
  image: "https://vanguardiabynegrovski.com/og-image.jpg",
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
  serviceType: ["Fotografía Boudoir", "Dirección Creativa", "Arte Conceptual"],
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
