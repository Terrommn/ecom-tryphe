import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConditionalChrome } from "@/components/layout/ConditionalChrome";
import { GsapScrollSetup } from "@/components/gsap/GsapScrollSetup";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { WelcomePopup } from "@/components/layout/WelcomePopup";

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
      <head>
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1807661143240899');
          fbq('track', 'PageView');
        `}</Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1807661143240899&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0K8K3HL1TC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0K8K3HL1TC');
        `}</Script>
      </head>
      <body
        className={`${inter.variable} ${display.variable} antialiased min-h-dvh flex flex-col overflow-x-hidden`}
      >
        <GsapScrollSetup />
        <ConditionalChrome>{children}</ConditionalChrome>
        <WhatsAppFab />
        <WelcomePopup />
      </body>
    </html>
  );
}
