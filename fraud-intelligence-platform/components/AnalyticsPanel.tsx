/**
 * AnalyticsPanel
 *
 * Renders the analytics and signals panel for an agent's deep dive page.
 *
 * Content to integrate later:
 *   - Key metrics, KPIs and risk signals from agents/[slug]/analytics_components.md
 *   - Chart / visualization components (bar charts, trend lines, risk gauges)
 *   - Investigation output summary
 *   - Spec: ui/use_case_page_layout.md → Analytics Components section
 *
 * Props:
 *   agentSlug — determines which analytics_components.md to source from
 */

interface AnalyticsPanelProps {
  agentSlug: string;
}

/** Placeholder metric card data — will be replaced with real data from analytics_components.md */
const PLACEHOLDER_METRICS = [
  { label: "Transactions Monitored", value: "—" },
  { label: "Anomalies Flagged", value: "—" },
  { label: "Risk Score", value: "—" },
  { label: "Active Investigations", value: "—" },
];

export default function AnalyticsPanel({ agentSlug }: AnalyticsPanelProps) {
  return (
    <div className="space-y-6">
      {/* ── METRICS ROW ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {PLACEHOLDER_METRICS.map((metric) => (
          <div
            key={metric.label}
            className="bg-white rounded-xl border border-[var(--color-border)] p-5"
          >
            <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
              {metric.label}
            </p>
            <div className="h-8 w-16 bg-[var(--color-bg)] rounded animate-pulse" />
            {/* [CONTENT] Value from agents/[agentSlug]/analytics_components.md */}
          </div>
        ))}
      </div>

      {/* ── CHART PANELS ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Primary chart placeholder */}
        <div className="bg-white rounded-xl border border-[var(--color-border)] p-6">
          <p className="text-sm font-semibold text-[var(--color-primary)] mb-1">
            {/* [CONTENT] Chart title from analytics_components.md */}
            Primary Signal Chart
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mb-4">
            [CHART PLACEHOLDER] — visualization from{" "}
            <code className="font-mono">
              agents/{agentSlug}/analytics_components.md
            </code>
          </p>
          <div className="h-40 bg-[var(--color-bg)] rounded-lg border border-[var(--color-border)] flex items-end gap-1 px-3 pb-3">
            {/* Skeleton bar chart */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-[var(--color-border)] rounded-t animate-pulse"
                style={{ height: `${20 + Math.sin(i) * 40 + 40}%` }}
              />
            ))}
          </div>
        </div>

        {/* Secondary chart placeholder */}
        <div className="bg-white rounded-xl border border-[var(--color-border)] p-6">
          <p className="text-sm font-semibold text-[var(--color-primary)] mb-1">
            {/* [CONTENT] Chart title from analytics_components.md */}
            Risk Distribution
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mb-4">
            [CHART PLACEHOLDER] — risk distribution visualization
          </p>
          <div className="h-40 bg-[var(--color-bg)] rounded-lg border border-[var(--color-border)] flex items-center justify-center">
            {/* Skeleton donut */}
            <div className="w-24 h-24 rounded-full border-8 border-[var(--color-border)] border-t-[var(--color-accent)] animate-spin" />
          </div>
        </div>
      </div>

      {/* ── INVESTIGATION OUTPUT ─────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] p-6">
        <p className="text-sm font-semibold text-[var(--color-primary)] mb-1">
          Investigation Intelligence Output
        </p>
        <p className="text-xs text-[var(--color-text-muted)] mb-4">
          {/* [CONTENT] Investigation output format from analytics_components.md */}
          [CONTENT PLACEHOLDER] — investigation outputs and risk narratives from{" "}
          <code className="font-mono">
            agents/{agentSlug}/analytics_components.md
          </code>
        </p>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]"
            >
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] mt-1 shrink-0" />
              <div className="flex-1 space-y-1">
                <div className="h-3 w-3/4 bg-[var(--color-border)] rounded animate-pulse" />
                <div className="h-3 w-1/2 bg-[var(--color-border)] rounded animate-pulse opacity-60" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
