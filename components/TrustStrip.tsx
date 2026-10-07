const trustPoints = [
  {
    number: "01",
    title: "Professional Fabrication",
    description: "Carefully fabricated aluminium and glass solutions.",
  },
  {
    number: "02",
    title: "Quality Materials",
    description: "Materials selected for practical, lasting performance.",
  },
  {
    number: "03",
    title: "Expert Installation",
    description: "Clean and precise installation for each project.",
  },
  {
    number: "04",
    title: "Custom Solutions",
    description: "Solutions shaped around your space and requirements.",
  },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-[#2d2d2d] bg-[#111111]">
      <div className="container grid divide-y divide-[#2d2d2d] md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
        {trustPoints.map((point) => (
          <div key={point.number} className="px-6 py-8 lg:px-8">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#d4af37]">
              {point.number}
            </span>

            <h2 className="mt-3 text-sm font-semibold text-white">
              {point.title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#707070]">
              {point.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
