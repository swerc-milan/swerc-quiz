import { Game, States } from "lib/types";

export function NextQuestionSoon({
  state,
  game,
}: {
  state: States.NextQuestionSoon;
  game: Game;
}) {
  return <p>Next question soon</p>;
}
