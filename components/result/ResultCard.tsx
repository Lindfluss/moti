
import Link from "next/link";

import type { MochiProfile } from "@/types/mochi";

import { MochiImage } from "@/components/result/MochiImage";
import { ShareButton } from "@/components/result/ShareButton";

interface ResultCardProps {
  mochi: MochiProfile;
  companion?: MochiProfile;
  similarity: number;
}

export function ResultCard({
  mochi,
  companion,
  similarity,
}: ResultCardProps) {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] bg-white shadow-sm">
        <div className="bg-gradient-to-b from-[#E9DDF8] to-[#F9E8EF] px-6 pb-8 pt-10 text-center">
          <span className="inline-block rounded-full bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#806B8C]">
            Твой результат
          </span>

          <div className="my-7 flex justify-center">
            <MochiImage
              src={mochi.image}
              name={mochi.name}
              emoji={mochi.emoji}
            />
          </div>

          <p className="text-sm font-semibold text-[#806B8C]">
            ТЫ — ЭТО
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-[#51405E] sm:text-4xl">
            {mochi.name}
          </h1>

          <p className="mt-2 text-lg font-semibold text-[#806B8C]">
            {mochi.archetype}
          </p>

          <div className="mx-auto mt-6 max-w-md rounded-2xl bg-white/65 p-5">
            <p className="text-base font-semibold italic leading-relaxed text-[#51405E]">
              «{mochi.motto}»
            </p>
          </div>

          <p className="mt-5 text-xs text-[#8D7B96]">
            Игровое сходство с профилем моти: {similarity}%
          </p>
        </div>

        <div className="space-y-7 p-6 sm:p-8">
          <div>
            <h2 className="mb-3 text-xl font-bold text-[#51405E]">
              Кто ты внутри?
            </h2>

            <p className="leading-relaxed text-[#75677B]">
              {mochi.description}
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-[#51405E]">
              Твои суперсилы ✨
            </h2>

            <ul className="space-y-2">
              {mochi.strengths.map((strength) => (
                <li
                  key={strength}
                  className="flex gap-3 text-sm leading-relaxed text-[#75677B]"
                >
                  <span className="text-[#B99ACF]">✦</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-[#FFF0D5]/60 p-5">
            <h2 className="mb-3 text-lg font-bold text-[#80613E]">
              Маленькая ложка правды 🥄
            </h2>

            <ul className="space-y-2">
              {mochi.weaknesses.map((weakness) => (
                <li
                  key={weakness}
                  className="text-sm leading-relaxed text-[#8B745B]"
                >
                  • {weakness}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-[#51405E]">
              В дружбе 💗
            </h2>
            <p className="leading-relaxed text-[#75677B]">
              {mochi.friendship}
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-[#51405E]">
              В отношениях 💌
            </h2>
            <p className="leading-relaxed text-[#75677B]">
              {mochi.relationships}
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-[#51405E]">
              Твой идеальный день ☁️
            </h2>
            <p className="leading-relaxed text-[#75677B]">
              {mochi.idealDay}
            </p>
          </div>
        </div>
      </section>

      {companion && (
        <section className="rounded-3xl bg-[#E9DDF8] p-6 sm:p-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[#806B8C]">
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
              <h2 className="text-xl font-bold text-[#51405E]">
                {companion.name}
              </h2>

              <p className="mt-1 text-sm font-semibold text-[#806B8C]">
                {companion.archetype}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-[#75677B]">
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
        />

        <Link
          href="/quiz"
          className="block w-full rounded-2xl bg-[#51405E] px-6 py-4 text-center font-semibold text-white transition hover:bg-[#675477]"
        >
          Пройти тест ещё раз 🍡
        </Link>
      </div>
    </div>
  );
}
