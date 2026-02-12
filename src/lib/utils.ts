import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases de Tailwind con clsx y tailwind-merge
 * para manejar clases condicionales y evitar conflictos.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
