import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#080808]" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-[#080808]/35" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/30" />

        <div
          className="absolute inset-0 bg-cover bg-center opacity-45"
          style={{
            backgroundImage:
              "url('/images/projects/hero.jpg')",
          }}
        />
      </div>

      <div className="container relative flex min-h-[calc(100vh-5rem)] items-center py-20">
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#d4af37]" />
            <p className="text-xs font-semibold tracking-[0.25em] text-[#d4af37]">
              PRECISION • QUALITY • CRAFTSMANSHIP
            </p>
          </div>

          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-8xl">
            Quality Aluminium
            <span className="block text-[#d4af37]">
              & Glass Solutions
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-[#b8b8b8] sm:text-lg">
            Professional fabrication and installation of aluminium and glass
            solutions for homes, offices, commercial spaces, and custom
            projects.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/projects"
              className="border border-white bg-white px-7 py-4 text-center text-sm font-semibold text-[#080808] transition-all hover:bg-transparent hover:text-white"
            >
              View Our Work
            </Link>

            <Link
              href="/quote"
              className="border border-[#d4af37] px-7 py-4 text-center text-sm font-semibold text-[#d4af37] transition-all hover:bg-[#d4af37] hover:text-[#080808]"
            >
              Request a Quote
            </Link>
          </div>

          <a
            href="https://wa.me/"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#b8b8b8] transition-colors hover:text-[#d4af37]"
          >
            <span className="h-2 w-2 rounded-full bg-[#d4af37]" />
            Chat with us on WhatsApp
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block">
        <div className="flex flex-col items-center gap-2 text-[#707070]">
          <span className="text-[10px] uppercase tracking-[0.3em]">
            Scroll
          </span>
          <span className="h-10 w-px bg-[#707070]" />
        </div>
      </div>
    </section>
  );
}
