import { ErrorView } from "components/ErrorView/ErrorView";
import { ref } from "firebase/database";
import { cancelGame } from "lib/admin";
import { database } from "lib/firebase";
import { Game, States } from "lib/types";
import { useObjectVal } from "react-firebase-hooks/database";

export function PendingStart({ state }: { state: States.PendingStart }) {
  const [game, gameLoading, gameError] = useObjectVal<Game>(
    ref(database, `admin/games/${state.id}`)
  );

  if (gameLoading) return <div>Loading...</div>;
  if (gameError) return <ErrorView error={gameError} />;
  if (!game)
    return (
      <div>
        Game not found <button onClick={() => cancelGame()}>Reset</button>
      </div>
    );

  return (
    <>
      <p>{state.name ?? "A game"} is ready to start.</p>
      <div>
        <button>Start</button>{" "}
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
