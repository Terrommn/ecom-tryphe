"use server";

import { createCustomer, isShopifyConfigured } from "@/lib/shopify";

export async function subscribeAction(email) {
  if (!isShopifyConfigured()) {
    return { ok: false, error: "Shopify no configurado." };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Correo inválido." };
  }

  try {
    const { errors } = await createCustomer(email);

    // TAKEN or CUSTOMER_DISABLED means email already exists — still success
    const blocking = errors.filter(
      (e) => e.code !== "TAKEN" && e.code !== "CUSTOMER_DISABLED"
    );

    if (blocking.length > 0) {
      return { ok: false, error: blocking[0].message };
    }

    return { ok: true };
  } catch (err) {
    console.error("[subscribe]", err);
    return { ok: false, error: "Error al registrar. Intenta de nuevo." };
  }
}
