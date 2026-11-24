
export type Trait =
  | "social"
  | "emotional"
  | "novelty"
  | "order"
  | "imagination"
  | "independence";

export interface QuizOption {
  id: string;
  text: string;
  score: -2 | -1 | 1 | 2;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  trait: Trait;
  options: QuizOption[];
}

export type QuizAnswers = Record<string, string>;

export type TraitScores = Record<Trait, number>;

export interface MochiMatch {
  mochiId: string;
  similarity: number;
  distance: number;
}

export interface QuizResult {
  scores: TraitScores;
  matches: MochiMatch[];
  primaryMochiId: string;
  secondaryMochiId: string;
}



// // types/quiz.ts

// export type Trait =
//   | "social"
//   | "emotional"
//   | "novelty"
//   | "order"
//   | "imagination"
//   | "independence";

// export type Answer = {
//   id: string;
//   text: string;
//   score: number;
// };

// export type Question = {
//   id: string;
//   trait: Trait;
//   text: string;
//   answers: Answer[];
// };

// export type MochiType = {
//   id: string;
//   name: string;
//   title: string;
//   description: string;
//   profile: Record<Trait, number>;
//   strengths: string[];
//   weaknesses: string[];
//   companion: string;
// };

// export type QuizAnswers = Record<string, string>;

// export type QuizResult = {
//   primary: MochiType;
//   secondary: MochiType;
//   traits: Record<Trait, number>;
//   similarities: Record<string, number>;
// };