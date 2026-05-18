import { TrypheShell } from "@/components/layout/TrypheShell";
import Link from "next/link";

export const metadata = {
  title: "Factura Tu Pedido | Tryphe",
  description: "Solicita la factura de tu compra en Tryphe.",
};

export default function FacturaPage() {
  return (
    <TrypheShell>
      <div className="bg-[#faf9f7] py-24">
        <div className="mx-auto max-w-screen-sm px-6 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-500">
            Facturación
          </p>
          <h1 className="mt-4 font-serif text-3xl font-medium text-neutral-950 md:text-4xl">
            Factura Tu Pedido
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-neutral-600">
            Para solicitar la factura de tu compra, envíanos un correo con los siguientes datos
            dentro de los primeros <strong>3 días hábiles</strong> después de tu pedido:
          </p>

          <ul className="mt-6 space-y-2 text-left text-sm text-neutral-700 inline-block">
            <li>• Número de pedido</li>
            <li>• Razón social</li>
            <li>• RFC</li>
            <li>• Dirección fiscal</li>
            <li>• Uso del CFDI</li>
            <li>• Correo electrónico para envío de factura</li>
          </ul>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="mailto:info@tryphe.mx?subject=Solicitud%20de%20Factura"
              className="inline-flex min-h-[52px] items-center justify-center bg-neutral-950 px-10 text-[10px] font-bold uppercase tracking-[0.3em] text-white transition-colors hover:bg-neutral-800"
            >
              Solicitar por Correo
            </a>
            <a
              href="https://wa.me/528184587897?text=Hola%2C%20necesito%20solicitar%20factura%20de%20mi%20pedido"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center justify-center border border-neutral-950 px-10 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-950 transition-colors hover:bg-neutral-100"
            >
              WhatsApp
            </a>
          </div>

          <p className="mt-8 text-xs text-neutral-500">
            Las facturas se emiten en un plazo de 24 a 48 horas hábiles después de recibir
            la información completa. No se emiten facturas después del mes en que se realizó la compra.
          </p>
        </div>
      </div>
    </TrypheShell>
  );
}
