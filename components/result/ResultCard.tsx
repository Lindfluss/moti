
import Link from "next/link";

import type { MochiProfile } from "@/types/mochi";
import type { QuizResult } from "@/types/quiz";

import { MochiImage } from "@/components/result/MochiImage";
import { ShareButton } from "@/components/result/ShareButton";

interface ResultCardProps {
  mochi: MochiProfile;
  companion?: MochiProfile;
  similarity: number;
  result: QuizResult;
}

export function ResultCard({
  mochi,
  companion,
  similarity,
  result,
}: ResultCardProps) {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] bg-card shadow-sm">
        <div className="bg-gradient-to-b from-lavender to-mochi-pink px-6 pb-8 pt-10 text-center">
          <span className="inline-block rounded-full bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-widest text-plum-soft">
            Твой результат
          </span>

          <div className="my-7 flex justify-center">
            <MochiImage
              src={mochi.image}
              name={mochi.name}
              emoji={mochi.emoji}
            />
          </div>

          <p className="text-sm font-semibold text-plum-soft">
            ТЫ — ЭТО
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-plum sm:text-4xl">
            {mochi.name}
          </h1>

          <p className="mt-2 text-lg font-semibold text-plum-soft">
            {mochi.archetype}
          </p>

          <div className="mx-auto mt-6 max-w-md rounded-2xl bg-white/65 p-5">
            <p className="text-base font-semibold italic leading-relaxed text-plum">
              «{mochi.motto}»
            </p>
          </div>

          <p className="mt-5 text-xs text-plum-faint">
            Игровое сходство с профилем моти: {similarity}%
          </p>
        </div>

        <div className="space-y-7 p-6 sm:p-8">
          <div>
            <h2 className="mb-3 text-xl font-bold text-plum">
              Кто ты внутри?
            </h2>

            <p className="leading-relaxed text-plum-muted">
              {mochi.description}
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-plum">
              Твои суперсилы ✨
            </h2>

            <ul className="space-y-2">
              {mochi.strengths.map((strength) => (
                <li
                  key={strength}
                  className="flex gap-3 text-sm leading-relaxed text-plum-muted"
                >
                  <span className="text-lavender-accent">✦</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-cream/60 p-5">
            <h2 className="mb-3 text-lg font-bold text-cream-text">
              Маленькая ложка правды 🥄
            </h2>

            <ul className="space-y-2">
              {mochi.weaknesses.map((weakness) => (
                <li
                  key={weakness}
                  className="text-sm leading-relaxed text-cream-muted"
                >
                  • {weakness}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-plum">
              В дружбе 💗
            </h2>
            <p className="leading-relaxed text-plum-muted">
              {mochi.friendship}
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-plum">
              В отношениях 💌
            </h2>
            <p className="leading-relaxed text-plum-muted">
              {mochi.relationships}
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-plum">
              Твой идеальный день ☁️
            </h2>
            <p className="leading-relaxed text-plum-muted">
              {mochi.idealDay}
            </p>
          </div>
        </div>
      </section>

      {companion && (
        <section className="rounded-3xl bg-lavender p-6 sm:p-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-plum-soft">
            Твой моти-компаньон
          </p>

          <div className="mt-5 flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <MochiImage
              src={companion.image}
              name={companion.name}
              emoji={companion.emoji}
              size="small"
            />

            <div>
              <h2 className="text-xl font-bold text-plum">
                {companion.name}
              </h2>

              <p className="mt-1 text-sm font-semibold text-plum-soft">
                {companion.archetype}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-plum-muted">
                {companion.motto}
              </p>
            </div>
          </div>
        </section>
      )}

      <div className="space-y-3">
        <ShareButton
          mochiName={mochi.name}
          motto={mochi.motto}
          result={result}
        />

        <Link
          href="/quiz?restart=1"
          className="block w-full rounded-2xl bg-plum px-6 py-4 text-center font-semibold text-white transition hover:bg-plum-soft"
        >
          Пройти тест ещё раз 🍡
        </Link>
      </div>
    </div>
  );
}
