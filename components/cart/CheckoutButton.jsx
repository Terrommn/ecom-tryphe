import Link from "next/link";

export function CheckoutButton({ checkoutUrl, disabled }) {
  if (disabled || !checkoutUrl) {
    return (
      <button
        type="button"
        disabled
        className="w-full rounded-full bg-[var(--oob-muted)] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--oob-bg)] cursor-not-allowed"
      >
        Proceder al pago
      </button>
    );
  }
  return (
    <Link
      href={checkoutUrl}
      className="flex w-full items-center justify-center rounded-full bg-[var(--oob-gold)] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--oob-bg)] transition hover:bg-[var(--oob-gold-hover)]"
    >
      Proceder al pago
    </Link>
  );
}
