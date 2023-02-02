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
        <button
          disabled={!game.questions || game.questions.length === 0}
          onClick={() => start()}
        >
          Start
        </button>{" "}
        <button onClick={() => cancelGame()}>Cancel</button>
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
            <p>{question.text ?? "<missing text>"}</p>
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
