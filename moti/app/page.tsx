import Image from "next/image";
import { calculateQuizResult } from "@/lib/result-calculator";
import { questions } from "@/data/questions";

const testAnswers = Object.fromEntries(
  questions.map((question) => [
    question.id,
    question.options[0].id,
  ]),
);

const result = calculateQuizResult(testAnswers);

console.log("Основной моти:", result.primaryMochiId);
console.log("Второй моти:", result.secondaryMochiId);
console.log("Все совпадения:", result.matches);
console.log("Характеристики:", result.scores);
export default function Home() {
  console.log("Основной моти:", result.primaryMochiId);
console.log("Второй моти:", result.secondaryMochiId);
console.log("Все совпадения:", result.matches);
console.log("Характеристики:", result.scores);
  return (

    <div>

    </div>

  );
}
