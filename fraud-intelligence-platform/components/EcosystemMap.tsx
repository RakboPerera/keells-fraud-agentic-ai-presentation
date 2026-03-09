"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { agents, glowColor } from "@/data/agents";

/* ── Per-agent signal preview for the hover tooltip ─────────────────────── */
const AGENT_SIGNALS: Record<string, string[]> = {
  transaction_integrity:  ["Price overrides", "Refund frequency", "Transaction voids", "Discount application"],
  promotion_integrity:    ["Manual discounts", "Eligibility violations", "Bundle misuse", "Campaign timing"],
  inventory_shrinkage:    ["Delivery quantities", "Stock adjustments", "Wastage reporting", "Shrinkage gaps"],
  supplier_risk:          ["Invoice pricing", "Purchase orders", "Supplier trends", "Contract compliance"],
  nexus_loyalty_integrity:["Points accumulation", "Refund correlation", "Transaction alignment", "Redemption anomalies"],
};

/* ── Geometry ─────────────────────────────────────────────────────────────── */
const W = 700;
const H = 520;
const CX = W / 2;
const CY = H / 2;
const ORBIT_R = 190;

function pentagonPoint(i: number) {
  const angle = (i * 72 - 90) * (Math.PI / 180);
  return { x: CX + ORBIT_R * Math.cos(angle), y: CY + ORBIT_R * Math.sin(angle) };
}
const NODE_POSITIONS = agents.map((_, i) => pentagonPoint(i));

