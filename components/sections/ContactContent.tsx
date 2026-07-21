import ContactForm from "@/components/sections/ContactForm"

export default function ContactContent() {
  return (
    <section className="bg-white py-16 md:py-[120px]">
      <div className="mx-auto max-w-7xl px-4 md:px-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="min-w-0 lg:col-span-3">
            <ContactForm />
          </div>

          <div className="min-w-0 lg:col-span-2">
            <h3 className="font-serif text-xl font-semibold text-navy sm:text-2xl">
              Get in touch.
            </h3>
            <p className="mt-4 font-sans text-base leading-relaxed text-slate sm:mt-6">
              We work with a small number of companies at any time. If you are a
              founder or investor with a high-growth consumer brand that needs
              institutional infrastructure, we would like to hear from you.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
