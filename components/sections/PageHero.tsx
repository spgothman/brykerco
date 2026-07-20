import type { ReactNode } from "react"
import { colors } from "@/lib/tokens"

type PageHeroProps = {
  title: string
  description?: ReactNode
}
export default function PageHero({ title, description }: PageHeroProps) {
  return (
    <section className="flex min-h-[60vh] items-center bg-navy">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-20">
        <h1 className="max-w-4xl font-serif text-[44px] font-bold leading-tight text-white md:text-[64px]">
          {title}
        </h1>
        {description && (
          <div
            className="mt-6 max-w-2xl font-sans text-lg leading-relaxed md:text-xl"
            style={{ color: colors.white75 }}
          >
            {typeof description === "string" ? <p>{description}</p> : description}
          </div>
        )}
      </div>
    </section>
  )
}
