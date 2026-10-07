"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import { supabase } from "@/lib/supabase";

type Settings = {
  business_name: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  about_text: string;
  logo_url: string;
  facebook_url: string;
  instagram_url: string;
};

const defaultSettings: Settings = {
  business_name: "Mighty God Aluminium Tech",
  phone: "",
  whatsapp: "",
  email: "",
  address: "Gauraka, Niger State",
  about_text: "",
  logo_url: "",
  facebook_url: "",
  instagram_url: "",
};

export default function AdminSettingsPage() {
  const router = useRouter();

  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSettings() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/admin/login");
        return;
      }

      const { data, error } = await supabase
        .from("site_settings")
        .select(
          "business_name, phone, whatsapp, email, address, about_text, logo_url, facebook_url, instagram_url"
        )
        .eq("id", 1)
        .maybeSingle();

      if (error) {
        setError(error.message);
      } else if (data) {
        setSettings({
          business_name: data.business_name ?? "",
          phone: data.phone ?? "",
          whatsapp: data.whatsapp ?? "",
          email: data.email ?? "",
          address: data.address ?? "",
          about_text: data.about_text ?? "",
          logo_url: data.logo_url ?? "",
          facebook_url: data.facebook_url ?? "",
          instagram_url: data.instagram_url ?? "",
        });
      }

      setLoading(false);
    }

    loadSettings();
  }, [router]);

  function updateField(field: keyof Settings, value: string) {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }));
    setMessage("");
    setError("");
  }

  async function uploadLogo(file: File) {
    setUploadingLogo(true);
    setMessage("");
    setError("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/admin/login");
        return;
      }

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/svg+xml",
      ];

      if (!allowedTypes.includes(file.type)) {
        setError("Please upload a JPG, PNG, WebP, or SVG logo.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Logo must be smaller than 5MB.");
        return;
      }

      const extension =
        file.name.split(".").pop()?.toLowerCase() || "png";

      const filePath = `logo-${crypto.randomUUID()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("site-assets")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        setError(uploadError.message);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("site-assets")
        .getPublicUrl(filePath);

      updateField("logo_url", publicUrl);

      setMessage(
        "Logo uploaded. Click Save Settings to apply it to the website."
      );
    } finally {
      setUploadingLogo(false);
    }
  }

  async function saveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    const { error } = await supabase
      .from("site_settings")
      .upsert(
        {
          id: 1,
          ...settings,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "id",
        }
      );

    if (error) {
      setError(error.message);
    } else {
      setMessage("Settings saved successfully.");
    }

    setSaving(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#080808] text-white">
        <AdminSidebar />
        <section className="flex min-h-screen items-center justify-center">
          <p className="text-sm text-[#777777]">Loading settings...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <AdminSidebar />

      <section className="min-h-screen">
        <div className="border-b border-[#2d2d2d]">
          <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
              System
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Settings
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#888888]">
              Manage the business information used across your website.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
          <form onSubmit={saveSettings} className="max-w-3xl space-y-8">
            <section className="border border-[#2d2d2d] bg-[#0d0d0d] p-6 md:p-8">
              <div className="border-b border-[#2d2d2d] pb-5">
                <h2 className="text-lg font-semibold">
                  Business Information
                </h2>

                <p className="mt-1 text-sm text-[#777777]">
                  Basic information about the company.
                </p>
              </div>

              <div className="mt-6 space-y-5">
                <Field
                  label="Business Name"
                  value={settings.business_name}
                  onChange={(value) =>
                    updateField("business_name", value)
                  }
                />

                <Field
                  label="Phone"
                  value={settings.phone}
                  placeholder="e.g. 08012345678"
                  onChange={(value) => updateField("phone", value)}
                />

                <Field
                  label="WhatsApp Number"
                  value={settings.whatsapp}
                  placeholder="e.g. 2348012345678"
                  onChange={(value) => updateField("whatsapp", value)}
                />

                <Field
                  label="Email"
                  type="email"
                  value={settings.email}
                  placeholder="business@example.com"
                  onChange={(value) => updateField("email", value)}
                />

                <Field
                  label="Address"
                  value={settings.address}
                  onChange={(value) => updateField("address", value)}
                />

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-[#999999]">
                    About Text
                  </label>

                  <textarea
                    value={settings.about_text}
                    onChange={(event) =>
                      updateField("about_text", event.target.value)
                    }
                    rows={6}
                    className="w-full resize-y border border-[#333333] bg-[#111111] px-4 py-3 text-sm text-white outline-none transition focus:border-[#d4af37]"
                    placeholder="Short description about the business..."
                  />
                </div>
              </div>
            </section>

            <section className="border border-[#2d2d2d] bg-[#0d0d0d] p-6 md:p-8">
              <div className="border-b border-[#2d2d2d] pb-5">
                <h2 className="text-lg font-semibold">
                  Brand & Social Links
                </h2>

                <p className="mt-1 text-sm text-[#777777]">
                  Manage your website logo and social media links.
                </p>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-[#999999]">
                    Website Logo
                  </label>

                  <div className="border border-dashed border-[#333333] bg-[#111111] p-5">
                    {settings.logo_url ? (
                      <div className="mb-5 flex min-h-28 items-center justify-center border border-[#2d2d2d] bg-[#080808] p-5">
                        <img
                          src={settings.logo_url}
                          alt="Website logo preview"
                          className="max-h-20 w-auto object-contain"
                        />
                      </div>
                    ) : (
                      <div className="mb-5 flex h-28 items-center justify-center border border-[#2d2d2d] bg-[#080808] text-sm text-[#666666]">
                        No logo uploaded
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/svg+xml"
                      disabled={uploadingLogo}
                      onChange={(event) => {
                        const file = event.target.files?.[0];

                        if (file) {
                          uploadLogo(file);
                        }

                        event.currentTarget.value = "";
                      }}
                      className="block w-full text-sm text-[#999999] file:mr-4 file:border file:border-[#d4af37] file:bg-transparent file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.1em] file:text-[#d4af37] hover:file:bg-[#d4af37] hover:file:text-[#080808]"
                    />

                    <p className="mt-3 text-xs leading-5 text-[#666666]">
                      JPG, PNG, WebP, or SVG. Maximum size: 5MB.
                    </p>
                  </div>
                </div>

                <Field
                  label="Logo URL"
                  value={settings.logo_url}
                  placeholder="https://..."
                  onChange={(value) => updateField("logo_url", value)}
                />

                <Field
                  label="Facebook URL"
                  value={settings.facebook_url}
                  placeholder="https://facebook.com/..."
                  onChange={(value) =>
                    updateField("facebook_url", value)
                  }
                />

                <Field
                  label="Instagram URL"
                  value={settings.instagram_url}
                  placeholder="https://instagram.com/..."
                  onChange={(value) =>
                    updateField("instagram_url", value)
                  }
                />
              </div>
            </section>

            {message && (
              <div className="border border-green-900/50 bg-green-950/20 px-4 py-3 text-sm text-green-400">
                {message}
              </div>
            )}

            {error && (
              <div className="border border-red-900/50 bg-red-950/20 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="bg-[#d4af37] px-7 py-3.5 text-sm font-semibold text-[#080808] transition hover:bg-[#f1d36a] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-[#999999]">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full border border-[#333333] bg-[#111111] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#555555] focus:border-[#d4af37]"
      />
    </div>
  );
}
