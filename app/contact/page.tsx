import { connection } from "next/server";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactForm from "@/components/ContactForm";

export const instant = false;

export default async function ContactPage() {
  await connection();

  const { data: settings } = await supabase
    .from("site_settings")
    .select("business_name, phone, whatsapp, email, address")
    .eq("id", 1)
    .maybeSingle();

  const businessName =
    settings?.business_name || "Mighty God Aluminium Tech";

  return (
    <>
      <Header />

      <main className="min-h-screen bg-black text-white">
        <section className="border-b border-white/10 px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#c9a227]">
              Contact
            </p>

            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
              Let&apos;s build something exceptional.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
              Speak with {businessName} about aluminium, glass, fabrication,
              installation or your next custom project.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="border border-white/10 bg-white/[0.02] p-8 md:p-10">
              <p className="text-sm uppercase tracking-[0.25em] text-[#c9a227]">
                Reach us
              </p>

              <div className="mt-8 space-y-7">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40">
                    Location
                  </p>
                  <p className="mt-2 text-white/80">
                    {settings?.address || "Gauraka, Niger State"}
                  </p>
                </div>

                {settings?.phone && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/40">
                      Phone
                    </p>
                    <a
                      href={`tel:${settings.phone}`}
                      className="mt-2 block text-white transition hover:text-[#c9a227]"
                    >
                      {settings.phone}
                    </a>
                  </div>
                )}

                {settings?.whatsapp && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/40">
                      WhatsApp
                    </p>
                    <a
                      href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "").replace(/^0/, "234")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 block text-white transition hover:text-[#c9a227]"
                    >
                      Chat with us
                    </a>
                  </div>
                )}

                {settings?.email && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/40">
                      Email
                    </p>
                    <a
                      href={`mailto:${settings.email}`}
                      className="mt-2 block break-all text-white transition hover:text-[#c9a227]"
                    >
                      {settings.email}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="border border-white/10 bg-white/[0.02] p-8 md:p-10">
              <p className="mb-8 text-sm uppercase tracking-[0.25em] text-[#c9a227]">
                Send an enquiry
              </p>

              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
