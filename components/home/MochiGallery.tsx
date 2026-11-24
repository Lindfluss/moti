"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { mochiProfiles } from "@/data/mochi";
import type { MochiProfile } from "@/types/mochi";

export function MochiGallery() {
  const [selectedMochi, setSelectedMochi] = useState<MochiProfile | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!selectedMochi) return;

    const previousOverflow = document.body.style.overflow;
    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedMochi(null);
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = document.querySelector<HTMLElement>('[role="dialog"]');
      const focusable = dialog?.querySelectorAll<HTMLElement>(
        'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocusedRef.current?.focus();
    };
  }, [selectedMochi]);

  return (
    <>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {mochiProfiles.map((mochi) => (
          <button
            key={mochi.id}
            type="button"
            onClick={() => setSelectedMochi(mochi)}
            aria-label={`Подробнее о персонаже: ${mochi.name}`}
            className="group min-w-0 overflow-hidden rounded-2xl border border-lavender-border/50 bg-card text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-plum/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum sm:rounded-3xl"
          >
            <div className="relative aspect-square overflow-hidden bg-lavender/30">
              <Image
                src={mochi.image}
                alt={mochi.name}
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 240px"
                quality={55}
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-3 sm:p-5">
              <h3 className="text-sm font-extrabold text-plum sm:text-base">
                {mochi.name}
              </h3>
              <p className="mt-1 text-xs font-semibold text-lavender-accent sm:text-sm">
                {mochi.archetype}
              </p>
              <p className="mt-2 text-xs font-semibold text-plum-muted sm:mt-3">
                Подробнее <span aria-hidden="true">↗</span>
              </p>
            </div>
          </button>
        ))}
      </div>

      {selectedMochi && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-plum/55 backdrop-blur-sm sm:items-center sm:p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedMochi(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="mochi-dialog-title"
            className="relative max-h-[92dvh] w-full overflow-y-auto overscroll-contain rounded-t-[2rem] bg-card shadow-2xl shadow-plum/20 sm:max-h-[90vh] sm:max-w-lg sm:rounded-[2rem]"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setSelectedMochi(null)}
              aria-label="Закрыть окно"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-card/90 text-2xl font-semibold text-plum shadow-md transition hover:bg-lavender focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
            >
              ×
            </button>

            <div className="relative aspect-[16/10] overflow-hidden bg-lavender/30">
              <Image
                src={selectedMochi.image}
                alt={selectedMochi.name}
                fill
                sizes="(max-width: 640px) 100vw, 512px"
                className="object-cover"
              />
            </div>

            <div className="px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-5 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-lavender-accent">
                {selectedMochi.archetype}
              </p>
              <h2
                id="mochi-dialog-title"
                className="mt-2 text-2xl font-black text-plum sm:text-3xl"
              >
                {selectedMochi.name}
              </h2>
              <p className="mt-4 leading-7 text-plum-muted">
                {selectedMochi.description}
              </p>

              <div className="mt-6 rounded-2xl bg-lavender/55 p-4 sm:p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-plum-soft">
                  Девиз
                </p>
                <p className="mt-2 font-semibold italic leading-relaxed text-plum">
                  «{selectedMochi.motto}»
                </p>
              </div>

              <div className="mt-6">
                <h3 className="font-bold text-plum">Сильные стороны ✨</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedMochi.strengths.map((strength) => (
                    <span
                      key={strength}
                      className="rounded-full bg-matcha/70 px-3 py-2 text-xs font-semibold text-plum"
                    >
                      {strength}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-cream/60 p-4 sm:p-5">
                <h3 className="font-bold text-cream-text">
                  Маленькая ложка правды 🥄
                </h3>
                <p className="mt-2 text-sm leading-6 text-cream-muted">
                  {selectedMochi.weaknesses.join(" ")}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedMochi(null)}
                className="mt-7 min-h-12 w-full rounded-full bg-plum px-6 py-3 font-bold text-white transition hover:bg-plum-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
              >
                Понятно 💗
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
