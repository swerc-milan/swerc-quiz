import { database } from "lib/firebase";
import { useObject, useObjectVal } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import { Games, State } from "lib/types";
import { ErrorView } from "components/ErrorView/ErrorView";
import { cancelGame, makePendingGame } from "lib/admin";

export function CurrentStateActions() {
  const [state, stateLoading, stateError] = useObjectVal<State>(
    ref(database, "state")
  );
  const [gamesSnapshot, gamesLoading, gamesError] = useObject(
    ref(database, "admin/games")
  );
  const error = stateError ?? gamesError;

  if (stateLoading || gamesLoading) return <div>Loading...</div>;
  if (error) return <ErrorView error={error} />;

  const games = gamesSnapshot?.val() as Games;

  if (!state) {
    return (
      <>
        <p>No game is running. Select a game to make it ready.</p>
        <ul>
          {Object.entries(games ?? {}).map(([gameId, game]) => (
            <li key={gameId}>
              <button onClick={() => makePendingGame(game.name ?? null)}>
                {game.name ?? "<unnamed>"}
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }

  switch (state.kind) {
    case "pendingStart":
      return (
        <>
          <p>{state.name ?? "A game"} is ready to start.</p>
          <div>
            <button>Start</button>{" "}
            <button onClick={() => cancelGame()}>Cancel</button>
          </div>
        </>
      );
  }
}
