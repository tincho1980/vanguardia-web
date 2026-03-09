import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import BackToTopButton from "@/components/ui/BackToTopButton";
import Preloader from "@/components/ui/Preloader";
import WhatsAppFloatingButton from "@/components/ui/WhatsAppFloatingButton";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import About from "@/components/sections/About";
import VanguardiaDistinta from "@/components/sections/VanguardiaDistinta";
import Services from "@/components/sections/Services";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative w-full min-h-screen bg-vanguard-black text-vanguard-white selection:bg-vanguard-red selection:text-white overflow-x-hidden">
        <CustomCursor />
        <Preloader />
        <BackToTopButton />
        <WhatsAppFloatingButton />
        
        <Hero />
        <Manifesto />
        <About />
        <VanguardiaDistinta />
        <Services />
        <Gallery />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
