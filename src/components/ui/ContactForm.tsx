"use client";

import { useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          ".contact-form",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".contact-form",
              start: "top 80%",
            },
          }
        );
      });

      return () => mm.revert();
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al enviar el mensaje");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });

      // Reset success message después de 5 segundos
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Error desconocido"
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="contact-form max-w-2xl mx-auto space-y-8"
    >
      {/* Nombre */}
      <div className="group">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Tu nombre"
          className="w-full bg-transparent border-b-2 border-gray-800 focus:border-vanguard-red py-4 px-2 text-vanguard-white font-light tracking-wide placeholder:text-gray-600 placeholder:uppercase placeholder:text-sm focus:outline-none transition-colors duration-300"
        />
      </div>

      {/* Email */}
      <div className="group">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Tu email"
          className="w-full bg-transparent border-b-2 border-gray-800 focus:border-vanguard-red py-4 px-2 text-vanguard-white font-light tracking-wide placeholder:text-gray-600 placeholder:uppercase placeholder:text-sm focus:outline-none transition-colors duration-300"
        />
      </div>

      {/* Teléfono (opcional) */}
      <div className="group">
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Tu teléfono (opcional)"
          className="w-full bg-transparent border-b-2 border-gray-800 focus:border-vanguard-red py-4 px-2 text-vanguard-white font-light tracking-wide placeholder:text-gray-600 placeholder:uppercase placeholder:text-sm focus:outline-none transition-colors duration-300"
        />
      </div>

      {/* Mensaje */}
      <div className="group">
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          placeholder="Contanos sobre tu experiencia ideal..."
          className="w-full bg-transparent border-2 border-gray-800 focus:border-vanguard-red py-4 px-4 text-vanguard-white font-light tracking-wide placeholder:text-gray-600 placeholder:text-sm focus:outline-none transition-colors duration-300 resize-none"
        />
      </div>

      {/* Estado del envío */}
      {status === "success" && (
        <p className="text-vanguard-red text-center font-light tracking-wide animate-fade-in">
          ✓ Mensaje enviado. Te contactaremos pronto.
        </p>
      )}

      {status === "error" && (
        <p className="text-red-400 text-center font-light tracking-wide">
          ✕ {errorMessage}
        </p>
      )}

      {/* Botón Submit */}
      <div className="text-center pt-8">
        <button
          type="submit"
          disabled={status === "sending"}
          className="hover-trigger relative px-12 py-4 border-2 border-vanguard-red text-vanguard-white text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:bg-vanguard-red hover:text-black disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
        >
          <span className="relative z-10 pointer-events-none">
            {status === "sending" ? "Enviando..." : "Enviar Mensaje"}
          </span>
          <div className="absolute inset-0 bg-vanguard-red transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out z-0 pointer-events-none"></div>
        </button>
      </div>
    </form>
  );
}
