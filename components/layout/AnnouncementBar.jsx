export function AnnouncementBar() {
  const text = process.env.NEXT_PUBLIC_ANNOUNCEMENT_TEXT;
  if (!text?.trim()) return null;

  return (
    <div
      className="relative z-[3] w-full border-b border-[color:var(--oob-topbar-border)] bg-[var(--oob-topbar-bg)] text-center text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--oob-topbar-text)] py-2.5 px-4"
      role="region"
      aria-label="Anuncio"
    >
      <span className="opacity-95">{text}</span>
    </div>
  );
}
