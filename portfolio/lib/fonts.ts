import { Manrope, Newsreader } from "next/font/google";

export const bodyFont = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const displayFont = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
});
