"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import type Lenis from "@studio-freight/lenis";

type LenisContextValue = Lenis | null;

const LenisContext = createContext<LenisContextValue>(null);

export function LenisProvider({
  lenis,
  children,
}: {
  lenis: Lenis | null;
  children: ReactNode;
}) {
  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}

export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}
