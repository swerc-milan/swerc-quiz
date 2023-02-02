import { MessageView } from "components/MessageView/MessageView";
import { Game, States } from "lib/types";

export function PendingFinalRanking({
  state,
  game,
}: {
  state: States.PendingFinalRanking;
  game: Game;
}) {
  return <p>pending ranking</p>;
}
