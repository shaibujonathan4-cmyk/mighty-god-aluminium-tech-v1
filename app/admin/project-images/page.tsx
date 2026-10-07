import { connection } from "next/server";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import ProjectImagesManager from "./ProjectImagesManager";

export const instant = false;

export default async function ProjectImagesPage() {
  await connection();

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: images, error } = await supabase
    .from("project_images")
    .select(
      `
        id,
        project_id,
        image_url,
        alt_text,
        display_order,
        created_at,
        projects (
          title,
          slug
        )
      `
    )
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-[#080808] px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-red-400">{error.message}</p>
        </div>
      </main>
    );
  }

  const projectImages = (images ?? []).map((image) => {
    const project = Array.isArray(image.projects)
      ? image.projects[0]
      : image.projects;

    return {
      id: image.id,
      projectId: image.project_id,
      imageUrl: image.image_url,
      altText: image.alt_text,
      displayOrder: image.display_order,
      createdAt: image.created_at,
      projectTitle: project?.title ?? "Unknown project",
      projectSlug: project?.slug ?? "",
    };
  });

  return <ProjectImagesManager images={projectImages} />;
}
