import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function Footer() {
  const supabase = await createSupabaseServerClient();

  const { data: settings } = await supabase
    .from("site_settings")
    .select(
      "business_name, phone, whatsapp, email, address, about_text, logo_url, facebook_url, instagram_url"
    )
    .eq("id", 1)
    .maybeSingle();

  const businessName =
    settings?.business_name || "Mighty God Aluminium Tech";

  const address =
    settings?.address || "Gauraka, Niger State, Nigeria";

  const description =
    settings?.about_text ||
    "Professional aluminium and glass fabrication, installation, and custom solutions for residential and commercial projects.";

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#2d2d2d] bg-[#080808]">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <img
              src={settings?.logo_url || "/logo.svg"}
              alt={businessName}
              className="h-12 w-auto"
            />

            <p className="mt-6 max-w-md text-sm leading-7 text-[#b8b8b8]">
              {description}
            </p>

            <div className="mt-6 space-y-2 text-sm text-[#707070]">
              <p>{address}</p>

              {settings?.phone && (
                <p>{settings.phone}</p>
              )}

              {settings?.email && (
                <p>{settings.email}</p>
              )}

              <p>Precision • Quality • Craftsmanship</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
              Quick Links
            </h3>

            <nav className="mt-5 flex flex-col gap-3 text-sm text-[#b8b8b8]">
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
              <Link href="/services" className="transition hover:text-white">
                Services
              </Link>
              <Link href="/projects" className="transition hover:text-white">
                Projects
              </Link>
              <Link href="/about" className="transition hover:text-white">
                About
              </Link>
              <Link href="/contact" className="transition hover:text-white">
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
              Services
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-[#b8b8b8]">
              <p>Aluminium Windows</p>
              <p>Aluminium Doors</p>
              <p>Frameless Glass</p>
              <p>Glass Doors</p>
              <p>Glass Partitions</p>
              <p>Custom Fabrication</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[#2d2d2d] pt-6 text-xs text-[#707070] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {businessName}. All rights reserved.
          </p>

          <p>Built for quality. Designed to last.</p>
        </div>
      </div>
    </footer>
  );
}
