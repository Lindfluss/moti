import { QuizClient } from "@/components/quiz/QuizClient";

interface QuizPageProps {
  searchParams: Promise<{ restart?: string }>;
}

export default async function QuizPage({ searchParams }: QuizPageProps) {
  const params = await searchParams;

  return <QuizClient key={params.restart ?? "default"} />;
}
