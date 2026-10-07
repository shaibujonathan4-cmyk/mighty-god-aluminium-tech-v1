const projects = [
  {
    title: "Modern Aluminium Window Installation",
    category: "Aluminium Windows",
    location: "Residential Project",
    image: "/images/projects/project-01.jpg",
    slug: "modern-aluminium-window-installation",
  },
  {
    title: "Contemporary Aluminium Door",
    category: "Aluminium Doors",
    location: "Residential Project",
    image: "/images/projects/project-02.jpg",
    slug: "contemporary-aluminium-door",
  },
  {
    title: "Frameless Glass Installation",
    category: "Frameless Glass",
    location: "Commercial Project",
    image: "/images/projects/project-03.jpg",
    slug: "frameless-glass-installation",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="border-b border-[#2d2d2d] bg-[#111111]">
      <div className="container py-20 md:py-28">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
              Selected Work
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Projects that speak for themselves.
            </h2>
          </div>

          <a
            href="/projects"
            className="text-sm font-medium text-[#b8b8b8] transition hover:text-[#d4af37]"
          >
            View all projects →
          </a>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <a
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={`group block overflow-hidden border border-[#2d2d2d] bg-[#080808] transition duration-300 hover:-translate-y-1 hover:border-[#d4af37] ${
                index === 0 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent" />

                <span className="absolute left-4 top-4 border border-white/20 bg-[#080808]/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                  {project.category}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white transition group-hover:text-[#f1d36a]">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#707070]">
                      {project.location}
                    </p>
                  </div>

                  <span className="mt-1 text-lg text-[#707070] transition group-hover:translate-x-1 group-hover:text-[#d4af37]">
                    →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
