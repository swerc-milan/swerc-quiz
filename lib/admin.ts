import { ref, set } from "firebase/database";
import { database } from "./firebase";
import { States } from "./types";

export function makePendingGame(gameName: string | null, gameId: string) {
  const newState: States.PendingStart = {
    kind: "pendingStart",
    gameId,
  };
  if (gameName) newState.name = gameName;
  set(ref(database, "state"), newState);
}

export function cancelGame() {
  set(ref(database, "state"), null);
}

export function prepareNextQuestion(
  gameId: string,
  questionId: string,
  index?: number,
  topic?: string,
  time?: number
) {
  const newState: States.NextQuestionSoon = {
    kind: "nextQuestionSoon",
    gameId,
    questionId,
  };
  if (index) newState.index = index;
  if (topic) newState.topic = topic;
  if (time) newState.time = time;
  set(ref(database, "state"), newState);
}
