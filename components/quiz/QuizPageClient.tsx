"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { QuizClient } from "@/components/quiz/QuizClient";

function QuizPageContent() {
  const searchParams = useSearchParams();
  const restartKey = searchParams.get("restart") ?? "default";

  return <QuizClient key={restartKey} />;
}

export function QuizPageClient() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-background px-4">
          <p className="text-sm font-medium text-plum-soft">
            Загружаем тест... 🍡
          </p>
        </main>
      }
    >
      <QuizPageContent />
    </Suspense>
  );
}
