import Link from "next/link";
import { agents, getAgent } from "@/data/agents";
import { agentIconNode } from "@/lib/agentIcon";

interface AgentCardProps {
  slug: string;
  /** Overrides agents.ts title when provided */
  label?: string;
  /** Overrides agents.ts description when provided */
  description?: string;
  index?: number;
}

export default function AgentCard({ slug, label, description, index }: AgentCardProps) {
  const agent = getAgent(slug);

  const color  = agent?.color  ?? "#2563eb";
  const title  = label         ?? agent?.title       ?? slug;
  const desc   = description   ?? agent?.description ?? "";
  const icon   = agent?.icon   ?? "credit-card";
  const bg     = `${color}14`; // ~8% opacity tint

  return (
    <Link
      href={`/agent/${slug}`}
      className="group relative flex flex-col bg-white rounded-2xl border border-[var(--color-border)] p-6 hover:shadow-lg hover:border-transparent transition-all duration-200 overflow-hidden"
    >
      {/* Accent bar — top edge on hover */}
      <div
        className="absolute inset-x-0 top-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: color }}
      />

      {/* Index badge */}
      {index !== undefined && (
        <span
          className="absolute top-5 right-5 text-xs font-bold opacity-15 tabular-nums select-none"
          style={{ color }}
        >
          0{index + 1}
        </span>
      )}

      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110"
        style={{ backgroundColor: bg, color }}
      >
        {agentIconNode(icon)}
      </div>

      {/* Title */}
      <h3
        className="font-semibold text-[var(--color-primary)] mb-2 leading-snug group-hover:text-[var(--color-accent)] transition-colors duration-150"
      >
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed flex-1">
        {desc}
      </p>

      {/* CTA */}
      <div
        className="mt-5 flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        style={{ color }}
      >
        Explore agent
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
