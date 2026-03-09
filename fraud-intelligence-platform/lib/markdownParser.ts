/**
 * lib/markdownParser.ts
 *
 * Parses structured markdown files from agents/{slug}/*.md
 *
 * These files use escaped markdown syntax produced during authoring:
 *   \# Heading    →  h1
 *   \## Heading   →  h2
 *   \- item       →  bullet
 *   \*\*bold\*\*  →  bold text
 *   • item        →  bullet (signals sections)
 *
 * The parser handles both escaped (\#) and standard (#) markdown.
 */

// ── Types ──────────────────────────────────────────────────────────────────────

export interface FraudScenario {
  number: number;
  title: string;
  intro: string;
  pattern: string[];
  riskSignal: string;
}

export interface WorkflowStage {
  number: number;
  /** Short display name used in the pipeline UI */
  shortName: string;
  /** Full name parsed from the markdown heading */
  fullName: string;
  description: string;
  bullets: string[];
}

export interface AnalyticsTechnique {
  name: string;
  description: string;
  examples: string[];
}

// ── Internal helpers ──────────────────────────────────────────────────────────

/** Strip markdown escape backslashes and inline formatting for plain display */
function cleanText(raw: string): string {
  return raw
    .replace(/\\\*\\\*/g, "")       // \*\* → remove bold markers
    .replace(/\*\*(.*?)\*\*/g, "$1") // **bold** → bold
    .replace(/\\\*/g, "")
    .replace(/\\#/g, "#")
    .replace(/\\-/g, "-")
    .replace(/\\_/g, "_")
    .replace(/  +/g, " ")           // collapse multiple spaces
    .trim();
}

/** True if a line is a heading of the given level (handles \## and ##) */
function isHeading(line: string, level: number): boolean {
  const prefix = "#".repeat(level) + " ";
  const escaped = "\\" + prefix;
  return line.startsWith(escaped) || line.startsWith(prefix);
}

/** Extract text from a heading line */
function headingText(line: string, level: number): string {
  const prefix = "#".repeat(level) + " ";
  const escaped = "\\" + prefix;
  const raw = line.startsWith(escaped)
    ? line.slice(escaped.length)
    : line.slice(prefix.length);
  return cleanText(raw);
}

/** True if a line is a bullet item (\- or • or - ) */
function isBullet(line: string): boolean {
  return (
    line.startsWith("\\- ") ||
    line.startsWith("- ")   ||
    line.startsWith("• ")
  );
}

/** Extract text from a bullet line */
function bulletText(line: string): string {
  const raw = line.startsWith("\\- ")
    ? line.slice(3)
    : line.startsWith("- ")
    ? line.slice(2)
    : line.slice(2); // •
  return cleanText(raw);
}

/**
 * Split markdown content into h2 sections.
 * Returns [{heading, lines}] where lines is the raw lines of the section body.
 */
function splitH2Sections(content: string): { heading: string; lines: string[] }[] {
  const sections: { heading: string; lines: string[] }[] = [];
  let current: { heading: string; lines: string[] } | null = null;

  for (const line of content.split("\n")) {
    if (isHeading(line, 2)) {
      if (current) sections.push(current);
      current = { heading: headingText(line, 2), lines: [] };
    } else if (current) {
      current.lines.push(line);
    }
  }
  if (current) sections.push(current);
  return sections;
}

/**
 * Convert raw body lines into cleaned paragraph text and bullet list.
 * Returns { paragraphs: string, bullets: string[] }
 */
function parseBody(lines: string[]): { text: string; bullets: string[] } {
  const bullets: string[] = [];
  const paragraphLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed === "---") continue;
    if (isBullet(trimmed)) {
      bullets.push(bulletText(trimmed));
    } else {
      paragraphLines.push(cleanText(trimmed));
    }
  }

  // Merge consecutive non-empty paragraph lines
  const text = paragraphLines.filter(Boolean).join(" ");
  return { text, bullets };
}

// ── Public parsers ─────────────────────────────────────────────────────────────

/**
 * Extract bullet-point signals from the "Signals Monitored" section
 * of an agent overview.md.
 */
export function parseSignalsMonitored(content: string | null): string[] {
  if (!content) return [];
  const sections = splitH2Sections(content);
  const sigSection = sections.find((s) =>
    s.heading.toLowerCase().includes("signal")
  );
  if (!sigSection) return [];
  return sigSection.lines
    .map((l) => l.trim())
    .filter(isBullet)
    .map(bulletText)
    .filter(Boolean);
}

/**
 * Extract the operational context prose and challenges from overview.md.
 */
