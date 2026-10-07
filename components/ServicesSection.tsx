const services = [
  {
    number: "01",
    title: "Aluminium Windows",
    description:
      "Clean, durable aluminium window solutions designed for residential and commercial spaces.",
  },
  {
    number: "02",
    title: "Aluminium Doors",
    description:
      "Strong and refined aluminium doors fabricated to suit your space, style, and project requirements.",
  },
  {
    number: "03",
    title: "Frameless Glass",
    description:
      "Modern frameless glass solutions that create open, bright, and elegant spaces.",
  },
  {
    number: "04",
    title: "Glass Doors",
    description:
      "Contemporary glass doors for homes, offices, shops, and other architectural spaces.",
  },
  {
    number: "05",
    title: "Glass Partitions",
    description:
      "Professional glass partition solutions for offices, interiors, and modern commercial spaces.",
  },
  {
    number: "06",
    title: "Custom Fabrication",
    description:
      "Custom aluminium and glass fabrication built around your measurements and project needs.",
  },
];

export default function ServicesSection() {
  return (
    <section className="border-b border-[#2d2d2d] bg-[#080808]">
      <div className="container py-20 md:py-28">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
              What We Do
            </p>

            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Aluminium & glass solutions built for your space.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-[#b8b8b8]">
            From windows and doors to frameless glass and custom fabrication,
            we provide practical solutions with a clean, professional finish.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <a
              key={service.number}
              href={`/quote?service=${encodeURIComponent(service.title)}`}
              className="group relative flex min-h-[250px] flex-col justify-between border border-[#2d2d2d] bg-[#111111] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#d4af37] hover:bg-[#151515] md:p-7"
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-medium tracking-[0.2em] text-[#707070]">
                  {service.number}
                </span>

                <span className="text-lg text-[#707070] transition group-hover:translate-x-1 group-hover:text-[#d4af37]">
                  →
                </span>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#b8b8b8]">
                  {service.description}
                </p>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#d4af37]">
                  Enquire about this service
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <a
            href="/services"
            className="text-sm font-medium text-[#b8b8b8] transition hover:text-[#d4af37]"
          >
            View all services →
          </a>
        </div>
      </div>
    </section>
  );
}
