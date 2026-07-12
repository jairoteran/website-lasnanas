"use client"

import Image from "next/image"
import { Play } from "lucide-react"
import { ContactForm } from "@/components/contact-form"

export function SiteFooter() {
  return (
    <footer id="contacto" className="scroll-mt-20 lg:scroll-mt-0">
      {/* Contrataciones */}
      <div className="flex min-h-svh flex-col justify-center border-b border-border py-16 md:py-20 lg:snap-start lg:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-accent">Contrataciones</p>
          <h2 className="text-balance font-display text-4xl leading-tight tracking-tight text-foreground md:text-6xl">
            Lleva a Las Ñañas a tu evento
          </h2>
          <p className="mx-auto mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground">
            Fiestas patronales, conciertos y eventos privados en todo el Ecuador.
            Escríbenos y coordinamos tu fecha.
          </p>
          <ContactForm />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-8 md:flex-row md:px-8">
        <Image src="/logo.png" alt="Las Ñañas" width={120} height={60} className="h-9 w-auto" />

        <a
          href="https://www.youtube.com/@lasnanasec"
          target="_blank"
          rel="noreferrer"
          aria-label="Canal de YouTube de Las Ñañas"
          className="flex size-10 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Play className="size-4 fill-current" />
        </a>

        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Las Ñañas · Tecnocumbia del Ecuador
        </p>
      </div>
    </footer>
  )
}
