import { Game, States } from "lib/types";

export function CurrentRanking({
  state,
  game,
}: {
  state: States.CurrentRanking;
  game: Game;
}) {
  return <p>current ranking</p>;
}
