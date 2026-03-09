import Link from "next/link";
import AgentCard from "@/components/AgentCard";
import { agents } from "@/data/agents";

/* ── Stats ────────────────────────────────────────────────────────────────── */
const STATS = [
  { value: "1.5–2.5%", label: "Revenue lost to shrinkage & leakage globally" },
  { value: "5", label: "Specialized intelligence domains" },
  { value: "24/7", label: "Continuous autonomous monitoring" },
];

/* ── Challenge points ─────────────────────────────────────────────────────── */
const CHALLENGES = [
  {
    title: "Fragmented visibility",
    body: "Operational data is spread across transactions, inventory, procurement and loyalty systems — traditional tools see only fragments.",
  },
  {
    title: "Static rule limitations",
    body: "Rules-based systems generate thousands of low-value alerts while missing subtle behavioral patterns that signal real risk.",
  },
  {
    title: "Manual investigation burden",
    body: "Investigation teams spend most of their time triaging alerts rather than analyzing meaningful risk signals.",
  },
];

/* ── Platform capabilities ─────────────────────────────────────────────────── */
const CAPABILITIES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: "Continuous observation",
    body: "Agents autonomously monitor operational data streams around the clock without relying on predefined rules.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Behavioral pattern analysis",
    body: "The platform detects deviations from expected behavior across time, stores, cashiers and suppliers.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <path d="M13 6h3a2 2 0 0 1 2 2v7" />
        <line x1="6" y1="9" x2="6" y2="21" />
      </svg>
    ),
    title: "Cross-domain correlation",
    body: "Signals across transaction, inventory, supplier and loyalty domains are correlated to surface compound risk patterns.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: "Investigation intelligence",
    body: "Instead of raw alerts, the system generates contextual summaries that prioritize meaningful risk for investigation teams.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════ */

export default function LandingPage() {
  return (
    <div className="flex flex-col">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[var(--color-primary)] text-white">
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(37,99,235,0.35),transparent)]" />

        <div className="relative max-w-6xl mx-auto px-6 py-28 md:py-36 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="fade-up inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-white/15 bg-white/5 text-xs font-medium text-white/70 uppercase tracking-widest backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-light)] animate-pulse" />
            Agentic AI · Keells Super
          </div>

          <h1 className="fade-up fade-up-1 text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-6 max-w-4xl">
            AI-Powered Retail
            <br />
            <span className="text-[var(--color-accent-light)]">
              Fraud Intelligence
            </span>
          </h1>

          <p className="fade-up fade-up-2 text-lg md:text-xl text-white/65 max-w-2xl leading-relaxed mb-10">
            Transforming how grocery retailers detect operational risk — autonomous
            analytical agents continuously monitor fraud signals across transactions,
            promotions, inventory flows, supplier relationships and loyalty activity.
          </p>

          <div className="fade-up fade-up-3 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ecosystem"
              className="px-8 py-3.5 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-light)] shadow-lg shadow-blue-900/40 transition-all duration-200 hover:-translate-y-0.5"
            >
              Explore the Ecosystem →
            </Link>
            <a
              href="#agents"
              className="px-8 py-3.5 rounded-xl border border-white/20 text-white/80 font-semibold hover:bg-white/8 hover:text-white transition-all duration-200 backdrop-blur-sm"
            >
              View Intelligence Agents
            </a>
          </div>

          {/* Five agent dots — decorative preview */}
          <div className="fade-up fade-up-4 mt-16 flex items-center gap-3">
            {["#2563eb","#7c3aed","#059669","#d97706","#0ea5e9"].map((color, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div
                  className="w-2.5 h-2.5 rounded-full ring-2 ring-offset-2 ring-offset-[var(--color-primary)]"
                  style={{ backgroundColor: color }}
                />
              </div>
            ))}
            <span className="text-xs text-white/35 ml-1 font-medium tracking-wide">
              5 intelligence domains
            </span>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          STATS STRIP
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[var(--color-border)]">
          {STATS.map((stat) => (
            <div key={stat.value} className="flex flex-col items-center text-center py-6 sm:py-0 px-8">
              <span className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-1">
                {stat.value}
              </span>
              <span className="text-sm text-[var(--color-text-secondary)]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          THE CHALLENGE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24 px-6 bg-[var(--color-bg)]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3">
              The Challenge
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] leading-tight mb-6">
              Fraud rarely announces itself
            </h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8">
              Modern grocery retail operations generate enormous volumes of operational
              activity every day. Thousands of transactions, complex supply chains, supplier
              deliveries across distribution networks, promotions executed across millions
              of customer baskets.
            </p>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              A single refund, price override or inventory adjustment may appear entirely
              legitimate. It is only when activity is analyzed across longer time horizons
              and across multiple operational systems that unusual behavioral patterns begin
              to emerge.
            </p>
          </div>

          {/* Challenge cards */}
          <div className="flex flex-col gap-4">
            {CHALLENGES.map((c, i) => (
              <div
                key={c.title}
                className="flex gap-4 items-start p-5 bg-white rounded-xl border border-[var(--color-border)]"
              >
                <div className="w-7 h-7 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-red-500 text-xs font-bold">{i + 1}</span>
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-primary)] mb-1 text-sm">
                    {c.title}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {c.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          AGENTIC AI SOLUTION
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3">
              The Solution
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] leading-tight mb-5">
              Introducing Agentic AI
            </h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              Instead of relying on predefined rules, autonomous analytical agents
              continuously observe operational data streams across the retail enterprise —
              detecting behavioral anomalies and generating contextual investigation
              insights.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.title}
                className="flex gap-4 p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-secondary)] hover:shadow-sm transition-shadow duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-[rgba(37,99,235,0.08)] text-[var(--color-accent)] flex items-center justify-center shrink-0">
                  {cap.icon}
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-primary)] mb-1.5 text-sm">
                    {cap.title}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {cap.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FIVE INTELLIGENCE AGENTS GRID
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="agents" className="py-24 px-6 bg-[var(--color-bg)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3">
              Intelligence Domains
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] leading-tight mb-5">
              Five specialized analytical agents
            </h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              Each agent is responsible for monitoring a specific operational domain within
              the retail environment. Together they form a unified fraud intelligence
              capability.
            </p>
          </div>

          {/* 2 + 2 + 1 responsive grid */}
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

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FOOTER CTA
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24 px-6 bg-[var(--color-primary)] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
            Next
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5">
            Explore the Fraud Intelligence
            <br />
            Ecosystem
          </h2>
          <p className="text-white/60 leading-relaxed mb-10">
            Navigate the interactive ecosystem diagram to explore how each intelligence
            domain is connected to the central platform and discover the detailed
            workflows of each analytical agent.
          </p>
          <Link
            href="/ecosystem"
            className="inline-flex items-center gap-2 px-9 py-4 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-light)] shadow-xl shadow-blue-900/40 transition-all duration-200 hover:-translate-y-0.5"
          >
            Enter the Ecosystem
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
