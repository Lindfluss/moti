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

      // Сохраняем результат, чтобы использовать его на странице моти.
      sessionStorage.setItem(
        "mochi-quiz-result",
        JSON.stringify(result),
      );

      router.push(`/result/${result.primaryMochiId}`);
    } catch (error) {
      console.error("Не удалось рассчитать результат:", error);
      setIsFinishing(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F9E8EF] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto flex min-h-[80vh] max-w-2xl flex-col">
        <header className="mb-10 text-center">
          <div className="mb-3 text-4xl">🍡</div>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9B83A5]">
            Какой ты моти?
          </p>

          <h1 className="mt-3 text-2xl font-bold text-[#51405E] sm:text-3xl">
            Давай узнаем!
          </h1>
        </header>

        <QuizProgress
          current={currentIndex + 1}
          total={questions.length}
        />

        <div className="my-auto py-10">
          <AnimatePresence mode="wait">
            <motion.section
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-6">
                <span className="mb-3 inline-block rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#9B83A5]">
                  ВОПРОС {currentIndex + 1}
                </span>

                <h2 className="text-2xl font-bold leading-snug text-[#51405E] sm:text-3xl">
                  {currentQuestion.prompt}
                </h2>

                <p className="mt-3 text-sm text-[#8B7A91]">
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

        <footer className="mt-auto flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={goBack}
            disabled={currentIndex === 0 || isFinishing}
            className="rounded-xl px-5 py-3 text-sm font-semibold text-[#786783] transition hover:bg-white/60 disabled:cursor-not-allowed disabled:opacity-30"
          >
            ← Назад
          </button>

          <button
            type="button"
            onClick={goNext}
            disabled={!selectedAnswer || isFinishing}
            className="rounded-xl bg-[#51405E] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#51405E]/15 transition hover:bg-[#675477] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isFinishing
              ? "Считаем..."
              : isLastQuestion
                ? "Узнать своего моти 🍡"
                : "Дальше →"}
          </button>
        </footer>

        <p className="mt-6 text-center text-xs text-[#A28FA5]">
          Не думай слишком долго — выбирай сердцем 💗
        </p>
      </div>
    </main>
  );
}