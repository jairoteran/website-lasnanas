"use client"

import { motion } from "framer-motion"
import { ParallaxImage } from "@/components/parallax-image"

const fotos = [
  { src: "/integrantes/primera.jpg", alt: "Integrante de Las Ñañas con vestido rojo de flecos" },
  { src: "/integrantes/segunda.jpg", alt: "Integrante de Las Ñañas frente al paisaje de Quito" },
  { src: "/integrantes/tercera.jpg", alt: "Integrante de Las Ñañas de perfil con vestido rojo" },
  { src: "/integrantes/cuarta.jpg", alt: "Integrante de Las Ñañas saludando con la mano en alto" },
]

export function Elenco() {
  return (
    <section
      id="elenco"
      className="flex min-h-svh scroll-mt-20 flex-col justify-center border-b border-border py-16 md:py-20 lg:h-svh lg:min-h-0 lg:scroll-mt-0 lg:snap-start lg:overflow-hidden lg:py-0"
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:grid lg:h-full lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-12 xl:gap-16">
        <div className="mb-10 max-w-2xl lg:mb-0">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-accent">El elenco</p>
          <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-5xl xl:text-6xl">
            Cuatro artistas sobre el escenario
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground lg:mt-5 lg:text-base xl:text-lg">
            Las Ñañas reúne a cuatro cantantes y bailarinas que llevan la tecnocumbia por todo
            el país. Vestuario de flecos, coreografía y voz en vivo en cada presentación.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:h-[min(62svh,42rem)] lg:grid-cols-2 lg:grid-rows-2 lg:gap-5 xl:gap-6">
          {fotos.map((f, i) => (
            <motion.figure
              key={f.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative aspect-[2/3] overflow-hidden rounded-sm border border-border bg-card lg:aspect-auto lg:h-full"
            >
              <ParallaxImage
                src={f.src}
                alt={f.alt}
                sizes="(max-width: 768px) 50vw, 25vw"
                objectPosition="top"
                strength={7}
                className="h-full w-full transition-transform duration-500 group-hover:scale-105"
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
