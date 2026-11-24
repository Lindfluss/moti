import type { Metadata } from "next";
import { QuizPageClient } from "@/components/quiz/QuizPageClient";

export const metadata: Metadata = {
  title: "Пройди тест: какой ты моти?",
  description:
    "Ответь на 15 вопросов, узнай свой характер и найди одного из 12 моти, который похож на тебя.",
  alternates: {
    canonical: "/quiz",
  },
  openGraph: {
    title: "Какой ты моти? — Пройди тест | Moti Type",
    description:
      "15 вопросов помогут узнать, какой из 12 моти отражает твой характер. Попробуй Moti Type!",
    url: "/quiz",
  },
};

export default function QuizPage() {
  return <QuizPageClient />;
}
