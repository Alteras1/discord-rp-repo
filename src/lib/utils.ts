import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toTitlecase = (str: string) => str.replaceAll("-", " ").replace(/\b(\w)/g, (k) => k.toUpperCase());

export const milliSecondsIn7Min = 1000 * 60 * 7;
