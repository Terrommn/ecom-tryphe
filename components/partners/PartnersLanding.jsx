"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

const IMG_HERO = "/home/celeb-03.png";
const IMG_PROGRAM = "/home/celeb-01.png";

const PILLARS = [
  {
    number: "01",
    title: "Margen competitivo",
    body: "Precios mayoristas escalonados por volumen y descuentos por compromiso anual. Estructura diseñada para que tu tienda crezca con la marca.",
  },
  {
    number: "02",
    title: "Marca editorial",
    body: "TRYPHÉ llega con un lenguaje visual ya construido: fotografía, copy, packaging premium. Tu punto de venta se eleva sin inversión creativa extra.",
  },
  {
    number: "03",
    title: "Sin intermediarios",
    body: "Trabajas directo con el equipo TRYPHÉ. Sin distribuidores regionales, sin capas de comunicación: respuestas en horas, no semanas.",
  },
];

const BENEFITS = [
  "Precios mayoristas escalonados y descuentos por volumen.",
  "Material fotográfico y copy editorial listo para tu canal.",
  "Capacitación de producto y notas olfativas para tu equipo.",
  "Acceso anticipado a lanzamientos y colecciones cápsula.",
  "Empaque premium pensado desde el origen — listo para regalo.",
  "Soporte directo del equipo TRYPHÉ, sin intermediarios.",
];

const PARTNER_PROFILES = [
  {
    label: "01",
    title: "Perfumerías físicas",
    body: "Boutiques de perfumería de nicho buscando curaduría más allá de las marcas masivas.",
  },
  {
    label: "02",
    title: "Retail de lujo",
    body: "Tiendas de lifestyle premium, concept stores y espacios de retail editorial.",
  },
  {
    label: "03",
    title: "E-commerce especializado",
    body: "Marketplaces y tiendas online con enfoque en fragancia, belleza de autor o bienestar.",
  },
  {
    label: "04",
    title: "Corporativo & regalo ejecutivo",
    body: "Empresas que buscan regalo corporativo con presencia — bodas, kits VIP, incentivos de equipo.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Aplicas",
    body: "Completas el formulario con los datos de tu negocio y recibimos tu solicitud en 24h.",
  },
  {
    step: "02",
    title: "Llamada de alineación",
    body: "Agendamos una videollamada de 30 min para entender tu canal y encajar expectativas.",
  },
  {
    step: "03",
    title: "Firma & onboarding",
    body: "Firma de acuerdo mayorista, alta en el portal y entrega del kit de marca.",
  },
  {
    step: "04",
    title: "Primer pedido",
    body: "Coordinamos tu primera compra mayorista con envío priorizado y capacitación incluida.",
  },
];

const FAQS = [
  {
    q: "¿Cuál es el pedido mínimo (MOQ)?",
    a: "El pedido inicial mayorista arranca en 12 unidades mezcladas entre referencias TRYPHÉ. A partir del segundo pedido, el mínimo baja a 6 unidades.",
  },
  {
    q: "¿Ofrecen exclusividad territorial?",
    a: "Para partners con compromiso de volumen anual evaluamos exclusividad por zona geográfica o por tipo de canal. Se discute caso por caso durante la llamada de alineación.",
  },
  {
    q: "¿Qué condiciones de pago manejan?",
    a: "Primer pedido 100% anticipado. A partir del segundo, abrimos crédito a 15-30 días según historial y perfil comercial.",
  },
  {
    q: "¿Qué soporte post-venta incluye?",
    a: "Reposición garantizada de producto con defecto, asesoría continua de catálogo y acceso directo al equipo comercial vía WhatsApp ejecutivo.",
  },
  {
    q: "¿Ofrecen marca blanca o private label?",
    a: "No. TRYPHÉ es una marca de autor y no licenciamos producción bajo marca externa. Sí ofrecemos kits co-brandeados para regalo corporativo con volúmenes mínimos definidos.",
  },
];

