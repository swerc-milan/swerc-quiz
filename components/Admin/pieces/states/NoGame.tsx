import { makePendingGame } from "lib/admin";
import { Games } from "lib/types";

export function NoGame({ games }: { games: Games }) {
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
