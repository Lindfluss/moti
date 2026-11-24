"use client";

import { Suspense, useEffect, useSyncExternalStore } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { getMochiById } from "@/data/mochi";
import { ResultCard } from "@/components/result/ResultCard";
import { PersonalityStats } from "@/components/result/PersonalityStats";

import type { QuizResult, TraitScores } from "@/types/quiz";

const RESULT_STORAGE_KEY = "mochi-quiz-result";

function subscribeToResult(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("popstate", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("popstate", callback);
  };
}

function getResultSnapshot(): string {
  try {
    const sharedData = new URLSearchParams(window.location.search).get("shared");

    if (sharedData) {
      const base64 = sharedData.replace(/-/g, "+").replace(/_/g, "/");
      const binary = atob(base64);
      const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
      return new TextDecoder().decode(bytes);
    }

    return sessionStorage.getItem(RESULT_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

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

function ResultPageContent() {
  const params = useParams<{ type: string }>();
  const router = useRouter();
  const mochiId = params.type;

  const resultData = useSyncExternalStore(
    subscribeToResult,
    getResultSnapshot,
    () => null,
  );

  let result: QuizResult | null = null;

  if (resultData) {
    try {
      const parsedResult: unknown = JSON.parse(resultData);

      if (
        isValidResult(parsedResult) &&
        parsedResult.primaryMochiId === mochiId &&
        getMochiById(parsedResult.primaryMochiId) &&
        getMochiById(parsedResult.secondaryMochiId)
      ) {
        result = parsedResult;
      }
    } catch {
      // Некорректные данные будут обработаны перенаправлением ниже.
    }
  }

  useEffect(() => {
    if (resultData !== null && !result) {
      router.replace("/quiz");
    }
  }, [resultData, result, router]);

  if (resultData === null) {
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
    <main className="min-h-svh bg-background px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-6 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-6 sm:mb-8">
          <div className="mb-6 flex justify-center sm:mb-8">
            <Link
              href="/"
              className="text-xl font-extrabold tracking-tight text-plum"
              aria-label="Moti Type — главная"
            >
              Moti<span className="text-lavender-accent"> Type.</span>
            </Link>
          </div>
          <div className="text-center">
            <p className="text-3xl sm:text-4xl" aria-hidden="true">
              🍡
            </p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-plum-soft">
              Твой результат готов
            </p>
            <h1 className="mt-2 text-2xl font-extrabold text-plum sm:text-3xl">
              Вот какой ты моти!
            </h1>
          </div>
        </header>

        <div className="space-y-5 sm:space-y-6">
          <ResultCard
            result={result}
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

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-background px-4">
          <p className="text-sm font-medium text-plum-soft">
            Собираем твоего моти... 🍡
          </p>
        </main>
      }
    >
      <ResultPageContent />
    </Suspense>
  );
}
