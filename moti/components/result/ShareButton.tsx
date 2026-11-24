"use client";

interface ShareButtonProps {
  mochiName: string;
  motto: string;
}

export function ShareButton({
  mochiName,
  motto,
}: ShareButtonProps) {
  async function handleShare() {
    const url = window.location.href;
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
      className="w-full rounded-2xl border-2 border-[#51405E] bg-transparent px-6 py-4 font-semibold text-[#51405E] transition hover:bg-[#F5EDF8]"
    >
      Поделиться результатом ↗
    </button>
  );
}