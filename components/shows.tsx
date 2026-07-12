"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { EcuadorMap } from "@/components/ecuador-map"

const shows = [
  { city: "Lago Agrio", venue: "La Choza", date: "18 de Julio", month: "Jul" },
  { city: "Cuenca", venue: "Complejo La Gloria", date: "15 de Agosto", month: "Ago" },
  { city: "Ibarra", venue: "Yahuarcocha", date: "22 de Agosto", month: "Ago" },
  { city: "Riobamba", venue: "Quinta Macají", date: "29 de Agosto", month: "Ago" },
  { city: "Loja", venue: "Por confirmar", date: "", month: "Pronto" },
]

export function Shows() {
  return (
    <section
      id="shows"
      className="flex min-h-svh scroll-mt-20 flex-col justify-center border-b border-border bg-card/30 py-16 md:py-20 lg:h-svh lg:min-h-0 lg:scroll-mt-0 lg:snap-start lg:overflow-hidden lg:py-0"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 md:px-8 lg:h-full lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-12 xl:gap-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto w-full max-w-[32rem] overflow-hidden rounded-2xl border border-border bg-card/90 shadow-2xl shadow-black/25 md:max-w-[35rem] lg:mx-0 xl:max-w-[37rem]"
        >
          <span className="pointer-events-none absolute -right-16 top-10 size-40 rounded-full bg-accent/10 blur-3xl" />
          <span className="pointer-events-none absolute bottom-8 left-8 size-28 rounded-full bg-purple-bright/15 blur-2xl" />
          <EcuadorMap variant="brand" showLabels={false} />
        </motion.div>

        <div className="lg:pl-2">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-accent">Gira 2026</p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl leading-tight tracking-tight text-foreground md:text-5xl xl:text-6xl"
          >
            Próximos Shows
          </motion.h2>

          <p className="mt-4 max-w-lg text-pretty leading-relaxed text-muted-foreground">
            Fechas confirmadas y ciudades en agenda para llevar la tecnocumbia de Las Ñañas por todo el Ecuador.
          </p>

          <ul className="mt-7 grid gap-3">
            {shows.map((s, i) => (
              <motion.li
                key={s.city}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group relative overflow-hidden rounded-sm border border-border/60 bg-background/35 p-4 transition-colors hover:border-accent/40 hover:bg-background/60"
              >
                <span className="absolute inset-y-0 left-0 w-1 bg-accent/70 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent transition-transform group-hover:translate-x-1">
                      <ChevronRight className="size-5" strokeWidth={3} />
                    </span>
                    <div>
                      <p className="text-lg font-bold text-foreground md:text-xl">{s.city}</p>
                      <p className="mt-1 text-base font-medium text-muted-foreground">
                        {s.date ? `${s.venue} – ${s.date}` : s.venue}
                      </p>
                    </div>
                  </div>
                  <span className="hidden shrink-0 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:inline-flex">
                    {s.month}
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
