export type ContactSubmission = {
  id: string
  created_at: string
  name: string
  company: string
  email: string
  message: string
  status: "new" | "reviewed"
}

export type ContactFormPayload = {
  name: string
  company: string
  email: string
  message: string
}
