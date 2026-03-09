"use client";

import { useState } from "react";

interface InvestigationData {
  anomaly: string;
  deviation: string;
  severity: "Critical" | "High" | "Medium";
  action: string;
  metrics: { label: string; value: string }[];
}

const INVESTIGATION_DATA: Record<string, InvestigationData> = {
  transaction_integrity: {
    anomaly:
      "Cashier ID C-2847 applied manual price overrides on 23 transactions within a 4-hour shift window, totalling LKR 184,600 in discounts — 8.4× above the store peer average.",
    deviation:
      "Behavioral profiling shows this cashier's override rate spiked from a 90-day baseline of 2.1 overrides/shift to 23 overrides in a single shift. All overrides occurred on high-margin items during low-supervisor-presence hours (14:00–18:00).",
    severity: "Critical",
    action:
      "Flag for immediate supervisor review. Freeze override permissions pending audit. Cross-reference transactions against CCTV timestamps and loyalty redemption records for the identified window.",
    metrics: [
      { label: "Transactions Flagged", value: "23" },
      { label: "Total Discount Value", value: "LKR 184,600" },
      { label: "Baseline Deviation", value: "8.4×" },
      { label: "Detection Confidence", value: "94%" },
    ],
  },
  promotion_integrity: {
    anomaly:
      "Staff ID E-1193 redeemed the 'Weekend Bundle' promotion 14 times across 3 store branches in a single weekend, bypassing the household limit of 2 redemptions by using alternate loyalty accounts linked to shared address data.",
    deviation:
      "Network graph analysis identified 6 loyalty IDs sharing the same residential address. Redemption timestamps show a coordinated pattern across Nugegoda, Colombo 3, and Nawala branches within 48 hours — inconsistent with normal household shopping behavior.",
    severity: "High",
    action:
      "Suspend all 6 linked loyalty accounts pending investigation. Alert regional loss prevention. Review eligibility logic for multi-branch household deduplication in campaign configuration.",
    metrics: [
      { label: "Redemptions Flagged", value: "14" },
      { label: "Linked Accounts", value: "6" },
      { label: "Branches Involved", value: "3" },
      { label: "Detection Confidence", value: "91%" },
    ],
  },
  inventory_shrinkage: {
    anomaly:
      "Produce department at Branch 12 (Kandy) recorded 340 kg of vegetable wastage over 8 days — 3.1× above the network median for comparable stores. Cross-referencing delivery manifests reveals a 127 kg discrepancy between received and recorded stock.",
    deviation:
      "Delivery receipt signatures match, but IoT weight sensor logs at the receiving dock show consistent underweight readings versus invoice quantities for the same supplier across 11 deliveries. The gap correlates with a single receiving staff rotation.",
    severity: "High",
    action:
      "Initiate physical stock count at Branch 12 produce storage. Request supplier delivery reconciliation for the past 30 days. Review receiving staff schedule against discrepancy timeline and escalate to supply chain audit.",
    metrics: [
      { label: "Wastage Recorded", value: "340 kg" },
      { label: "Stock Discrepancy", value: "127 kg" },
      { label: "Deliveries Affected", value: "11" },
      { label: "Detection Confidence", value: "88%" },
    ],
  },
  supplier_risk: {
    anomaly:
      "Supplier S-0472 (ambient beverages) submitted 9 invoices in the past 45 days with unit prices averaging 22% above contracted rates, totalling an overbilling exposure of LKR 2.3M. Purchase orders were approved without price variance alerts.",
    deviation:
      "Contract price benchmarking shows systematic upward drift across 4 SKUs. The pricing anomaly began immediately after a procurement officer change on 15 Jan. Invoice approval turnaround dropped from 5.2 days to 1.1 days — below standard review threshold.",
    severity: "Critical",
    action:
      "Halt further payments to Supplier S-0472 pending contract review. Initiate AP audit for all invoices approved by the identified officer since 15 Jan. Escalate to procurement compliance and legal for potential contract renegotiation.",
    metrics: [
      { label: "Invoices Flagged", value: "9" },
      { label: "Overbilling Exposure", value: "LKR 2.3M" },
      { label: "Price Deviation", value: "+22%" },
      { label: "Detection Confidence", value: "96%" },
    ],
  },
  nexus_loyalty_integrity: {
    anomaly:
      "Loyalty account NX-88241 accumulated 47,800 points over 12 days through 31 transactions — an accumulation rate 19× above the active member average. Points were immediately redeemed for LKR 47,800 in gift vouchers before the review window closed.",
    deviation:
      "Transaction clustering analysis shows all 31 transactions occurred at 2 terminals in the same store, with inter-transaction gaps under 4 minutes. Receipt-level analysis reveals 28 of 31 transactions were partially voided and re-rung — a pattern consistent with points injection via void manipulation.",
    severity: "Critical",
    action:
      "Freeze account NX-88241 and reverse unspent vouchers. Identify and interview cashier operating the 2 flagged terminals. Cross-reference void patterns against all loyalty accounts transacting at these terminals in the same window.",
    metrics: [
      { label: "Points Accumulated", value: "47,800" },
      { label: "Transactions Flagged", value: "31" },
      { label: "Accumulation Rate", value: "19× avg" },
      { label: "Detection Confidence", value: "97%" },
    ],
  },
};

