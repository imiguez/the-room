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
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
      </head>
      <body className={`${roboto.variable} ${bungee.variable}`}>{children}</body>
    </html>
  );
}
