"use client";

/**
 * WorkflowDiagram
 *
 * Renders two distinct visualizations depending on context:
 *
 * 1. Ecosystem view (no agentSlug): Hub-and-spoke diagram
 *    - Central Fraud Intelligence Platform node
 *    - Five surrounding intelligence domain nodes
 *    - Animated connecting lines representing data flows
 *    - Clickable nodes navigate to /agent/[slug]
 *    - Spec: ui/ecosystem_map.md, ui/design_system.md → Ecosystem Visualization Style
 *
 * 2. Agent view (agentSlug provided): Linear pipeline diagram
 *    - Sequential processing stages as connected nodes
 *    - Directional arrows between stages
 *    - Stages from agents/[agentSlug]/agent_workflow.md
 *    - Spec: ui/design_system.md → Workflow Diagram Style
 *              ui/agent_workflow_visualization.md
 *
 * Props:
 *   agentSlug? — when provided, renders agent pipeline; otherwise ecosystem hub
 */

interface WorkflowDiagramProps {
  agentSlug?: string;
}

/** Placeholder pipeline stages — will be replaced with data from agent_workflow.md */
const PLACEHOLDER_PIPELINE_STAGES = [
  "Operational Data Sources",
  "Monitoring Agent",
  "Behavioral Pattern Analysis",
  "Anomaly Detection Engine",
  "Investigation Intelligence",
  "Fraud Risk Dashboard",
];

/** Placeholder ecosystem nodes — will be replaced with data from ecosystem_map.md */
const ECOSYSTEM_NODES = [
  { slug: "transaction_integrity", label: "Transaction Integrity" },
  { slug: "promotion_integrity", label: "Promotion Integrity" },
  { slug: "inventory_shrinkage", label: "Inventory & Shrinkage" },
  { slug: "supplier_risk", label: "Supplier Risk" },
  { slug: "nexus_loyalty_integrity", label: "Nexus Loyalty" },
];

export default function WorkflowDiagram({ agentSlug }: WorkflowDiagramProps) {
  if (agentSlug) {
    return <PipelineDiagram agentSlug={agentSlug} />;
  }
  return <EcosystemHubDiagram />;
}

/* ── ECOSYSTEM HUB DIAGRAM ──────────────────────────────────────────────────── */

function EcosystemHubDiagram() {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-8">
      {/* [CONTENT] This section will be replaced with an SVG/Canvas hub-and-spoke
           diagram per ui/ecosystem_map.md and ui/design_system.md specs.
           The diagram should:
             - Show central "Fraud Intelligence Platform" node
             - Show 5 surrounding domain nodes
             - Animate data-flow lines between center and nodes
             - Support hover highlight and click navigation */}

      <div className="flex flex-col items-center gap-6">
        {/* Central node placeholder */}
        <div className="w-36 h-36 rounded-full bg-[var(--color-primary)] flex items-center justify-center shadow-lg">
          <span className="text-white text-xs font-semibold text-center leading-tight px-4">
            Fraud Intelligence Platform
          </span>
        </div>

        <p className="text-xs text-[var(--color-text-muted)] text-center max-w-sm">
          [DIAGRAM PLACEHOLDER] — Interactive hub-and-spoke ecosystem
          visualization will be implemented here per{" "}
          <code className="font-mono">ui/ecosystem_map.md</code>
        </p>

        {/* Domain node placeholders */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 w-full">
          {ECOSYSTEM_NODES.map((node) => (
            <div
              key={node.slug}
              className="flex flex-col items-center gap-2 p-3 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-accent)] cursor-pointer transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)]" />
              <span className="text-xs text-[var(--color-text-secondary)] text-center leading-tight">
                {node.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── PIPELINE DIAGRAM ───────────────────────────────────────────────────────── */

function PipelineDiagram({ agentSlug }: { agentSlug: string }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-8">
      {/* [CONTENT] This section will be replaced with an SVG pipeline diagram
           per ui/agent_workflow_visualization.md.
           Stages will be sourced from agents/[agentSlug]/agent_workflow.md */}

      <p className="text-xs text-[var(--color-text-muted)] mb-6 text-center">
        [PIPELINE PLACEHOLDER] — Agent workflow stages from{" "}
        <code className="font-mono">agents/{agentSlug}/agent_workflow.md</code>
      </p>

      {/* Horizontal pipeline placeholder */}
      <div className="flex items-center gap-0 overflow-x-auto pb-2">
        {PLACEHOLDER_PIPELINE_STAGES.map((stage, index) => (
          <div key={stage} className="flex items-center shrink-0">
            <div className="flex flex-col items-center gap-2">
              <div className="w-24 h-16 rounded-lg border-2 border-[var(--color-border)] bg-[var(--color-bg)] flex items-center justify-center p-2">
                <span className="text-xs text-[var(--color-text-secondary)] text-center leading-tight font-medium">
                  {stage}
                </span>
              </div>
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
            </div>
            {index < PLACEHOLDER_PIPELINE_STAGES.length - 1 && (
              <div className="flex items-center mx-1 mb-5">
                <div className="w-6 h-0.5 bg-[var(--color-border)]" />
                <svg
                  className="w-3 h-3 text-[var(--color-border)]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
