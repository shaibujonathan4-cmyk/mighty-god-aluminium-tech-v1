export default function CTASection() {
  return (
    <section className="bg-[#111111]">
      <div className="container py-20 md:py-28">
        <div className="relative overflow-hidden border border-[#2d2d2d] bg-[#080808] px-6 py-14 md:px-12 md:py-20">
          <div className="absolute right-0 top-0 h-40 w-40 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#d4af37]/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
              Start Your Project
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Have a project in mind?
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#b8b8b8]">
              Tell us what you need and let&apos;s discuss the right aluminium
              or glass solution for your space.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/quote"
                className="inline-flex items-center justify-center bg-[#d4af37] px-6 py-3.5 text-sm font-semibold text-[#080808] transition hover:bg-[#f1d36a]"
              >
                Request a Quote
              </a>

              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center border border-[#707070] px-6 py-3.5 text-sm font-semibold text-white transition hover:border-[#d4af37] hover:text-[#d4af37]"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
