/**
 * agents.ts — Single source of truth for all fraud intelligence agent definitions.
 *
 * Consumed by:
 *   components/AgentCard.tsx        — card icon, color, description
 *   components/EcosystemMap.tsx     — SVG node color, label, glow
 *   components/Navigation.tsx       — dropdown links
 *   app/agent/[agent]/page.tsx      — route validation, generateStaticParams
 *   app/page.tsx                    — landing agent grid
 *   app/ecosystem/page.tsx          — ecosystem agent grid
 *
 * Slugs match the dynamic route /agent/[agent] and the agents/ directory structure.
 */

export type AgentIcon =
  | "credit-card"
  | "tag"
  | "package"
  | "alert-triangle"
  | "heart";

export interface Agent {
  /** Matches /agent/[agent] route and agents/ directory slug */
  slug: string;
  /** Full title used in headings and page titles */
  title: string;
  /** Abbreviated title used in the navigation dropdown and legend pills */
  shortTitle: string;
  /** Two-line label rendered inside SVG ecosystem nodes (use \n as break) */
  diagramLabel: string;
  /** One-sentence description for AgentCard and page subtitles */
  description: string;
  /** Hex accent color — used for icons, borders, SVG nodes and glow effects */
  color: string;
  /** Icon identifier — rendered to SVG by lib/agentIcon.tsx */
  icon: AgentIcon;
}

export const agents: Agent[] = [
  {
    slug: "transaction_integrity",
    title: "Transaction Integrity",
    shortTitle: "Transaction",
    diagramLabel: "Transaction\nIntegrity",
    description:
      "Monitors cashier behavior, refunds, price overrides and transaction voids across every point-of-sale to detect manipulation patterns.",
    color: "#2563eb",
    icon: "credit-card",
  },
  {
    slug: "promotion_integrity",
    title: "Promotion & Discount Integrity",
    shortTitle: "Promotion",
    diagramLabel: "Promotion\nIntegrity",
    description:
      "Analyzes promotion eligibility rules and cashier-level discount behavior to detect misuse of promotional mechanisms.",
    color: "#7c3aed",
    icon: "tag",
  },
  {
    slug: "inventory_shrinkage",
    title: "Inventory & Shrinkage",
    shortTitle: "Inventory",
    diagramLabel: "Inventory &\nShrinkage",
    description:
      "Reconciles deliveries, stock adjustments and wastage reporting across the supply chain to surface emerging shrinkage risk.",
    color: "#059669",
    icon: "package",
  },
  {
    slug: "supplier_risk",
    title: "Procurement & Supplier Risk",
    shortTitle: "Supplier",
    diagramLabel: "Supplier\nRisk",
    description:
      "Evaluates supplier pricing trends, purchase order activity and invoice patterns to identify procurement irregularities.",
    color: "#d97706",
    icon: "alert-triangle",
  },
  {
    slug: "nexus_loyalty_integrity",
    title: "Nexus Loyalty Integrity",
    shortTitle: "Nexus",
    diagramLabel: "Nexus\nLoyalty",
    description:
      "Tracks loyalty points across purchases and refunds to detect accumulation patterns inconsistent with underlying transactions.",
    color: "#0ea5e9",
    icon: "heart",
  },
];

/** Lookup an agent by slug. Returns undefined if not found. */
export function getAgent(slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug);
}

/** All valid agent slugs — use for route validation and generateStaticParams. */
export const agentSlugs = agents.map((a) => a.slug);

/**
 * Derive a glow color from a hex accent color.
 * Used by EcosystemMap for SVG hover glow fills.
 */
export function glowColor(hex: string): string {
  return `${hex}59`; // 35% opacity suffix
}
