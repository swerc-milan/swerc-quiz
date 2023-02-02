import { ErrorView } from "components/ErrorView/ErrorView";
import { Game, States } from "lib/types";

export function NextQuestionSoon({
  state,
  game,
}: {
  state: States.NextQuestionSoon;
  game: Game;
}) {
  if (!game.questions) return <ErrorView error="Game has no questions" />;
  if (state.index === undefined)
    return <ErrorView error="Missing current question index" />;
  if (state.index >= game.questions.length)
    return <ErrorView error="Invalid question index" />;

  const question = game.questions[state.index];
  return (
    <div>
      <p>
        The question <strong>{state.index + 1}</strong> is ready to start.
      </p>
      <div>
        <button>Start timer</button>
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
