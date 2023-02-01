import { States } from "lib/types";

export function NoGame({ uid, state }: { uid: string; state: States.NoGame }) {
  return <p>No game</p>;
}
