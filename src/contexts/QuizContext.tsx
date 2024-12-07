import { createContext, useContext } from "react";

export interface Question {
  correctOption: number;
  id: string;
  options: string[];
  points: number;
  question: string;
}

export interface Action {
  type: string;
  payload?: Question[] | number | null;
}

interface QuizContext {
  questions: Question[] | [];
  status: string;
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
  secondsRemaining: number;
  numQuestions: number;
  maxPossiblePoints: number;
  dispatch: ({ type, payload }: Action) => void;
}

export const QuizContext = createContext<QuizContext | null>(null);

export function useQuiz() {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error("QuizContext must be used within a QuizContextProvider");
  }

  return context;
}
