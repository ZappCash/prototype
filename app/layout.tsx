import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PostHogProvider } from "@/components/providers/PostHogProvider";

export const metadata: Metadata = {
  title: "ZappCash - Fast USDC Payments",
  description: "Fast and secure USDC payments on Stellar. Send, receive, and manage your crypto with ease.",
  keywords: "ZappCash, USDC, Stellar, payments, crypto, stablecoins, blockchain, web3",
  authors: [{ name: "ZappCash" }],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ZappCash",
  },
  openGraph: {
    title: "ZappCash - Fast USDC Payments",
    description: "Fast and secure USDC payments on Stellar",
    type: "website",
  },
  icons: {
    icon: "/icon-192x192.png",
    apple: "/icon-192x192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#00ff88",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className="antialiased bg-black text-white">
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
