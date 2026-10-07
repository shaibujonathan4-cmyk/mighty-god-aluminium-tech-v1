import { connection } from "next/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProjectsGrid from "@/components/ProjectsGrid";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const instant = false;

export default async function ProjectsPage() {
  await connection();
  const supabase = await createSupabaseServerClient();

  const { data: projects } = await supabase
    .from("projects")
    .select(
      `
        id,
        title,
        slug,
        category,
        location,
        project_images (
          image_url,
          display_order
        )
      `
    )
    .eq("published", true)
    .order("display_order", { ascending: true });

  const projectList = (projects ?? []).map((project) => {
    const images = [...(project.project_images ?? [])].sort(
      (a, b) => a.display_order - b.display_order
    );

    return {
      id: project.id,
      title: project.title,
      slug: project.slug,
      category: project.category,
      location: project.location,
      image: images[0]?.image_url ?? null,
    };
  });

  return (
    <>
      <Header />

      <main className="bg-[#080808] text-white">
        <section className="border-b border-[#2d2d2d]">
          <div className="container py-20 md:py-28">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
              Our Projects
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Selected work.
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#b8b8b8]">
              Explore examples of aluminium and glass fabrication, installation,
              and custom work.
            </p>
          </div>
        </section>

        <section>
          <div className="container py-16 md:py-20">
            <ProjectsGrid projects={projectList} />
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
