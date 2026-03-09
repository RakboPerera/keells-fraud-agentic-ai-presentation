import Link from "next/link";
import EcosystemMap from "@/components/EcosystemMap";
import AgentCard from "@/components/AgentCard";
import { agents } from "@/data/agents";

/* ── Platform functions (center node detail) ──────────────────────────────── */
const PLATFORM_FUNCTIONS = [
  "Ingests operational data streams",
  "Coordinates analytical agents",
  "Correlates signals across domains",
  "Generates investigation insights",
  "Supports operational risk monitoring",
];

export default function EcosystemPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">

      {/* ── PAGE HEADER ────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-1.5 text-xs text-[var(--color-text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">
              Overview
            </Link>
            <svg className="w-3 h-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[var(--color-accent)] font-medium">Ecosystem</span>
          </nav>

          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3">
            Fraud Intelligence Ecosystem
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--color-primary)] leading-tight mb-5 max-w-2xl mx-auto">
            Intelligence Domain Architecture
          </h1>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto leading-relaxed">
            Five specialized analytical agents operate together as part of a unified
            Fraud Intelligence Platform — each monitoring a distinct operational domain
            within the retail value chain.
          </p>
        </div>
      </section>

      {/* ── ECOSYSTEM MAP ─────────────────────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section label */}
          <div className="flex items-center gap-3 mb-10">
            <div className="flex-1 h-px bg-[var(--color-border)]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
              Click any domain node to explore
            </span>
            <div className="flex-1 h-px bg-[var(--color-border)]" />
          </div>

          {/* The interactive map */}
          <div className="bg-white rounded-3xl border border-[var(--color-border)] p-8 shadow-sm">
            <EcosystemMap />
          </div>
        </div>
      </section>

      {/* ── PLATFORM DETAIL ───────────────────────────────────────────────── */}
      <section className="px-6 pb-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[var(--color-primary)] text-white rounded-2xl p-8 md:p-10 grid md:grid-cols-2 gap-10 items-center">
            {/* Text */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">
                Central Platform
              </p>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-4">
                Fraud Intelligence Platform
              </h2>
              <p className="text-white/65 leading-relaxed text-sm">
                The platform represents the analytical core of the system. It
                orchestrates agent activity, correlates signals across operational
                domains and transforms raw data into actionable investigation
                intelligence.
              </p>
            </div>

            {/* Function list */}
            <div className="flex flex-col gap-3">
              {PLATFORM_FUNCTIONS.map((fn) => (
                <div key={fn} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-light)] shrink-0" />
                  <span className="text-sm text-white/75">{fn}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AGENT GRID ────────────────────────────────────────────────────── */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-[var(--color-primary)]">
              Intelligence Domains
            </h2>
            <span className="text-xs text-[var(--color-text-muted)] font-medium">
              Select a domain to explore its agent
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {agents.map((agent, i) => (
              <AgentCard
                key={agent.slug}
                slug={agent.slug}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── USER FLOW GUIDE ───────────────────────────────────────────────── */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-6 text-center">
              Exploration flow
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap">
              {[
                { label: "Landing", href: "/" },
                { label: "Ecosystem", href: "/ecosystem", active: true },
                { label: "Select Domain", href: "/ecosystem" },
                { label: "Agent Deep Dive", href: "#" },
                { label: "Workflow", href: "#" },
              ].map((step, i, arr) => (
                <div key={step.label} className="flex items-center gap-3">
                  <Link
                    href={step.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      step.active
                        ? "bg-[var(--color-accent)] text-white"
                        : "bg-[var(--color-bg)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
                    }`}
                  >
                    {step.label}
                  </Link>
                  {i < arr.length - 1 && (
                    <svg className="w-3.5 h-3.5 text-[var(--color-border)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
