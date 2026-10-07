import { connection } from "next/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const values = [
  {
    number: "01",
    title: "Quality Materials",
    text: "We focus on suitable aluminium profiles, glass, fittings, and finishing materials for each project.",
  },
  {
    number: "02",
    title: "Custom Fabrication",
    text: "Every project can be adapted to the required dimensions, style, function, and site conditions.",
  },
  {
    number: "03",
    title: "Professional Installation",
    text: "Careful installation is treated as an important part of delivering a clean and dependable result.",
  },
  {
    number: "04",
    title: "Project-Focused Service",
    text: "We work around the requirements of each client and project rather than forcing every job into the same solution.",
  },
];

export const instant = false;

export default async function AboutPage() {
  await connection();

  return (
    <>
      <Header />

      <main className="bg-[#080808] text-white">
        {/* Page Hero */}
        <section className="border-b border-[#2d2d2d]">
          <div className="container py-24 md:py-32">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
              About Mighty God Aluminium Tech
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Built around{" "}
              <span className="text-[#d4af37]">precision, quality</span> and
              practical design.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-[#b8b8b8] md:text-lg">
              Mighty God Aluminium Tech provides aluminium and glass fabrication,
              installation, and custom solutions for residential and commercial
              projects.
            </p>
          </div>
        </section>

        {/* Business Introduction */}
        <section>
          <div className="container grid gap-12 py-20 md:grid-cols-2 md:py-28">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#707070]">
                Who We Are
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                Aluminium & glass solutions made for real projects.
              </h2>
            </div>

            <div className="space-y-6 text-sm leading-8 text-[#b8b8b8] md:text-base">
              <p>
                Mighty God Aluminium Tech is an aluminium and glass fabrication
                business based in Gauraka, Niger State, Nigeria.
              </p>

              <p>
                Our work covers aluminium windows and doors, frameless glass,
                glass doors, partitions, and other custom fabrication
                requirements.
              </p>

              <p>
                We approach each project with attention to measurements,
                materials, finishing, functionality, and installation so that
                the finished work fits the space and the client&apos;s needs.
              </p>
            </div>
          </div>
        </section>

        {/* Business Information */}
        <section className="border-y border-[#2d2d2d] bg-[#111111]">
          <div className="container py-16 md:py-20">
            <div className="grid gap-px overflow-hidden border border-[#2d2d2d] bg-[#2d2d2d] sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-[#111111] p-7">
                <p className="text-xs uppercase tracking-[0.2em] text-[#707070]">
                  Business
                </p>
                <p className="mt-3 text-lg font-medium">
                  Mighty God Aluminium Tech
                </p>
              </div>

              <div className="bg-[#111111] p-7">
                <p className="text-xs uppercase tracking-[0.2em] text-[#707070]">
                  Location
                </p>
                <p className="mt-3 text-lg font-medium">
                  Gauraka, Niger State
                </p>
              </div>

              <div className="bg-[#111111] p-7">
                <p className="text-xs uppercase tracking-[0.2em] text-[#707070]">
                  Established
                </p>
                <p className="mt-3 text-lg font-medium">2024</p>
              </div>

              <div className="bg-[#111111] p-7">
                <p className="text-xs uppercase tracking-[0.2em] text-[#707070]">
                  Focus
                </p>
                <p className="mt-3 text-lg font-medium">
                  Fabrication & Installation
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section>
          <div className="container py-20 md:py-28">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
                Our Approach
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                What guides our work
              </h2>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {values.map((value) => (
                <article
                  key={value.number}
                  className="border border-[#2d2d2d] bg-[#111111] p-7 transition-colors hover:border-[#707070]"
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="text-sm font-medium text-[#d4af37]">
                      {value.number}
                    </span>

                    <span className="h-px w-16 bg-[#707070]" />
                  </div>

                  <h3 className="mt-8 text-xl font-semibold">
                    {value.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#b8b8b8]">
                    {value.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-[#2d2d2d] bg-[#111111]">
          <div className="container py-20 text-center md:py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
              Start Your Project
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
              Have an aluminium or glass project in mind?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#b8b8b8]">
              Tell us what you need and we can discuss the right solution for
              your project.
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
                View Our Projects
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
