import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = {
  title: "Politica de envios | Tryphe",
  description: "Metodos, plazos y costes de envio en Tryphe.",
};

export default function ShippingPage() {
  return (
    <LegalPage title="Politica de envios" updated="26 de febrero de 2026">
      <p>
        En Tryphe, valoramos profundamente la confianza de nuestros clientes. Nuestro compromiso es
        entregar cada pedido de forma puntual, segura y con una experiencia de compra impecable
        desde el primer clic hasta la llegada del paquete.
      </p>

      <h2>Procesamiento de pedidos</h2>
      <p>
        Todos los pedidos realizados en nuestro sitio web seran procesados en un plazo de 1 a 2
        dias habiles, iniciando su preparacion una vez confirmado el pago.
      </p>

      <h2>Tiempo de envio</h2>
      <p>
        Realizamos envios a traves de FedEx, Estafeta, DHL o mensajeria local, segun cobertura y
        ubicacion. El tiempo promedio de entrega es de 1 a 5 dias habiles, contados a partir del
        procesamiento del pedido. Estos tiempos pueden variar dependiendo de la zona, temporada del
        ano y condiciones externas.
      </p>

      <h2>Cancelacion de pedidos</h2>
      <p>
        Una vez confirmado tu pedido, el proceso de empaque comienza inmediatamente. En caso de
        cancelar y si aun es posible detener el envio, se aplicara un cargo por &quot;pick and pack&quot;, ya
        que los materiales de empaque no pueden reutilizarse y el equipo ha destinado recursos para
        su armado.
      </p>

      <h2>Seguimiento de envio</h2>
      <p>
        Recibiras un numero de guia para rastrear tu pedido en linea. Si necesitas asistencia con
        el rastreo, nuestro equipo de atencion esta disponible para ayudarte.
      </p>

      <h2>Preparacion para la entrega</h2>
      <p>
        Recomendamos tener tu celular disponible y desactivar el bloqueo de llamadas desconocidas
        durante el periodo de entrega, para facilitar una recepcion exitosa del paquete.
      </p>

      <h2>Costos de envio</h2>
      <p>
        El costo de envio se calcula automaticamente en el proceso de pago, con base en el destino
        y peso del paquete. En ocasiones especiales, ofrecemos promociones de envio gratuito en
        pedidos que superan cierto monto.
      </p>

      <h2>Paquetes danados o perdidos</h2>
      <p>
        Si tu pedido llega danado o no lo has recibido, contactanos de inmediato. Resolveremos
        cualquier inconveniente para garantizar que recibas tus productos en optimas condiciones.
      </p>

      <h2>Entregas marcadas como realizadas</h2>
      <p>
        Si la paqueteria marca tu pedido como entregado pero no lo has recibido, cuentas con un
        plazo de 24 horas para reportarlo. Despues de este tiempo, las empresas de mensajeria se
        deslindan de cualquier responsabilidad y no podremos gestionar reclamos.
      </p>

      <h2>Proteccion de tu compra</h2>
      <p>
        Tu compra esta 100% protegida. Si no recibes tu producto, ofrecemos la opcion de reenvio
        sin costo adicional o un reembolso total, segun el caso.
      </p>

      <h2>Contacto</h2>
      <p>
        Si tienes alguna pregunta o necesitas apoyo con tu envio, no dudes en escribirnos:
      </p>
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
