"use client";

/**
 * All routes now render bare layout. Each page is responsible for wrapping
 * itself with TrypheMarketingChrome (directly or via TrypheShell).
 */
export function ConditionalChrome({ children }) {
  return <div className="flex min-h-0 flex-1 flex-col">{children}</div>;
}
