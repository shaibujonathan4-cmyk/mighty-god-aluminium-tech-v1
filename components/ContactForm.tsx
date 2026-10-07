"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const fullName = String(data.get("full_name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const project = String(data.get("project") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!fullName || !phone || !message) {
      setError("Please complete your name, phone number and message.");
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase
      .from("quote_requests")
      .insert({
        full_name: fullName,
        phone,
        service: null,
        project: project || null,
        project_details: message,
      });

    if (insertError) {
      setError("We could not send your message. Please try again.");
      setLoading(false);
      return;
    }

    form.reset();
    setSuccess("Message sent successfully. We will get back to you shortly.");
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm text-white/70">Full Name</label>
        <input
          name="full_name"
          required
          className="w-full border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-[#c9a227]"
          placeholder="Your full name"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">Phone Number</label>
        <input
          name="phone"
          required
          type="tel"
          className="w-full border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-[#c9a227]"
          placeholder="080..."
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">Project / Service</label>
        <input
          name="project"
          className="w-full border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-[#c9a227]"
          placeholder="e.g. Aluminium windows"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">Message</label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full resize-none border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-[#c9a227]"
          placeholder="Tell us what you need..."
        />
      </div>

      {error && (
        <p className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      {success && (
        <p className="border border-[#c9a227]/30 bg-[#c9a227]/10 px-4 py-3 text-sm text-[#e4c75a]">
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full border border-[#c9a227] bg-[#c9a227] px-6 py-3 font-medium text-black transition hover:bg-transparent hover:text-[#c9a227] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
