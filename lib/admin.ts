import { ref, set } from "firebase/database";
import { database } from "./firebase";
import { States } from "./types";

export function makePendingGame(gameName: string | null, gameId: string) {
  const newState: States.PendingStart = { kind: "pendingStart", id: gameId };
  if (gameName) newState.name = gameName;
  set(ref(database, "state"), newState);
}

export function cancelGame() {
  set(ref(database, "state"), null);
}
