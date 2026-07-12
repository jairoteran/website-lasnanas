import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/hero"
import { Elenco } from "@/components/elenco"
import { Shows } from "@/components/shows"
import { Videos } from "@/components/videos"
import { SiteFooter } from "@/components/site-footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export default function Page() {
  return (
    <main className="relative overflow-x-clip">
      <SiteNav />
      <Hero />
      <Elenco />
      <Shows />
      <Videos />
      <SiteFooter />
      <WhatsAppFloat />
    </main>
  )
}
