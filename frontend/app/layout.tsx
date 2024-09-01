import type { Metadata } from "next";
import { Roboto, Bungee } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "700"],
  display: 'swap',
  variable: "--font-roboto"
});
const bungee = Bungee({
  subsets: ["latin"],
  weight: "400",
  display: 'swap',
  variable: "--font-bungee"
});

export const metadata: Metadata = {
  title: "The Room",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${roboto.variable} ${bungee.variable}`}>{children}</body>
    </html>
  );
}
