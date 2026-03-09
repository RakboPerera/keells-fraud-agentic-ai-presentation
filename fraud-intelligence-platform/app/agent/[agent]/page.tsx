import Link from "next/link";
import { notFound } from "next/navigation";
import { agentSlugs, getAgent, agents } from "@/data/agents";
import { agentIconNode } from "@/lib/agentIcon";
import { getAgentMarkdown } from "@/lib/markdown";
import {
  parseSignalsMonitored,
  parseOperationalContext,
  parseFraudScenarios,
  parseWorkflowStages,
  parseAnalyticsTechniques,
} from "@/lib/markdownParser";
import ScenarioCard from "@/components/ScenarioCard";
import AgentPipeline from "@/components/AgentPipeline";
import AgentAnalytics from "@/components/AgentAnalytics";
import SignalTags from "@/components/SignalTags";
import InvestigationOutput from "@/components/InvestigationOutput";

interface AgentPageProps {
  params: Promise<{ agent: string }>;
}

export async function generateStaticParams() {
  return agentSlugs.map((agent) => ({ agent }));
}

/* ── Section wrapper ──────────────────────────────────────────────────────── */
function Section({
  id,
  number,
  label,
  title,
  description,
  alt,
  children,
}: {
  id?: string;
  number: string;
  label: string;
  title: string;
  description?: string;
  alt?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`px-6 py-16 ${alt ? "bg-[var(--color-bg)]" : "bg-white"} border-t border-[var(--color-border)]`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start gap-4 mb-8">
          <span className="text-xs font-bold tabular-nums text-[var(--color-text-muted)] mt-1 shrink-0 w-6">
            {number}
          </span>
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-1">
              {label}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)] leading-tight">
              {title}
            </h2>
            {description && (
              <p className="mt-3 text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
                {description}
              </p>
            )}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */

