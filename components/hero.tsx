"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"

const heroPhotos = [
  { src: "/integrantes/primera.jpg", alt: "Integrante de Las Ñañas con vestido rojo de flecos" },
  { src: "/integrantes/segunda.jpg", alt: "Integrante de Las Ñañas frente al paisaje de Quito" },
  { src: "/integrantes/tercera.jpg", alt: "Integrante de Las Ñañas de perfil con vestido rojo" },
  { src: "/integrantes/cuarta.jpg", alt: "Integrante de Las Ñañas saludando con la mano en alto" },
]

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-svh scroll-mt-20 border-b border-border lg:scroll-mt-0 lg:snap-start"
    >
      <div className="grid w-full grid-cols-1 items-stretch gap-0 px-0 lg:min-h-svh lg:grid-cols-2">
        {/* Text column */}
        <div className="flex flex-col justify-center px-5 pb-12 pt-24 md:px-8 md:pb-16 md:pt-28 lg:py-28 lg:pl-[max(2rem,calc((100vw-72rem)/2))] lg:pr-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-xs font-medium uppercase tracking-[0.28em] text-accent"
          >
            Agrupación de tecnocumbia — Ecuador
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <Image
              src="/logo.png"
              alt="Las Ñañas"
              width={620}
              height={330}
              priority
              className="h-auto w-full max-w-sm md:max-w-md lg:max-w-lg"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 max-w-md text-pretty text-base leading-relaxed text-muted-foreground"
          >
            Cuatro voces, un mismo sabor. Tecnocumbia hecha en Ecuador para bailar de
            principio a fin, con la energía y el brillo de un show en vivo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#shows"
              className="rounded-sm bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Próximos shows
            </a>
            <a
              href="#videos"
              className="rounded-sm border border-border px-6 py-3 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Ver videos
            </a>
          </motion.div>
        </div>

        {/* Image column */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-[52svh] min-h-[340px] max-h-[560px] border-t border-border lg:h-auto lg:min-h-full lg:max-h-none lg:border-l lg:border-t-0"
        >
          <HeroImageRotator />
        </motion.div>
      </div>
    </section>
  )
}

function HeroImageRotator() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % heroPhotos.length)
    }, 4500)

    return () => window.clearInterval(interval)
  }, [])

  const photo = heroPhotos[active]

  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={photo.src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority={active === 0}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-[center_28%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/25 via-transparent to-background/10" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
        {heroPhotos.map((item, index) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setActive(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === active ? "w-8 bg-accent" : "w-3 bg-foreground/35 hover:bg-foreground/60"
            }`}
            aria-label={`Mostrar foto ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
