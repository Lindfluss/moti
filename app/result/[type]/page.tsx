"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getMochiById } from "@/data/mochi";
import { ResultCard } from "@/components/result/ResultCard";
import { PersonalityStats } from "@/components/result/PersonalityStats";

import type { QuizResult, TraitScores } from "@/types/quiz";

const RESULT_STORAGE_KEY = "mochi-quiz-result";

function isValidScores(value: unknown): value is TraitScores {
  if (!value || typeof value !== "object") return false;

  const traits = [
    "social",
    "emotional",
    "novelty",
    "order",
    "imagination",
    "independence",
  ] as const;

  return traits.every((trait) => {
    const score = (value as Record<string, unknown>)[trait];
    return typeof score === "number" && Number.isFinite(score);
  });
}

function isValidResult(value: unknown): value is QuizResult {
  if (!value || typeof value !== "object") return false;

  const result = value as Partial<QuizResult>;

  return (
    isValidScores(result.scores) &&
    Array.isArray(result.matches) &&
    result.matches.length >= 2 &&
    typeof result.primaryMochiId === "string" &&
    typeof result.secondaryMochiId === "string" &&
    result.matches.every(
      (match) =>
        typeof match?.mochiId === "string" &&
        typeof match?.similarity === "number" &&
        typeof match?.distance === "number",
    )
  );
}

export default function ResultPage() {
  const params = useParams<{ type: string }>();
  const router = useRouter();
  const mochiId = params.type;

  const [result, setResult] = useState<QuizResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedResult = sessionStorage.getItem(RESULT_STORAGE_KEY);

      if (!storedResult) {
        router.replace("/quiz");
        return;
      }

      const parsedResult: unknown = JSON.parse(storedResult);

      if (
        !isValidResult(parsedResult) ||
        parsedResult.primaryMochiId !== mochiId ||
        !getMochiById(parsedResult.primaryMochiId) ||
        !getMochiById(parsedResult.secondaryMochiId)
      ) {
        router.replace("/quiz");
        return;
      }

      setResult(parsedResult);
    } catch (error) {
      console.error("Не удалось загрузить результат теста:", error);
      router.replace("/quiz");
    } finally {
      setIsLoading(false);
    }
  }, [mochiId, router]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <p className="text-sm font-medium text-plum-soft">
          Собираем твоего моти... 🍡
        </p>
      </main>
    );
  }

  if (!result) return null;

  const mochi = getMochiById(result.primaryMochiId);
  const companion = getMochiById(result.secondaryMochiId);
  const primaryMatch = result.matches.find(
    (match) => match.mochiId === result.primaryMochiId,
  );

  if (!mochi || !companion || !primaryMatch) return null;

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8 text-center">
          <p className="text-4xl" aria-hidden="true">
            🍡
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-plum-soft">
            Твой результат готов
          </p>
          <h1 className="mt-2 text-2xl font-extrabold text-plum sm:text-3xl">
            Вот какой ты моти!
          </h1>
        </header>

        <div className="space-y-6">
          <ResultCard
            mochi={mochi}
            companion={companion}
            similarity={primaryMatch.similarity}
          />

          <PersonalityStats scores={result.scores} />

          <p className="px-4 text-center text-xs leading-relaxed text-plum-faint">
            Это развлекательный тест, а не психологическая диагностика.
            Выбирай то, что откликается именно тебе 💗
          </p>
        </div>
      </div>
    </main>
  );
}
