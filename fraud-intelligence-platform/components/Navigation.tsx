"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { agents } from "@/data/agents";

const NAV_LINKS = [
  { href: "/", label: "Overview" },
  { href: "/ecosystem", label: "Ecosystem" },
];

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-white/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-6">

        {/* ── Brand ───────────────────────────────────────────────────────── */}
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Fraud Intelligence Platform home">
          <div className="w-7 h-7 rounded-md bg-[var(--color-primary)] flex items-center justify-center">
            <span className="text-white text-xs font-bold">K</span>
          </div>
          <span className="font-semibold text-[var(--color-primary)] text-sm hidden sm:block">
            Fraud Intelligence
          </span>
        </Link>

        {/* ── Nav ─────────────────────────────────────────────────────────── */}
        <nav className="flex items-center gap-1 text-sm" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-[var(--color-accent)] text-white"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg)]"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Agents dropdown — built from agents data */}
          <div className="relative group">
            <button className="px-3 py-1.5 rounded-md font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg)] flex items-center gap-1">
              Agents
              <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className="absolute top-full right-0 mt-1 w-60 bg-white border border-[var(--color-border)] rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="p-2 flex flex-col gap-0.5">
                {agents.map((agent) => {
                  const href = `/agent/${agent.slug}`;
                  const active = isActive(href);
                  return (
                    <Link
                      key={agent.slug}
                      href={href}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                        active
                          ? "bg-[var(--color-accent)] text-white"
                          : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg)] hover:text-[var(--color-primary)]"
                      }`}
                    >
                      {/* Domain color dot */}
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: active ? "white" : agent.color }}
                      />
                      {agent.shortTitle}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
