"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        setReady(true);
      } else {
        setError("This password reset link is invalid or has expired.");
      }
    }

    checkSession();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error: updateError } =
      await supabase.auth.updateUser({
        password,
      });

    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setMessage("Password updated successfully. Redirecting to login...");

    await supabase.auth.signOut();

    setTimeout(() => {
      router.push("/admin/login");
      router.refresh();
    }, 1200);
  }

  return (
    <main className="min-h-screen bg-[#080808] px-6 py-16 text-white">
      <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">
        <div className="w-full border border-white/10 bg-[#101010] p-8">
          <div className="mb-8">
            <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-[#c9a227]">
              MIGHTY GOD ALUMINIUM TECH
            </p>

            <h1 className="text-3xl font-semibold">
              Set New Password
            </h1>

            <p className="mt-3 text-sm leading-6 text-white/60">
              Create a new password for your admin account.
            </p>
          </div>

          {error && (
            <div className="mb-5 border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-5 border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-300">
              {message}
            </div>
          )}

          {ready && !message && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm text-white/70">
                  New Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength={6}
                  className="w-full border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-[#c9a227]"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">
                  Confirm Password
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  required
                  minLength={6}
                  className="w-full border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-[#c9a227]"
                  placeholder="Confirm new password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#c9a227] px-5 py-3 font-semibold text-black transition hover:bg-[#d8b63c] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
