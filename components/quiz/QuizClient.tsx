"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

import { questions } from "@/data/questions";
import { calculateQuizResult } from "@/lib/result-calculator";

import { QuizOption } from "@/components/quiz/QuizOption";
import { QuizProgress } from "@/components/quiz/QuizProgress";

import type { QuizAnswers } from "@/types/quiz";

const optionLabels = ["A", "B", "C", "D"];

export function QuizClient() {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [isFinishing, setIsFinishing] = useState(false);

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentQuestion.id];

  const isLastQuestion = currentIndex === questions.length - 1;

  function selectAnswer(optionId: string) {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: optionId,
    }));
  }

  function goBack() {
    if (currentIndex > 0) {
      setCurrentIndex((previous) => previous - 1);
    }
  }

  function goNext() {
    if (!selectedAnswer) return;

    if (!isLastQuestion) {
      setCurrentIndex((previous) => previous + 1);
      return;
    }

    finishQuiz();
  }

  function finishQuiz() {
    if (isFinishing) return;

    setIsFinishing(true);

    try {
      const result = calculateQuizResult(answers);

      sessionStorage.setItem("mochi-quiz-result", JSON.stringify(result));
      router.push(`/result/${result.primaryMochiId}`);
    } catch (error) {
      console.error("Не удалось рассчитать результат:", error);
      setIsFinishing(false);
    }
  }

  return (
    <main className="min-h-svh bg-mochi-pink px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-5 text-plum sm:px-6 sm:py-10">
      <div className="mx-auto flex min-h-[calc(100svh-2.5rem-env(safe-area-inset-bottom))] w-full max-w-2xl flex-col sm:min-h-[80svh]">
        <header className="mb-7 text-center sm:mb-10">
          <div className="mb-2 text-3xl sm:mb-3 sm:text-4xl" aria-hidden="true">
            🍡
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-plum-soft sm:text-sm sm:tracking-[0.2em]">
            Какой ты моти?
          </p>
          <h1 className="mt-2 text-2xl font-bold text-plum sm:mt-3 sm:text-3xl">
            Давай узнаем!
          </h1>
        </header>

        <QuizProgress current={currentIndex + 1} total={questions.length} />

        <div className="flex flex-1 flex-col justify-center py-7 sm:py-10">
          <AnimatePresence mode="wait">
            <motion.section
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-5 sm:mb-6">
                <span className="mb-3 inline-flex min-h-8 items-center rounded-full bg-card px-4 py-2 text-[11px] font-bold tracking-wide text-plum-soft sm:text-xs">
                  ВОПРОС {currentIndex + 1}
                </span>

                <h2 className="text-[1.4rem] font-bold leading-snug text-plum sm:text-3xl">
                  {currentQuestion.prompt}
                </h2>

                <p className="mt-3 text-sm leading-6 text-plum-muted">
                  Выбери вариант, который больше всего похож на тебя
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {currentQuestion.options.map((option, index) => (
                  <QuizOption
                    key={option.id}
                    label={optionLabels[index]}
                    text={option.text}
                    selected={selectedAnswer === option.id}
                    onClick={() => selectAnswer(option.id)}
                  />
                ))}
              </div>
            </motion.section>
          </AnimatePresence>
        </div>

        <footer className="mt-auto border-t border-lavender-border/50 pt-4 sm:border-0 sm:pt-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goBack}
              disabled={currentIndex === 0 || isFinishing}
              className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full px-4 text-sm font-semibold text-plum-soft transition hover:bg-card/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum disabled:cursor-not-allowed disabled:opacity-30 sm:px-5"
            >
              ← Назад
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={!selectedAnswer || isFinishing}
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-plum px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-plum/15 transition hover:bg-plum-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none sm:px-7"
            >
              {isFinishing
                ? "Считаем..."
                : isLastQuestion
                  ? "Узнать своего моти 🍡"
                  : "Дальше →"}
            </button>
          </div>

          <p className="mt-4 text-center text-xs text-plum-faint">
            Не думай слишком долго — выбирай сердцем 💗
          </p>
        </footer>
      </div>
    </main>
  );
}
