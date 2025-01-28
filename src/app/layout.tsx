import type { Metadata } from "next";
import { Open_Sans } from 'next/font/google'
import { BackgroundParticles } from "@/components/BackgroundParticles";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home - om3ga",
  description: "om3ga github site",
};

const opensans = Open_Sans({
  weight: "400",
  style: "normal",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-[#1e1e2e] ${opensans.className}`}>
        <BackgroundParticles />
        {children}
      </body>
    </html>
  );
}