const SEVERITY_CONFIG = {
  Critical: { color: "#dc2626", bg: "#fef2f2", border: "#fecaca", dot: "#dc2626" },
  High:     { color: "#d97706", bg: "#fffbeb", border: "#fde68a", dot: "#d97706" },
  Medium:   { color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe", dot: "#2563eb" },
};

interface InvestigationOutputProps {
  agentSlug: string;
  color: string;
}

export default function InvestigationOutput({ agentSlug, color }: InvestigationOutputProps) {
  const [expanded, setExpanded] = useState(false);
  const data = INVESTIGATION_DATA[agentSlug];
  if (!data) return null;

  const sev = SEVERITY_CONFIG[data.severity];

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: `${color}25` }}
    >
      {/* Header bar */}
      <div
        className="px-6 py-4 flex items-center justify-between gap-4"
        style={{ backgroundColor: `${color}08`, borderBottom: `1px solid ${color}15` }}
      >
        <div className="flex items-center gap-3">
          {/* Simulated badge */}
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{ backgroundColor: `${color}18`, color }}
          >
            Simulated Output
          </span>
          <span className="text-xs text-[var(--color-text-muted)]">
            Example investigation summary generated by the agent
          </span>
        </div>

        {/* Severity chip */}
        <div
          className="flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold shrink-0"
          style={{ backgroundColor: sev.bg, borderColor: sev.border, color: sev.color }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sev.dot }} />
          {data.severity} Risk
        </div>
      </div>

      {/* Metrics strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[var(--color-border)] bg-white">
        {data.metrics.map(({ label, value }) => (
          <div key={label} className="px-5 py-4 flex flex-col gap-1">
            <span className="text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
              {label}
            </span>
            <span className="text-lg font-bold" style={{ color }}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="bg-white px-6 py-6 flex flex-col gap-6 border-t border-[var(--color-border)]">

        {/* Anomaly description */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className="w-1 h-4 rounded-full"
              style={{ backgroundColor: color }}
            />
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
              Anomaly Detected
            </p>
          </div>
          <p className="text-sm text-[var(--color-text-primary)] leading-relaxed pl-3">
            {data.anomaly}
          </p>
        </div>

        {/* Behavioral deviation — toggle */}
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 mb-2 group w-full text-left"
          >
            <span
              className="w-1 h-4 rounded-full transition-opacity"
              style={{ backgroundColor: color, opacity: expanded ? 1 : 0.4 }}
            />
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)] transition-colors flex-1">
              Behavioral Deviation Analysis
            </p>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-200 shrink-0"
              style={{
                color: expanded ? color : "var(--color-text-muted)",
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              }}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          {expanded && (
            <div
              className="px-4 py-3 rounded-xl text-sm text-[var(--color-text-secondary)] leading-relaxed"
              style={{ backgroundColor: `${color}06`, border: `1px solid ${color}15` }}
            >
              {data.deviation}
            </div>
          )}
          {!expanded && (
            <p className="text-sm text-[var(--color-text-muted)] pl-3 italic truncate">
              {data.deviation.slice(0, 90)}…
            </p>
          )}
        </div>

        {/* Recommended action */}
        <div
          className="flex gap-3 px-4 py-4 rounded-xl border"
          style={{ backgroundColor: `${sev.bg}`, borderColor: sev.border }}
        >
          {/* Icon */}
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
            style={{ backgroundColor: sev.color + "18" }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={sev.color} strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
            </svg>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide mb-1" style={{ color: sev.color }}>
              Recommended Action
            </p>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {data.action}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
