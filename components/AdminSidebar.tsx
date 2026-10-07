"use client";

import { supabase } from "@/lib/supabase";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menu = [
  {
    section: "Overview",
    items: [{ label: "Dashboard", href: "/admin" }],
  },
  {
    section: "Content",
    items: [
      { label: "Projects", href: "/admin/projects" },
      { label: "Project Images", href: "/admin/project-images" },
      { label: "Categories", href: "/admin/categories" },
    ],
  },
  {
    section: "Leads",
    items: [{ label: "Quote Requests", href: "/admin/quotes" }],
  },
  {
    section: "System",
    items: [{ label: "Settings", href: "/admin/settings" }],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open admin menu"
        className={`fixed left-5 top-5 z-50 flex h-11 w-11 items-center justify-center border border-[#333333] bg-[#0d0d0d] text-white shadow-lg transition-all duration-300 hover:border-[#d4af37] hover:text-[#d4af37] ${
          open ? "scale-90 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <span className="flex flex-col gap-1.5">
          <span className="block h-px w-5 bg-current" />
          <span className="block h-px w-5 bg-current" />
          <span className="block h-px w-3.5 bg-current" />
        </span>
      </button>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-[3px] transition-all duration-500 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-[#2d2d2d] bg-[#0d0d0d] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-[#d4af37] via-[#333333] to-transparent opacity-60" />

        <div className="flex h-full flex-col overflow-y-auto p-5">
          <div
            className={`flex items-start justify-between border-b border-[#2d2d2d] pb-5 transition-all duration-500 ${
              open
                ? "translate-y-0 opacity-100"
                : "-translate-y-3 opacity-0"
            }`}
          >
            <Link href="/admin" onClick={() => setOpen(false)}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
                Admin Panel
              </p>

              <p className="mt-2 text-sm font-semibold text-white">
                Mighty God Aluminium Tech
              </p>
            </Link>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close admin menu"
              className="flex h-8 w-8 items-center justify-center border border-[#333333] text-[#888888] transition-all duration-200 hover:rotate-90 hover:border-[#d4af37] hover:text-white"
            >
              <span className="text-lg leading-none">×</span>
            </button>
          </div>

          <nav className="mt-6 flex-1 space-y-6">
            {menu.map((group, groupIndex) => (
              <div
                key={group.section}
                className={`transition-all duration-500 ${
                  open
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-5 opacity-0"
                }`}
                style={{
                  transitionDelay: open
                    ? `${120 + groupIndex * 100}ms`
                    : "0ms",
                }}
              >
                <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#666666]">
                  {group.section}
                </p>

                <div className="space-y-1">
                  {group.items.map((item, itemIndex) => {
                    const active =
                      item.href === "/admin"
                        ? pathname === "/admin"
                        : pathname.startsWith(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`group relative block overflow-hidden border px-3 py-2.5 text-sm transition-all duration-300 ${
                          active
                            ? "border-[#d4af37]/50 bg-[#d4af37]/10 text-[#f1d36a] shadow-[inset_3px_0_0_#d4af37,0_0_18px_rgba(212,175,55,0.10)]"
                            : "border-transparent text-[#999999] hover:translate-x-1 hover:border-[#d4af37]/30 hover:bg-[#151515] hover:text-white hover:shadow-[0_0_18px_rgba(212,175,55,0.08)]"
                        }`}

                        style={{
                          transitionDelay: open
                            ? `${180 + groupIndex * 100 + itemIndex * 45}ms`
                            : "0ms",
                        }}
                      >
                        <span className="absolute inset-y-0 -left-20 w-12 skew-x-[-20deg] bg-gradient-to-r from-transparent via-[#d4af37]/25 to-transparent opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />

                        <span className="relative z-10">
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div
            className={`border-t border-[#2d2d2d] pt-5 transition-all duration-500 ${
              open
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0"
            }`}
            style={{
              transitionDelay: open ? "520ms" : "0ms",
            }}
          >
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 text-sm text-[#888888] transition hover:translate-x-1 hover:text-white"
            >
              View Website
            </Link>

            <Link
              href="/admin/login"
              onClick={() => setOpen(false)}
              className="mt-1 block px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-950/20"
            >
              Logout
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
