import { connection } from "next/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const instant = false;

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await connection();

  const { slug } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: project, error } = await supabase
    .from("projects")
    .select(
      `
        id,
        title,
        slug,
        category,
        location,
        description,
        project_details,
        project_images (
          image_url,
          alt_text,
          display_order
        )
      `
    )
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !project) {
    notFound();
  }

  const images = [...(project.project_images ?? [])].sort(
    (a, b) => a.display_order - b.display_order
  );

  const mainImage = images[0]?.image_url ?? null;

  return (
    <>
      <Header />

      <main className="bg-[#080808] text-white">
        <section className="border-b border-[#2d2d2d]">
          <div className="container py-10 md:py-14">
            <a
              href="/projects"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[#707070] transition hover:text-[#d4af37]"
            >
              ← Back to Projects
            </a>
          </div>
        </section>

        <section>
          <div className="container py-10 md:py-16">
            <div className="overflow-hidden border border-[#2d2d2d]">
              <div className="relative aspect-[16/9] max-h-[650px] overflow-hidden bg-[#111111]">
                {mainImage ? (
                  <img
                    src={mainImage}
                    alt={images[0]?.alt_text || project.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
                        Mighty God Aluminium Tech
                      </p>
                      <p className="mt-2 text-xs text-[#707070]">
                        Project image coming soon
                      </p>
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
              </div>

              {images.length > 1 && (
                <div className="grid grid-cols-2 gap-px bg-[#2d2d2d] md:grid-cols-4">
                  {images.slice(1).map((image) => (
                    <div
                      key={image.image_url}
                      className="aspect-[4/3] overflow-hidden bg-[#111111]"
                    >
                      <img
                        src={image.image_url}
                        alt={image.alt_text || project.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-[#111111] p-6 md:p-10">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-3xl">
                    {project.category && (
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
                        {project.category}
                      </p>
                    )}

                    <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                      {project.title}
                    </h1>

                    {project.description && (
                      <p className="mt-5 max-w-2xl text-sm leading-7 text-[#b8b8b8]">
                        {project.description}
                      </p>
                    )}

                    {project.project_details && (
                      <div className="mt-8 border-t border-[#2d2d2d] pt-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
                          Project Details
                        </p>
                        <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#b8b8b8]">
                          {project.project_details}
                        </p>
                      </div>
                    )}

                    {project.location && (
                      <p className="mt-5 text-xs uppercase tracking-[0.15em] text-[#707070]">
                        {project.location}
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
                    <a
                      href={`/quote?service=${encodeURIComponent(
                        project.category || ""
                      )}&project=${encodeURIComponent(project.title)}`}
                      className="inline-flex items-center justify-center bg-[#d4af37] px-6 py-3.5 text-sm font-semibold text-[#080808] transition hover:bg-[#f1d36a]"
                    >
                      Request a Similar Project
                    </a>

                    <a
                      href="https://wa.me/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center border border-[#707070] px-6 py-3.5 text-sm font-semibold text-white transition hover:border-[#d4af37] hover:text-[#d4af37]"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
