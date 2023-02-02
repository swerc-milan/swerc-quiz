import { ErrorView } from "components/ErrorView/ErrorView";
import { ref } from "firebase/database";
import { showFinalRanking } from "lib/admin";
import { database } from "lib/firebase";
import { Game, Ranking, States } from "lib/types";
import { useState } from "react";
import { useObjectVal } from "react-firebase-hooks/database";

export function PendingFinalRanking({
  state,
  game,
}: {
  state: States.PendingFinalRanking;
  game: Game;
}) {
  const [hideFirst, setHideFirst] = useState<number>(2);
  const [ranking, rankingLoading, rankingError] = useObjectVal<Ranking[]>(
    ref(database, `ranking/${state.gameId}/${state.questionId}`)
  );

  const gameId = state.gameId;
  if (!gameId) return <ErrorView error="Missing game id" />;
  const questionId = state.questionId;
  if (questionId === undefined)
    return <ErrorView error="Missing question id" />;

  if (rankingLoading) return <div>Loading ranking...</div>;
  if (rankingError) return <ErrorView error={rankingError} />;

  return (
    <div>
      <p>Ranking is ready to be revealed.</p>
      <p>
        Hide the top{" "}
        <input
          type="number"
          value={hideFirst}
          onChange={(e) => setHideFirst(Number.parseInt(e.target.value))}
        />{" "}
        players.
      </p>
      <button
        onClick={() =>
          showFinalRanking(gameId, questionId, ranking ?? [], hideFirst)
        }
      >
        Show ranking
      </button>
    </div>
  );
}
