import { redirect } from "next/navigation";
import { connection } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import AdminSidebar from "@/components/AdminSidebar";

export const instant = false;

export default async function AdminDashboard() {
  await connection();

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { count: quoteCount } = await supabase
    .from("quote_requests")
    .select("*", { count: "exact", head: true });

  const { count: newCount } = await supabase
    .from("quote_requests")
    .select("*", { count: "exact", head: true })
    .eq("status", "new");

  const { count: completedCount } = await supabase
    .from("quote_requests")
    .select("*", { count: "exact", head: true })
    .eq("status", "completed");

  const { count: projectCount } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true });

  const stats = [
    {
      label: "Total Projects",
      value: projectCount ?? 0,
      description: "Current portfolio",
    },
    {
      label: "Quote Requests",
      value: quoteCount ?? 0,
      description: "All requests",
    },
    {
      label: "New Requests",
      value: newCount ?? 0,
      description: "Awaiting attention",
    },
    {
      label: "Completed",
      value: completedCount ?? 0,
      description: "Completed requests",
    },
  ];

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <AdminSidebar />

        <section className="flex-1">
          <header className="border-b border-[#2d2d2d] bg-[#080808]">
            <div className="flex min-h-20 flex-col justify-center gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-10">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#d4af37]">
                  Admin
                </p>
                <h1 className="mt-1 text-xl font-semibold">
                  Dashboard
                </h1>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-sm text-white">{user.email}</p>
                <p className="text-xs text-[#707070]">Administrator</p>
              </div>
            </div>
          </header>

          <div className="p-6 lg:p-10">
            <div className="mb-10">
              <h2 className="text-2xl font-semibold">Overview</h2>
              <p className="mt-2 text-sm text-[#b8b8b8]">
                A quick view of your website activity.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="border border-[#2d2d2d] bg-[#111111] p-6"
                >
                  <p className="text-sm text-[#b8b8b8]">{stat.label}</p>

                  <p className="mt-4 text-3xl font-semibold text-white">
                    {stat.value}
                  </p>

                  <p className="mt-2 text-xs text-[#707070]">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="border border-[#2d2d2d] bg-[#111111] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Recent Activity</h3>
                    <p className="mt-1 text-sm text-[#707070]">
                      Keep track of your latest website activity.
                    </p>
                  </div>

                  <span className="h-2 w-2 bg-[#d4af37]" />
                </div>

                <div className="mt-8 border-t border-[#2d2d2d] pt-6">
                  <p className="text-sm text-[#b8b8b8]">
                    Quote requests will appear here as customers submit
                    enquiries.
                  </p>
                </div>
              </div>

              <div className="border border-[#2d2d2d] bg-[#111111] p-6">
                <h3 className="font-semibold">Quick Access</h3>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <a
                    href="/admin/quotes"
                    className="border border-[#2d2d2d] p-4 text-sm text-[#b8b8b8] transition hover:border-[#d4af37] hover:text-white"
                  >
                    View Quote Requests
                  </a>

                  <a
                    href="/admin/projects"
                    className="border border-[#2d2d2d] p-4 text-sm text-[#b8b8b8] transition hover:border-[#d4af37] hover:text-white"
                  >
                    Manage Projects
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
