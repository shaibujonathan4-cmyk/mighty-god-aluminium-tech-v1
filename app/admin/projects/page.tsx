import { connection } from "next/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const instant = false;

export default async function AdminProjectsPage() {
  await connection();
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: projects, error } = await supabase
    .from("projects")
    .select(
      "id, title, slug, category, location, published, featured, display_order"
    )
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Failed to load projects:", error);
  }

  const projectList = projects ?? [];

  const totalProjects = projectList.length;
  const publishedProjects = projectList.filter(
    (project) => project.published
  ).length;
  const draftProjects = projectList.filter(
    (project) => !project.published
  ).length;

  return (
    <main className="min-h-screen bg-[#090909] text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 border-r border-white/10 bg-[#0d0d0d] lg:block">
          <div className="border-b border-white/10 px-6 py-6">
            <p className="text-xs uppercase tracking-[0.25em] text-[#c9a44c]">
              Mighty God
            </p>
            <h1 className="mt-1 text-lg font-semibold">Admin Panel</h1>
          </div>

          <nav className="space-y-1 p-4">
            <Link
              href="/admin"
              className="block rounded-md px-4 py-3 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
            >
              Dashboard
            </Link>

            <Link
              href="/admin/projects"
              className="block rounded-md border border-[#c9a44c]/20 bg-[#c9a44c]/10 px-4 py-3 text-sm text-[#d9b866]"
            >
              Projects
            </Link>

            <Link
              href="/admin/quotes"
              className="block rounded-md px-4 py-3 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
            >
              Quote Requests
            </Link>

            <Link
              href="/admin/categories"
              className="block rounded-md px-4 py-3 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
            >
              Categories
            </Link>

            <Link
              href="/admin/settings"
              className="block rounded-md px-4 py-3 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
            >
              Settings
            </Link>

            <div className="mt-8 border-t border-white/10 pt-4">
              <Link
                href="/"
                className="block px-4 py-3 text-sm text-white/40 transition hover:text-white"
              >
                View Website
              </Link>
            </div>
          </nav>
        </aside>

        <section className="flex-1">
          <header className="border-b border-white/10 px-6 py-6 sm:px-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[#c9a44c]">
                  Portfolio Management
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Projects
                </h2>

                <p className="mt-1 text-sm text-white/45">
                  Manage the projects displayed on the public website.
                </p>
              </div>

              <Link
                href="/admin/projects/new"
                className="border border-[#c9a44c]/50 bg-[#c9a44c] px-5 py-3 text-center text-sm font-semibold text-black transition hover:bg-[#d9b866]"
              >
                + Add Project
              </Link>
            </div>
          </header>

          <div className="p-6 sm:p-8">
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              <div className="border border-white/10 bg-white/[0.02] p-5">
                <p className="text-xs uppercase tracking-widest text-white/40">
                  Total Projects
                </p>

                <p className="mt-3 text-3xl font-semibold">
                  {totalProjects}
                </p>
              </div>

              <div className="border border-white/10 bg-white/[0.02] p-5">
                <p className="text-xs uppercase tracking-widest text-white/40">
                  Published
                </p>

                <p className="mt-3 text-3xl font-semibold text-[#d9b866]">
                  {publishedProjects}
                </p>
              </div>

              <div className="border border-white/10 bg-white/[0.02] p-5">
                <p className="text-xs uppercase tracking-widest text-white/40">
                  Drafts
                </p>

                <p className="mt-3 text-3xl font-semibold">
                  {draftProjects}
                </p>
              </div>
            </div>

            <div className="overflow-hidden border border-white/10">
              <div className="border-b border-white/10 bg-white/[0.02] px-5 py-4">
                <h3 className="text-sm font-semibold">Portfolio Projects</h3>
              </div>

              {error ? (
                <div className="px-5 py-8 text-sm text-red-300">
                  Unable to load projects from the database.
                </div>
              ) : projectList.length === 0 ? (
                <div className="px-5 py-8 text-sm text-white/40">
                  No projects have been added yet.
                </div>
              ) : (
                <div className="divide-y divide-white/10">
                  {projectList.map((project) => (
                    <div
                      key={project.id}
                      className="flex flex-col gap-5 px-5 py-5 transition hover:bg-white/[0.02] md:flex-row md:items-center md:justify-between"
                    >
                      <div>
                        <h4 className="font-medium text-white">
                          {project.title}
                        </h4>

                        <div className="mt-2 flex flex-wrap gap-2 text-xs text-white/40">
                          <span>{project.category || "Uncategorized"}</span>

                          <span>•</span>

                          <span>{project.location || "No location"}</span>

                          {project.featured && (
                            <>
                              <span>•</span>
                              <span className="text-[#d9b866]">
                                Featured
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={
                            project.published
                              ? "border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300"
                              : "border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/40"
                          }
                        >
                          {project.published ? "Published" : "Draft"}
                        </span>

                        <Link
                          href={`/admin/projects/${project.id}`}
                          className="border border-white/10 px-4 py-2 text-xs text-white/60 transition hover:border-white/25 hover:text-white"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <p className="mt-5 text-xs leading-5 text-white/30">
              Projects are now loaded directly from the Supabase portfolio
              database.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
