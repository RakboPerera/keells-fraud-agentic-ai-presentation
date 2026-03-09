"use client";

import { useState } from "react";
import type { WorkflowStage } from "@/lib/markdownParser";

interface AgentPipelineProps {
  stages: WorkflowStage[];
  color: string;
}

// One icon per pipeline stage (in order)
const STAGE_ICONS = [
  // Data Ingestion
  <svg key="ingest" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
  </svg>,
  // Signal Extraction
  <svg key="signal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>,
  // Behavior Modeling
  <svg key="model" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
  </svg>,
  // Peer Benchmarking
  <svg key="bench" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><path d="M21 21v-2a4 4 0 0 0-3-3.85"/>
  </svg>,
  // Anomaly Detection
  <svg key="anomaly" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>,
  // Investigation Intelligence
  <svg key="invest" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>,
];

export default function AgentPipeline({ stages, color }: AgentPipelineProps) {
  const [active, setActive] = useState<number>(0);
  const activeStage = stages[active];

  return (
    <div className="flex flex-col gap-6">
      {/* ── Pipeline nodes ──────────────────────────────────────────────── */}
      <div className="overflow-x-auto pb-2">
        <div className="flex items-start min-w-max gap-0">
          {stages.map((stage, i) => {
            const isActive = active === i;
            const isDone = i < active;

            return (
              <div key={stage.number} className="flex items-center">
                {/* Node */}
                <button
                  onClick={() => setActive(i)}
                  className="flex flex-col items-center gap-2 group"
                  aria-pressed={isActive}
                >
                  {/* Circle */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200"
                    style={{
                      backgroundColor: isActive ? color : isDone ? `${color}15` : "white",
                      borderColor: isActive || isDone ? color : "var(--color-border)",
                      color: isActive ? "white" : color,
                      boxShadow: isActive ? `0 0 0 4px ${color}25` : "none",
                    }}
                  >
                    {isDone ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : (
                      STAGE_ICONS[i] ?? (
                        <span className="text-xs font-bold">{stage.number}</span>
                      )
                    )}
                  </div>

                  {/* Label */}
                  <div className="text-center w-24">
                    <p
                      className="text-xs font-semibold leading-tight transition-colors duration-150"
                      style={{ color: isActive ? color : "var(--color-text-secondary)" }}
                    >
                      {stage.shortName}
                    </p>
                    <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">
                      Stage {stage.number}
                    </p>
                  </div>
                </button>

                {/* Connector arrow */}
                {i < stages.length - 1 && (
                  <div className="flex items-center mb-8 mx-1">
                    <div
                      className="h-px w-6 transition-colors duration-200"
                      style={{
                        backgroundColor:
                          i < active ? color : "var(--color-border)",
                      }}
                    />
                    <svg
                      className="w-3 h-3 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      style={{
                        color: i < active ? color : "var(--color-border)",
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Active stage detail ──────────────────────────────────────────── */}
      {activeStage && (
        <div
          key={active}
          className="rounded-2xl border p-6 transition-all duration-200"
          style={{
            borderColor: `${color}30`,
            backgroundColor: `${color}06`,
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: color, color: "white" }}
            >
              {STAGE_ICONS[active]}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color }}>
                Stage {activeStage.number}
              </p>
              <p className="font-semibold text-[var(--color-primary)] text-sm">
                {activeStage.fullName || activeStage.shortName}
              </p>
            </div>
          </div>

          {activeStage.description && (
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
              {activeStage.description}
            </p>
          )}

          {activeStage.bullets.length > 0 && (
            <div className="flex flex-col gap-1.5">
              {activeStage.bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                  <span
                    className="w-1 h-1 rounded-full mt-2 shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  {b}
                </div>
              ))}
            </div>
          )}

          {/* Stage navigation */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t" style={{ borderColor: `${color}20` }}>
            <button
              onClick={() => setActive((p) => Math.max(0, p - 1))}
              disabled={active === 0}
              className="flex items-center gap-1.5 text-xs font-medium disabled:opacity-30 transition-opacity"
              style={{ color }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
              Previous
            </button>

            <div className="flex gap-1.5">
              {stages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="w-1.5 h-1.5 rounded-full transition-all duration-150"
                  style={{
                    backgroundColor: i === active ? color : `${color}30`,
                    transform: i === active ? "scale(1.3)" : "scale(1)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setActive((p) => Math.min(stages.length - 1, p + 1))}
              disabled={active === stages.length - 1}
              className="flex items-center gap-1.5 text-xs font-medium disabled:opacity-30 transition-opacity"
              style={{ color }}
            >
              Next
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
