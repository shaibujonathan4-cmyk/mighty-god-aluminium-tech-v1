"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

const services = [
  "Aluminium Windows",
  "Aluminium Doors",
  "Frameless Glass",
  "Glass Doors",
  "Glass Partitions",
  "Custom Fabrication",
];

function QuoteForm() {
  const searchParams = useSearchParams();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [project, setProject] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    const projectParam = searchParams.get("project");

    if (serviceParam && services.includes(serviceParam)) {
      setService(serviceParam);
    }

    if (projectParam) {
      setProject(projectParam);
    }
  }, [searchParams]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitting(true);
    setSuccess(false);
    setError("");

    const { error: submitError } = await supabase
      .from("quote_requests")
      .insert({
        full_name: fullName.trim(),
        phone: phone.trim(),
        service: service || null,
        project: project || null,
        project_details: projectDetails.trim() || null,
      });

    setSubmitting(false);

    if (submitError) {
      console.error(submitError);
      setError("We couldn't send your request. Please try again.");
      return;
    }

    setSuccess(true);
    setFullName("");
    setPhone("");
    setService("");
    setProjectDetails("");
  }

  return (
    <>
      <main className="min-h-screen bg-[#080808] text-white">
        <section className="border-b border-[#2d2d2d]">
          <div className="container py-20 md:py-28">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
              Request a Quote
            </p>

            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
              Tell us about your project.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#b8b8b8]">
              Share a few details about what you need and we&apos;ll get back
              to you to discuss the project.
            </p>
          </div>
        </section>

        <section className="container py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            {project && (
              <div className="mb-8 border border-[#2d2d2d] bg-[#111111] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
                  Enquiring about
                </p>
                <p className="mt-2 text-lg font-medium text-white">
                  {project}
                </p>
              </div>
            )}

            {success && (
              <div className="mb-8 border border-[#d4af37] bg-[#111111] p-5">
                <p className="font-semibold text-[#d4af37]">
                  Request sent successfully.
                </p>
                <p className="mt-2 text-sm text-[#b8b8b8]">
                  Thank you. Mighty God Aluminium Tech will contact you soon.
                </p>
              </div>
            )}

            {error && (
              <div className="mb-8 border border-red-900 bg-[#111111] p-5">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Full Name *
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Your full name"
                  className="w-full border border-[#2d2d2d] bg-[#111111] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-[#707070] focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Your phone number"
                  className="w-full border border-[#2d2d2d] bg-[#111111] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-[#707070] focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Service
                </label>
                <select
                  id="service"
                  value={service}
                  onChange={(event) => setService(event.target.value)}
                  className="w-full border border-[#2d2d2d] bg-[#111111] px-4 py-3.5 text-sm text-white outline-none transition focus:border-[#d4af37]"
                >
                  <option value="">Select a service</option>
                  {services.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="projectDetails"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Project Details
                </label>
                <textarea
                  id="projectDetails"
                  rows={6}
                  value={projectDetails}
                  onChange={(event) => setProjectDetails(event.target.value)}
                  placeholder={
                    project
                      ? `Tell us more about your ${project} project...`
                      : "Tell us what you need, approximate size, location, or any other useful details."
                  }
                  className="w-full resize-none border border-[#2d2d2d] bg-[#111111] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-[#707070] focus:border-[#d4af37]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#d4af37] px-6 py-4 text-sm font-semibold text-[#080808] transition hover:bg-[#f1d36a] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {submitting ? "Sending..." : "Send Request"}
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}


export default function QuotePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#080808] text-white">
          <section className="container py-24">
            <p className="text-sm text-[#b8b8b8]">Loading quote form...</p>
          </section>
        </main>
      }
    >
      <QuoteForm />
    </Suspense>
  );
}
