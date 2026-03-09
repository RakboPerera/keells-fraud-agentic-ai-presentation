"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { agentIconNode } from "@/lib/agentIcon";
import type { AgentIcon } from "@/data/agents";
import type {
  FraudScenario,
  WorkflowStage,
  AnalyticsTechnique,
} from "@/lib/markdownParser";
import ScenarioCard from "@/components/ScenarioCard";
import AgentPipeline from "@/components/AgentPipeline";
import AgentAnalytics from "@/components/AgentAnalytics";
import SignalTags from "@/components/SignalTags";
import InvestigationOutput from "@/components/InvestigationOutput";
import SlideView, { SlideDefinition } from "@/components/SlideView";

/* ── Props ─────────────────────────────────────────────────────────────────── */
interface AgentSlideshowProps {
  slug: string;
  color: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: AgentIcon;
  signals: string[];
  context: string;
  challenges: string[];
  scenarios: FraudScenario[];
  stages: WorkflowStage[];
  techniques: AnalyticsTechnique[];
  prevAgent: { slug: string; shortTitle: string; color: string };
  nextAgent: { slug: string; shortTitle: string; color: string };
}

/* ── Reusable slide chrome ──────────────────────────────────────────────────
   Provides a consistent header (slide number + label + title) and a scrollable
   content body that clears the bottom nav bar.                              */
