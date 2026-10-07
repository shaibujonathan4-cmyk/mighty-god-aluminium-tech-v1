"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import { supabase } from "@/lib/supabase";

type QuoteRequest = {
  id: string;
  full_name: string;
  phone: string;
  service: string | null;
  project: string | null;
  project_details: string | null;
  status: string;
  created_at: string;
};

const statuses = ["new", "contacted", "in_progress", "completed", "cancelled"];

export default function AdminQuotesPage() {
  const router = useRouter();

  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadQuotes();
  }, []);

  async function loadQuotes() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/admin/login");
      return;
    }

    const { data, error } = await supabase
      .from("quote_requests")
      .select(
        "id, full_name, phone, service, project, project_details, status, created_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setQuotes(data ?? []);
    }

    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase
      .from("quote_requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      setError(error.message);
      return;
    }

    setQuotes((current) =>
      current.map((quote) =>
        quote.id === id ? { ...quote, status } : quote
      )
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#080808] text-white">
        <AdminSidebar />
        <section className="flex min-h-screen items-center justify-center">
          <p className="text-sm text-[#777777]">Loading quote requests...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <AdminSidebar />

      <section className="min-h-screen">
        <div className="border-b border-[#2d2d2d]">
          <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
              Leads
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Quote Requests
            </h1>

            <p className="mt-3 text-sm text-[#888888]">
              Manage enquiries submitted through the website.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          {error && (
            <div className="mb-6 border border-red-900/50 bg-red-950/20 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {quotes.length === 0 ? (
            <div className="border border-[#2d2d2d] bg-[#0d0d0d] px-6 py-16 text-center">
              <p className="text-sm text-[#777777]">
                No quote requests yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {quotes.map((quote) => (
                <article
                  key={quote.id}
                  className="border border-[#2d2d2d] bg-[#0d0d0d] p-6 transition hover:border-[#444444] md:p-7"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-lg font-semibold">
                          {quote.full_name}
                        </h2>

                        <span
                          className={`border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                            quote.status === "new"
                              ? "border-[#d4af37]/40 bg-[#d4af37]/10 text-[#f1d36a]"
                              : quote.status === "completed"
                              ? "border-green-900/50 bg-green-950/20 text-green-400"
                              : quote.status === "cancelled"
                              ? "border-red-900/50 bg-red-950/20 text-red-400"
                              : "border-[#444444] text-[#999999]"
                          }`}
                        >
                          {quote.status.replace("_", " ")}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-[#888888]">
                        {quote.phone}
                      </p>

                      <p className="mt-1 text-xs text-[#555555]">
                        {new Date(quote.created_at).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <label className="text-xs uppercase tracking-[0.15em] text-[#666666]">
                        Status
                      </label>

                      <select
                        value={quote.status}
                        onChange={(event) =>
                          updateStatus(quote.id, event.target.value)
                        }
                        className="border border-[#333333] bg-[#111111] px-3 py-2 text-sm text-white outline-none focus:border-[#d4af37]"
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status.replace("_", " ")}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-5 border-t border-[#2d2d2d] pt-6 md:grid-cols-2">
                    <Info
                      label="Service"
                      value={quote.service || "Not specified"}
                    />

                    <Info
                      label="Project"
                      value={quote.project || "Not specified"}
                    />
                  </div>

                  {quote.project_details && (
                    <div className="mt-5 border-t border-[#2d2d2d] pt-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#666666]">
                        Project Details
                      </p>

                      <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[#b8b8b8]">
                        {quote.project_details}
                      </p>
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap gap-3 border-t border-[#2d2d2d] pt-5">
                    <a
                      href={`tel:${quote.phone}`}
                      className="border border-[#333333] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#cccccc] transition hover:border-[#d4af37] hover:text-[#d4af37]"
                    >
                      Call Customer
                    </a>

                    <a
                      href={`https://wa.me/${quote.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="border border-[#333333] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#cccccc] transition hover:border-[#d4af37] hover:text-[#d4af37]"
                    >
                      WhatsApp
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#666666]">
        {label}
      </p>

      <p className="mt-2 text-sm text-[#b8b8b8]">{value}</p>
    </div>
  );
}
