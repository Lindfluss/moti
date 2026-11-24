import type { TraitScores } from "@/types/quiz";

interface PersonalityStatsProps {
  scores: TraitScores;
}

const traitLabels = [
  {
    key: "social",
    title: "Социальная энергия",
    left: "Уединение",
    right: "Общение",
  },
  {
    key: "emotional",
    title: "Чувствительность",
    left: "Сдержанность",
    right: "Эмоциональность",
  },
  {
    key: "novelty",
    title: "Любовь к новому",
    left: "Стабильность",
    right: "Приключения",
  },
  {
    key: "order",
    title: "Организованность",
    left: "Спонтанность",
    right: "Порядок",
  },
  {
    key: "imagination",
    title: "Воображение",
    left: "Практичность",
    right: "Фантазия",
  },
  {
    key: "independence",
    title: "Самостоятельность",
    left: "Опора на близких",
    right: "Независимость",
  },
] as const;

export function PersonalityStats({
  scores,
}: PersonalityStatsProps) {
  return (
    <section className="rounded-3xl bg-card p-6 shadow-sm sm:p-8">
      <h2 className="text-xl font-bold text-plum">
        Твоя моти-формула
      </h2>

      <p className="mb-7 mt-2 text-sm text-plum-subtle">
        Вот как распределились твои ответы
      </p>

      <div className="space-y-6">
        {traitLabels.map((trait) => {
          const value = scores[trait.key];
          const position = ((value + 100) / 200) * 100;

          return (
            <div key={trait.key}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-plum">
                  {trait.title}
                </span>

                <span className="text-xs font-medium text-plum-secondary">
                  {value > 0 ? `+${Math.round(value)}` : Math.round(value)}
                </span>
              </div>

              <div className="relative h-3 rounded-full bg-lavender-track">
                <div className="absolute left-1/2 top-0 h-full w-px bg-lavender-border" />

                <div
                  className="absolute top-0 h-full rounded-full bg-lavender-accent"
                  style={{
                    left: `${Math.min(50, position)}%`,
                    width: `${Math.abs(position - 50)}%`,
                  }}
                />

                <div
                  className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#51405E] shadow"
                  style={{ left: `${position}%` }}
                />
              </div>

              <div className="mt-2 flex justify-between text-[11px] text-[#A495A7]">
                <span>{trait.left}</span>
                <span>{trait.right}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}