import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = {
  title: "Politica de reembolsos | Tryphe",
  description: "Plazos, condiciones y proceso de reembolso en Tryphe.",
};

export default function ReturnsPage() {
  return (
    <LegalPage title="Politica de reembolsos" updated="26 de febrero de 2026">
      <p>
        En Tryphe, nos comprometemos con tu satisfaccion y nos esforzamos por ofrecer productos de
        alta calidad. Sin embargo, comprendemos que pueden presentarse situaciones donde se requiera
        un reembolso. A continuacion, te explicamos con total transparencia como funciona este
        proceso:
      </p>

      <h2>Elegibilidad para reembolsos</h2>
      <p>Puedes ser elegible para un reembolso en los siguientes casos:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>El producto llego danado o defectuoso.</li>
        <li>El producto no coincide con la descripcion ofrecida en el sitio web.</li>
        <li>
          El pedido no fue recibido por causas atribuibles a nosotros o la paqueteria.
        </li>
      </ul>
      <p>
        Todas las solicitudes estan sujetas a evaluacion y aprobacion por parte del equipo de
        Perfumes de Tryphe.
      </p>

      <h2>Como solicitar un reembolso</h2>
      <p>Para solicitar un reembolso, contactanos a traves de:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          Email:{" "}
          <a href="mailto:info@tryphe.mx" className="text-[var(--oob-gold)] hover:underline">
            info@tryphe.mx
          </a>
        </li>
        <li>
          WhatsApp:{" "}
          <a
            href="https://wa.me/528184587897"
            className="text-[var(--oob-gold)] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            81 8458 7897
          </a>
        </li>
      </ul>
      <p>
        Nuestro equipo te proporcionara los pasos y documentos necesarios para iniciar el proceso.
      </p>

      <h2>Metodos de reembolso</h2>
      <p>
        Los reembolsos se procesan a traves del mismo metodo de pago utilizado al momento de la
        compra: Stripe, PayPal, Mercado Pago, entre otros.
      </p>
      <p>
        Nota: Estas plataformas pueden retener el pago hasta por 14 dias habiles antes de liberarlo
        a nuestras cuentas, por lo que no contamos con disponibilidad inmediata del dinero.
      </p>

      <h2>Plazos para reembolso</h2>
      <p>
        El reembolso puede tardar entre 5 y 10 dias habiles en procesarse, dependiendo del metodo
        de pago, entidad bancaria y tiempos de validacion. No ofrecemos reembolsos inmediatos.
        Agradecemos tu paciencia y comprension.
      </p>

      <h2>Reembolsos parciales o descuentos</h2>
      <p>
        En ciertos casos, podremos ofrecer reembolsos parciales o descuentos compensatorios, segun
        lo determine nuestro equipo.
      </p>

      <h2>Compras en oferta o promocion</h2>
      <p>
        Los reembolsos se realizaran unicamente por el monto pagado por el cliente, no por el precio
        original del producto.
      </p>

      <h2>Costos de devolucion</h2>
      <p>
        Si decides devolver un producto sin que este danado o defectuoso, los costos de envio de la
        devolucion correran por tu cuenta.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          El costo estandar de la guia de devolucion es de <strong>$150 MXN</strong>, pero este
          monto puede variar si la direccion esta en zona extendida.
        </li>
        <li>
          La guia de devolucion debera ser proporcionada por Tryphe, siguiendo nuestras
          indicaciones.
        </li>
      </ul>

      <h2>Recepcion del producto devuelto</h2>
      <p>
        El reembolso solo se emitira una vez que recibamos el producto en nuestro almacen y
        verifiquemos su estado. El cliente tiene un plazo maximo de <strong>24 horas</strong> desde
        la recepcion del pedido para solicitar la devolucion. Despues de ese tiempo, la garantia
        deja de aplicar.
      </p>

      <h2>Cancelaciones con pedido en transito</h2>
      <p>
        Si el cliente solicita el reembolso de un pedido que ya fue procesado o enviado, se aplicara
        un cargo de <strong>$210 MXN</strong> sobre el monto a reembolsar. Esto cubre los gastos ya
        generados: manejo en almacen y envio original.
      </p>

      <h2>Aceptacion de la politica</h2>
      <p>
        Al realizar una compra en Tryphe, aceptas esta Politica de Reembolsos como parte de
        nuestras condiciones comerciales.
      </p>

      <h2>Contacto</h2>
      <p>Si tienes dudas, comunicante con nosotros:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          Email:{" "}
          <a href="mailto:info@tryphe.mx" className="text-[var(--oob-gold)] hover:underline">
            info@tryphe.mx
          </a>
        </li>
        <li>
          WhatsApp:{" "}
          <a
            href="https://wa.me/528184587897"
            className="text-[var(--oob-gold)] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            81 8458 7897
          </a>
        </li>
      </ul>
    </LegalPage>
  );
}
