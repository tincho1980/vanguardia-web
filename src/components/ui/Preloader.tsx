"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import logo from "@/assets/imgs/logo_2.png";

export default function Preloader() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      const tlLoader = gsap.timeline();
      tlLoader
        .to(".loader-bar", {
          width: "100%",
          duration: 1.5,
          ease: "power2.inOut",
        })
        .to(".loader-text", { opacity: 0, duration: 0.5 })
        .to(".loader-screen", {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
          onComplete: () => {
            gsap.set(".loader-screen", { display: "none", visibility: "hidden" });
            ScrollTrigger.refresh();
          },
        });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="loader-screen fixed inset-0 z-100 bg-vanguard-black flex flex-col items-center justify-center pointer-events-auto">
      <div className="loader-text mb-8 w-64 md:w-80">
        <Image
          src={logo}
          alt="Vanguardia by Negrovski"
          width={320}
          height={120}
          className="w-full h-auto"
          priority
        />
      </div>
      <div className="w-64 h-[2px] bg-gray-900 overflow-hidden relative">
        <div className="loader-bar absolute top-0 left-0 h-full w-0 bg-vanguard-red"></div>
      </div>
    </div>
  );
}