export function PartnersLanding() {
  return (
    <>
      {/* 1. Hero editorial split */}
      <section className="grid min-h-[min(88vh,920px)] md:grid-cols-2">
        <div
          className="relative min-h-[42vh] overflow-hidden md:min-h-0"
          data-gsap="zoom-out"
        >
          <Image
            src={IMG_HERO}
            alt="Boutique premium TRYPHÉ"
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
            priority
          />
        </div>
        <div
          className="flex flex-col justify-center border-neutral-950/10 bg-[#faf9f7] px-6 py-14 md:border-l md:px-12 lg:px-16 xl:px-20"
          data-gsap="fade-up"
          data-gsap-stagger="0.12"
        >
          <p className="text-[9px] font-bold tracking-[0.45em] text-neutral-500 uppercase">
            Partner TRYPHÉ
          </p>
          <h1 className="mt-6 font-serif text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.05] tracking-tight text-neutral-950">
            Distribuye el lujo que el mercado está esperando.
          </h1>
          <p className="mt-8 max-w-md text-sm leading-[1.75] text-neutral-600 md:text-base">
            Programa de distribución directa para boutiques, retail de lujo y e-commerce
            especializado. Catálogo completo, márgenes competitivos y acompañamiento real.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="#aplicar"
              className="inline-flex min-h-[48px] items-center justify-center border border-neutral-950 bg-neutral-950 px-10 text-[10px] font-bold tracking-[0.25em] text-[#faf9f7] uppercase transition hover:bg-neutral-800"
            >
              Aplicar como Partner
            </Link>
            <Link
              href="#programa"
              className="inline-flex min-h-[48px] items-center justify-center border border-neutral-950 px-10 text-[10px] font-bold tracking-[0.25em] text-neutral-950 uppercase transition hover:bg-neutral-950 hover:text-[#faf9f7]"
            >
              Ver Programa
            </Link>
          </div>
          <p className="mt-8 font-serif text-sm italic text-neutral-700 md:text-base">
            Sé parte del próximo referente de perfumería en México.
          </p>
        </div>
      </section>

      {/* 2. Trust bar */}
      <section className="border-y border-neutral-950/10 bg-neutral-950 text-[#faf9f7]">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-center gap-3 px-4 py-5 text-center md:flex-row md:gap-8 md:px-10">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-[#faf9f7]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="font-serif text-sm text-[#faf9f7] md:text-base">
              4.9 · 1,240+ clientes
            </p>
          </div>
          <span className="hidden h-3 w-px bg-[#faf9f7]/25 md:block" />
          <p className="text-[10px] font-bold tracking-[0.4em] text-[#faf9f7]/70 uppercase">
            Envío nacional
          </p>
          <span className="hidden h-3 w-px bg-[#faf9f7]/25 md:block" />
          <p className="text-[10px] font-bold tracking-[0.4em] text-[#faf9f7]/70 uppercase">
            Empaque premium incluido
          </p>
        </div>
      </section>

      {/* 3. Propuesta de valor — 3 pilares */}
      <section id="programa" className="scroll-mt-24 bg-[#faf9f7] py-20 md:py-28">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-10">
          <div className="mx-auto max-w-2xl text-center" data-gsap="fade-up">
            <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
              Por qué TRYPHÉ
            </p>
            <h2 className="mt-4 font-serif text-3xl font-medium text-neutral-950 md:text-5xl">
              Un programa pensado para crecer contigo.
            </h2>
            <p className="mt-6 text-sm leading-[1.8] text-neutral-600 md:text-base">
              No somos un distribuidor más: somos la marca. Eso cambia la conversación, los
              márgenes y la velocidad.
            </p>
          </div>

          <div
            className="mt-16 grid gap-10 md:grid-cols-3 md:gap-12"
            data-gsap="fade-up"
            data-gsap-delay="0.15"
            data-gsap-stagger="0.1"
          >
            {PILLARS.map((pillar) => (
              <article
                key={pillar.number}
                className="flex flex-col border-t border-neutral-950/15 pt-8"
              >
                <p className="font-serif text-5xl leading-none text-neutral-950/25 md:text-6xl">
                  {pillar.number}
                </p>
                <h3 className="mt-8 font-serif text-xl font-medium text-neutral-950 md:text-2xl">
                  {pillar.title}
                </h3>
                <p className="mt-5 text-sm leading-[1.8] text-neutral-600">{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Lo que incluye */}
      <section className="border-y border-neutral-950/10 bg-neutral-950 text-[#faf9f7]">
        <div className="mx-auto grid max-w-screen-2xl lg:grid-cols-2">
          <div
            className="relative min-h-[320px] overflow-hidden lg:min-h-[520px]"
            data-gsap="zoom-out"
          >
            <Image
              src={IMG_PROGRAM}
              alt="Catálogo y kit de marca TRYPHÉ"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
          <div
            className="flex flex-col justify-center px-6 py-16 md:px-12 lg:py-24"
            data-gsap="fade-up"
            data-gsap-delay="0.15"
            data-gsap-stagger="0.08"
          >
            <p className="text-[9px] font-bold tracking-[0.4em] text-[#faf9f7]/50 uppercase">
              Tu programa incluye
            </p>
            <h2 className="mt-5 font-serif text-3xl font-medium leading-tight md:text-4xl">
              Todo lo que necesitas para vender bien.
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-[1.8] text-[#faf9f7]/75 md:text-base">
              El programa Partner TRYPHÉ no es solo producto: es un sistema completo para que
              tu canal venda fragancia de autor con el mismo cuidado que nosotros.
            </p>

            <ul className="mt-10 space-y-5 border-t border-[#faf9f7]/15 pt-8">
              {BENEFITS.map((item) => (
                <li key={item} className="flex items-start gap-5">
                  <span className="mt-3 h-px w-8 shrink-0 bg-[#faf9f7]/40" />
                  <span className="text-sm leading-[1.65] text-[#faf9f7]/90 md:text-[15px]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Perfil ideal de Partner */}
      <section className="bg-[#faf9f7] py-20 md:py-28">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-10">
          <div className="mx-auto max-w-2xl text-center" data-gsap="fade-up">
            <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
              Perfil ideal
            </p>
            <h2 className="mt-4 font-serif text-3xl font-medium text-neutral-950 md:text-5xl">
              Buscamos partners con criterio.
            </h2>
            <p className="mt-6 text-sm leading-[1.8] text-neutral-600 md:text-base">
              No vendemos al mayoreo a cualquiera. El match importa — para ti y para la marca.
            </p>
          </div>

          <div
            className="mt-16 grid gap-px bg-neutral-950/10 sm:grid-cols-2"
            data-gsap="fade-up"
            data-gsap-delay="0.15"
            data-gsap-stagger="0.08"
          >
            {PARTNER_PROFILES.map((profile) => (
              <article
                key={profile.label}
                className="flex flex-col bg-[#faf9f7] p-8 md:p-12"
              >
                <p className="font-serif text-5xl leading-none text-neutral-950/25 md:text-6xl">
                  {profile.label}
                </p>
                <h3 className="mt-8 font-serif text-xl font-medium text-neutral-950 md:text-2xl">
                  {profile.title}
                </h3>
                <p className="mt-5 text-sm leading-[1.8] text-neutral-600">{profile.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Cómo funciona */}
      <section className="border-y border-neutral-950/10 bg-white py-20 md:py-28">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-10">
          <div className="mx-auto max-w-2xl text-center" data-gsap="fade-up">
            <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
              Cómo funciona
            </p>
            <h2 className="mt-4 font-serif text-3xl font-medium text-neutral-950 md:text-5xl">
              De aplicación a primer pedido en 2 semanas.
            </h2>
          </div>

          <div
            className="mt-16 grid gap-10 md:grid-cols-4 md:gap-0"
            data-gsap="fade-up"
            data-gsap-delay="0.15"
            data-gsap-stagger="0.12"
          >
            {PROCESS.map((p, idx) => (
              <article
                key={p.step}
                className={`flex flex-col px-0 md:px-8 ${
                  idx > 0 ? "md:border-l md:border-neutral-950/10" : ""
                }`}
              >
                <div className="flex items-baseline gap-4">
                  <p className="font-serif text-4xl leading-none text-neutral-950 md:text-5xl">
                    {p.step}
                  </p>
                  <span className="h-px flex-1 bg-neutral-950/20" />
                </div>
                <h3 className="mt-6 font-serif text-lg font-medium text-neutral-950 md:text-xl">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.75] text-neutral-600">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Formulario de aplicación */}
      <section id="aplicar" className="scroll-mt-24 bg-[#faf9f7] py-20 md:py-28">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-10">
          <div className="grid gap-14 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-7" data-gsap="fade-up">
              <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
                Aplicación
              </p>
              <h2 className="mt-4 font-serif text-3xl font-medium text-neutral-950 md:text-5xl">
                Cuéntanos de tu negocio.
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-[1.8] text-neutral-600 md:text-base">
                Respondemos todas las aplicaciones en 24h hábiles. Si hay fit inicial,
                agendamos llamada en la misma semana.
              </p>

              {/* [Opcional] Sustituir por API Route con Resend/SendGrid para envío real. */}
              <form
                className="mt-10 space-y-5"
                action="mailto:partners@tryphe.mx"
                method="get"
                encType="text/plain"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="partner-name"
                      className="block text-[10px] font-bold tracking-[0.3em] text-neutral-500 uppercase"
                    >
                      Nombre completo
                    </label>
                    <input
                      id="partner-name"
                      name="nombre"
                      required
                      className="mt-2 w-full border border-neutral-950/15 bg-white px-4 py-3 text-sm text-neutral-950 focus:border-neutral-950 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="partner-business"
                      className="block text-[10px] font-bold tracking-[0.3em] text-neutral-500 uppercase"
                    >
                      Nombre del negocio
                    </label>
                    <input
                      id="partner-business"
                      name="negocio"
                      required
                      className="mt-2 w-full border border-neutral-950/15 bg-white px-4 py-3 text-sm text-neutral-950 focus:border-neutral-950 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="partner-email"
                      className="block text-[10px] font-bold tracking-[0.3em] text-neutral-500 uppercase"
                    >
                      Email
                    </label>
                    <input
                      id="partner-email"
                      name="email"
                      type="email"
                      required
                      className="mt-2 w-full border border-neutral-950/15 bg-white px-4 py-3 text-sm text-neutral-950 focus:border-neutral-950 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="partner-phone"
                      className="block text-[10px] font-bold tracking-[0.3em] text-neutral-500 uppercase"
                    >
                      Teléfono / WhatsApp
                    </label>
                    <input
                      id="partner-phone"
                      name="telefono"
                      type="tel"
                      required
                      className="mt-2 w-full border border-neutral-950/15 bg-white px-4 py-3 text-sm text-neutral-950 focus:border-neutral-950 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="partner-location"
                      className="block text-[10px] font-bold tracking-[0.3em] text-neutral-500 uppercase"
                    >
                      Ciudad / Estado
                    </label>
                    <input
                      id="partner-location"
                      name="ubicacion"
                      required
                      className="mt-2 w-full border border-neutral-950/15 bg-white px-4 py-3 text-sm text-neutral-950 focus:border-neutral-950 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="partner-type"
                      className="block text-[10px] font-bold tracking-[0.3em] text-neutral-500 uppercase"
                    >
                      Tipo de negocio
                    </label>
                    <select
                      id="partner-type"
                      name="tipo"
                      required
                      defaultValue=""
                      className="mt-2 w-full border border-neutral-950/15 bg-white px-4 py-3 text-sm text-neutral-950 focus:border-neutral-950 focus:outline-none"
                    >
                      <option value="" disabled>
                        Selecciona
                      </option>
                      <option value="perfumeria-fisica">Perfumería física</option>
                      <option value="retail-lujo">Retail de lujo / boutique</option>
                      <option value="ecommerce">E-commerce especializado</option>
                      <option value="corporativo">Corporativo / regalo ejecutivo</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="partner-volume"
                      className="block text-[10px] font-bold tracking-[0.3em] text-neutral-500 uppercase"
                    >
                      Volumen mensual estimado
                    </label>
                    <select
                      id="partner-volume"
                      name="volumen"
                      required
                      defaultValue=""
                      className="mt-2 w-full border border-neutral-950/15 bg-white px-4 py-3 text-sm text-neutral-950 focus:border-neutral-950 focus:outline-none"
                    >
                      <option value="" disabled>
                        Selecciona
                      </option>
                      <option value="12-30">12 – 30 unidades</option>
                      <option value="30-80">30 – 80 unidades</option>
                      <option value="80-200">80 – 200 unidades</option>
                      <option value="200+">200+ unidades</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="partner-years"
                      className="block text-[10px] font-bold tracking-[0.3em] text-neutral-500 uppercase"
                    >
                      Años en el mercado
                    </label>
                    <input
                      id="partner-years"
                      name="experiencia"
                      type="number"
                      min="0"
                      step="1"
                      className="mt-2 w-full border border-neutral-950/15 bg-white px-4 py-3 text-sm text-neutral-950 focus:border-neutral-950 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="partner-message"
                    className="block text-[10px] font-bold tracking-[0.3em] text-neutral-500 uppercase"
                  >
                    Cuéntanos más sobre tu proyecto
                  </label>
                  <textarea
                    id="partner-message"
                    name="mensaje"
                    rows={5}
                    className="mt-2 w-full border border-neutral-950/15 bg-white px-4 py-3 text-sm text-neutral-950 focus:border-neutral-950 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex min-h-[52px] items-center justify-center border border-neutral-950 bg-neutral-950 px-12 text-[10px] font-bold tracking-[0.3em] text-[#faf9f7] uppercase transition hover:bg-neutral-800"
                >
                  Enviar aplicación
                </button>

                <p className="text-xs leading-relaxed text-neutral-500">
                  Al enviar, aceptas que TRYPHÉ use estos datos solo para evaluar tu aplicación
                  como partner. No vendemos ni compartimos información.
                </p>
              </form>
            </div>

            <aside
              className="md:col-span-5"
              data-gsap="fade-up"
              data-gsap-delay="0.2"
              data-gsap-stagger="0.1"
            >
              <div className="border border-neutral-950/15 bg-white p-8 md:p-10">
                <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
                  Contacto directo
                </p>
                <h3 className="mt-5 font-serif text-2xl font-medium text-neutral-950 md:text-3xl">
                  ¿Prefieres escribirnos directo?
                </h3>
                <p className="mt-5 text-sm leading-[1.8] text-neutral-600">
                  Para solicitudes urgentes o conversaciones más abiertas, el equipo comercial
                  está disponible por email y WhatsApp.
                </p>

                <ul className="mt-8 space-y-5 border-t border-neutral-950/10 pt-6 text-sm text-neutral-950">
                  <li>
                    <p className="text-[9px] font-bold tracking-[0.3em] text-neutral-500 uppercase">
                      Email partners
                    </p>
                    <a
                      href="mailto:partners@tryphe.mx"
                      className="mt-2 block font-serif text-lg text-neutral-950 hover:underline underline-offset-4"
                    >
                      partners@tryphe.mx
                    </a>
                  </li>
                  <li>
                    <p className="text-[9px] font-bold tracking-[0.3em] text-neutral-500 uppercase">
                      WhatsApp comercial
                    </p>
                    <a
                      href="https://wa.me/528184587897"
                      className="mt-2 block font-serif text-lg text-neutral-950 hover:underline underline-offset-4"
                    >
                      +52 81 8458 7897
                    </a>
                  </li>
                  <li>
                    <p className="text-[9px] font-bold tracking-[0.3em] text-neutral-500 uppercase">
                      Tiempo de respuesta
                    </p>
                    <p className="mt-2 text-sm text-neutral-600">
                      24h hábiles · Lun a Vie, 9:00–18:00 CDMX
                    </p>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 8. FAQ partners */}
      <section className="border-y border-neutral-950/10 bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 md:px-10">
          <div className="text-center" data-gsap="fade-up">
            <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
              Dudas frecuentes
            </p>
            <h2 className="mt-4 font-serif text-3xl font-medium text-neutral-950 md:text-5xl">
              Lo que más nos preguntan.
            </h2>
          </div>

          <div
            className="mt-14 divide-y divide-neutral-950/15 border-y border-neutral-950/15"
            data-gsap="fade-up"
            data-gsap-delay="0.1"
            data-gsap-stagger="0.06"
          >
            {FAQS.map((item) => (
              <details key={item.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-8">
                  <h3 className="font-serif text-lg font-medium text-neutral-950 md:text-xl">
                    {item.q}
                  </h3>
                  <span className="font-serif text-2xl leading-none text-neutral-950/50 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-5 max-w-3xl text-sm leading-[1.8] text-neutral-600 md:text-base">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Footer CTA */}
      <section className="bg-neutral-950 text-[#faf9f7]">
        <div
          className="mx-auto max-w-screen-2xl px-4 py-20 text-center md:px-10 md:py-28"
          data-gsap="fade-up"
        >
          <p className="text-[10px] font-bold tracking-[0.5em] text-[#faf9f7]/50 uppercase">
            Partner TRYPHÉ
          </p>
          <h2 className="mx-auto mt-6 max-w-3xl font-serif text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.1] tracking-tight">
            La próxima fragancia de culto en tu catálogo empieza con una aplicación.
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="#aplicar"
              className="inline-flex min-h-[52px] items-center justify-center border border-[#faf9f7] bg-[#faf9f7] px-12 text-[10px] font-bold tracking-[0.3em] text-neutral-950 uppercase transition hover:bg-transparent hover:text-[#faf9f7]"
            >
              Aplicar ahora
            </Link>
            <Link
              href="/collections"
              className="inline-flex min-h-[52px] items-center justify-center border border-[#faf9f7]/40 px-12 text-[10px] font-bold tracking-[0.3em] text-[#faf9f7] uppercase transition hover:border-[#faf9f7]"
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