function SlideChrome({
  num,
  label,
  title,
  subtitle,
  color,
  alt,
  children,
}: {
  num: string;
  label: string;
  title: string;
  subtitle?: string;
  color: string;
  alt?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="h-full flex flex-col"
      style={{ backgroundColor: alt ? "var(--color-bg)" : "white" }}
    >
      {/* Header */}
      <div className="flex-none px-12 md:px-20 pt-10 pb-0">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="flex items-center gap-3 mb-3"
          >
            <span
              className="text-5xl font-black leading-none"
              style={{ color: `${color}18` }}
            >
              {num}
            </span>
            <div className="h-px w-8" style={{ backgroundColor: `${color}40` }} />
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color }}
            >
              {label}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] leading-tight"
          >
            {title}
          </motion.h2>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="mt-2 text-[var(--color-text-secondary)] leading-relaxed max-w-2xl"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Gradient divider */}
          <div
            className="mt-6 h-px"
            style={{
              background: `linear-gradient(to right, ${color}60, transparent)`,
            }}
          />
        </div>
      </div>

      {/* Content — scrolls internally, pads for bottom nav bar */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-12 md:px-20 pt-6 pb-16">
        <div className="max-w-5xl mx-auto">{children}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */

export default function AgentSlideshow({
  slug,
  color,
  title,
  shortTitle,
  description,
  icon,
  signals,
  context,
  challenges,
  scenarios,
  stages,
  techniques,
  prevAgent,
  nextAgent,
}: AgentSlideshowProps) {
  const bgTint = `${color}12`;

  const slides: SlideDefinition[] = [
    /* ─────────────────────────────────────────────────────────────────────
       SLIDE 0 — HERO
    ───────────────────────────────────────────────────────────────────── */
    {
      id: "hero",
      label: "Overview",
      content: (
        <div
          className="h-full flex flex-col relative overflow-hidden"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          {/* Subtle dot grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 75% 75% at 60% 50%, ${color}28, transparent 70%)`,
            }}
          />

          {/* Pulsing outer ring */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              width: "520px",
              height: "520px",
              border: `1px solid ${color}18`,
              boxShadow: `0 0 80px ${color}15`,
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none animate-pulse"
            style={{
              width: "320px",
              height: "320px",
              border: `1px solid ${color}25`,
              animationDuration: "4s",
            }}
          />

          {/* Top nav */}
          <div className="relative z-10 flex items-center justify-between px-10 pt-8 flex-none">
            <Link
              href="/ecosystem"
              className="flex items-center gap-2 text-xs font-medium text-white/40 hover:text-white/70 transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Ecosystem
            </Link>

            <div className="flex items-center gap-2 text-xs text-white/30">
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                style={{ boxShadow: "0 0 8px #34d39980" }}
              />
              Live monitoring active
            </div>
          </div>

          {/* Center content */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 text-center">
            {/* Agent icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "backOut" }}
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
              style={{
                backgroundColor: bgTint,
                border: `1px solid ${color}40`,
                boxShadow: `0 0 40px ${color}30, inset 0 1px 0 rgba(255,255,255,0.1)`,
                color,
              }}
            >
              <span className="[&_svg]:w-9 [&_svg]:h-9">
                {agentIconNode(icon)}
              </span>
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="mb-5"
            >
              <span
                className="text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full"
                style={{ backgroundColor: `${color}22`, color }}
              >
                Intelligence Agent
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-4 max-w-3xl"
            >
              {title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.28 }}
              className="text-white/55 text-lg leading-relaxed max-w-2xl mb-10"
            >
              {description}
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="grid grid-cols-4 gap-3 max-w-xl w-full mb-10"
            >
              {[
                { label: "Signals", value: signals.length || "—" },
                { label: "Scenarios", value: scenarios.length || "—" },
                { label: "Pipeline Stages", value: stages.length || "—" },
                { label: "Techniques", value: techniques.length || "—" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-center px-3 py-4 rounded-xl"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <span
                    className="text-2xl font-bold leading-none mb-1"
                    style={{ color }}
                  >
                    {value}
                  </span>
                  <span className="text-[11px] text-white/35">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* Hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex items-center gap-2 text-xs text-white/25"
            >
              <span>Press</span>
              <kbd
                className="px-1.5 py-0.5 rounded text-[10px] font-mono"
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                →
              </kbd>
              <span>to explore</span>
            </motion.div>
          </div>

          {/* Bottom: prev / next agent */}
          <div className="relative z-10 flex-none flex items-center justify-between px-10 pb-8">
            <Link
              href={`/agent/${prevAgent.slug}`}
              className="flex items-center gap-2 text-xs font-medium text-white/30 hover:text-white/60 transition-colors group"
            >
              <svg
                className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {prevAgent.shortTitle}
            </Link>

            <Link
              href="/ecosystem"
              className="text-[10px] font-semibold uppercase tracking-widest text-white/20 hover:text-white/40 transition-colors"
            >
              {shortTitle}
            </Link>

            <Link
              href={`/agent/${nextAgent.slug}`}
              className="flex items-center gap-2 text-xs font-medium text-white/30 hover:text-white/60 transition-colors group"
            >
              {nextAgent.shortTitle}
              <svg
                className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      ),
    },

    /* ─────────────────────────────────────────────────────────────────────
       SLIDE 1 — OPERATIONAL CONTEXT
    ───────────────────────────────────────────────────────────────────── */
    {
      id: "context",
      label: "Operational Context",
      content: (
        <SlideChrome
          num="01"
          label="Operational Context"
          title="Why this domain matters"
          color={color}
          alt
        >
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Context prose */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <p className="text-[var(--color-text-secondary)] leading-relaxed text-base">
                {context ||
                  `The ${title} agent monitors behavioral patterns across operational data to detect anomalies that may indicate misuse or financial risk.`}
              </p>

              {/* Decorative signal bar */}
              <div className="mt-8 flex gap-1 items-end h-12">
                {[40, 65, 30, 85, 55, 70, 45, 90, 35, 60].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
                    className="flex-1 rounded-sm origin-bottom"
                    style={{
                      height: `${h}%`,
                      backgroundColor:
                        h > 75 ? color : `${color}${h > 50 ? "50" : "25"}`,
                    }}
                  />
                ))}
              </div>
              <p className="text-[10px] text-[var(--color-text-muted)] mt-2 font-medium uppercase tracking-wide">
                Anomaly signal distribution
              </p>
            </motion.div>

            {/* Operational challenges */}
            {challenges.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
                  Operational Challenges
                </p>
                <div className="flex flex-col gap-3">
                  {challenges.map((c, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.07 }}
                      className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-white border transition-all duration-200 hover:shadow-md"
                      style={{ borderColor: `${color}20` }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          `${color}50`;
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          `0 0 20px ${color}15`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          `${color}20`;
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          "none";
                      }}
                    >
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5"
                        style={{ backgroundColor: color }}
                      >
                        {i + 1}
                      </span>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                        {c}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </SlideChrome>
      ),
    },

    /* ─────────────────────────────────────────────────────────────────────
       SLIDE 2 — SIGNALS MONITORED
    ───────────────────────────────────────────────────────────────────── */
    ...(signals.length > 0
      ? [
          {
            id: "signals",
            label: "Signals Monitored",
            content: (
              <SlideChrome
                num="02"
                label="Signals Monitored"
                title="What the agent watches"
                subtitle="Continuously tracked operational signals that reveal behavioral deviations. Hover any signal to learn more."
                color={color}
              >
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <SignalTags signals={signals} color={color} />
                </motion.div>
              </SlideChrome>
            ),
          } as SlideDefinition,
        ]
      : []),

    /* ─────────────────────────────────────────────────────────────────────
       SLIDE 3 — FRAUD SCENARIOS
    ───────────────────────────────────────────────────────────────────── */
    ...(scenarios.length > 0
      ? [
          {
            id: "scenarios",
            label: "Fraud Scenarios",
            content: (
              <SlideChrome
                num="03"
                label="Fraud Scenarios"
                title="How misuse emerges"
                subtitle="Realistic patterns of operational misuse this agent is designed to detect."
                color={color}
                alt
              >
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {scenarios.map((scenario, i) => (
                    <motion.div
                      key={scenario.number}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.25 + i * 0.07 }}
                      whileHover={{ y: -3, transition: { duration: 0.15 } }}
                    >
                      <ScenarioCard
                        scenario={scenario}
                        color={color}
                        index={i}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </SlideChrome>
            ),
          } as SlideDefinition,
        ]
      : []),

    /* ─────────────────────────────────────────────────────────────────────
       SLIDE 4 — AGENT PIPELINE
    ───────────────────────────────────────────────────────────────────── */
    ...(stages.length > 0
      ? [
          {
            id: "pipeline",
            label: "Agent Pipeline",
            content: (
              <SlideChrome
                num="04"
                label="Agent Workflow"
                title="The analytical pipeline"
                subtitle="Click any stage to explore how raw operational data becomes fraud investigation intelligence."
                color={color}
              >
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <AgentPipeline stages={stages} color={color} />
                </motion.div>
              </SlideChrome>
            ),
          } as SlideDefinition,
        ]
      : []),

    /* ─────────────────────────────────────────────────────────────────────
       SLIDE 5 — ANALYTICS COMPONENTS
    ───────────────────────────────────────────────────────────────────── */
    ...(techniques.length > 0
      ? [
          {
            id: "analytics",
            label: "Analytics Techniques",
            content: (
              <SlideChrome
                num="05"
                label="Analytics Components"
                title="How the agent thinks"
                subtitle="The analytical techniques that power detection. Click each panel to explore."
                color={color}
                alt
              >
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <AgentAnalytics techniques={techniques} color={color} />
                </motion.div>
              </SlideChrome>
            ),
          } as SlideDefinition,
        ]
      : []),

    /* ─────────────────────────────────────────────────────────────────────
       SLIDE 6 — INVESTIGATION OUTPUT
    ───────────────────────────────────────────────────────────────────── */
    {
      id: "investigation",
      label: "Investigation Output",
      content: (
        <div
          className="h-full flex flex-col relative overflow-hidden"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 60% 60% at 30% 50%, ${color}20, transparent 70%)`,
            }}
          />

          <div className="relative z-10 flex flex-col h-full px-12 md:px-20 py-10 overflow-y-auto overscroll-contain pb-16">
            <div className="max-w-5xl mx-auto w-full">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="flex items-center gap-3 mb-3"
              >
                <span
                  className="text-5xl font-black leading-none"
                  style={{ color: `${color}25` }}
                >
                  06
                </span>
                <div
                  className="h-px w-8"
                  style={{ backgroundColor: `${color}50` }}
                />
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color }}
                >
                  Investigation Output
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2"
              >
                What an alert looks like
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.15 }}
                className="text-white/50 mb-6 max-w-2xl"
              >
                A simulated investigation summary — the kind of output this
                agent produces, including the detected anomaly, behavioral
                deviation analysis, and recommended action.
              </motion.p>

              <div
                className="mb-6 h-px"
                style={{
                  background: `linear-gradient(to right, ${color}60, transparent)`,
                }}
              />

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <InvestigationOutput agentSlug={slug} color={color} />
              </motion.div>

              {/* Footer: other agents */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="mt-8 flex flex-col sm:flex-row gap-3"
              >
                <Link
                  href={`/agent/${prevAgent.slug}`}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 group"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  <svg
                    className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  {prevAgent.shortTitle}
                </Link>

                <Link
                  href="/ecosystem"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: `${color}20`,
                    border: `1px solid ${color}40`,
                    color,
                  }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                  </svg>
                  Ecosystem
                </Link>

                <Link
                  href={`/agent/${nextAgent.slug}`}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 group ml-auto"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  {nextAgent.shortTitle}
                  <svg
                    className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return <SlideView slides={slides} color={color} />;
}
