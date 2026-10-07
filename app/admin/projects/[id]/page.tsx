import { connection } from "next/server";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import EditProjectForm from "./EditProjectForm";

export const instant = false;

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();

  const { id } = await params;

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: project, error } = await supabase
    .from("projects")
    .select(
      "id, title, category, location, description, project_details, featured, published"
    )
    .eq("id", id)
    .single();

  if (error || !project) {
    redirect("/admin/projects");
  }

  return <EditProjectForm project={project} />;
}
