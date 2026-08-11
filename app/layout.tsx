import type { Metadata } from "next";
import { Anton, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartWidget from "@/components/CartWidget";
import { CartProvider } from "@/lib/cart-context";

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
});

const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "3F Bebidas | Distribuidora",
  description:
    "Cervejas, refrigerantes, águas, energéticos, destilados, vinhos e gelo com entrega rápida.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <CartWidget />
        </CartProvider>
      </body>
    </html>
  );
}
