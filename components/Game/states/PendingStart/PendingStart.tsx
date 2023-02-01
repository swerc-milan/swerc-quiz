import { States } from "lib/types";

export function PendingStart({
  uid,
  state,
}: {
  uid: string;
  state: States.PendingStart;
}) {
  return <p>Pending start of {state.name ?? "a game"}</p>;
}
