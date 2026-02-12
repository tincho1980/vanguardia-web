import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { SERVICES, GALLERY_IMAGES } from './constants';

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
    Lenis: any;
    lenis: any;
  }
}

const App: React.FC = () => {
  const comp = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<any>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  // --- 1. Custom Cursor ---
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    window.gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      window.gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2, // Faster response
        ease: "power2.out"
      });
    };

    const hoverScale = () => {
      window.gsap.to(cursor, { scale: 3, backgroundColor: 'transparent', border: '1px solid #972528' });
    };

    const hoverReset = () => {
      window.gsap.to(cursor, { scale: 1, backgroundColor: '#972528', border: 'none' });
    };

    window.addEventListener('mousemove', moveCursor);

    // Dynamic hover listener
    setTimeout(() => {
      const interactiveElements = document.querySelectorAll('a, button, .hover-trigger');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', hoverScale);
        el.addEventListener('mouseleave', hoverReset);
      });
    }, 1500);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  // --- 2. Animations & Scroll ---
  useLayoutEffect(() => {
    // 1. Setup Lenis
    const lenis = new window.Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;
    window.lenis = lenis;

    // 2. Setup GSAP ScrollTrigger
    window.gsap.registerPlugin(window.ScrollTrigger);

    // 3. Connect Lenis to ScrollTrigger
    lenis.on('scroll', window.ScrollTrigger.update);
    
    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    window.gsap.ticker.add(tickerFn);
    window.gsap.ticker.lagSmoothing(0);

    let ctx = window.gsap.context(() => {
      
      // A. PRELOADER
      const tlLoader = window.gsap.timeline();
      tlLoader
        .to(".loader-bar", { width: "100%", duration: 1.5, ease: "power2.inOut" })
        .to(".loader-text", { opacity: 0, duration: 0.5 })
        .to(".loader-screen", { 
          yPercent: -100, 
          duration: 1, 
          ease: "power4.inOut",
          onComplete: () => {
            // Force removal from layout flow and interaction
            window.gsap.set(".loader-screen", { display: "none", visibility: "hidden" });
            // Re-calculate page height after preloader is gone
            window.ScrollTrigger.refresh();
          }
        });

      // B. HERO
      window.gsap.to(".hero-content", {
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        yPercent: 50,
        opacity: 0
      });

      // C. MANIFESTO (Horizontal Scroll Effect)
      const manifestoRows = window.gsap.utils.toArray(".manifesto-row");
      manifestoRows.forEach((row: HTMLElement, i: number) => {
        const direction = i % 2 === 0 ? -1 : 1;
        if (!row.classList.contains("static-row")) {
          window.gsap.fromTo(row, 
            { xPercent: direction * -10 },
            {
              xPercent: direction * 10,
              ease: "none",
              scrollTrigger: {
                trigger: ".manifesto-section",
                start: "top bottom",
                end: "bottom top",
                scrub: 1
              }
            }
          );
        }
      });

      // D. SERVICES
      const serviceItems = window.gsap.utils.toArray(".service-item");
      const serviceImages = window.gsap.utils.toArray(".service-img");
      
      if(serviceItems.length > 0 && serviceImages.length > 0) {
        serviceItems.forEach((item: HTMLElement, i: number) => {
          if(!serviceImages[i]) return;
          window.ScrollTrigger.create({
            trigger: item,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
              window.gsap.to(serviceImages, { opacity: 0, duration: 0.5, overwrite: true });
              window.gsap.to(serviceImages[i], { opacity: 1, duration: 0.5, overwrite: true });
            },
            onEnterBack: () => {
              window.gsap.to(serviceImages, { opacity: 0, duration: 0.5, overwrite: true });
              window.gsap.to(serviceImages[i], { opacity: 1, duration: 0.5, overwrite: true });
            }
          });
        });
      }

      // E. GALLERY
      const galleryItems = window.gsap.utils.toArray(".gallery-item");
      galleryItems.forEach((item: HTMLElement) => {
        window.gsap.fromTo(item, 
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
            },
            onComplete: () => {
               const border = item.querySelector('.gallery-border');
               if(border) window.gsap.to(border, { scale: 1, opacity: 1, duration: 0.5 });
            }
          }
        );
      });

    }, comp);

    return () => {
      ctx.revert();
      lenis.destroy();
      window.gsap.ticker.remove(tickerFn);
    };
  }, []);

  const handleStartExperience = () => {
    const target = document.querySelector('.manifesto-section');
    if (lenisRef.current && target) {
      lenisRef.current.scrollTo(target, { offset: -50, duration: 1.5 });
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // REMOVED overflow-x-hidden from here to let Body handle it. 
    // This div just flows naturally with the content.
    <div ref={comp} className="relative w-full min-h-screen font-sans bg-vanguard-black text-vanguard-white selection:bg-vanguard-red selection:text-white">
      
      {/* Custom Cursor */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-4 h-4 bg-vanguard-red rounded-full pointer-events-none z-[9999] mix-blend-exclusion hidden md:block"
      />

      {/* A. PRELOADER */}
      <div className="loader-screen fixed inset-0 z-[100] bg-vanguard-black flex flex-col items-center justify-center pointer-events-auto">
        <h1 className="loader-text font-black text-4xl tracking-[0.3em] mb-8">VANGUARDIA</h1>
        <div className="w-64 h-[2px] bg-gray-900 overflow-hidden relative">
          <div className="loader-bar absolute top-0 left-0 h-full w-0 bg-vanguard-red"></div>
        </div>
      </div>

      {/* B. HERO SECTION */}
      <section className="hero-section relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Dark Background */}
        <div className="absolute inset-0 z-0 opacity-40 select-none pointer-events-none">
           <img 
            src="https://placehold.co/1920x1080/111111/222222?text=Cinematic+Dark+Atmosphere" 
            alt="Background" 
            className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-vanguard-black via-transparent to-black/80"></div>
        </div>

        <div className="hero-content relative z-10 text-center px-4">
          <p className="text-sm md:text-base tracking-widest-xl text-gray-400 mb-6 uppercase">
            Arte Boudoir de Alta Gama
          </p>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-4 uppercase leading-none">
            Vanguardia <br/> 
            <span className="text-transparent stroke-white" style={{ WebkitTextStroke: "1px #fff" }}>es la</span> <br/>
            Revolución
          </h1>
          <p className="text-xl md:text-2xl font-light italic text-gray-300 mt-6 mb-12">
            Que nadie se atrevió a proclamar.
          </p>
          
          <button 
            onClick={handleStartExperience}
            className="hover-trigger relative px-8 py-4 border border-vanguard-red text-white text-sm tracking-widest uppercase transition-all duration-300 hover:bg-vanguard-red hover:text-black font-bold group overflow-hidden cursor-none inline-block"
          >
             <span className="relative z-10 pointer-events-none">Iniciar Experiencia</span>
             <div className="absolute inset-0 bg-vanguard-red transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out z-0 pointer-events-none"></div>
          </button>
        </div>
      </section>

      {/* C. MANIFESTO SECTION */}
      <section className="manifesto-section py-32 md:py-64 relative z-10 bg-vanguard-black overflow-hidden flex flex-col gap-12 md:gap-24">
         <div className="manifesto-row whitespace-nowrap select-none">
            <h2 className="text-6xl md:text-9xl font-black text-gray-800 opacity-50 uppercase tracking-tighter">
              No Cosifica. No Cosifica. No Cosifica. No Cosifica.
            </h2>
         </div>
         <div className="manifesto-row whitespace-nowrap flex justify-end select-none">
            <h2 className="text-6xl md:text-9xl font-black text-gray-600 uppercase tracking-tighter">
              No Devalúa. No Devalúa. No Devalúa. No Devalúa.
            </h2>
         </div>
         <div className="manifesto-row whitespace-nowrap select-none">
            <h2 className="text-6xl md:text-9xl font-black text-gray-400 uppercase tracking-tighter">
              No Estandariza. No Estandariza. No Estandariza.
            </h2>
         </div>
         <div className="manifesto-row static-row text-center px-4 mt-12">
            <h2 className="text-5xl md:text-8xl font-black text-vanguard-red uppercase tracking-tighter shadow-red-glow">
              Humaniza y Enaltece.
            </h2>
            <p className="max-w-2xl mx-auto mt-12 text-lg md:text-xl font-light leading-relaxed text-gray-300">
              "Vanguardia es la revolución que nadie se atrevió a proclamar en el universo del arte Boudoir. Enemigos radicales del arte mediocre."
            </p>
         </div>
      </section>

      {/* D. SERVICES SECTION */}
      <section className="services-section relative z-10 bg-vanguard-black min-h-screen">
         <div className="container mx-auto px-4 lg:flex">
            {/* Left: Scrollable Text */}
            <div className="lg:w-1/2 py-24 flex flex-col gap-[50vh]">
               {SERVICES.map((service, index) => (
                 <div key={service.id} className="service-item min-h-[50vh] flex flex-col justify-center px-4 md:px-12 border-l border-gray-900/50 hover:border-vanguard-red transition-colors duration-500">
                    <span className="text-vanguard-red font-bold text-xl mb-4">0{index + 1}.</span>
                    <h3 className="text-4xl md:text-5xl font-black uppercase mb-6">{service.title}</h3>
                    <p className="text-lg text-gray-400 font-light leading-relaxed">{service.description}</p>
                 </div>
               ))}
            </div>

            {/* Right: Sticky Image */}
            <div className="hidden lg:block lg:w-1/2 h-screen sticky top-0 flex items-center justify-center p-12">
               <div className="relative w-full h-[80vh] overflow-hidden bg-[#111]">
                  {SERVICES.map((service, index) => (
                    <img 
                      key={service.id}
                      src={service.img} 
                      alt={service.title}
                      className={`service-img absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
                    />
                  ))}
                  {/* Overlay Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-vanguard-black/80 to-transparent pointer-events-none"></div>
                  <div className="absolute inset-0 border border-vanguard-red/20 pointer-events-none"></div>
               </div>
            </div>
         </div>
      </section>

      {/* E. GALLERY SECTION */}
      <section className="gallery-section py-32 px-4 md:px-12 bg-vanguard-black relative z-10">
        <div className="max-w-7xl mx-auto">
           <h2 className="text-4xl md:text-6xl font-black mb-24 text-center uppercase tracking-widest">
             Manifiesto Visual
           </h2>
           
           <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {GALLERY_IMAGES.map((src, i) => (
                <div key={i} className="gallery-item hover-trigger relative group break-inside-avoid">
                   <div className="relative overflow-hidden">
                      <img src={src} alt="Gallery" className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700" />
                      {/* Animated Red Border */}
                      <div className="gallery-border absolute inset-0 border-2 border-vanguard-red opacity-0 scale-95 pointer-events-none"></div>
                   </div>
                   
                   {/* Interspersed Text Logic */}
                   {(i === 1 || i === 4) && (
                     <div className="py-12 text-center">
                        <p className="text-vanguard-red font-bold tracking-widest uppercase text-sm">
                          {i === 1 ? "Subvertimos malas praxis" : "Espejo de tu singularidad"}
                        </p>
                     </div>
                   )}
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* F. CONTACT SECTION */}
      <section className="contact-section py-32 bg-vanguard-black relative border-t border-gray-900 z-10">
         <div className="container mx-auto px-4 text-center">
            <p className="text-vanguard-red tracking-widest mb-8 text-sm uppercase font-bold">Únete a la Vanguardia</p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase mb-16 leading-tight">
              ¿Te Atreves a<br/> dar el paso?
            </h2>

            <div className="flex flex-col md:flex-row justify-center items-center gap-12 text-lg font-light tracking-wide">
               <a href="mailto:vanguardiabynegrovski@gmail.com" className="hover-trigger hover:text-vanguard-red transition-colors cursor-none">
                 vanguardiabynegrovski@gmail.com
               </a>
               <span className="hidden md:block text-gray-700">|</span>
               <a href="tel:2216497114" className="hover-trigger hover:text-vanguard-red transition-colors cursor-none">
                 221-649-7114
               </a>
            </div>

            <div className="mt-12">
               <a href="#" className="hover-trigger text-xl font-bold uppercase border-b border-vanguard-red pb-1 hover:text-vanguard-red transition-colors cursor-none">
                 @vanguardia.boudoir.oficial
               </a>
            </div>

            <footer className="mt-32 text-gray-600 text-sm uppercase tracking-widest">
               Vanguardia by Negrovski © 2026
            </footer>
         </div>
      </section>

    </div>
  );
};

export default App;