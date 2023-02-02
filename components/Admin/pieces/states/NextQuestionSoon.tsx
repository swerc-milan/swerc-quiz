import { ErrorView } from "components/ErrorView/ErrorView";
import { QuestionPreview } from "components/QuestionPreview/QuestionPreview";
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
              question.imageId,
              question.time,
              question.layout
            );
          }}
        >
          Start timer
        </button>
      </div>
      <QuestionPreview question={question} />
    </div>
  );
}
