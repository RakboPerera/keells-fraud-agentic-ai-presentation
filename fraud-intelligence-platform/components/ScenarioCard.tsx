import type { FraudScenario } from "@/lib/markdownParser";

interface ScenarioCardProps {
  scenario: FraudScenario;
  color: string;
  /** Position index (0-based) for stagger animation class */
  index: number;
}

export default function ScenarioCard({ scenario, color, index }: ScenarioCardProps) {
  const bg = `${color}10`;
  const border = `${color}30`;

  return (
    <div
      className="flex flex-col bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden hover:shadow-md transition-shadow duration-200"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Colored header strip */}
      <div
        className="px-6 py-4 flex items-center gap-3"
        style={{ backgroundColor: bg, borderBottom: `1px solid ${border}` }}
      >
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{ backgroundColor: color }}
        >
          {scenario.number}
        </span>
        <h3 className="font-semibold text-[var(--color-primary)] text-sm leading-tight">
          {scenario.title}
        </h3>
      </div>

      {/* Body */}
      <div className="px-6 py-5 flex flex-col gap-4 flex-1">
        {/* Intro */}
        {scenario.intro && (
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            {scenario.intro}
          </p>
        )}

        {/* Pattern signals */}
        {scenario.pattern.length > 0 && (
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wide mb-2"
              style={{ color }}
            >
              Behavioral Pattern
            </p>
            <ul className="flex flex-col gap-1.5">
              {scenario.pattern.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                  <span
                    className="w-1 h-1 rounded-full mt-2 shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Risk signal */}
        {scenario.riskSignal && (
          <div
            className="mt-auto pt-4 border-t"
            style={{ borderColor: border }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide mb-1.5 text-[var(--color-text-muted)]">
              Risk Signal
            </p>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed italic">
              {scenario.riskSignal}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
