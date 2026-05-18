import { LegalPage } from "@/components/legal/LegalPage";
import { TrypheShell } from "@/components/layout/TrypheShell";

export const metadata = {
  title: "Políticas de Cancelación y Devoluciones | Tryphe",
  description: "Conoce nuestras políticas de cancelación y devoluciones en Tryphe.",
};

export default function PoliticasCancelacionPage() {
  return (
    <TrypheShell>
      <div className="bg-[#faf9f7]">
        <LegalPage title="Políticas de Cancelación y Devoluciones" updated="1 de enero de 2026">
          <h2>Cancelación de pedidos</h2>
          <p>
            Los pedidos pueden cancelarse dentro de las primeras 2 horas después de realizarse, siempre
            que no hayan sido procesados para envío. Para solicitar una cancelación, contáctanos
            inmediatamente a través de nuestro WhatsApp o correo electrónico.
          </p>
          <p>
            Una vez que el pedido ha sido procesado o enviado, no es posible cancelarlo. En ese caso,
            podrás iniciar un proceso de devolución al recibirlo.
          </p>

          <h2>Devoluciones</h2>
          <p>
            Aceptamos devoluciones dentro de los 30 días naturales posteriores a la fecha de entrega,
            siempre que el producto se encuentre en su empaque original, sin uso y en perfectas
            condiciones.
          </p>
          <p>
            No se aceptan devoluciones de productos abiertos, usados o dañados por el cliente, ni de
            productos en promoción o liquidación salvo defecto de fábrica.
          </p>

          <h2>Proceso de devolución</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Contáctanos a info@tryphe.mx indicando número de pedido y motivo de devolución.</li>
            <li>Te enviaremos las instrucciones para el envío de regreso.</li>
            <li>Una vez recibido e inspeccionado el producto, procesaremos el reembolso en un plazo de 5 a 10 días hábiles.</li>
          </ul>

          <h2>Reembolsos</h2>
          <p>
            Los reembolsos se realizarán al mismo método de pago utilizado en la compra original.
            Los gastos de envío originales no son reembolsables salvo que el producto presente un defecto de fábrica.
          </p>

          <h2>Cambios</h2>
          <p>
            Si deseas cambiar tu producto por otro, contáctanos dentro de los 30 días posteriores a
            la entrega. Los cambios están sujetos a disponibilidad de inventario.
          </p>

          <h2>Contacto</h2>
          <p>
            Para cualquier duda sobre cancelaciones o devoluciones, escríbenos a{" "}
            <a href="mailto:info@tryphe.mx" className="underline">info@tryphe.mx</a> o vía
            WhatsApp al <a href="https://wa.me/528184587897" className="underline">81 8458 7897</a>.
          </p>
        </LegalPage>
      </div>
    </TrypheShell>
  );
}
