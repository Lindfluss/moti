"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { mochiProfiles } from "@/data/mochi";
import type { MochiProfile } from "@/types/mochi";

export function MochiGallery() {
  const [selectedMochi, setSelectedMochi] = useState<MochiProfile | null>(null);

  useEffect(() => {
    if (!selectedMochi) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedMochi(null);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedMochi]);

  return (
    <>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {mochiProfiles.map((mochi) => (
          <button
            key={mochi.id}
            type="button"
            onClick={() => setSelectedMochi(mochi)}
            aria-label={`Подробнее о персонаже: ${mochi.name}`}
            className="group overflow-hidden rounded-3xl border border-lavender-border/50 bg-card text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-plum/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum"
          >
            <div className="relative aspect-square overflow-hidden bg-lavender/30">
              <Image
                src={mochi.image}
                alt={mochi.name}
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 240px"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4 sm:p-5">
              <h3 className="text-sm font-extrabold text-plum sm:text-base">
                {mochi.name}
              </h3>
              <p className="mt-1 text-xs font-semibold text-lavender-accent sm:text-sm">
                {mochi.archetype}
              </p>
              <p className="mt-3 text-xs font-semibold text-plum-muted">
                Нажми, чтобы узнать больше <span aria-hidden="true">↗</span>
              </p>
            </div>
          </button>
        ))}
      </div>

      {selectedMochi && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-plum/55 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedMochi(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="mochi-dialog-title"
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[2rem] bg-card shadow-2xl shadow-plum/20"
          >
            <button
              type="button"
              onClick={() => setSelectedMochi(null)}
              aria-label="Закрыть окно"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-card/90 text-xl font-semibold text-plum shadow-md transition hover:bg-lavender"
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

            <div className="p-6 sm:p-8">
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

              <div className="mt-6 rounded-2xl bg-lavender/55 p-5">
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

              <div className="mt-6 rounded-2xl bg-cream/60 p-5">
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
                className="mt-7 w-full rounded-full bg-plum px-6 py-4 font-bold text-white transition hover:bg-plum-soft"
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
