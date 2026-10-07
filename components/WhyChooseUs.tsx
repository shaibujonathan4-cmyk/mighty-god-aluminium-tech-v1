const reasons = [
  {
    number: "01",
    title: "Quality Materials",
    description:
      "We focus on dependable aluminium and glass materials suited to the requirements of each project.",
  },
  {
    number: "02",
    title: "Custom Fabrication",
    description:
      "Every project can be tailored to the required measurements, design, and practical needs of the space.",
  },
  {
    number: "03",
    title: "Professional Installation",
    description:
      "Careful installation helps ensure a clean finish, proper fit, and a result built for everyday use.",
  },
  {
    number: "04",
    title: "Project-Focused Service",
    description:
      "From the initial enquiry to fabrication and installation, we keep the project requirements at the centre.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="border-b border-[#2d2d2d] bg-[#080808]">
      <div className="container py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
            Why Mighty God Aluminium Tech
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Built around quality, precision, and your project.
          </h2>

          <p className="mt-5 text-sm leading-7 text-[#b8b8b8]">
            We combine practical fabrication with careful installation to
            deliver aluminium and glass solutions suited to each space.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-[#2d2d2d] bg-[#2d2d2d] sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div
              key={reason.number}
              className="group bg-[#111111] p-6 transition duration-300 hover:bg-[#151515] md:p-7"
            >
              <span className="text-xs font-medium tracking-[0.2em] text-[#707070] transition group-hover:text-[#d4af37]">
                {reason.number}
              </span>

              <div className="mt-16">
                <h3 className="text-lg font-semibold text-white">
                  {reason.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#b8b8b8]">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
