import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL
        const passwordHash = process.env.ADMIN_PASSWORD_HASH

        if (!credentials?.email || !credentials?.password) {
          return null
        }

        if (!adminEmail || !passwordHash) {
          console.error("Missing ADMIN_EMAIL or ADMIN_PASSWORD_HASH")
          return null
        }

        if (credentials.email !== adminEmail) {
          return null
        }

        const valid = await bcrypt.compare(credentials.password, passwordHash)
        if (!valid) {
          return null
        }

        return { id: "admin", email: adminEmail }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
}
