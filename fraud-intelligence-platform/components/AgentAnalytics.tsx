"use client";

import { useState } from "react";
import type { AnalyticsTechnique } from "@/lib/markdownParser";

interface AgentAnalyticsProps {
  techniques: AnalyticsTechnique[];
  color: string;
}

// One icon per analytics technique (matched to common technique names)
function TechniqueIcon({ name, color }: { name: string; color: string }) {
  const lc = name.toLowerCase();

  if (lc.includes("behavioral") || lc.includes("behaviour")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
      </svg>
    );
  }
  if (lc.includes("peer") || lc.includes("benchmark")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    );
  }
  if (lc.includes("statistical") || lc.includes("anomaly") || lc.includes("detection")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    );
  }
  if (lc.includes("temporal") || lc.includes("time") || lc.includes("pattern")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    );
  }
  if (lc.includes("correlation") || lc.includes("cross")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/>
        <path d="M13 6h3a2 2 0 0 1 2 2v7"/>
        <line x1="6" y1="9" x2="6" y2="21"/>
      </svg>
    );
  }
  // Default
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
}

export default function AgentAnalytics({ techniques, color }: AgentAnalyticsProps) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="flex flex-col divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] overflow-hidden bg-white">
      {techniques.map((tech, i) => {
        const isOpen = open === i;

        return (
          <div key={tech.name}>
            {/* Header / toggle */}
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-[var(--color-bg)] transition-colors duration-150 group"
            >
              {/* Icon */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-150"
                style={{
                  backgroundColor: isOpen ? `${color}15` : "var(--color-bg)",
                }}
              >
                <TechniqueIcon name={tech.name} color={isOpen ? color : "var(--color-text-muted)"} />
              </div>

              {/* Title */}
              <span
                className="flex-1 font-semibold text-sm transition-colors duration-150"
                style={{ color: isOpen ? color : "var(--color-primary)" }}
              >
                {tech.name}
              </span>

              {/* Chevron */}
              <svg
                className="w-4 h-4 shrink-0 transition-transform duration-200"
                style={{
                  color: isOpen ? color : "var(--color-text-muted)",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            {/* Expanded body */}
            {isOpen && (
              <div
                className="px-6 pb-6 pt-0"
                style={{ borderTop: `1px solid ${color}15`, backgroundColor: `${color}04` }}
              >
                {tech.description && (
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4 mt-4">
                    {tech.description}
                  </p>
                )}

                {tech.examples.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-3">
                      Examples
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {tech.examples.map((ex, j) => (
                        <div
                          key={j}
                          className="flex items-start gap-2 text-xs text-[var(--color-text-secondary)] px-3 py-2 rounded-lg"
                          style={{ backgroundColor: `${color}08` }}
                        >
                          <span
                            className="w-1 h-1 rounded-full mt-1.5 shrink-0"
                            style={{ backgroundColor: color }}
                          />
                          {ex}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
