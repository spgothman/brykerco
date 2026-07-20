import { type ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary"
}

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-navy text-white hover:bg-navyMid",
    secondary: "border border-slate text-navy hover:bg-offWhite",
  }

  return (
    <button
      className={`inline-flex items-center justify-center rounded px-6 py-3 text-sm font-medium transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
