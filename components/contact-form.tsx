"use client"

import { useState } from "react"
import { Send, Check } from "lucide-react"
import { WhatsAppIcon } from "@/components/whatsapp-icon"

type Status = "idle" | "sending" | "success" | "error"

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    setError("")

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "No se pudo enviar el mensaje.")
      setStatus("success")
      form.reset()
    } catch (err) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Ocurrió un error.")
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-4 rounded-sm border border-border bg-card p-10 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-6" />
        </span>
        <h3 className="font-display text-2xl text-foreground">¡Mensaje enviado!</h3>
        <p className="text-pretty leading-relaxed text-muted-foreground">
          Gracias por escribirnos. Te responderemos muy pronto para coordinar tu fecha.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium uppercase tracking-wide text-accent transition-colors hover:text-primary"
        >
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-10 grid max-w-xl gap-4 text-left">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder="Tu nombre o empresa"
            className="rounded-sm border border-input bg-secondary px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Correo
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="tucorreo@ejemplo.com"
            className="rounded-sm border border-input bg-secondary px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
          />
        </div>
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Cuéntanos sobre tu evento: ciudad, fecha y tipo de show."
          className="resize-none rounded-sm border border-input bg-secondary px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {status === "sending" ? "Enviando..." : "Enviar mensaje"}
          <Send className="size-4" />
        </button>
        <a
          href="https://wa.me/593995030129"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-sm border border-accent/40 bg-secondary px-8 py-4 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:border-accent hover:bg-card"
        >
          <WhatsAppIcon className="size-5 text-accent" />
          WhatsApp directo
        </a>
      </div>
    </form>
  )
}
