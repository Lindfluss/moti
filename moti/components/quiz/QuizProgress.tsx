"use client";

import { motion } from "motion/react";

interface QuizProgressProps {
  current: number;
  total: number;
}

export function QuizProgress({
  current,
  total,
}: QuizProgressProps) {
  const progress = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-[#51405E]">
          Твой путь к моти
        </span>

        <span className="text-sm font-medium text-[#8B7A91]">
          {current} из {total}
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-[#F0E4E9]">
        <motion.div
          className="h-full rounded-full bg-[#B99ACF]"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}