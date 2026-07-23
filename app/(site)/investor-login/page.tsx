import InvestorLoginForm from "@/components/sections/InvestorLoginForm"
import { createPageMetadata } from "@/lib/metadata"

export const metadata = createPageMetadata({
  title: "Investor Login",
  description: "Investor login for Bryker & Co.",
  path: "/investor-login",
})

export default function InvestorLoginPage() {
  return (
    <main>
      <InvestorLoginForm />
    </main>
  )
}
