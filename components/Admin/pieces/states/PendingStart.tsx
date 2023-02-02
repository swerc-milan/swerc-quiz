import { cancelGame } from "lib/admin";
import { States } from "lib/types";

export function PendingStart({ state }: { state: States.PendingStart }) {
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
