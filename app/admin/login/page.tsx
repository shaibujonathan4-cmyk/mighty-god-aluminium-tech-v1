"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    const { error: loginError } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

    setLoading(false);

    if (loginError) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  async function handleForgotPassword() {
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Enter your admin email address first.");
      return;
    }

    setResetLoading(true);

    const { error: resetError } =
      await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo:
          "http://localhost:3000/admin/reset-password",
      });

    setResetLoading(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setMessage(
      "Password reset email sent. Check your inbox and open the new link."
    );
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
              Admin Login
            </h1>

            <p className="mt-3 text-sm leading-6 text-white/60">
              Sign in to access the administration dashboard.
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

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-white/70">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-[#c9a227]"
                placeholder="Admin email"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/70">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-[#c9a227]"
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#c9a227] px-5 py-3 font-semibold text-black transition hover:bg-[#d8b63c] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={resetLoading}
              className="text-sm text-white/60 transition hover:text-[#c9a227] disabled:opacity-50"
            >
              {resetLoading
                ? "Sending reset email..."
                : "Forgot your password?"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
