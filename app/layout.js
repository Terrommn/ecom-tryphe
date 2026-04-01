import { Inter } from "next/font/google";
import "./globals.css";
import { ConditionalChrome } from "@/components/layout/ConditionalChrome";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const display = Inter({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const siteName = process.env.NEXT_PUBLIC_SITE_NAME?.trim();

export const metadata = {
  title: siteName ? `${siteName} | Tienda` : "Tienda",
  description: siteName
    ? `Compra en ${siteName}. Catálogo y checkout con Shopify.`
    : "Headless commerce con Next.js y Shopify. Configura marca y contenido en .env.local.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-MX">
      <body
        className={`${inter.variable} ${display.variable} antialiased min-h-dvh flex flex-col overflow-x-hidden`}
      >
        <ConditionalChrome>{children}</ConditionalChrome>
      </body>
    </html>
  );
}
