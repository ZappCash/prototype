import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZappCash - Decentralized Payments",
  description: "Send and receive money instantly with ultra-low fees using stablecoins in Costa Rica.",
  keywords: "ZappCash, Costa Rica, payments, stablecoins, cryptocurrency, blockchain, DeFi",
  authors: [{ name: "ZappCash" }],
  openGraph: {
    title: "ZappCash - Decentralized Payments",
    description: "Send and receive money instantly with ultra-low fees using stablecoins in Costa Rica.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-black text-white">
        {children}
      </body>
    </html>
  );
}
