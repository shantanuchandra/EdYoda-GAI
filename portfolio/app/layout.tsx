/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used only by JSX or TypeScript. */
import "./globals.css";
import type { Metadata } from "next";
import { bodyFont, displayFont, resumeFont, signatureFont } from "@/lib/fonts";
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: 'document.documentElement.dataset.fold1Motion="enabled"',
          }}
        />
      </head>
      <body className={`${bodyFont.variable} ${displayFont.variable} ${resumeFont.variable} ${signatureFont.variable}`}>{children}</body>
    </html>
  );
}
