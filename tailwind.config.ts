import type { Config } from "tailwindcss"
import { colors } from "./lib/tokens"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: colors.navy,
        navyMid: colors.navyMid,
        slate: colors.slate,
        blueGray: colors.blueGray,
        midBlue: colors.midBlue,
        offWhite: colors.offWhite,
        accent: colors.accent,
        textPrimary: colors.textPrimary,
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
}

export default config
