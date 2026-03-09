"use client";

import { useState } from "react";

interface SignalTagsProps {
  signals: string[];
  color: string;
}

export default function SignalTags({ signals, color }: SignalTagsProps) {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  if (signals.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {signals.map((signal, i) => {
        const isActive = activeTooltip === i;

        return (
          <div key={i} className="relative">
            <button
              onMouseEnter={() => setActiveTooltip(i)}
              onMouseLeave={() => setActiveTooltip(null)}
              onFocus={() => setActiveTooltip(i)}
              onBlur={() => setActiveTooltip(null)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 text-left"
              style={{
                borderColor: isActive ? color : `${color}25`,
                backgroundColor: isActive ? `${color}12` : `${color}08`,
                color: "var(--color-primary)",
                transform: isActive ? "translateY(-2px)" : "translateY(0)",
                boxShadow: isActive ? `0 6px 20px ${color}20` : "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              {/* Live dot indicator */}
              <span className="relative flex items-center justify-center shrink-0">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {isActive && (
                  <span
                    className="absolute w-4 h-4 rounded-full opacity-40 animate-ping"
                    style={{ backgroundColor: color }}
                  />
                )}
              </span>
              {signal}
            </button>

            {/* Tooltip */}
            {isActive && (
              <div
                className="signal-tag-tooltip absolute bottom-full left-0 mb-2 z-20 min-w-[220px] max-w-[280px]"
                style={{ animation: "fade-up 0.15s ease both" }}
              >
                <div
                  className="rounded-xl border px-4 py-3 shadow-lg"
                  style={{
                    backgroundColor: "white",
                    borderColor: `${color}25`,
                    boxShadow: `0 8px 30px ${color}15, 0 2px 8px rgba(0,0,0,0.08)`,
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full live-dot"
                      style={{ backgroundColor: color }}
                    />
                    <span
                      className="text-xs font-semibold uppercase tracking-wide"
                      style={{ color }}
                    >
                      Monitored Signal
                    </span>
                  </div>
                  {/* Signal description */}
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    {signal}
                  </p>
                  <p className="text-[11px] text-[var(--color-text-muted)] mt-2">
                    Analyzed continuously across all operational events
                  </p>
                </div>
                {/* Arrow */}
                <div
                  className="w-2.5 h-2.5 border-b border-r rotate-45 bg-white ml-4"
                  style={{ borderColor: `${color}25`, marginTop: "-5px" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
