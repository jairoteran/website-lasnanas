import { WhatsAppIcon } from "@/components/whatsapp-icon"

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/593995030129"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground shadow-2xl shadow-primary/30 transition-transform hover:-translate-y-0.5 hover:bg-primary/90"
      aria-label="Contratar por WhatsApp"
    >
      <WhatsAppIcon className="size-5" />
      <span className="hidden sm:inline">Contratar</span>
    </a>
  )
}
