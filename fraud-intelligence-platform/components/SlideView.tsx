"use client";

import { useState, useEffect, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface SlideDefinition {
  id: string;
  label: string;
  content: ReactNode;
}

interface SlideViewProps {
  slides: SlideDefinition[];
  color: string;
  initialSlide?: number;
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

export default function SlideView({
  slides,
  color,
  initialSlide = 0,
}: SlideViewProps) {
  const [current, setCurrent] = useState(initialSlide);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= slides.length) return;
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current, slides.length]
  );

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const hasPrev = current > 0;
  const hasNext = current < slides.length - 1;

  return (
    <div
      className="relative overflow-hidden select-none"
      style={{ height: "calc(100vh - 3.5rem)" }}
    >
      {/* ── Slide content ───────────────────────────────────────────────── */}
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          {slides[current].content}
        </motion.div>
      </AnimatePresence>

      {/* ── Prev button ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {hasPrev && (
          <motion.button
            key="prev-btn"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
            onClick={prev}
            className="absolute left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
            style={{
              backgroundColor: `${color}15`,
              border: `1px solid ${color}30`,
              color,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${color}50`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
            aria-label="Previous slide"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Next button ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {hasNext && (
          <motion.button
            key="next-btn"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.2 }}
            onClick={next}
            className="absolute right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
            style={{
              backgroundColor: `${color}15`,
              border: `1px solid ${color}30`,
              color,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${color}50`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
            aria-label="Next slide"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Progress dots ───────────────────────────────────────────────── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => goTo(i)}
            title={slide.label}
            className="transition-all duration-300 rounded-full cursor-pointer"
            style={{
              width: i === current ? "22px" : "8px",
              height: "8px",
              backgroundColor: i === current ? color : `${color}35`,
            }}
            aria-label={`Slide ${i + 1}: ${slide.label}`}
          />
        ))}
      </div>

      {/* ── Slide counter ───────────────────────────────────────────────── */}
      <div
        className="absolute bottom-[18px] right-8 z-30 text-[11px] font-semibold tabular-nums"
        style={{ color: `${color}60` }}
      >
        {String(current + 1).padStart(2, "0")} /{" "}
        {String(slides.length).padStart(2, "0")}
      </div>

      {/* ── Keyboard hint ───────────────────────────────────────────────── */}
      <div
        className="absolute bottom-[18px] left-8 z-30 flex items-center gap-1.5 text-[10px]"
        style={{ color: `${color}45` }}
      >
        <kbd
          className="px-1.5 py-0.5 rounded text-[9px] font-mono"
          style={{
            border: `1px solid ${color}25`,
            backgroundColor: `${color}08`,
          }}
        >
          ←
        </kbd>
        <kbd
          className="px-1.5 py-0.5 rounded text-[9px] font-mono"
          style={{
            border: `1px solid ${color}25`,
            backgroundColor: `${color}08`,
          }}
        >
          →
        </kbd>
        <span>navigate</span>
      </div>
    </div>
  );
}
