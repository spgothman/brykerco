import { NextResponse } from "next/server"
import { Resend } from "resend"
import { createSupabaseAdmin } from "@/lib/supabase/server"
import { validateContactPayload } from "@/lib/validate-contact"

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const validation = validateContactPayload(body)
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 })
  }

  const { name, company, email, message } = validation.data
  const createdAt = new Date().toISOString()

  try {
    const supabase = createSupabaseAdmin()
    const { error: dbError } = await supabase.from("contact_submissions").insert({
      name,
      company,
      email,
      message,
      status: "new",
    })

    if (dbError) {
      console.error("Supabase insert error:", dbError)
      return NextResponse.json(
        { error: "Failed to save submission" },
        { status: 500 },
      )
    }

    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      const resend = new Resend(resendKey)
      const from =
        process.env.RESEND_FROM ?? "Bryker & Co. <notifications@brykerco.com>"

      await resend.emails.send({
        from,
        to: ["josh@brykerco.com", "shane@brykerco.com"],
        subject: `New inquiry from ${name} at ${company}`,
        text: [
          "New contact form submission",
          "",
          `Timestamp: ${createdAt}`,
          `Name: ${name}`,
          `Company: ${company}`,
          `Email: ${email}`,
          "",
          "Message:",
          message,
        ].join("\n"),
      })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Contact submission error:", error)
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 },
    )
  }
}
