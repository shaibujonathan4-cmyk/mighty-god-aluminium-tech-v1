import { connection } from "next/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const services = [
  {
    number: "01",
    title: "Aluminium Windows",
    description:
      "Aluminium window solutions designed around the size, style, ventilation, lighting, and practical requirements of the space.",
    features: [
      "Custom measurements",
      "Multiple opening styles",
      "Residential and commercial applications",
    ],
  },
  {
    number: "02",
    title: "Aluminium Doors",
    description:
      "Functional aluminium doors fabricated for entrances, internal spaces, offices, homes, and other project requirements.",
    features: [
      "Custom dimensions",
      "Durable aluminium framing",
      "Different design configurations",
    ],
  },
  {
    number: "03",
    title: "Frameless Glass",
    description:
      "Clean frameless glass installations that create a modern appearance while maintaining visibility and an open feel.",
    features: [
      "Minimal visual framing",
      "Modern architectural finish",
      "Suitable for selected interior applications",
    ],
  },
  {
    number: "04",
    title: "Glass Doors",
    description:
      "Glass door solutions for spaces that require a clean, contemporary appearance with practical access and separation.",
    features: [
      "Clear and modern appearance",
      "Custom installation",
      "Residential and commercial use",
    ],
  },
  {
    number: "05",
    title: "Glass Partitions",
    description:
      "Glass partition systems for dividing offices, rooms, and commercial spaces while retaining light and visual openness.",
    features: [
      "Space separation",
      "Natural light flow",
      "Professional interior appearance",
    ],
  },
  {
    number: "06",
    title: "Custom Fabrication",
    description:
      "Custom aluminium and glass fabrication for projects that require a solution outside standard configurations.",
    features: [
      "Project-specific designs",
      "Custom measurements",
      "Fabrication and installation",
    ],
  },
];

export const instant = false;

export default async function ServicesPage() {
  await connection();
  return (
    <>
      <Header />

      <main className="bg-[#080808] text-white">
        {/* Hero */}
        <section className="border-b border-[#2d2d2d]">
          <div className="container py-24 md:py-32">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
              Our Services
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Aluminium & glass solutions for{" "}
              <span className="text-[#d4af37]">modern spaces.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-[#b8b8b8] md:text-lg">
              From windows and doors to frameless glass and custom fabrication,
              we provide project-focused solutions designed around your
              requirements.
            </p>
          </div>
        </section>

        {/* Services */}
        <section>
          <div className="container py-20 md:py-28">
            <div className="grid gap-5 md:grid-cols-2">
              {services.map((service) => (
                <article
                  key={service.number}
                  className="group border border-[#2d2d2d] bg-[#111111] p-7 transition-all duration-300 hover:border-[#707070] md:p-9"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-sm font-semibold text-[#d4af37]">
                      {service.number}
                    </span>

                    <span className="h-px w-16 bg-[#707070] transition-all duration-300 group-hover:w-24 group-hover:bg-[#d4af37]" />
                  </div>

                  <h2 className="mt-10 text-2xl font-semibold tracking-tight">
                    {service.title}
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-[#b8b8b8]">
                    {service.description}
                  </p>

                  <ul className="mt-7 space-y-3 border-t border-[#2d2d2d] pt-6">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-[#b8b8b8]"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 bg-[#d4af37]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="border-y border-[#2d2d2d] bg-[#111111]">
          <div className="container py-20 md:py-28">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
                Our Process
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                From requirement to installation.
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#b8b8b8]">
                Each project begins with understanding what you need and ends
                with a fabricated solution installed for the intended space.
              </p>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden border border-[#2d2d2d] bg-[#2d2d2d] md:grid-cols-4">
              {[
                {
                  number: "01",
                  title: "Discuss",
                  text: "Tell us about your project and requirements.",
                },
                {
                  number: "02",
                  title: "Measure",
                  text: "Establish the dimensions and site requirements.",
                },
                {
                  number: "03",
                  title: "Fabricate",
                  text: "Prepare the selected aluminium or glass solution.",
                },
                {
                  number: "04",
                  title: "Install",
                  text: "Complete the installation and finishing.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="bg-[#111111] p-7 md:min-h-56"
                >
                  <span className="text-sm font-semibold text-[#d4af37]">
                    {step.number}
                  </span>

                  <h3 className="mt-8 text-lg font-semibold">{step.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-[#707070]">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="container py-20 text-center md:py-28">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
              Ready to Start?
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
              Let&apos;s discuss your project.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#b8b8b8]">
              Send us your requirements and we&apos;ll discuss the appropriate
              aluminium or glass solution for your space.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="/quote"
                className="inline-flex items-center justify-center bg-[#d4af37] px-7 py-4 text-sm font-semibold text-[#080808] transition hover:bg-[#f1d36a]"
              >
                Request a Quote
              </a>

              <a
                href="/projects"
                className="inline-flex items-center justify-center border border-[#707070] px-7 py-4 text-sm font-semibold text-white transition hover:border-white"
              >
                View Projects
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
