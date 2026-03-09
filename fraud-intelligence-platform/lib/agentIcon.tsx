/**
 * agentIcon.tsx — Maps AgentIcon string identifiers to inline SVG elements.
 *
 * Keeping icon rendering separate from data/agents.ts ensures the data file
 * stays serializable (no JSX) while components can still get a React node.
 */

import type { AgentIcon } from "@/data/agents";

const STROKE_PROPS = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ICONS: Record<AgentIcon, React.ReactNode> = {
  "credit-card": (
    <svg viewBox="0 0 24 24" className="w-5 h-5" {...STROKE_PROPS}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <path d="M7 15h2" />
      <path d="M11 15h4" />
    </svg>
  ),

  tag: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" {...STROKE_PROPS}>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),

  package: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" {...STROKE_PROPS}>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),

  "alert-triangle": (
    <svg viewBox="0 0 24 24" className="w-5 h-5" {...STROKE_PROPS}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),

  heart: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" {...STROKE_PROPS}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
};

interface AgentIconProps {
  icon: AgentIcon;
  className?: string;
}

export default function AgentIconEl({ icon, className }: AgentIconProps) {
  const el = ICONS[icon];
  if (!el) return null;
  // Wrap in a span so className can resize without cloning the SVG
  return <span className={className}>{el}</span>;
}

/** Returns the raw SVG node — useful when a wrapper span is undesirable. */
export function agentIconNode(icon: AgentIcon): React.ReactNode {
  return ICONS[icon] ?? null;
}
