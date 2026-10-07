"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    async function loadLogo() {
      const { data } = await supabase
        .from("site_settings")
        .select("logo_url")
        .eq("id", 1)
        .maybeSingle();

      if (data?.logo_url) {
        setLogoUrl(data.logo_url);
      }
    }

    loadLogo();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[#2d2d2d] bg-[#080808]/95 backdrop-blur">
      <div className="container flex h-20 items-center justify-between">
        <a href="/" className="shrink-0">
          <img
            src={logoUrl || "/logo.svg"}
            alt="Mighty God Aluminium Tech"
            className="hidden h-11 w-auto md:block"
          />

          <img
            src={logoUrl || "/logo-mark.svg"}
            alt="Mighty God Aluminium Tech"
            className="block h-10 w-auto md:hidden"
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-[#b8b8b8] transition hover:text-white"
            >
              {item.label}
            </a>
          ))}

          <a
            href="/quote"
            className="border border-[#d4af37] px-5 py-2.5 text-sm font-semibold text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#080808]"
          >
            Request a Quote
          </a>
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center border border-[#2d2d2d] text-[#b8b8b8] transition hover:border-[#d4af37] hover:text-[#d4af37] md:hidden"
        >
          <span className="text-xl leading-none">
            {menuOpen ? "×" : "☰"}
          </span>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-[#2d2d2d] bg-[#080808] md:hidden">
          <nav className="container flex flex-col py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-[#2d2d2d] py-4 text-sm text-[#b8b8b8] transition hover:text-white"
              >
                {item.label}
              </a>
            ))}

            <a
              href="/quote"
              onClick={() => setMenuOpen(false)}
              className="mt-4 bg-[#d4af37] px-5 py-3.5 text-center text-sm font-semibold text-[#080808] transition hover:bg-[#f1d36a]"
            >
              Request a Quote
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
