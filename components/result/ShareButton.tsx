"use client";

import type { QuizResult } from "@/types/quiz";

interface ShareButtonProps {
  mochiName: string;
  motto: string;
  result: QuizResult;
}

export function ShareButton({
  mochiName,
  motto,
  result,
}: ShareButtonProps) {
  async function handleShare() {
    const bytes = new TextEncoder().encode(JSON.stringify(result));
    const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
    const encodedResult = btoa(binary)
      .replaceAll("+", "-")
      .replaceAll("/", "_")
      .replace(/=+$/, "");
    const url = `${window.location.origin}/result/${result.primaryMochiId}?shared=${encodedResult}`;
    const text = `Я — ${mochiName}! ${motto}\nА какой ты моти?`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Какой ты моти?",
          text,
          url,
        });
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Не удалось поделиться:", error);
        }
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      alert("Ссылка на твой результат скопирована 💗");
    } catch {
      alert("Не удалось скопировать ссылку. Попробуй ещё раз.");
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="w-full rounded-2xl border-2 border-plum bg-transparent px-6 py-4 font-semibold text-plum transition hover:bg-lavender-hover"
    >
      Поделиться результатом ↗
    </button>
  );
}
