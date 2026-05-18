import Image from "next/image";
import Link from "next/link";

export function PartnersBanner() {
  return (
    <section className="bg-[#b8c9a0] py-10 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 md:px-10">
        <div className="overflow-hidden rounded-2xl">
          <div className="flex flex-col md:flex-row">
            {/* Imagen */}
            <div className="relative w-full shrink-0 md:w-[40%] md:min-h-[520px]" style={{ aspectRatio: "3/2" }}>
              <div className="md:hidden relative w-full h-72">
                <Image
                  src="/cambiosmayo/cheque.png"
                  alt="Socio Tryphé — invierte y gana"
                  fill
                  className="object-cover object-top"
                  sizes="100vw"
                />
              </div>
              <div className="hidden md:block absolute inset-0">
                <Image
                  src="/cambiosmayo/cheque.png"
                  alt="Socio Tryphé — invierte y gana"
                  fill
                  className="object-cover object-top"
                  sizes="40vw"
                />
              </div>
            </div>

            {/* Contenido */}
            <div className="flex flex-1 flex-col justify-center bg-[#b8c9a0] px-6 py-10 text-center md:px-12 md:py-16 md:text-left lg:px-16">
              {/* Eyebrow */}
              <p className="text-[11px] font-bold tracking-[0.4em] text-neutral-800 uppercase">
                SOCIO TRYPHÉ
              </p>

              {/* Headline */}
              <div className="mt-4">
                <p className="font-sans text-5xl font-black leading-[0.9] tracking-tight text-white sm:text-6xl md:text-[clamp(3rem,5.5vw,5rem)]">
                  INVIERTE<br className="md:hidden" /> $10,000
                </p>
                <p className="mt-2 font-sans text-4xl font-black leading-[0.9] tracking-tight sm:text-5xl md:text-[clamp(2.5rem,5vw,4.5rem)]">
                  <span className="inline-block bg-neutral-950 px-3 py-1.5 text-white">
                    Y GANA HASTA<br className="sm:hidden" /> $20,000
                  </span>
                </p>
              </div>

              {/* Subtítulo */}
              <p className="mx-auto mt-6 max-w-md text-[11px] font-semibold uppercase leading-relaxed tracking-wider text-neutral-800 md:mx-0 md:text-[12px]">
                Como socio Tryphé no vendes perfumes. Construyes un negocio con
                la marca de lujo inteligente que está cambiando cómo huele
                México.
              </p>

              {/* CTA */}
              <div className="mt-7 flex justify-center md:justify-start">
                <Link
                  href="/partners"
                  className="inline-flex min-h-[52px] items-center justify-center bg-neutral-950 px-10 text-[10px] font-bold tracking-[0.3em] uppercase text-white transition-colors hover:bg-neutral-800"
                >
                  MAS INFORMES
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
