"use client";

import { useEffect, useState } from "react";

const WA_URL = `https://wa.me/542216497114?text=${encodeURIComponent(
  "Hola Negrovski, quiero saber más sobre las sesiones Vanguardia."
)}`;

export default function WhatsAppFloatingButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("whatsapp-about-btn");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Visible solo cuando el botón quedó por encima del viewport (scroll down)
        // Se oculta automáticamente cuando vuelve a aparecer (scroll up)
        setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatear con Negrovski por WhatsApp"
        className="flex items-center justify-center w-14 h-14 bg-vanguard-red text-vanguard-white rounded-full shadow-2xl animate-heartbeat hover:scale-110 transition-transform duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.855L.057 23.5l5.797-1.52A11.93 11.93 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.651-.502-5.178-1.379l-.371-.22-3.44.902.918-3.352-.241-.386A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
      </a>
    </div>
  );
}
