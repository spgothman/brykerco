import { colors } from "@/lib/tokens"

export default function AboutHero() {
  return (
    <section className="flex min-h-[60vh] items-center bg-navy">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-20">
        <h1 className="max-w-4xl font-serif text-[44px] font-bold leading-tight text-white lg:max-w-none lg:whitespace-nowrap lg:text-[52px]">
          Built by operators, for operators.
        </h1>
        <p
          className="mt-6 max-w-2xl font-sans text-lg leading-relaxed md:text-xl"
          style={{ color: colors.white75 }}
        >
          Bryker & Co. was founded in 2016 with a simple thesis: the best
          operating advice comes from people who have actually operated.
        </p>
      </div>
    </section>
  )
}
