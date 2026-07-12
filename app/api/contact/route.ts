import { Resend } from "resend"

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return Response.json({ error: "Todos los campos son obligatorios." }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json({ error: "El correo no es válido." }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return Response.json(
        { error: "El envío de correos no está configurado todavía. Agrega RESEND_API_KEY." },
        { status: 500 },
      )
    }

    const resend = new Resend(apiKey)
    const to = process.env.CONTACT_TO_EMAIL || "onboarding@resend.dev"

    const { error } = await resend.emails.send({
      from: "Las Ñañas <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `Nueva contratación · ${name}`,
      text: `Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`,
    })

    if (error) {
      console.log("[v0] Resend error:", error)
      return Response.json({ error: "No se pudo enviar el mensaje. Intenta de nuevo." }, { status: 502 })
    }

    return Response.json({ ok: true })
  } catch (err) {
    console.log("[v0] Contact route error:", err)
    return Response.json({ error: "Ocurrió un error inesperado." }, { status: 500 })
  }
}
