"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const categories = [
  "Aluminium Windows",
  "Aluminium Doors",
  "Frameless Glass",
  "Glass Partitions",
  "Other",
];

type Project = {
  id: string;
  title: string;
  category: string | null;
  location: string | null;
  description: string | null;
  project_details: string | null;
  featured: boolean;
  published: boolean;
};

export default function EditProjectForm({
  project,
}: {
  project: Project;
}) {
  const router = useRouter();

  const [title, setTitle] = useState(project.title);
  const [category, setCategory] = useState(project.category ?? "");
  const [location, setLocation] = useState(project.location ?? "");
  const [description, setDescription] = useState(project.description ?? "");
  const [projectDetails, setProjectDetails] = useState(
    project.project_details ?? ""
  );
  const [featured, setFeatured] = useState(project.featured);
  const [published, setPublished] = useState(project.published);
  const [saving, setSaving] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadImage() {
      const { data } = await supabase
        .from("project_images")
        .select("image_url")
        .eq("project_id", project.id)
        .order("display_order", { ascending: true })
        .limit(1)
        .maybeSingle();

      setCurrentImage(data?.image_url ?? null);
    }

    loadImage();
  }, [project.id]);

  async function uploadImage() {
    if (!image) return;

    setUploadingImage(true);
    setMessage("");

    const extension = image.name.split(".").pop()?.toLowerCase() || "jpg";
    const filePath = `${project.id}/${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("project-images")
      .upload(filePath, image, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      setMessage(uploadError.message);
      setUploadingImage(false);
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
      setMessage(imageError.message);
      setUploadingImage(false);
      return;
    }

    setCurrentImage(publicUrl);
    setImage(null);
    setMessage("Image uploaded successfully.");
    setUploadingImage(false);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("projects")
      .update({
        title: title.trim(),
        category: category || null,
        location: location.trim() || null,
        description: description.trim() || null,
        project_details: projectDetails.trim() || null,
        featured,
        published,
        updated_at: new Date().toISOString(),
      })
      .eq("id", project.id);

    if (error) {
      setMessage(error.message);
      setSaving(false);
      return;
    }

    router.push("/admin/projects");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#080808] px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
              Projects
            </p>

            <h1 className="mt-2 text-3xl font-semibold">
              Edit Project
            </h1>
          </div>

          <Link
            href="/admin/projects"
            className="border border-[#333333] px-4 py-2 text-sm text-[#b8b8b8] transition hover:border-[#d4af37] hover:text-white"
          >
            ← Back
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 border border-[#2d2d2d] bg-[#111111] p-6 md:p-8"
        >
          {message && (
            <div className="border border-red-900 bg-red-950/30 px-4 py-3 text-sm text-red-300">
              {message}
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Project Title
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-[#333333] bg-[#080808] px-4 py-3 text-white outline-none focus:border-[#d4af37]"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-[#333333] bg-[#080808] px-4 py-3 text-white outline-none focus:border-[#d4af37]"
              >
                <option value="">Select category</option>

                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Location
              </label>

              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Abuja"
                className="w-full border border-[#333333] bg-[#080808] px-4 py-3 text-white outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          <div className="border-t border-[#2d2d2d] pt-6">
            <label className="mb-2 block text-sm font-medium">
              Project Image
            </label>

            {currentImage && (
              <div className="mb-4 overflow-hidden border border-[#333333] bg-[#080808]">
                <img
                  src={currentImage}
                  alt={title}
                  className="aspect-video w-full object-cover"
                />
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                className="block w-full border border-[#333333] bg-[#080808] px-4 py-3 text-sm text-[#b8b8b8] file:mr-4 file:border-0 file:bg-[#222222] file:px-4 file:py-2 file:text-sm file:text-white"
              />

              <button
                type="button"
                onClick={uploadImage}
                disabled={!image || uploadingImage}
                className="shrink-0 border border-[#d4af37] px-5 py-3 text-sm font-semibold text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#080808] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {uploadingImage ? "Uploading..." : "Upload Image"}
              </button>
            </div>

            <p className="mt-2 text-xs text-[#666666]">
              JPG, PNG or WebP. Uploading a new image adds it to this project.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Short Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full resize-none border border-[#333333] bg-[#080808] px-4 py-3 text-white outline-none focus:border-[#d4af37]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Project Details
            </label>

            <textarea
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
              rows={6}
              className="w-full resize-none border border-[#333333] bg-[#080808] px-4 py-3 text-white outline-none focus:border-[#d4af37]"
            />
          </div>

          <div className="flex flex-col gap-4 border-t border-[#2d2d2d] pt-6 sm:flex-row sm:gap-8">
            <label className="flex items-center gap-3 text-sm text-[#b8b8b8]">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-4 w-4 accent-[#d4af37]"
              />

              Featured project
            </label>

            <label className="flex items-center gap-3 text-sm text-[#b8b8b8]">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="h-4 w-4 accent-[#d4af37]"
              />

              Published
            </label>
          </div>

          <div className="flex justify-end border-t border-[#2d2d2d] pt-6">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#d4af37] px-6 py-3 text-sm font-semibold text-[#080808] transition hover:bg-[#f1d36a] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