/* ── Component ────────────────────────────────────────────────────────────── */
export default function EcosystemMap() {
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);

  const hoveredAgent = hovered ? agents.find(a => a.slug === hovered) : null;

  return (
    <div className="w-full flex flex-col items-center gap-0">

      {/* ── SVG diagram ───────────────────────────────────────────────────── */}
      <div className="w-full max-w-2xl">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          aria-label="Fraud Intelligence Ecosystem diagram"
        >
          <defs>
            {/* Center gradient */}
            <radialGradient id="center-grad" cx="50%" cy="40%" r="60%">
              <stop offset="0%"   stopColor="#1e3a6e" />
              <stop offset="100%" stopColor="#071530" />
            </radialGradient>

            {/* Center glow */}
            <filter id="center-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>

            {/* Domain glow */}
            <filter id="domain-glow" x="-70%" y="-70%" width="240%" height="240%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>

            {/* Line glow */}
            <filter id="line-glow" x="-20%" y="-500%" width="140%" height="1100%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>

            {/* Per-domain gradients */}
            {agents.map((a) => (
              <radialGradient key={a.slug} id={`grad-${a.slug}`} cx="50%" cy="35%" r="65%">
                <stop offset="0%"   stopColor={a.color} stopOpacity="0.95" />
                <stop offset="100%" stopColor={a.color} stopOpacity="0.7" />
              </radialGradient>
            ))}

            {/* Connection paths (referenced by animateMotion) */}
            {agents.map((agent, i) => {
              const pos = NODE_POSITIONS[i];
              const dx = pos.x - CX, dy = pos.y - CY;
              const len = Math.hypot(dx, dy);
              const ux = dx / len, uy = dy / len;
              const x1 = CX + ux * 62, y1 = CY + uy * 62;
              const x2 = pos.x - ux * 44, y2 = pos.y - uy * 44;
              return (
                <path key={agent.slug} id={`conn-${agent.slug}`}
                  d={`M${x1},${y1} L${x2},${y2}`} fill="none" />
              );
            })}
          </defs>

          {/* ── Outer decorative orbit ring ──────────────────────────────── */}
          <g style={{ transformOrigin: `${CX}px ${CY}px`, animation: "orbit-spin 35s linear infinite" }}>
            <circle cx={CX} cy={CY} r={ORBIT_R + 18}
              fill="none"
              stroke="rgba(37,99,235,0.06)"
              strokeWidth="1"
              strokeDasharray="2 14"
            />
          </g>
          {/* Inner orbit track */}
          <circle cx={CX} cy={CY} r={ORBIT_R}
            fill="none"
            stroke="rgba(37,99,235,0.08)"
            strokeWidth="1"
            strokeDasharray="3 9"
          />

          {/* ── Connection lines + animated particles ─────────────────────── */}
          {agents.map((agent, i) => {
            const pos = NODE_POSITIONS[i];
            const isHov = hovered === agent.slug;
            const dx = pos.x - CX, dy = pos.y - CY;
            const len = Math.hypot(dx, dy);
            const ux = dx / len, uy = dy / len;
            const x1 = CX + ux * 62, y1 = CY + uy * 62;
            const x2 = pos.x - ux * 44, y2 = pos.y - uy * 44;

            return (
              <g key={agent.slug}>
                {/* Base track */}
                <line x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={isHov ? agent.color : "rgba(37,99,235,0.12)"}
                  strokeWidth={isHov ? 2.5 : 1}
                  strokeDasharray="5 6"
                  style={{ transition: "stroke 0.2s, stroke-width 0.2s" }}
                />

                {/* Glow overlay when hovered */}
                {isHov && (
                  <line x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={agent.color}
                    strokeWidth="4"
                    strokeOpacity="0.2"
                    filter="url(#line-glow)"
                  />
                )}

                {/* Animated flow dash */}
                <line x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={agent.color}
                  strokeWidth={isHov ? "2" : "1.5"}
                  strokeOpacity={isHov ? 0.9 : 0.25}
                  strokeDasharray="5 35"
                  className={isHov ? "flow-line-fast" : "flow-line"}
                  style={{ animationDelay: `${i * 0.36}s` }}
                />

                {/* Travelling particle dot */}
                <circle r={isHov ? "3" : "2"} fill={agent.color} opacity={isHov ? 0.95 : 0.45}>
                  <animateMotion
                    dur={isHov ? "0.8s" : `${1.6 + i * 0.25}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.4}s`}
                  >
                    <mpath href={`#conn-${agent.slug}`} />
                  </animateMotion>
                </circle>
              </g>
            );
          })}

          {/* ── Center node ───────────────────────────────────────────────── */}
          <g filter="url(#center-glow)">
            {/* Dual pulse rings */}
            <circle cx={CX} cy={CY} r={66}
              fill="none" stroke="rgba(37,99,235,0.3)" strokeWidth="1.5"
              className="pulse-ring"
            />
            <circle cx={CX} cy={CY} r={70}
              fill="none" stroke="rgba(37,99,235,0.15)" strokeWidth="1"
              className="pulse-ring-slow"
            />
            {/* Main circle */}
            <circle cx={CX} cy={CY} r={58} fill="url(#center-grad)" />
            {/* Accent ring */}
            <circle cx={CX} cy={CY} r={58}
              fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          </g>

          {/* Center labels */}
          <text x={CX} y={CY - 12} textAnchor="middle" dominantBaseline="middle"
            className="select-none" fill="white" fontSize="11" fontWeight="700" letterSpacing="0.5">
            Fraud Intelligence
          </text>
          <text x={CX} y={CY + 6} textAnchor="middle" dominantBaseline="middle"
            className="select-none" fill="rgba(255,255,255,0.75)" fontSize="9.5" fontWeight="500" letterSpacing="0.3">
            Platform
          </text>
          {/* Live indicator */}
          <g>
            <circle cx={CX - 10} cy={CY + 24} r="3" fill="#22c55e" className="live-dot" />
            <text x={CX - 4} y={CY + 24} dominantBaseline="middle"
              className="select-none" fill="rgba(255,255,255,0.4)" fontSize="7.5" letterSpacing="1.5">
              LIVE
            </text>
          </g>

          {/* ── Domain nodes ──────────────────────────────────────────────── */}
          {agents.map((agent, i) => {
            const pos = NODE_POSITIONS[i];
            const isHov = hovered === agent.slug;
            const lines = agent.diagramLabel.split("\n");

            return (
              <g
                key={agent.slug}
                style={{ cursor: "pointer" }}
                onClick={() => router.push(`/agent/${agent.slug}`)}
                onMouseEnter={() => setHovered(agent.slug)}
                onMouseLeave={() => setHovered(null)}
                role="button"
                aria-label={`Explore ${agent.shortTitle} agent`}
              >
                {/* Hover glow splash */}
                {isHov && (
                  <circle cx={pos.x} cy={pos.y} r={54}
                    fill={glowColor(agent.color)}
                    opacity="0.55"
                  />
                )}
                {/* Pulse ring on hover */}
                {isHov && (
                  <circle cx={pos.x} cy={pos.y} r={46}
                    fill="none"
                    stroke={agent.color}
                    strokeWidth="1"
                    strokeOpacity="0.5"
                    className="pulse-ring"
                  />
                )}

                {/* Main circle */}
                <circle
                  cx={pos.x} cy={pos.y}
                  r={isHov ? 42 : 38}
                  fill={`url(#grad-${agent.slug})`}
                  filter={isHov ? "url(#domain-glow)" : undefined}
                  style={{ transition: "r 0.2s cubic-bezier(0.22,1,0.36,1)" }}
                />
                <circle
                  cx={pos.x} cy={pos.y} r={isHov ? 42 : 38}
                  fill="none"
                  stroke={isHov ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)"}
                  strokeWidth={isHov ? "1.5" : "1"}
                  style={{ transition: "r 0.2s cubic-bezier(0.22,1,0.36,1)" }}
                />

                {/* Label */}
                {lines.map((line, li) => (
                  <text key={li}
                    x={pos.x}
                    y={pos.y + (li - (lines.length - 1) / 2) * 13}
                    textAnchor="middle" dominantBaseline="middle"
                    className="select-none"
                    fill="white"
                    fontSize={isHov ? "10" : "9.5"}
                    fontWeight="600"
                    letterSpacing="0.2"
                    style={{ transition: "font-size 0.15s" }}
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── Hover tooltip panel ───────────────────────────────────────────── */}
      <div
        className="w-full max-w-2xl px-2 transition-all duration-200"
        style={{
          minHeight: "90px",
          opacity: hoveredAgent ? 1 : 0,
          transform: hoveredAgent ? "translateY(0)" : "translateY(6px)",
          pointerEvents: hoveredAgent ? "auto" : "none",
        }}
      >
        {hoveredAgent && (
          <div
            className="rounded-2xl border p-5 flex flex-col sm:flex-row gap-4 items-start"
            style={{
              borderColor: `${hoveredAgent.color}30`,
              backgroundColor: `${hoveredAgent.color}08`,
            }}
          >
            {/* Agent label */}
            <div className="shrink-0">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-1"
                style={{ backgroundColor: `${hoveredAgent.color}20`, color: hoveredAgent.color }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: hoveredAgent.color }}
                />
              </div>
              <p className="text-xs font-bold" style={{ color: hoveredAgent.color }}>
                {hoveredAgent.shortTitle}
              </p>
            </div>

            {/* Signals */}
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-2">
                Monitors
              </p>
              <div className="flex flex-wrap gap-1.5">
                {(AGENT_SIGNALS[hoveredAgent.slug] ?? []).map((sig) => (
                  <span
                    key={sig}
                    className="px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: `${hoveredAgent.color}15`,
                      color: hoveredAgent.color,
                      border: `1px solid ${hoveredAgent.color}25`,
                    }}
                  >
                    {sig}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="shrink-0 self-center">
              <span
                className="text-xs font-semibold flex items-center gap-1"
                style={{ color: hoveredAgent.color }}
              >
                Click to explore
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── Legend pills ──────────────────────────────────────────────────── */}
      <div className="w-full max-w-2xl flex flex-wrap justify-center gap-2 mt-4">
        {agents.map((agent) => (
          <button
            key={agent.slug}
            onClick={() => router.push(`/agent/${agent.slug}`)}
            onMouseEnter={() => setHovered(agent.slug)}
            onMouseLeave={() => setHovered(null)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-150"
            style={{
              borderColor:     hovered === agent.slug ? agent.color : "var(--color-border)",
              color:           hovered === agent.slug ? agent.color : "var(--color-text-secondary)",
              backgroundColor: hovered === agent.slug ? `${agent.color}10` : "white",
              transform:       hovered === agent.slug ? "translateY(-1px)" : "none",
              boxShadow:       hovered === agent.slug ? `0 4px 12px ${agent.color}25` : "none",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: agent.color }}
            />
            {agent.shortTitle}
          </button>
        ))}
      </div>
    </div>
  );
}
