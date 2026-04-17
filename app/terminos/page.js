import { LegalPage } from "@/components/legal/LegalPage";
import { TrypheShell } from "@/components/layout/TrypheShell";

export const metadata = {
  title: "Terminos y condiciones | Tryphe",
  description: "Condiciones de uso y compra en Tryphe.",
};

export default function TermsPage() {
  return (
    <TrypheShell>
      <div className="bg-[#faf9f7]">
        <LegalPage title="Terminos y condiciones" updated="26 de febrero de 2026">
          <p>
            Este documento establece las Condiciones Generales de Uso y Venta (&quot;Condiciones&quot;) que rigen
            el acceso y uso del sitio web de Tryphe (&quot;Sitio&quot;) y la adquisicion de productos disponibles
            a traves del mismo (&quot;Productos&quot;).
          </p>
          <p>
            Al realizar una compra en Tryphe, el cliente declara haber leido, comprendido y aceptado
            sin reservas estas Condiciones. Tryphe, marca operada por Piel de Aroma SA de CV, se
            reserva el derecho de actualizar, modificar o reemplazar estas Condiciones en cualquier
            momento sin previo aviso. Cualquier cambio sera efectivo al ser publicado en el sitio web.
          </p>

          <h2>Identidad del prestador de servicios</h2>
          <p>
            Tryphe es una marca registrada, dedicada a la comercializacion de perfumes de alta
            concentracion y fragancias de autor. Operamos a traves del sitio web www.tryphe.mx y
            nuestros canales oficiales de atencion al cliente.
          </p>

          <h2>Precios y formas de pago</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Todos los precios se expresan en pesos mexicanos (MXN) e incluyen impuestos aplicables.
            </li>
            <li>El costo del envio se calcula al momento del pago.</li>
            <li>
              Aceptamos pagos mediante tarjeta de credito, debito, Stripe, PayPal y Mercado Pago.
            </li>
            <li>Nos reservamos el derecho de modificar precios sin previo aviso.</li>
          </ul>

          <h2>Condiciones de entrega</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Realizamos envios unicamente dentro de la Republica Mexicana.</li>
            <li>
              El tiempo de entrega estimado es de 0 a 5 dias habiles dependiendo de la ubicacion del
              cliente.
            </li>
            <li>
              Algunos productos pueden requerir fabricacion bajo demanda, lo que podria extender los
              tiempos de entrega.
            </li>
            <li>
              En caso de errores en la direccion o problemas con la paqueteria, Tryphe no se hace
              responsable por retrasos o entregas fallidas.
            </li>
          </ul>

          <h2>Politica de devoluciones y cambios</h2>
          <p>
            Aceptamos devoluciones o cambios dentro de las 24 horas naturales posteriores a la recepcion
            del pedido, siempre que:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>El producto no haya sido usado (maximo de 5-10 atomizaciones).</li>
            <li>El empaque y la etiqueta esten en buen estado.</li>
            <li>
              El producto sea devuelto en su empaque original y protegido adecuadamente.
            </li>
          </ul>
          <p>
            <strong>Cambios por gusto personal:</strong> Si no estas satisfecho con la fragancia, puedes
            solicitar un cambio por otra disponible. El nuevo envio se realizara una vez hayamos recibido
            el producto original en buenas condiciones.
          </p>
          <p>
            <strong>Cambios por productos danados:</strong> Si el producto presenta defectos (como
            derrame o atomizador danado), el cambio se realizara sin costo si se reporta dentro de las
            primeras 24 horas. Es obligatorio enviar fotos o video como evidencia.
          </p>
          <p>
            <strong>Costos de envio en devoluciones o cambios:</strong> Correran por cuenta del cliente,
            salvo en el caso de productos defectuosos. El cliente recibira instrucciones especificas
            para el proceso.
          </p>

          <h2>Politica de reembolsos</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Puedes solicitar reembolso si el producto fue devuelto y verificado por nuestro equipo.
            </li>
            <li>
              Los reembolsos se procesan a traves de Stripe, PayPal o Mercado Pago y pueden tardar
              entre 5 a 10 dias habiles.
            </li>
            <li>
              Este plazo depende de las plataformas de pago y no puede acelerarse.
            </li>
            <li>
              Si el pedido ya fue empacado o enviado, se descontara un cargo de <strong>$210 MXN</strong>{" "}
              por manejo y envio original.
            </li>
          </ul>

          <h2>Produccion y preparacion del pedido</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Una vez confirmado tu pedido, inicia el proceso de surtido y empaquetado de inmediato.
            </li>
            <li>
              En caso de solicitar una cancelacion antes del envio, se aplicara un cargo por &quot;pick and
              pack&quot; para cubrir los costos operativos ya generados.
            </li>
            <li>
              Trabajamos con stock disponible en nuestras fragancias mas populares para ofrecer
              entregas rapidas.
            </li>
          </ul>

          <h2>Limitacion de responsabilidad</h2>
          <p>Tryphe no se hace responsable por:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Perdidas o danos derivados del uso del sitio web.</li>
            <li>
              Fallos en la entrega atribuibles a direcciones incorrectas o errores de la empresa de
              mensajeria.
            </li>
            <li>
              Demoras causadas por fuerza mayor o eventos fuera de nuestro control.
            </li>
          </ul>

          <h2>Contacto</h2>
          <p>
            Para cualquier duda o aclaracion sobre estas Condiciones, puedes contactarnos a traves de:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Email:{" "}
              <a href="mailto:info@tryphe.mx" className="text-neutral-950 underline hover:underline">
                info@tryphe.mx
              </a>
            </li>
            <li>
              WhatsApp:{" "}
              <a
                href="https://wa.me/528184587897"
                className="text-neutral-950 underline hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                81 8458 7897
              </a>
            </li>
          </ul>

          <h2>Declaracion legal</h2>
          <p>
            Tryphe son fragancias inspiradas en reconocidas marcas disenadoras, sin pretender
            replicarlas, sustituirlas o usurpar sus derechos.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              No existe asociacion, patrocinio, respaldo ni relacion alguna con las marcas mencionadas
              ni con sus fabricantes.
            </li>
            <li>
              Todas las marcas, nombres y logotipos mencionados son propiedad exclusiva de sus
              respectivos titulares y se utilizan unicamente con fines de comparacion y referencia
              olfativa.
            </li>
            <li>
              Los nombres de las marcas se emplean para orientar a nuestros clientes sobre la familia
              olfativa o aroma aproximado de cada fragancia.
            </li>
            <li>
              Nuestras fragancias no son copias exactas ni imitaciones legales de los productos
              originales.
            </li>
            <li>
              Esta publicidad es objetiva, veraz y cumple estrictamente con la legislacion mexicana
              vigente en materia de propiedad industrial y publicidad, incluyendo las disposiciones del
              IMPI y PROFECO.
            </li>
            <li>
              No se utilizan logotipos, imagenes ni elementos graficos protegidos sin autorizacion
              expresa de sus propietarios.
            </li>
          </ul>
          <p>
            Al adquirir nuestros productos, usted reconoce y acepta que Tryphe es una marca
            independiente que respeta la propiedad intelectual de terceros y se compromete a actuar
            conforme a la ley.
          </p>
        </LegalPage>
      </div>
    </TrypheShell>
  );
}
