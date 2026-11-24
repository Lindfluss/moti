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
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      className={`
        flex w-full items-center gap-4 rounded-2xl border-2
        p-4 text-left transition-colors duration-200
        sm:p-5
        ${
          selected
            ? "border-[#51405E] bg-[#E9DDF8]"
            : "border-[#F0E4E9] bg-white hover:border-[#DCC9E8]"
        }
      `}
    >
      <span
        className={`
          flex h-9 w-9 shrink-0 items-center justify-center
          rounded-xl text-sm font-bold
          ${
            selected
              ? "bg-[#51405E] text-white"
              : "bg-[#F9E8EF] text-[#51405E]"
          }
        `}
      >
        {label}
      </span>

      <span className="text-sm font-medium leading-relaxed text-[#51405E] sm:text-base">
        {text}
      </span>

      <span
        className={`
          ml-auto flex h-6 w-6 shrink-0 items-center justify-center
          rounded-full border-2
          ${
            selected
              ? "border-[#51405E] bg-[#51405E]"
              : "border-[#DCCED8]"
          }
        `}
      >
        {selected && (
          <span className="h-2 w-2 rounded-full bg-white" />
        )}
      </span>
    </motion.button>
  );
}