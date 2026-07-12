"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Play, X } from "lucide-react"

const videos = [
  { id: "VLvuDnSPwBI", title: "Las Ñañas — Video oficial" },
  { id: "lcm8tf2l0Vk", title: "Las Ñañas — Video oficial" },
  { id: "cWddNyuDpiM", title: "Las Ñañas — Video oficial" },
  { id: "XGz8IK3LuFU", title: "Las Ñañas — Video oficial" },
]

export function Videos() {
  const [activeVideo, setActiveVideo] = useState<(typeof videos)[number] | null>(null)

  useEffect(() => {
    if (!activeVideo) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveVideo(null)
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeVideo])

  return (
    <>
      <section
        id="videos"
        className="flex min-h-svh scroll-mt-20 flex-col justify-center border-b border-border py-16 md:py-20 lg:h-svh lg:min-h-0 lg:scroll-mt-0 lg:snap-start lg:overflow-hidden lg:py-0"
      >
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:grid lg:h-full lg:grid-cols-[0.42fr_0.58fr] lg:items-center lg:gap-12 xl:gap-16">
          <div className="mb-10 max-w-2xl lg:mb-0">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-accent">En YouTube</p>
            <h2 className="font-display text-4xl leading-tight tracking-tight text-foreground md:text-5xl">
              Canciones y videos
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              Los sencillos y videos oficiales de Las Ñañas. Abre cada video en una ventana amplia sin salir de la página.
            </p>

            <a
              href="https://www.youtube.com/@lasnanasec"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:bg-secondary"
            >
              <Play className="size-4 fill-current" />
              Ver el canal completo
              <ExternalLink className="size-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-5 xl:gap-6">
            {videos.map((video, i) => (
              <motion.button
                key={video.id}
                type="button"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setActiveVideo(video)}
                className="group relative aspect-video overflow-hidden rounded-sm border border-border bg-muted text-left shadow-xl shadow-black/10 transition-colors hover:border-accent/50"
                aria-label={`Reproducir ${video.title}`}
              >
                <Image
                  src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent transition-colors group-hover:from-background/70" />
                <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-black/30 transition-transform group-hover:scale-110">
                  <Play className="size-6 fill-current" />
                </span>
                <span className="absolute bottom-4 left-4 right-4 text-sm font-semibold uppercase tracking-wide text-foreground">
                  {video.title}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-background/90 px-4 py-6 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={activeVideo.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 cursor-default"
              onClick={() => setActiveVideo(null)}
              tabIndex={-1}
              aria-label="Cerrar video"
            />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-5xl overflow-hidden rounded-sm border border-border bg-card shadow-2xl shadow-black/40"
            >
              <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 md:px-5">
                <p className="truncate text-sm font-semibold uppercase tracking-wide text-foreground">{activeVideo.title}</p>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="flex size-9 shrink-0 items-center justify-center rounded-sm border border-border text-foreground transition-colors hover:bg-secondary"
                  aria-label="Cerrar video"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="aspect-video bg-background">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
