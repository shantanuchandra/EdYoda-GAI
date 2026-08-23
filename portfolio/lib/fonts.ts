import { Allura, Manrope, Newsreader } from "next/font/google";

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

export const signatureFont = Allura({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-signature",
});