export function parseOperationalContext(content: string | null): {
  context: string;
  challenges: string[];
} {
  if (!content) return { context: "", challenges: [] };
  const sections = splitH2Sections(content);

  const ctxSection = sections.find((s) =>
    s.heading.toLowerCase().includes("operational context")
  );
  const chalSection = sections.find((s) =>
    s.heading.toLowerCase().includes("challenge")
  );

  const { text: context } = ctxSection
    ? parseBody(ctxSection.lines)
    : { text: "" };

  const challenges = chalSection
    ? parseBody(chalSection.lines).bullets
    : [];

  return { context, challenges };
}

/**
 * Parse fraud_scenarios.md into an array of FraudScenario objects.
 * Extracts: title, intro paragraph, example pattern bullets, risk signal text.
 */
export function parseFraudScenarios(content: string | null): FraudScenario[] {
  if (!content) return [];
  const sections = splitH2Sections(content);
  const scenarios: FraudScenario[] = [];

  for (const section of sections) {
    // Scenario headings: "Scenario N: Title" or "Scenario N — Title"
    const match = section.heading.match(/^Scenario\s+(\d+)[:\s–—-]+(.+)/i);
    if (!match) continue;

    const number = parseInt(match[1], 10);
    const title = match[2].trim();
    const lines = section.lines.map((l) => l.trim()).filter(Boolean);

    const pattern: string[] = [];
    const introParts: string[] = [];
    let riskSignal = "";
    let inPattern = false;
    let inRiskSignal = false;

    for (const line of lines) {
      if (line === "---") continue;

      // Detect "Example pattern:" label
      if (/^example pattern/i.test(cleanText(line))) {
        inPattern = true;
        inRiskSignal = false;
        continue;
      }

      // Detect "Operational risk signal:" label
      if (/^operational risk signal/i.test(cleanText(line))) {
        inPattern = false;
        inRiskSignal = true;
        continue;
      }

      if (isBullet(line)) {
        if (inPattern) {
          pattern.push(bulletText(line));
        } else if (!inRiskSignal) {
          // General bullets before "Example pattern:" are intro context
          introParts.push(bulletText(line));
        }
      } else {
        const text = cleanText(line);
        if (!text) continue;
        if (inRiskSignal) {
          riskSignal = riskSignal ? `${riskSignal} ${text}` : text;
        } else if (!inPattern) {
          introParts.push(text);
        }
      }
    }

    scenarios.push({
      number,
      title,
      intro: introParts.slice(0, 2).join(" "), // first 1-2 sentences
      pattern,
      riskSignal,
    });
  }

  return scenarios;
}

// Stage display names from the task specification (in order)
const STAGE_SHORT_NAMES = [
  "Data Ingestion",
  "Signal Extraction",
  "Behavior Modeling",
  "Peer Benchmarking",
  "Anomaly Detection",
  "Investigation Intelligence",
];

/**
 * Parse agent_workflow.md into ordered WorkflowStage objects.
 * Maps the first 6 "Stage N:" headings to the canonical short names.
 */
export function parseWorkflowStages(content: string | null): WorkflowStage[] {
  if (!content) return [];
  const sections = splitH2Sections(content);
  const stages: WorkflowStage[] = [];

  for (const section of sections) {
    const match = section.heading.match(/^Stage\s+(\d+)[:\s–—-]+(.+)/i);
    if (!match) continue;

    const number = parseInt(match[1], 10);
    if (number > 6) continue; // only first 6 stages

    const fullName = match[2].trim();
    const shortName = STAGE_SHORT_NAMES[number - 1] ?? fullName;
    const { text: description, bullets } = parseBody(section.lines);

    stages.push({ number, shortName, fullName, description, bullets });
  }

  // Sort by number in case markdown order varies
  return stages.sort((a, b) => a.number - b.number);
}

// Analytics technique headings to exclude (intro / summary sections)
const ANALYTICS_SKIP = new Set([
  "analytical objective",
  "analytical outcome",
  "investigation intelligence generation",
]);

/**
 * Parse analytics_components.md into AnalyticsTechnique objects.
 * Returns the 5 core technique sections.
 */
export function parseAnalyticsTechniques(
  content: string | null
): AnalyticsTechnique[] {
  if (!content) return [];
  const sections = splitH2Sections(content);
  const techniques: AnalyticsTechnique[] = [];

  for (const section of sections) {
    const normalized = section.heading.toLowerCase();
    if (ANALYTICS_SKIP.has(normalized)) continue;

    const { text: description, bullets: examples } = parseBody(section.lines);
    if (!description && examples.length === 0) continue;

    techniques.push({
      name: section.heading,
      description,
      examples,
    });
  }

  return techniques;
}
