"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Detectar si el dispositivo tiene hover (no touch)
    const checkHover = window.matchMedia("(hover: hover)").matches;

    if (!checkHover) {
      // Ocultar cursor en dispositivos táctiles
      gsap.set(cursor, { display: "none" });
      return;
    }

    const ctx = gsap.context(() => {
      // Inicialmente oculto y fuera de pantalla hasta detectar mouse real en la ventana
      gsap.set(cursor, {
        xPercent: -50,
        yPercent: -50,
        x: -100,
        y: -100,
        opacity: 0,
      });

      let hasMoved = false;
      let isInWindow = false;

      const moveCursor = (e: MouseEvent) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.2,
          ease: "power2.out",
        });

        if (!hasMoved) {
          hasMoved = true;
        }
        if (!isInWindow) {
          isInWindow = true;
        }
        gsap.to(cursor, {
          opacity: 1,
          duration: 0.2,
        });
      };

      const hideCursor = () => {
        isInWindow = false;
        gsap.to(cursor, {
          opacity: 0,
          duration: 0.3,
        });
      };

      const showCursor = () => {
        if (!hasMoved || !isInWindow) return;
        gsap.to(cursor, {
          opacity: 1,
          duration: 0.3,
        });
      };

      const handleWindowBlur = () => {
        hideCursor();
      };

      const handleVisibilityChange = () => {
        if (document.hidden) {
          hideCursor();
        }
      };

      const handleDocumentMouseOut = (e: MouseEvent) => {
        // Cuando relatedTarget es null, el puntero salió de la ventana
        if (!e.relatedTarget) {
          hideCursor();
        }
      };

      const hoverScale = () => {
        gsap.to(cursor, {
          scale: 3,
          backgroundColor: "transparent",
          border: "1px solid #972528",
        });
      };

      const hoverReset = () => {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "#972528",
          border: "none",
        });
      };

      window.addEventListener("mousemove", moveCursor);
      window.addEventListener("mouseleave", hideCursor);
      window.addEventListener("mouseenter", showCursor);
      window.addEventListener("blur", handleWindowBlur);
      document.addEventListener("visibilitychange", handleVisibilityChange);
      document.addEventListener("mouseout", handleDocumentMouseOut);

      // Bind interactivos
      const bindInteractiveElements = () => {
        const interactiveElements = document.querySelectorAll(
          "a, button, .hover-trigger"
        );
        interactiveElements.forEach((el) => {
          el.addEventListener("mouseenter", hoverScale as EventListener);
          el.addEventListener("mouseleave", hoverReset as EventListener);
        });
      };

      // Initial bind
      setTimeout(bindInteractiveElements, 1000);

      // Observer para nuevos elementos
      const observer = new MutationObserver(() => {
        bindInteractiveElements();
      });
      observer.observe(document.body, { childList: true, subtree: true });

      return () => {
        window.removeEventListener("mousemove", moveCursor);
        window.removeEventListener("mouseleave", hideCursor);
        window.removeEventListener("mouseenter", showCursor);
        window.removeEventListener("blur", handleWindowBlur);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        document.removeEventListener("mouseout", handleDocumentMouseOut);
        observer.disconnect();
        const interactiveElements = document.querySelectorAll(
          "a, button, .hover-trigger"
        );
        interactiveElements.forEach((el) => {
          el.removeEventListener("mouseenter", hoverScale as EventListener);
          el.removeEventListener("mouseleave", hoverReset as EventListener);
        });
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 bg-vanguard-red rounded-full pointer-events-none z-9999 mix-blend-exclusion hidden md:block"
    />
  );
}
