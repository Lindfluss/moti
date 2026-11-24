
import { mochiProfiles } from "@/data/mochi";
import { questions } from "@/data/questions";

import type {
  QuizAnswers,
  QuizResult,
  Trait,
  TraitScores,
} from "@/types/quiz";

const traits: Trait[] = [
  "social",
  "emotional",
  "novelty",
  "order",
  "imagination",
  "independence",
];

// Эталонные профили моти.
// Значения находятся в диапазоне от -2 до +2.
const mochiTraits: Record<string, Record<Trait, number>> = {
  strawberry: {
    social: 1,
    emotional: 2,
    novelty: 0,
    order: -1,
    imagination: 1,
    independence: -1,
  },
  matcha: {
    social: -1,
    emotional: -1,
    novelty: -1,
    order: 2,
    imagination: 0,
    independence: 1,
  },
  mango: {
    social: 2,
    emotional: 1,
    novelty: 2,
    order: -1,
    imagination: 1,
    independence: 0,
  },
  "black-sesame": {
    social: -2,
    emotional: -1,
    novelty: 0,
    order: 1,
    imagination: 1,
    independence: 2,
  },
  taro: {
    social: -1,
    emotional: 1,
    novelty: 1,
    order: -2,
    imagination: 2,
    independence: 1,
  },
  chocolate: {
    social: 0,
    emotional: -1,
    novelty: -1,
    order: 2,
    imagination: -1,
    independence: 0,
  },
  peach: {
    social: 2,
    emotional: 1,
    novelty: 1,
    order: 1,
    imagination: 1,
    independence: -1,
  },
  blueberry: {
    social: -1,
    emotional: 0,
    novelty: 2,
    order: -1,
    imagination: 2,
    independence: 2,
  },
  coconut: {
    social: -2,
    emotional: 1,
    novelty: -1,
    order: 0,
    imagination: 0,
    independence: -1,
  },
  yuzu: {
    social: 1,
    emotional: 0,
    novelty: 2,
    order: -2,
    imagination: 1,
    independence: 1,
  },
  anko: {
    social: 0,
    emotional: 1,
    novelty: -2,
    order: 2,
    imagination: -1,
    independence: -2,
  },
  rainbow: {
    social: 1,
    emotional: 2,
    novelty: 2,
    order: -2,
    imagination: 2,
    independence: 1,
  },
};

function getEmptyScores(): TraitScores {
  return {
    social: 0,
    emotional: 0,
    novelty: 0,
    order: 0,
    imagination: 0,
    independence: 0,
  };
}

function calculateDistance(
  userScores: TraitScores,
  profile: Record<Trait, number>,
): number {
  const squaredDifferences = traits.map((trait) => {
    const userValue = userScores[trait] / 100;
    const profileValue = profile[trait] / 2;

    return (userValue - profileValue) ** 2;
  });

  const average =
    squaredDifferences.reduce((sum, value) => sum + value, 0) /
    traits.length;

  return Math.sqrt(average);
}

export function calculateQuizResult(
  answers: QuizAnswers,
): QuizResult {
  const rawScores = getEmptyScores();
  const traitCounts = getEmptyScores();

  // Проверяем ответы и собираем баллы по характеристикам.
  for (const question of questions) {
    const selectedOptionId = answers[question.id];

    if (!selectedOptionId) {
      throw new Error(`Нет ответа на вопрос ${question.id}`);
    }

    const selectedOption = question.options.find(
      (option) => option.id === selectedOptionId,
    );

    if (!selectedOption) {
      throw new Error(
        `Некорректный ответ на вопрос ${question.id}`,
      );
    }

    rawScores[question.trait] += selectedOption.score;
    traitCounts[question.trait] += 1;
  }

  // Нормализуем каждую характеристику в диапазон от -100 до +100.
  const scores = getEmptyScores();

  for (const trait of traits) {
    const count = traitCounts[trait];

    scores[trait] =
      count > 0
        ? (rawScores[trait] / (2 * count)) * 100
        : 0;
  }

  // Сравниваем ответы пользователя с профилями всех моти.
  const matches = mochiProfiles
    .map((mochi) => {
      const profile = mochiTraits[mochi.id];

      if (!profile) {
        throw new Error(
          `Не найден профиль характеристик для моти ${mochi.id}`,
        );
      }

      const distance = calculateDistance(scores, profile);

      const similarity = Math.round(
        Math.max(0, Math.min(100, (1 - distance / 2) * 100)),
      );

      return {
        mochiId: mochi.id,
        similarity,
        distance,
      };
    })
    .sort((a, b) => a.distance - b.distance);

  if (matches.length < 2) {
    throw new Error("Для определения результата нужны минимум два моти");
  }

  return {
    scores,
    matches,
    primaryMochiId: matches[0].mochiId,
    secondaryMochiId: matches[1].mochiId,
  };
}
