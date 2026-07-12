"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Elenco", href: "#elenco" },
  { label: "Shows", href: "#shows" },
  { label: "Videos", href: "#videos" },
  { label: "Contacto", href: "#contacto" },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("inicio")

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target.id) setActive(visible.target.id)
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.35, 0.6] },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 shadow-[0_1px_0_rgba(255,255,255,0.02)] backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
        <a href="#inicio" className="flex items-center gap-3" aria-label="Las Ñañas — inicio">
          <Image
            src="/logo.png"
            alt="Las Ñañas"
            width={132}
            height={66}
            priority
            className="h-9 w-auto md:h-11"
          />
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative text-sm font-semibold uppercase tracking-wide transition-colors after:absolute after:-bottom-2 after:left-0 after:h-px after:bg-accent after:transition-all ${
                active === l.href.slice(1)
                  ? "text-foreground after:w-full"
                  : "text-foreground/70 after:w-0 hover:text-foreground hover:after:w-full"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="https://www.youtube.com/@lasnanasec"
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-sm border border-border px-4 py-2 text-sm font-medium uppercase tracking-wide text-foreground transition-colors hover:border-primary hover:text-primary md:inline-block"
        >
          YouTube
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex size-10 items-center justify-center rounded-sm border border-border text-foreground md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col px-5 py-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`border-b border-border/60 py-3 text-base font-medium uppercase tracking-wide last:border-none ${
                  active === l.href.slice(1) ? "text-accent" : "text-foreground"
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://www.youtube.com/@lasnanasec"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-sm border border-border px-4 py-3 text-center text-sm font-medium uppercase tracking-wide text-foreground"
            >
              Ver canal de YouTube
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
