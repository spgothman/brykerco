import { colors } from "@/lib/tokens"

export default function AboutHero() {
  return (
    <section className="flex min-h-[60vh] items-center bg-navy">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-20 md:py-24">
        <h1 className="max-w-4xl font-serif text-3xl font-bold leading-tight text-white sm:text-[44px] lg:max-w-none lg:whitespace-nowrap lg:text-[52px]">
          Built by operators, for operators.
        </h1>
        <p
          className="mt-6 max-w-2xl font-sans text-base leading-relaxed sm:text-lg md:text-xl"
          style={{ color: colors.white75 }}
        >
          Bryker & Co. was founded in 2016 with a simple thesis: the best
          operating advice comes from people who have actually operated.
        </p>
      </div>
    </section>
  )
}
