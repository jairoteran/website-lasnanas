import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Las Ñañas — Agrupación de tecnocumbia | Ecuador',
  description:
    'Las Ñañas es una agrupación femenina ecuatoriana que ha destacado por su talento, carisma y energía en el escenario, posicionándose como una de las propuestas de mayor crecimiento dentro de la tecnocumbia. Su estilo auténtico y conexión con el público las han convertido en un referente del género a nivel nacional. Con una propuesta fresca, una identidad propia y un espectáculo de alto impacto, Las Ñañas continúan conquistando nuevos escenarios y consolidándose como una de las agrupaciones femeninas más destacadas de la tecnocumbia ecuatoriana.',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#26120f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-background font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
