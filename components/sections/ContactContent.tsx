import ContactForm from "@/components/sections/ContactForm"

export default function ContactContent() {
  return (
    <section className="bg-white py-[120px]">
      <div className="mx-auto max-w-7xl px-6 md:px-20">
        <div className="grid gap-20 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-serif text-2xl font-semibold text-navy">
              Get in touch.
            </h3>
            <p className="mt-6 font-sans text-base leading-relaxed text-slate">
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
