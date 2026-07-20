export const colors = {
  navy:        "#1E2D3D",
  navyScrolled: "rgba(30, 45, 61, 0.95)",
  overlayHero:  "rgba(15, 22, 32, 0.62)",
  navyMid:     "#263A4D",
  slate:       "#3D5A6E",
  blueGray:    "#7A8A9A",
  midBlue:     "#A0B8CC",
  offWhite:    "#F2F5F8",
  white:       "#FFFFFF",
  white75:     "rgba(255, 255, 255, 0.75)",
  accent:      "#A8BDCF",  // steel blue, matches "&" in logo
  textPrimary: "#0F1A24",
  textSecondary: "#4A5568",
} as const

export const fonts = {
  serif:    "var(--font-playfair)",
  sans:     "var(--font-inter)",
  mono:     "JetBrains Mono, monospace",
} as const

export const animation = {
  fadeUp: { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } },
  fadeIn: { initial: { opacity: 0 },       animate: { opacity: 1 } },
  scaleIn: { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } },
  transition: { duration: 0.5, ease: "easeOut" },
  stagger: (i: number) => ({ delay: i * 0.1 }),
} as const
