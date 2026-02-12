import ContactForm from "@/components/ui/ContactForm";
import DirectContact from "@/components/ui/DirectContact";

export default function Contact() {
  return (
    <section className="contact-section pt-16 pb-32 bg-vanguard-black relative border-t border-gray-900 z-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-vanguard-red tracking-widest mb-8 text-sm uppercase font-bold">
            Únete a la Vanguardia
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase mb-8 leading-tight text-vanguard-white">
            ¿Te Atreves a<br /> dar el paso?
          </h2>
          <p className="text-gray-400 font-light tracking-wide max-w-2xl mx-auto mt-6">
            Comenzá tu experiencia Vanguardia. Dejanos tus datos y te
            contactaremos para diseñar juntos tu sesión única.
          </p>
        </div>

        {/* Formulario */}
        <ContactForm />

        {/* Divider */}
        <div className="my-20 flex items-center justify-center">
          <div className="h-px bg-gray-800 flex-1 max-w-xs"></div>
          <span className="px-6 text-gray-600 text-xs uppercase tracking-widest">
            O
          </span>
          <div className="h-px bg-gray-800 flex-1 max-w-xs"></div>
        </div>

        {/* Contacto Directo */}
        <DirectContact />

        {/* Footer */}
        <footer className="mt-32 text-center space-y-4">
          <p className="text-gray-600 text-sm uppercase tracking-widest">
            Vanguardia by Negrovski © 2026
          </p>
          <p className="text-gray-700 text-xs font-light tracking-wide">
            Hecha con{" "}
            <span className="text-vanguard-red inline-block animate-pulse">
              ♥
            </span>{" "}
            por{" "}
            <a
              href="https://www.linkedin.com/in/mramallo/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-trigger text-gray-500 hover:text-vanguard-red transition-colors duration-300 font-normal"
            >
              Martín Ramallo
            </a>
          </p>
        </footer>
      </div>
    </section>
  );
}
