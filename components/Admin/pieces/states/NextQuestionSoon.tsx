import { ErrorView } from "components/ErrorView/ErrorView";
import { openQuestion } from "lib/admin";
import { Game, States } from "lib/types";

export function NextQuestionSoon({
  state,
  game,
}: {
  state: States.NextQuestionSoon;
  game: Game;
}) {
  if (!game.questions) return <ErrorView error="Game has no questions" />;
  const gameId = state.gameId;
  if (!gameId) return <ErrorView error="Missing game id" />;
  const index = state.index;
  if (index === undefined)
    return <ErrorView error="Missing current question index" />;
  if (index >= game.questions.length)
    return <ErrorView error="Invalid question index" />;

  const question = game.questions[index];

  return (
    <div>
      <p>
        The question <strong>{index + 1}</strong> is ready to start.
      </p>
      <div>
        <button
          onClick={() => {
            openQuestion(
              gameId,
              question.id,
              index,
              question.answers ?? [],
              question.text,
              question.time,
              question.layout
            );
          }}
        >
          Start timer
        </button>
      </div>
      <div>
        <h3>Question details</h3>
        <p>
          <em>{question.text ?? ""}</em>
        </p>
        {question.topic && (
          <p>
            <strong>Topic</strong>: {question.topic}
          </p>
        )}
        {question.time && (
          <p>
            <strong>Time</strong>: {question.time} seconds
          </p>
        )}
        <p>
          <strong>Answers</strong> ({question.layout ?? "list"} layout):
        </p>
        <ol>
          {(question.answers ?? []).map((answer, index) => (
            <li key={answer.id ?? index}>{answer.text ?? "<missing text>"}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
