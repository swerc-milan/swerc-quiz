import { makePendingGame } from "lib/admin";
import { Game, Games } from "lib/types";

export function NoGame({ games }: { games: Games }) {
  return (
    <>
      <p>No game is running. Select a game to make it ready.</p>
      <ul>
        {Object.entries(games ?? {}).map(([gameId, game]) => (
          <li key={gameId}>
            <SelectGame gameId={gameId} game={game} />
          </li>
        ))}
      </ul>
    </>
  );
}

function SelectGame({ game, gameId }: { game: Game; gameId: string }) {
  return (
    <>
      <div>
        <button onClick={() => makePendingGame(game.name ?? null, gameId)}>
          {game.name ?? "<unnamed>"}
        </button>
      </div>
      {game.questions && game.questions.length > 0 && (
        <ul>
          {game.questions.map((question, index) => (
            <li key={question.id ?? index}>
              {question.text ?? "<missing text>"}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
