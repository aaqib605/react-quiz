import { useEffect, useReducer } from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 0,
};

export interface Question {
  correctOption: number;
  id: string;
  options: string[];
  points: number;
  question: string;
}

interface InitialState {
  questions: Question[] | [];
  status: string;
  index: number;
  answer: null | number;
  points: number;
  highscore: number;
  secondsRemaining: number;
}

export interface Action {
  type: string;
  payload?: Question[] | number | null;
}

// export interface Reducer {
//   state: InitialState;
//   action: Action;
// }

function reducer(state: InitialState, action: Action): InitialState {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload as Question[],
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer": {
      const question = state.questions[state.index];
      const newAnswer = action.payload as number | null;

      return {
        ...state,
        answer: newAnswer,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    // return {
    //   ...state,
    //   points: 0,
    //   highscore: 0,
    //   index: 0,
    //   answer: null,
    //   status: "ready",
    // };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      return initialState;
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    fetch("http://localhost:3000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
