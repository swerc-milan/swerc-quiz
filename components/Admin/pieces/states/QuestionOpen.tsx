import { ErrorView } from "components/ErrorView/ErrorView";
import { prepareNextQuestion } from "lib/admin";
import { Game, States } from "lib/types";

export function QuestionOpen({
  state,
  game,
}: {
  state: States.QuestionOpen;
  game: Game;
}) {
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
      <p>Question {(state.index ?? 0) + 1} is open</p>
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