export default async function AgentPage({ params }: AgentPageProps) {
  const { agent: slug } = await params;
  const agentData = getAgent(slug);
  if (!agentData) notFound();

  /* ── Load & parse markdown ────────────────────────────────────────────── */
  const md = await getAgentMarkdown(slug);

  const signals    = parseSignalsMonitored(md.overview);
  const { context, challenges } = parseOperationalContext(md.overview);
  const scenarios  = parseFraudScenarios(md.fraudScenarios);
  const stages     = parseWorkflowStages(md.agentWorkflow);
  const techniques = parseAnalyticsTechniques(md.analyticsComponents);

  const { color, title, description, icon } = agentData;
  const bgTint     = `${color}10`;
  const borderTint = `${color}25`;

  /* ── Prev / next agent navigation ─────────────────────────────────────── */
  const currentIndex = agents.findIndex((a) => a.slug === slug);
  const prevAgent    = currentIndex > 0 ? agents[currentIndex - 1] : agents[agents.length - 1];
  const nextAgent    = currentIndex < agents.length - 1 ? agents[currentIndex + 1] : agents[0];

  return (
    <div className="min-h-screen bg-white">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HEADER
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[var(--color-primary)] text-white relative overflow-hidden">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Colored glow from agent accent */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 80% at 90% 50%, ${color}30, transparent)`,
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 py-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/40 mb-8">
            <Link href="/" className="hover:text-white/70 transition-colors">Overview</Link>
            <span>/</span>
            <Link href="/ecosystem" className="hover:text-white/70 transition-colors">Ecosystem</Link>
            <span>/</span>
            <span style={{ color }} className="font-medium">{agentData.shortTitle}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            {/* Left: title block */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: bgTint, color }}
                >
                  {agentIconNode(icon)}
                </div>
                <span
                  className="text-xs font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: bgTint, color }}
                >
                  Intelligence Agent
                </span>

                {/* Live monitoring indicator */}
                <span className="flex items-center gap-1.5 text-xs font-medium text-white/50 ml-2">
                  <span className="relative flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 live-dot" />
                    <span className="absolute w-3 h-3 rounded-full bg-emerald-400 opacity-30 animate-ping" />
                  </span>
                  Live monitoring active
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-4">
                {title}
              </h1>

              <p className="text-white/65 max-w-xl leading-relaxed text-lg">
                {description}
              </p>
            </div>

            {/* Right: quick stat badges */}
            <div className="flex flex-col gap-2 md:min-w-[200px]">
              {[
                { label: "Signals Monitored",     value: signals.length || "—" },
                { label: "Fraud Scenarios",        value: scenarios.length || "—" },
                { label: "Pipeline Stages",        value: stages.length || "—" },
                { label: "Analytical Techniques",  value: techniques.length || "—" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between items-center px-4 py-2.5 rounded-xl"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <span className="text-xs text-white/50">{label}</span>
                  <span className="text-sm font-bold" style={{ color }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section jump links */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mr-1">Jump to</span>
            {[
              { id: "context",       label: "Context" },
              { id: "signals",       label: "Signals" },
              { id: "scenarios",     label: "Scenarios" },
              { id: "pipeline",      label: "Pipeline" },
              { id: "analytics",     label: "Analytics" },
              { id: "investigation", label: "Investigation" },
            ].map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-[11px] font-medium px-3 py-1 rounded-full transition-all duration-150 text-white/40 hover:text-white/80 border border-white/10 hover:border-white/20"
              >
                {label}
              </a>
            ))}

            <div className="ml-auto">
              <Link
                href="/ecosystem"
                className="inline-flex items-center gap-2 text-xs font-medium text-white/50 hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                </svg>
                Back to Ecosystem
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          01 · OPERATIONAL CONTEXT
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Section
        id="context"
        number="01"
        label="Operational Context"
        title="Why this domain matters"
        alt
      >
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Context prose */}
          <div>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              {context || `The ${title} agent monitors behavioral patterns across operational data to detect anomalies that may indicate misuse or financial risk.`}
            </p>
          </div>

          {/* Operational challenges */}
          {challenges.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-4">
                Operational Challenges
              </p>
              <div className="flex flex-col gap-3">
                {challenges.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white border border-[var(--color-border)]"
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5"
                      style={{ backgroundColor: color }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{c}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          02 · SIGNALS MONITORED
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {signals.length > 0 && (
        <Section
          id="signals"
          number="02"
          label="Signals Monitored"
          title="What the agent watches"
          description="The agent continuously tracks the following operational signals to detect behavioral deviations. Hover any signal to learn more."
        >
          <SignalTags signals={signals} color={color} />
        </Section>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          03 · FRAUD SCENARIOS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {scenarios.length > 0 && (
        <Section
          id="scenarios"
          number="03"
          label="Fraud Scenarios"
          title="How misuse emerges"
          description="Realistic patterns of operational misuse that this agent is designed to detect. Each scenario demonstrates how seemingly normal activity can signal emerging fraud risk."
          alt
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {scenarios.map((scenario, i) => (
              <ScenarioCard
                key={scenario.number}
                scenario={scenario}
                color={color}
                index={i}
              />
            ))}
          </div>
        </Section>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          04 · AGENT WORKFLOW PIPELINE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {stages.length > 0 && (
        <Section
          id="pipeline"
          number="04"
          label="Agent Workflow"
          title="The analytical pipeline"
          description="Click any stage to explore how the agent transforms raw operational data into fraud investigation intelligence."
        >
          <AgentPipeline stages={stages} color={color} />
        </Section>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          05 · ANALYTICS COMPONENTS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {techniques.length > 0 && (
        <Section
          id="analytics"
          number="05"
          label="Analytics Components"
          title="How the agent thinks"
          description="The analytical techniques that power this agent. Click each panel to explore the detection methods in detail."
          alt
        >
          <AgentAnalytics techniques={techniques} color={color} />
        </Section>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          06 · EXAMPLE INVESTIGATION OUTPUT
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Section
        id="investigation"
        number="06"
        label="Example Investigation Output"
        title="What an alert looks like"
        description="A simulated investigation summary illustrating the kind of output this agent produces — including the detected anomaly, behavioral deviation analysis, and recommended action."
      >
        <InvestigationOutput agentSlug={slug} color={color} />
      </Section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FOOTER NAVIGATION
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg)] px-6 py-12">
        <div className="max-w-5xl mx-auto">

          {/* Prev / Next agent */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            {/* Previous */}
            <Link
              href={`/agent/${prevAgent.slug}`}
              className="flex-1 flex items-center gap-4 px-5 py-4 rounded-2xl border bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group"
              style={{ borderColor: `${prevAgent.color}25` }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-150"
                style={{ backgroundColor: `${prevAgent.color}12`, color: prevAgent.color }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-0.5">
                  Previous Agent
                </p>
                <p className="text-sm font-bold text-[var(--color-primary)] truncate group-hover:text-[var(--color-accent)] transition-colors">
                  {prevAgent.shortTitle}
                </p>
              </div>
            </Link>

            {/* Ecosystem hub */}
            <Link
              href="/ecosystem"
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] border-[var(--color-border)]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
              </svg>
              Ecosystem
            </Link>

            {/* Next */}
            <Link
              href={`/agent/${nextAgent.slug}`}
              className="flex-1 flex items-center gap-4 px-5 py-4 rounded-2xl border bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group"
              style={{ borderColor: `${nextAgent.color}25` }}
            >
              <div className="flex-1 min-w-0 text-right">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-0.5">
                  Next Agent
                </p>
                <p className="text-sm font-bold text-[var(--color-primary)] truncate group-hover:text-[var(--color-accent)] transition-colors">
                  {nextAgent.shortTitle}
                </p>
              </div>
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-150"
                style={{ backgroundColor: `${nextAgent.color}12`, color: nextAgent.color }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </Link>
          </div>

          {/* All agents quick-access */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-3 text-center">
              All Agents
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {agents.map((a) => (
                <Link
                  key={a.slug}
                  href={`/agent/${a.slug}`}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-150 hover:shadow-sm"
                  style={{
                    borderColor:     a.slug === slug ? a.color        : `${a.color}30`,
                    color:           a.slug === slug ? a.color        : "var(--color-text-secondary)",
                    backgroundColor: a.slug === slug ? `${a.color}12` : `${a.color}06`,
                    fontWeight:      a.slug === slug ? 700             : 500,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: a.color }}
                  />
                  {a.shortTitle}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
