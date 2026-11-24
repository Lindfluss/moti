"use client";

import { motion } from "motion/react";

interface QuizOptionProps {
  text: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function QuizOption({
  text,
  label,
  selected,
  onClick,
}: QuizOptionProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
      className={`
        flex min-h-[4.25rem] w-full items-center gap-3 rounded-2xl border-2
        p-3.5 text-left transition-colors duration-200
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum
        sm:gap-4 sm:p-5
        ${
          selected
            ? "border-plum bg-lavender"
            : "border-lavender-track bg-card hover:border-lavender-border"
        }
      `}
    >
      <span
        className={`
          flex h-9 w-9 shrink-0 items-center justify-center
          rounded-xl text-sm font-bold
          ${
            selected
              ? "bg-plum text-white"
              : "bg-mochi-pink text-plum"
          }
        `}
      >
        {label}
      </span>

      <span className="min-w-0 flex-1 text-sm font-medium leading-relaxed text-plum sm:text-base">
        {text}
      </span>

      <span
        className={`
          flex h-6 w-6 shrink-0 items-center justify-center
          rounded-full border-2
          ${
            selected
              ? "border-plum bg-plum"
              : "border-lavender-border"
          }
        `}
        aria-hidden="true"
      >
        {selected && <span className="h-2 w-2 rounded-full bg-white" />}
      </span>
    </motion.button>
  );
}
