"use client";

import { motion } from "motion/react";

interface QuizProgressProps {
  current: number;
  total: number;
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  const progress = (current / total) * 100;

  return (
    <div
      className="w-full"
      role="progressbar"
      aria-label="Прогресс прохождения теста"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-plum">
          Твой путь к моти
        </span>

        <span className="text-sm font-medium tabular-nums text-plum-muted">
          {current} из {total}
        </span>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-lavender-track sm:h-3">
        <motion.div
          className="h-full rounded-full bg-lavender-accent"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
