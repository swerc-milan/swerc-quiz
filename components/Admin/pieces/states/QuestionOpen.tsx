import { ErrorView } from "components/ErrorView/ErrorView";
import { getRemainingTime } from "components/Timer/Timer";
import { ref } from "firebase/database";
import { closeQuestion, prepareNextQuestion } from "lib/admin";
import { database } from "lib/firebase";
import { Game, States } from "lib/types";
import { useEffect, useState } from "react";
import { useObjectVal } from "react-firebase-hooks/database";

export function QuestionOpen({
  state,
  game,
}: {
  state: States.QuestionOpen;
  game: Game;
}) {
  const [offset] = useObjectVal<number>(
    ref(database, ".info/serverTimeOffset")
  );
  const [remaining, setRemaining] = useState<null | number>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      if (offset === undefined) return;
      if (state.gameId === undefined) return;
      if (state.questionId === undefined) return;
      if (state.index === undefined) return;
      if (state.startTime === undefined) return;
      if (state.time === undefined) return;

      const SAFETY_OFFSET = 1000;
      const remaining = getRemainingTime(
        state.startTime,
        state.time * 1000 + SAFETY_OFFSET,
        offset
      );
      setRemaining(remaining);
      if (remaining <= 0) {
        closeQuestion(
          state.gameId,
          state.questionId,
          state.index,
          state.startTime
        );
      }
    }, 100);
    return () => clearInterval(interval);
  }, [state.startTime, state.time]);

  if (!game.questions) return <ErrorView error="Game has no questions" />;
  const gameId = state.gameId;
  if (!gameId) return <ErrorView error="Missing game id" />;
  const questionId = state.questionId;
  if (!questionId) return <ErrorView error="Missing question id" />;
  const index = state.index;
  if (index === undefined)
    return <ErrorView error="Missing current question index" />;
  if (index >= game.questions.length)
    return <ErrorView error="Invalid question index" />;

  const question = game.questions[index];

  return (
    <>
      <p>
        Question {(state.index ?? 0) + 1} is open. Will close in{" "}
        {remaining ?? "?"} seconds.
      </p>
      <div>
        <button
          onClick={() =>
            prepareNextQuestion(
              gameId,
              questionId,
              index,
              question.topic,
              question.time
            )
          }
        >
          Reset question timer
        </button>
        <button onClick={() => alert("todo")}>Close question</button>
      </div>
    </>
  );
}
