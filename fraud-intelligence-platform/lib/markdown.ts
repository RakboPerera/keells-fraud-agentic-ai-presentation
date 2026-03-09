/**
 * lib/markdown.ts
 *
 * Server-only utility for loading markdown content from the repository.
 *
 * Directory layout (relative to the Next.js project root):
 *
 *   ../agents/{agentSlug}/overview.md
 *   ../agents/{agentSlug}/fraud_scenarios.md
 *   ../agents/{agentSlug}/agent_workflow.md
 *   ../agents/{agentSlug}/analytics_components.md
 *
 * All functions are async and must only be called from Server Components,
 * Route Handlers, or generateStaticParams — never from client components.
 *
 * Return value: raw markdown string, or null when the file does not exist.
 * Callers decide how to handle a missing file (show fallback, notFound(), etc.)
 */

import { readFile } from "fs/promises";
import path from "path";
import { agentSlugs } from "@/data/agents";

// ── Path resolution ────────────────────────────────────────────────────────────
//
// process.cwd() is the Next.js project root: .../Keells Fraud Demo/fraud-intelligence-platform
// The markdown repository lives one directory up.
//
const REPO_ROOT = path.resolve(process.cwd(), "..");
const AGENTS_DIR = path.join(REPO_ROOT, "agents");

/**
 * Resolve the absolute path for a given agent file.
 * Validates the agent slug against the known list to prevent path traversal.
 */
function resolveAgentFile(agentSlug: string, filename: string): string {
  if (!agentSlugs.includes(agentSlug)) {
    throw new Error(
      `Unknown agent slug "${agentSlug}". Valid slugs: ${agentSlugs.join(", ")}`
    );
  }
  return path.join(AGENTS_DIR, agentSlug, filename);
}

// ── Core reader ────────────────────────────────────────────────────────────────

/**
 * Read a markdown file and return its contents as a string.
 * Returns null if the file does not exist so callers can render a graceful fallback.
 * Re-throws unexpected filesystem errors (permissions, etc.).
 */
async function readMarkdownFile(filePath: string): Promise<string | null> {
  try {
    const content = await readFile(filePath, "utf-8");
    return content;
  } catch (err: unknown) {
    if (isNodeError(err) && err.code === "ENOENT") {
      return null;
    }
    throw err;
  }
}

function isNodeError(err: unknown): err is NodeJS.ErrnoException {
  return typeof err === "object" && err !== null && "code" in err;
}

// ── Public API ─────────────────────────────────────────────────────────────────

/**
 * Load agents/{agentSlug}/overview.md
 *
 * Contains: operational context, agent mandate, data sources monitored.
 * Used by: /app/agent/[agent]/page.tsx — header section.
 */
export async function getAgentOverview(agentSlug: string): Promise<string | null> {
  return readMarkdownFile(resolveAgentFile(agentSlug, "overview.md"));
}

/**
 * Load agents/{agentSlug}/fraud_scenarios.md
 *
 * Contains: named fraud scenarios with behavioral patterns, signals, investigation examples.
 * Used by: /app/agent/[agent]/page.tsx — fraud scenarios section.
 */
export async function getFraudScenarios(agentSlug: string): Promise<string | null> {
  return readMarkdownFile(resolveAgentFile(agentSlug, "fraud_scenarios.md"));
}

/**
 * Load agents/{agentSlug}/agent_workflow.md
 *
 * Contains: analytical pipeline stages, data transformations, detection logic.
 * Used by: /app/agent/[agent]/page.tsx — workflow pipeline section.
 */
export async function getAgentWorkflow(agentSlug: string): Promise<string | null> {
  return readMarkdownFile(resolveAgentFile(agentSlug, "agent_workflow.md"));
}

/**
 * Load agents/{agentSlug}/analytics_components.md
 *
 * Contains: KPIs, risk signals, chart definitions, investigation output formats.
 * Used by: /app/agent/[agent]/page.tsx — analytics & signals section.
 */
export async function getAnalyticsComponents(agentSlug: string): Promise<string | null> {
  return readMarkdownFile(resolveAgentFile(agentSlug, "analytics_components.md"));
}

// ── Convenience: load all files for an agent in parallel ──────────────────────

export interface AgentMarkdown {
  overview:           string | null;
  fraudScenarios:     string | null;
  agentWorkflow:      string | null;
  analyticsComponents: string | null;
}

/**
 * Load all four markdown files for an agent in a single parallel call.
 * Use this inside generateStaticParams or Server Component data fetching
 * when you need all sections at once.
 *
 * Example:
 *   const md = await getAgentMarkdown("transaction_integrity");
 */
export async function getAgentMarkdown(agentSlug: string): Promise<AgentMarkdown> {
  const [overview, fraudScenarios, agentWorkflow, analyticsComponents] =
    await Promise.all([
      getAgentOverview(agentSlug),
      getFraudScenarios(agentSlug),
      getAgentWorkflow(agentSlug),
      getAnalyticsComponents(agentSlug),
    ]);

  return { overview, fraudScenarios, agentWorkflow, analyticsComponents };
}
