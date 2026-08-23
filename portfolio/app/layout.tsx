/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used only by JSX or TypeScript. */
import "./globals.css";
import type { Metadata } from "next";
import { bodyFont, displayFont } from "@/lib/fonts";
import { getSiteUrl, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: `${siteConfig.name} | ${siteConfig.descriptor}`,
    template: `%s | ${siteConfig.name}`,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>{children}</body>
    </html>
  );
}
