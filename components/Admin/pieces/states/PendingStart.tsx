import { AdminButton } from "components/AdminButton/AdminButton";
import { cancelGame, prepareNextQuestion } from "lib/admin";
import { Game, States } from "lib/types";

export function PendingStart({
  state,
  game,
}: {
  state: States.PendingStart;
  game: Game;
}) {
  const start = () => {
    if (!game.questions || game.questions.length === 0) return;
    if (!state.gameId) return;

    const question = game.questions[0];
    prepareNextQuestion(
      state.gameId,
      question.id,
      0,
      question.topic,
      question.time
    );
  };

  return (
    <>
      <p>{state.name ?? "A game"} is ready to start.</p>
      <div>
        <AdminButton
          disabled={!game.questions || game.questions.length === 0}
          onClick={() => start()}
        >
          Start
        </AdminButton>{" "}
        <AdminButton onClick={() => cancelGame()}>Cancel</AdminButton>
      </div>
      <GameSummary game={game} />
    </>
  );
}

function GameSummary({ game }: { game: Game }) {
  return (
    <>
      <h3>{game.name ?? "<unnamed>"}</h3>
      <h4>Questions</h4>
      <ol>
        {(game.questions ?? []).map((question, index) => (
          <li key={question.id ?? index}>
            <p>
              <em>{question.text ?? "<empty text>"}</em>
            </p>
            {question.topic && (
              <p>
                <strong>Topic</strong>: {question.topic}
              </p>
            )}
          </li>
        ))}
      </ol>
    </>
  );
}
