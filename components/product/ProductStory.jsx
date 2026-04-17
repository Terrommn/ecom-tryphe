import Image from "next/image";

export function ProductStory({ descriptionHtml, imageUrl, imageAlt }) {
  return (
    <section className="border-y border-neutral-950/10 bg-neutral-950 text-[#faf9f7]">
      <div className="mx-auto grid max-w-screen-2xl lg:grid-cols-2">
        {/* Image column */}
        {imageUrl && (
          <div
            className="relative min-h-[320px] overflow-hidden lg:min-h-[520px]"
            data-gsap="zoom-out"
          >
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
        )}

        {/* Content column */}
        <div
          className={`flex flex-col justify-center px-6 py-16 md:px-12 lg:py-24 ${
            !imageUrl ? "lg:col-span-2 mx-auto max-w-2xl" : ""
          }`}
          data-gsap="fade-up"
          data-gsap-delay="0.2"
        >
          <p className="text-[9px] font-bold tracking-[0.4em] text-[#faf9f7]/45 uppercase">
            La fragancia
          </p>
          <div
            className="mt-6 max-w-lg text-base leading-[1.85] text-[#faf9f7]/80 md:text-lg [&_h3]:font-serif [&_h3]:text-2xl [&_h3]:font-medium [&_h3]:text-[#faf9f7] [&_h3]:mt-10 [&_h3]:mb-4 [&_p]:mt-4 [&_b]:text-[#faf9f7] [&_b]:font-medium [&_li]:ml-4 [&_li]:text-[#faf9f7]/75 [&_ul]:mt-3 [&_ul]:space-y-2 [&_a]:text-[#faf9f7] [&_a]:underline [&_a]:underline-offset-4"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        </div>
      </div>
    </section>
  );
}
