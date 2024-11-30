import { Action } from "../App";

interface NextButton {
  dispatch: ({ type, payload }: Action) => void;
  answer: number | null;
  index: number;
  numQuestions: number;
}

function NextButton({ dispatch, answer, index, numQuestions }: NextButton) {
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
