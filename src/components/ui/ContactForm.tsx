"use client";

import { useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TOTAL_STEPS = 4;

const DISCOVERY_OPTIONS = [
  "Me lo sugirió el algoritmo",
  "Vi un anuncio en redes sociales",
  "Busqué este tipo de servicios en Google",
  "Me los presentó alguien de confianza",
  "Recibí un volante",
  "Otro",
] as const;

type SubmissionType = "basic" | "extended";
type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  location: string;
  discoverySource: string;
  discoverySourceOther: string;
  submissionType: SubmissionType;
  interest?: string;
  motivation?: string;
  expectations?: string;
  previousExperience?: string;
  additionalNotes?: string;
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    discoverySource: "",
    discoverySourceOther: "",
    interest: "",
    motivation: "",
    expectations: "",
    previousExperience: "",
    additionalNotes: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
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

  const isStepOneValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.phone.trim() &&
    formData.location.trim();

  const canProceedCurrentStep = currentStep === 1 ? Boolean(isStepOneValid) : true;

  const canSubmitBasic = Boolean(isStepOneValid);

  const buildPayload = (submissionType: SubmissionType): ContactPayload => {
    const basePayload: ContactPayload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      location: formData.location.trim(),
      discoverySource: formData.discoverySource,
      discoverySourceOther: formData.discoverySourceOther.trim(),
      submissionType,
    };

    if (submissionType === "basic") {
      return basePayload;
    }

    return {
      ...basePayload,
      interest: formData.interest.trim(),
      motivation: formData.motivation.trim(),
      expectations: formData.expectations.trim(),
      previousExperience: formData.previousExperience.trim(),
      additionalNotes: formData.additionalNotes.trim(),
      submissionType,
    };
  };

  const submitForm = async (submissionType: SubmissionType) => {
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload(submissionType)),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al enviar el mensaje");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        discoverySource: "",
        discoverySourceOther: "",
        interest: "",
        motivation: "",
        expectations: "",
        previousExperience: "",
        additionalNotes: "",
      });
      setCurrentStep(1);

      // Reset success message después de 5 segundos
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Error desconocido"
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep < TOTAL_STEPS) {
      if (!canProceedCurrentStep) return;
      setCurrentStep((prev) => prev + 1);
      return;
    }

    void submitForm("extended");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectSource = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      discoverySource: value,
      discoverySourceOther: value === "Otro" ? prev.discoverySourceOther : "",
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="contact-form max-w-2xl mx-auto space-y-8"
    >
      <div className="space-y-3">
        <p className="text-gray-500 text-xs uppercase tracking-[0.18em]">
          Paso {currentStep} de {TOTAL_STEPS}
        </p>
        <div className="h-1.5 bg-gray-900 overflow-hidden">
          <div
            className="h-full bg-vanguard-red transition-all duration-300"
            style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="group relative">
            <input
              id="contact-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder=" "
              className="peer w-full bg-transparent border-b-2 border-gray-800 focus:border-vanguard-red pt-7 pb-2 px-2 text-vanguard-white font-light tracking-wide focus:outline-none transition-colors duration-300"
            />
            <label
              htmlFor="contact-name"
              className="pointer-events-none absolute left-2 top-4 text-gray-500 text-sm tracking-wide transition-all duration-200 peer-focus:top-1 peer-focus:text-xs peer-focus:text-vanguard-red"
            >
              Nombre
            </label>
          </div>

          <div className="group relative">
            <input
              id="contact-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder=" "
              className="peer w-full bg-transparent border-b-2 border-gray-800 focus:border-vanguard-red pt-7 pb-2 px-2 text-vanguard-white font-light tracking-wide focus:outline-none transition-colors duration-300"
            />
            <label
              htmlFor="contact-email"
              className="pointer-events-none absolute left-2 top-4 text-gray-500 text-sm tracking-wide transition-all duration-200 peer-focus:top-1 peer-focus:text-xs peer-focus:text-vanguard-red"
            >
              Email
            </label>
          </div>

          <div className="group relative">
            <input
              id="contact-phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder=" "
              className="peer w-full bg-transparent border-b-2 border-gray-800 focus:border-vanguard-red pt-7 pb-2 px-2 text-vanguard-white font-light tracking-wide focus:outline-none transition-colors duration-300"
            />
            <label
              htmlFor="contact-phone"
              className="pointer-events-none absolute left-2 top-4 text-gray-500 text-sm tracking-wide transition-all duration-200 peer-focus:top-1 peer-focus:text-xs peer-focus:text-vanguard-red"
            >
              Teléfono
            </label>
          </div>

          <div className="group relative">
            <input
              id="contact-location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder=" "
              className="peer w-full bg-transparent border-b-2 border-gray-800 focus:border-vanguard-red pt-7 pb-2 px-2 text-vanguard-white font-light tracking-wide focus:outline-none transition-colors duration-300"
            />
            <label
              htmlFor="contact-location"
              className="pointer-events-none absolute left-2 top-4 text-gray-500 text-sm tracking-wide transition-all duration-200 peer-focus:top-1 peer-focus:text-xs peer-focus:text-vanguard-red"
            >
              Barrio / Localidad
            </label>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-6">
          <p className="text-vanguard-white text-sm uppercase tracking-[0.14em]">
            ¿Cómo conociste a Vanguardia?
          </p>
          <div className="space-y-3">
            {DISCOVERY_OPTIONS.map((option) => (
              <label
                key={option}
                className="flex items-start gap-3 text-gray-300 text-sm md:text-base font-light cursor-pointer"
              >
                <input
                  type="radio"
                  name="discoverySource"
                  value={option}
                  checked={formData.discoverySource === option}
                  onChange={(e) => handleSelectSource(e.target.value)}
                  className="mt-1 accent-vanguard-red"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>

          {formData.discoverySource === "Otro" && (
            <div className="group relative">
              <input
                id="discovery-source-other"
                type="text"
                name="discoverySourceOther"
                value={formData.discoverySourceOther}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full bg-transparent border-b-2 border-gray-800 focus:border-vanguard-red pt-7 pb-2 px-2 text-vanguard-white font-light tracking-wide focus:outline-none transition-colors duration-300"
              />
              <label
                htmlFor="discovery-source-other"
                className="pointer-events-none absolute left-2 top-4 text-gray-500 text-sm tracking-wide transition-all duration-200 peer-focus:top-1 peer-focus:text-xs peer-focus:text-vanguard-red"
              >
                Escribí cómo nos conociste
              </label>
            </div>
          )}
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-6">
          <p className="text-gray-500 text-xs uppercase tracking-[0.18em]">
            Opcional: podés saltear y enviar versión breve
          </p>
          <div className="group relative">
            <textarea
              id="contact-interest"
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              rows={4}
              placeholder=" "
              className="peer w-full bg-transparent border-2 border-gray-800 focus:border-vanguard-red pt-8 pb-3 px-4 text-vanguard-white font-light tracking-wide focus:outline-none transition-colors duration-300 resize-none"
            />
            <label
              htmlFor="contact-interest"
              className="pointer-events-none absolute left-4 top-4 text-gray-500 text-sm tracking-wide transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-vanguard-red"
            >
              ¿Qué es lo que más te interesó de la propuesta?
            </label>
          </div>

          <div className="group relative">
            <textarea
              id="contact-motivation"
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              rows={4}
              placeholder=" "
              className="peer w-full bg-transparent border-2 border-gray-800 focus:border-vanguard-red pt-8 pb-3 px-4 text-vanguard-white font-light tracking-wide focus:outline-none transition-colors duration-300 resize-none"
            />
            <label
              htmlFor="contact-motivation"
              className="pointer-events-none absolute left-4 top-4 text-gray-500 text-sm tracking-wide transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-vanguard-red"
            >
              ¿Qué te motiva a realizar una experiencia boudoir?
            </label>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="space-y-6">
          <p className="text-gray-500 text-xs uppercase tracking-[0.18em]">
            Opcional: podés enviar versión breve si preferís
          </p>
          <div className="group relative">
            <textarea
              id="contact-expectations"
              name="expectations"
              value={formData.expectations}
              onChange={handleChange}
              rows={4}
              placeholder=" "
              className="peer w-full bg-transparent border-2 border-gray-800 focus:border-vanguard-red pt-8 pb-3 px-4 text-vanguard-white font-light tracking-wide focus:outline-none transition-colors duration-300 resize-none"
            />
            <label
              htmlFor="contact-expectations"
              className="pointer-events-none absolute left-4 top-4 text-gray-500 text-sm tracking-wide transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-vanguard-red"
            >
              ¿Cuáles son tus expectativas?
            </label>
          </div>

          <div className="group relative">
            <textarea
              id="contact-previous-experience"
              name="previousExperience"
              value={formData.previousExperience}
              onChange={handleChange}
              rows={4}
              placeholder=" "
              className="peer w-full bg-transparent border-2 border-gray-800 focus:border-vanguard-red pt-8 pb-3 px-4 text-vanguard-white font-light tracking-wide focus:outline-none transition-colors duration-300 resize-none"
            />
            <label
              htmlFor="contact-previous-experience"
              className="pointer-events-none absolute left-4 top-4 text-gray-500 text-sm tracking-wide transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-vanguard-red"
            >
              ¿Tenés experiencias previas de fotografía boudoir? ¿Qué tal fueron?
            </label>
          </div>

          <div className="group relative">
            <textarea
              id="contact-additional-notes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              rows={5}
              placeholder=" "
              className="peer w-full bg-transparent border-2 border-gray-800 focus:border-vanguard-red pt-8 pb-3 px-4 text-vanguard-white font-light tracking-wide focus:outline-none transition-colors duration-300 resize-none"
            />
            <label
              htmlFor="contact-additional-notes"
              className="pointer-events-none absolute left-4 top-4 text-gray-500 text-sm tracking-wide transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-vanguard-red"
            >
              Contanos si tenés alguna idea particular o algo importante para la entrevista.
            </label>
          </div>
        </div>
      )}

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

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-6">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={status === "sending"}
            className="px-5 py-3 border border-gray-700 text-gray-300 text-[11px] sm:text-sm uppercase tracking-[0.14em] sm:tracking-widest whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed transition-colors hover:border-gray-500"
          >
            Volver
          </button>
        ) : (
          <div aria-hidden="true" />
        )}

        {currentStep >= 2 && currentStep < TOTAL_STEPS && (
          <button
            type="button"
            onClick={() => void submitForm("basic")}
            disabled={!canSubmitBasic || status === "sending"}
            className="px-5 py-3 border border-vanguard-red/60 text-vanguard-red text-[11px] sm:text-sm uppercase tracking-[0.14em] sm:tracking-widest whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed transition-colors hover:bg-vanguard-red hover:text-black"
          >
            Enviar versión breve
          </button>
        )}
      </div>

      <div className="text-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="hover-trigger relative px-8 sm:px-12 py-3.5 sm:py-4 border-2 border-vanguard-red text-vanguard-white text-[11px] sm:text-sm font-bold uppercase tracking-[0.14em] sm:tracking-widest leading-none whitespace-nowrap transition-all duration-300 hover:bg-vanguard-red hover:text-black disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden inline-flex items-center justify-center"
        >
          <span className="relative z-10 pointer-events-none">
            {status === "sending"
              ? "Enviando..."
              : currentStep === TOTAL_STEPS
              ? "Enviar formulario completo"
              : "Siguiente paso"}
          </span>
          <div className="absolute inset-0 bg-vanguard-red transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out z-0 pointer-events-none"></div>
        </button>
      </div>
    </form>
  );
}
