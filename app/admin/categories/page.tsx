import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const instant = false;

const categories = [
  {
    name: "Aluminium Windows",
    description: "Sliding, casement and custom aluminium window systems.",
    projects: 2,
  },
  {
    name: "Aluminium Doors",
    description: "Durable aluminium entrance, interior and custom doors.",
    projects: 2,
  },
  {
    name: "Frameless Glass",
    description: "Modern frameless glass installations and partitions.",
    projects: 1,
  },
  {
    name: "Glass & Aluminium",
    description: "Combined aluminium and glass fabrication solutions.",
    projects: 1,
  },
];

export default async function AdminCategoriesPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

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
              className="block rounded-md px-4 py-3 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
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
              className="block rounded-md border border-[#c9a44c]/20 bg-[#c9a44c]/10 px-4 py-3 text-sm text-[#d9b866]"
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
                  Portfolio Structure
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Categories
                </h2>
                <p className="mt-1 text-sm text-white/45">
                  Organize projects by service and installation type.
                </p>
              </div>

              <button
                type="button"
                className="border border-[#c9a44c]/50 bg-[#c9a44c] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#d9b866]"
              >
                + Add Category
              </button>
            </div>
          </header>

          <div className="p-6 sm:p-8">
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              <div className="border border-white/10 bg-white/[0.02] p-5">
                <p className="text-xs uppercase tracking-widest text-white/40">
                  Total Categories
                </p>
                <p className="mt-3 text-3xl font-semibold">4</p>
              </div>

              <div className="border border-white/10 bg-white/[0.02] p-5">
                <p className="text-xs uppercase tracking-widest text-white/40">
                  Categorized Projects
                </p>
                <p className="mt-3 text-3xl font-semibold text-[#d9b866]">
                  6
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{category.name}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/45">
                        {category.description}
                      </p>
                    </div>

                    <span className="shrink-0 border border-[#c9a44c]/20 bg-[#c9a44c]/10 px-3 py-1.5 text-xs text-[#d9b866]">
                      {category.projects} projects
                    </span>
                  </div>

                  <div className="mt-6 flex gap-3 border-t border-white/10 pt-4">
                    <button
                      type="button"
                      className="border border-white/10 px-4 py-2 text-xs text-white/60 transition hover:border-white/25 hover:text-white"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="border border-white/10 px-4 py-2 text-xs text-white/40 transition hover:border-red-400/30 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs leading-5 text-white/30">
              Category editing will be connected to the portfolio database
              when project management is moved from code to Supabase.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
