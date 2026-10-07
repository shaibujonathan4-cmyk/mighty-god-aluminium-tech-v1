"use client";

import { useState } from "react";

type Project = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  location: string | null;
  image: string | null;
};

const categories = [
  "All",
  "Aluminium Windows",
  "Aluminium Doors",
  "Frameless Glass",
  "Glass Partitions",
  "Other",
];

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <>
      <div className="flex flex-wrap gap-2 border-b border-[#2d2d2d] pb-6">
        {categories.map((category) => {
          const active = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`border px-4 py-2.5 text-xs font-semibold transition ${
                active
                  ? "border-[#d4af37] bg-[#d4af37] text-[#080808]"
                  : "border-[#2d2d2d] text-[#b8b8b8] hover:border-[#707070] hover:text-white"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <a
            key={project.id}
            href={`/projects/${project.slug}`}
            className="group overflow-hidden border border-[#2d2d2d] bg-[#111111] transition duration-300 hover:-translate-y-1 hover:border-[#d4af37]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#151515]">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#d4af37]">
                      Mighty God Aluminium Tech
                    </p>
                    <p className="mt-2 text-xs text-[#555555]">
                      Project image coming soon
                    </p>
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent" />

              {project.category && (
                <span className="absolute left-4 top-4 border border-white/20 bg-[#080808]/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                  {project.category}
                </span>
              )}
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-white transition group-hover:text-[#f1d36a]">
                    {project.title}
                  </h2>

                  <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#707070]">
                    {project.location || "Project"}
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

      {filteredProjects.length === 0 && (
        <div className="border border-[#2d2d2d] bg-[#111111] px-6 py-16 text-center">
          <p className="text-sm text-[#b8b8b8]">
            No projects in this category yet.
          </p>
        </div>
      )}
    </>
  );
}
