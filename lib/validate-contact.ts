const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactPayload(body: unknown):
  | { ok: true; data: { name: string; company: string; email: string; message: string } }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body" }
  }

  const { name, company, email, message } = body as Record<string, unknown>

  if (typeof name !== "string" || name.trim().length < 1) {
    return { ok: false, error: "Full name is required" }
  }

  if (typeof company !== "string" || company.trim().length < 1) {
    return { ok: false, error: "Company is required" }
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return { ok: false, error: "A valid email is required" }
  }

  if (typeof message !== "string" || message.trim().length < 1) {
    return { ok: false, error: "Message is required" }
  }

  return {
    ok: true,
    data: {
      name: name.trim(),
      company: company.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    },
  }
}
