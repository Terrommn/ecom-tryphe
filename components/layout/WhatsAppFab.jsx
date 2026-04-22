const WHATSAPP_PHONE = "525555555555";
const WHATSAPP_MESSAGE = "Hola TRYPHÉ, tengo una duda sobre sus fragancias.";

export function WhatsAppFab() {
  const href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-neutral-950/25 ring-1 ring-black/5 transition-transform duration-300 hover:scale-110 hover:bg-[#1ebe5a] md:right-8 md:bottom-8 md:h-16 md:w-16"
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366]/60 opacity-70 animate-ping" />
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="relative h-7 w-7 md:h-8 md:w-8"
        fill="currentColor"
      >
        <path d="M19.11 17.21c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.14-.64.14-.19.29-.74.94-.91 1.13-.17.19-.33.21-.62.07-.29-.14-1.22-.45-2.32-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.44.12-.59.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38 0 1.4 1.02 2.75 1.17 2.95.14.19 2 3.05 4.84 4.28.68.29 1.2.47 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33zM16 3C8.82 3 3 8.82 3 16c0 2.3.6 4.46 1.66 6.33L3 29l6.83-1.64A12.95 12.95 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 23.82c-2.01 0-3.9-.54-5.52-1.48l-.4-.24-4.05.97.99-3.94-.26-.41A10.8 10.8 0 0 1 5.18 16C5.18 10.03 10.03 5.18 16 5.18c5.97 0 10.82 4.85 10.82 10.82 0 5.97-4.85 10.82-10.82 10.82z" />
      </svg>
    </a>
  );
}
