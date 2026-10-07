"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import { supabase } from "@/lib/supabase";

const categories = [
  "Aluminium Windows",
  "Aluminium Doors",
  "Frameless Glass",
  "Glass Partitions",
  "Other",
];

export default function NewProjectPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function createSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/admin/login");
      return;
    }

    if (!title.trim()) {
      setError("Project title is required.");
      setSaving(false);
      return;
    }

    const slug = createSlug(title);

    const { data: project, error: projectError } = await supabase
      .from("projects")
      .insert({
        title: title.trim(),
        slug,
        category: category || null,
        location: location.trim() || null,
        description: description.trim() || null,
        project_details: projectDetails.trim() || null,
        featured,
        published,
      })
      .select("id")
      .single();

    if (projectError || !project) {
      if (projectError?.code === "23505") {
        setError("A project with this title already exists.");
      } else {
        setError(projectError?.message || "Failed to create project.");
      }

      setSaving(false);
      return;
    }

    if (image) {
      const extension =
        image.name.split(".").pop()?.toLowerCase() || "jpg";

      const filePath = `${project.id}/${crypto.randomUUID()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(filePath, image, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        setError(
          `Project was created, but the image upload failed: ${uploadError.message}`
        );
        setSaving(false);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("project-images")
        .getPublicUrl(filePath);

      const { error: imageError } = await supabase
        .from("project_images")
        .insert({
          project_id: project.id,
          image_url: publicUrl,
          alt_text: title.trim(),
          display_order: 0,
        });

      if (imageError) {
        setError(
          `Project was created, but the image could not be linked: ${imageError.message}`
        );
        setSaving(false);
        return;
      }
    }

    router.push("/admin/projects");
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <AdminSidebar />

      <section className="min-h-screen">
        <div className="border-b border-[#2d2d2d]">
          <div className="mx-auto max-w-5xl px-6 py-10 lg:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
              Content
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Add Project
            </h1>

            <p className="mt-3 text-sm text-[#888888]">
              Create a project and optionally upload its main image.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-6 py-10 lg:px-10">
          <form
            onSubmit={handleSubmit}
            className="border border-[#2d2d2d] bg-[#0d0d0d] p-6 md:p-8"
          >
            {error && (
              <div className="mb-6 border border-red-900/50 bg-red-950/20 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Project Title" required>
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Modern Aluminium Window Installation"
                  className="input"
                />
              </Field>

              <Field label="Category">
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="input"
                >
                  <option value="">Select category</option>

                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Location">
                <input
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="Gauraka, Niger State"
                  className="input"
                />
              </Field>

              <Field label="Project Image">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(event) =>
                    setImage(event.target.files?.[0] ?? null)
                  }
                  className="block w-full text-sm text-[#999999] file:mr-4 file:border-0 file:bg-[#1a1a1a] file:px-4 file:py-2.5 file:text-xs file:font-semibold file-uppercase file:tracking-[0.12em] file:text-white hover:file:bg-[#222222]"
                />

                {image && (
                  <p className="mt-2 text-xs text-[#666666]">
                    Selected: {image.name}
                  </p>
                )}
              </Field>
            </div>

            <div className="mt-6">
              <Field label="Description">
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={5}
                  placeholder="Brief description of the project..."
                  className="input resize-none"
                />
              </Field>
            </div>

            <div className="mt-6">
              <Field label="Project Details">
                <textarea
                  value={projectDetails}
                  onChange={(event) => setProjectDetails(event.target.value)}
                  rows={5}
                  placeholder="Materials, scope of work, installation details..."
                  className="input resize-none"
                />
              </Field>
            </div>

            <div className="mt-6 flex flex-wrap gap-6 border-t border-[#2d2d2d] pt-6">
              <label className="flex items-center gap-3 text-sm text-[#b8b8b8]">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(event) => setFeatured(event.target.checked)}
                  className="h-4 w-4 accent-[#d4af37]"
                />
                Featured project
              </label>

              <label className="flex items-center gap-3 text-sm text-[#b8b8b8]">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(event) => setPublished(event.target.checked)}
                  className="h-4 w-4 accent-[#d4af37]"
                />
                Published
              </label>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 border-t border-[#2d2d2d] pt-6">
              <button
                type="submit"
                disabled={saving}
                className="border border-[#d4af37] bg-[#d4af37] px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-black transition hover:bg-[#e3c45a] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : "Create Project"}
              </button>

              <button
                type="button"
                onClick={() => router.push("/admin/projects")}
                className="border border-[#333333] px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#cccccc] transition hover:border-[#555555]"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>

      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid #333333;
          background: #111111;
          padding: 0.75rem 0.875rem;
          color: white;
          font-size: 0.875rem;
          outline: none;
        }

        .input:focus {
          border-color: #d4af37;
        }

        .input::placeholder {
          color: #555555;
        }
      `}</style>
    </main>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#777777]">
        {label}
        {required && <span className="ml-1 text-[#d4af37]">*</span>}
      </label>

      {children}
    </div>
  );
}
