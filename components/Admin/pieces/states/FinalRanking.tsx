import { updateFinalRankingHideFirst } from "lib/admin";
import { Game, States } from "lib/types";

export function FinalRanking({
  state,
  game,
}: {
  state: States.FinalRanking;
  game: Game;
}) {
  const hideFirst = state.hideFirst ?? 0;
  return (
    <div>
      {hideFirst > 0 ? (
        <>
          <p>Ranking is shown up to position {hideFirst}.</p>
          <button
            onClick={() => {
              updateFinalRankingHideFirst(hideFirst - 1);
            }}
          >
            Show next position
          </button>
        </>
      ) : (
        <>
          <p>The entire ranking is visible.</p>
        </>
      )}
    </div>
  );
}
