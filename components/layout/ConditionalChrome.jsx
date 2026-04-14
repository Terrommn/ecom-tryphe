"use client";

import { usePathname } from "next/navigation";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export function ConditionalChrome({ children }) {
  const pathname = usePathname();
  const marketingPaths = [
    "/",
    "/encuentra-tu-aroma",
    "/collections/hombre",
    "/collections/mujer",
    "/acerca",
  ];
  const isMarketingShell = marketingPaths.includes(pathname);

  if (isMarketingShell) {
    return <div className="flex min-h-0 flex-1 flex-col">{children}</div>;
  }

  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main className="relative z-[1] flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
