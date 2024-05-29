import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

export function formatString(name: string | null | undefined) {
  if (!name) {
    return "tudo bem?";
  }

  return name.replace(/(?:^|\s)[a-z]/g, function (letter: string) {
    return letter.toUpperCase();
  });
}
