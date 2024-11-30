import Options from "./Options";
import { Action, Question as QuestionInterface } from "../App";

interface QuestionProps {
  question: QuestionInterface;
  dispatch: ({ type, payload }: Action) => void;
  answer: number | null;
}

function Question({ question, dispatch, answer }: QuestionProps) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
