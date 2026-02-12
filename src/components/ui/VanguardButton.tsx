"use client";

import type { ReactNode } from "react";

type VanguardButtonProps = {
  children: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  className?: string;
  inverted?: boolean;
};

export default function VanguardButton({
  children,
  href,
  target,
  rel,
  onClick,
  className = "",
  inverted = false,
}: VanguardButtonProps) {
  const commonClasses =
    "hover-trigger relative px-8 py-4 border text-sm tracking-widest uppercase transition-all duration-300 font-bold group overflow-hidden inline-flex items-center justify-center";

  const variantClasses = inverted
    ? "border-vanguard-red bg-vanguard-red text-black hover:border-vanguard-white"
    : "border-vanguard-red text-vanguard-white hover:text-black";

  const overlayClasses = inverted
    ? "bg-vanguard-white"
    : "bg-vanguard-red";

  const content = (
    <>
      <span className="relative z-10 pointer-events-none">{children}</span>
      <div
        className={`absolute inset-0 ${overlayClasses} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out z-0 pointer-events-none`}
      ></div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={`${commonClasses} ${variantClasses} ${className}`.trim()}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${commonClasses} ${variantClasses} ${className}`.trim()}
    >
      {content}
    </button>
  );
}
