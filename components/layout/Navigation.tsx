"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { images } from "@/lib/images"
import { useScrollY } from "@/lib/useScrollY"
import { colors } from "@/lib/tokens"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/technology", label: "Technology" },
  { href: "/results", label: "Results" },
  { href: "/contact", label: "Contact" },
] as const

const contactCtaStyle = {
  backgroundColor: "#A8BDCF",
  color: "#1E2D3D",
  border: "none",
  fontSize: "13px",
  fontWeight: 600,
} as const

function NavLink({
  href,
  label,
  active,
  className = "",
  onClick,
}: {
  href: string
  label: string
  active: boolean
  className?: string
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative font-sans text-xs font-medium uppercase tracking-[0.06em] !text-white transition-opacity duration-150 hover:opacity-100 ${active ? "opacity-100" : "opacity-75"} ${className}`}
    >
      {label}
      {active && (
        <span
          className="absolute -bottom-1 left-0 right-0 h-0.5"
          style={{ backgroundColor: colors.accent }}
        />
      )}
    </Link>
  )
}

export default function Navigation() {
  const pathname = usePathname()
  const { scrolled } = useScrollY(80)
  const [menuOpen, setMenuOpen] = useState(false)
  const contactCtaRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const el = contactCtaRef.current
    if (!el) return

    const computed = window.getComputedStyle(el)
    console.log("[Get in Touch] computed styles:", {
      backgroundColor: computed.backgroundColor,
      color: computed.color,
      fontWeight: computed.fontWeight,
      border: computed.border,
    })
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 z-50 h-[72px] text-white transition-[background-color,backdrop-filter] duration-[250ms]"
        style={{
          backgroundColor: scrolled ? colors.navyScrolled : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 text-white">
          <Link href="/" className="relative block shrink-0 translate-y-1">
            <Image
              src={images.logoWhite}
              alt="Bryker & Co."
              width={2172}
              height={724}
              priority
              className="h-[50px] w-auto"
            />
          </Link>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  label={link.label}
                  active={isActive(link.href)}
                />
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <Link
              ref={contactCtaRef}
              href="/contact"
              className="hidden rounded-sm px-5 py-2.5 font-sans md:inline-flex"
              style={contactCtaStyle}
            >
              Get in Touch
            </Link>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="text-white md:hidden"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-navy md:hidden"
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="absolute right-6 top-6 text-white"
            >
              <X size={28} />
            </button>

            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`font-serif text-[32px] text-white transition-opacity duration-150 hover:opacity-100 ${isActive(link.href) ? "opacity-100" : "opacity-75"}`}
                    style={
                      isActive(link.href)
                        ? { color: colors.accent }
                        : undefined
                    }
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.05, duration: 0.25 }}
              className="absolute bottom-12"
            >
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="inline-flex rounded-sm px-5 py-2.5 font-sans"
                style={contactCtaStyle}
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
