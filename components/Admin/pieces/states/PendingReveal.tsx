import { Game, States } from "lib/types";

export function PendingReveal({
  state,
  game,
}: {
  state: States.PendingReveal;
  game: Game;
}) {
  return (
    <div>
      <h2>Waiting for the reveal</h2>
    </div>
  );
}
