"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type ProjectImage = {
  id: string;
  projectId: string;
  imageUrl: string;
  altText: string | null;
  displayOrder: number;
  createdAt: string;
  projectTitle: string;
  projectSlug: string;
};

export default function ProjectImagesManager({
  images: initialImages,
}: {
  images: ProjectImage[];
}) {
  const [images, setImages] = useState(initialImages);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function deleteImage(image: ProjectImage) {
    const confirmed = window.confirm(
      `Delete this image from "${image.projectTitle}"?`
    );

    if (!confirmed) return;

    setDeletingId(image.id);
    setMessage("");

    const { storageError } = await deleteStorageFile(image.imageUrl);

    if (storageError) {
      setMessage(storageError);
      setDeletingId(null);
      return;
    }

    const { error } = await supabase
      .from("project_images")
      .delete()
      .eq("id", image.id);

    if (error) {
      setMessage(error.message);
      setDeletingId(null);
      return;
    }

    setImages((current) =>
      current.filter((item) => item.id !== image.id)
    );

    setMessage("Image deleted successfully.");
    setDeletingId(null);
  }

  return (
    <main className="min-h-screen bg-[#080808] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
              Media
            </p>

            <h1 className="mt-2 text-3xl font-semibold">
              Project Images
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#888888]">
              View and manage every project image uploaded to the website.
            </p>
          </div>

          <Link
            href="/admin/projects"
            className="w-fit border border-[#333333] px-4 py-2.5 text-sm text-[#b8b8b8] transition hover:border-[#d4af37] hover:text-white"
          >
            ← Back to Projects
          </Link>
        </div>

        {message && (
          <div className="mb-6 border border-[#333333] bg-[#111111] px-4 py-3 text-sm text-[#b8b8b8]">
            {message}
          </div>
        )}

        <div className="mb-6 flex items-center justify-between border-b border-[#2d2d2d] pb-5">
          <p className="text-sm text-[#888888]">
            {images.length} {images.length === 1 ? "image" : "images"} uploaded
          </p>
        </div>

        {images.length === 0 ? (
          <div className="border border-[#2d2d2d] bg-[#111111] px-6 py-20 text-center">
            <p className="text-sm text-[#888888]">
              No project images have been uploaded yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image) => (
              <article
                key={image.id}
                className="overflow-hidden border border-[#2d2d2d] bg-[#111111]"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#151515]">
                  <img
                    src={image.imageUrl}
                    alt={image.altText || image.projectTitle}
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                <div className="space-y-4 p-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-[#d4af37]">
                      Project
                    </p>

                    <h2 className="mt-1 text-base font-semibold text-white">
                      {image.projectTitle}
                    </h2>
                  </div>

                  <div className="space-y-2 text-xs text-[#777777]">
                    <p>
                      <span className="text-[#999999]">Image ID:</span>{" "}
                      {image.id}
                    </p>

                    <p>
                      <span className="text-[#999999]">Uploaded:</span>{" "}
                      {new Date(image.createdAt).toLocaleString()}
                    </p>

                    <p className="break-all">
                      <span className="text-[#999999]">URL:</span>{" "}
                      {image.imageUrl}
                    </p>
                  </div>

                  <div className="flex gap-3 border-t border-[#2d2d2d] pt-4">
                    <a
                      href={image.imageUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="border border-[#333333] px-4 py-2 text-xs font-semibold text-[#b8b8b8] transition hover:border-[#d4af37] hover:text-white"
                    >
                      Open Image
                    </a>

                    <button
                      type="button"
                      onClick={() => deleteImage(image)}
                      disabled={deletingId === image.id}
                      className="border border-red-900 px-4 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-950/30 disabled:opacity-40"
                    >
                      {deletingId === image.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

async function deleteStorageFile(imageUrl: string) {
  try {
    const url = new URL(imageUrl);
    const marker = "/storage/v1/object/public/project-images/";

    const index = url.pathname.indexOf(marker);

    if (index === -1) {
      return { storageError: null };
    }

    const filePath = decodeURIComponent(
      url.pathname.slice(index + marker.length)
    );

    const { error } = await supabase.storage
      .from("project-images")
      .remove([filePath]);

    return {
      storageError: error?.message ?? null,
    };
  } catch {
    return {
      storageError: "Could not determine the Storage file path.",
    };
  }
}
