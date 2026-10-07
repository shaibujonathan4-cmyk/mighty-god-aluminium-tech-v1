import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function WhatsAppButton() {
  const supabase = await createSupabaseServerClient();

  const { data: settings } = await supabase
    .from("site_settings")
    .select("business_name, whatsapp, phone")
    .eq("id", 1)
    .maybeSingle();

  const rawNumber = settings?.whatsapp || settings?.phone;

  let whatsappNumber = (settings?.whatsapp || settings?.phone || "").replace(/\D/g, "");

    if (whatsappNumber.startsWith("0")) {
      whatsappNumber = "234" + whatsappNumber.slice(1);
    } else if (whatsappNumber.startsWith("+")) {
      whatsappNumber = whatsappNumber.replace(/^\+/, "");
    }

  if (!whatsappNumber) {
    return null;
  }

  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noreferrer"
      aria-label={`Chat with ${
        settings?.business_name || "Mighty God Aluminium Tech"
      } on WhatsApp`}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-[#d4af37] bg-[#111111] text-[#d4af37] shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-[#d4af37] hover:text-[#080808] sm:bottom-7 sm:right-7"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.55 0 .24 5.31.24 11.84c0 2.09.55 4.13 1.6 5.93L.15 24l6.38-1.67a11.83 11.83 0 0 0 5.55 1.39h.01c6.53 0 11.84-5.31 11.84-11.84 0-3.17-1.23-6.15-3.41-8.4ZM12.09 21.7h-.01a9.85 9.85 0 0 1-5.02-1.37l-.36-.21-3.79.99 1.01-3.69-.23-.38a9.86 9.86 0 0 1-1.51-5.2C2.18 6.39 6.61 1.96 12.08 1.96a9.79 9.79 0 0 1 6.98 2.9 9.82 9.82 0 0 1 2.89 6.99c0 5.47-4.43 9.9-9.86 9.9Zm5.42-7.42c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.69.15-.2.3-.79.98-.97 1.18-.18.2-.36.23-.66.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.51-1.78-1.69-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.36.45-.54.15-.18.2-.3.3-.51.1-.2.05-.38-.03-.53-.08-.15-.69-1.65-.94-2.26-.25-.59-.5-.51-.69-.52h-.59c-.2 0-.53.08-.81.38-.28.3-1.06 1.03-1.06 2.51 0 1.48 1.08 2.91 1.23 3.11.15.2 2.12 3.24 5.14 4.55.72.31 1.28.5 1.72.64.72.23 1.37.2 1.88.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.59-.35Z" />
      </svg>
    </a>
  );
}
