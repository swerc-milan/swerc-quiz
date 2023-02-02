import { ref, set, serverTimestamp } from "firebase/database";
import { database } from "./firebase";
import { Answer, States } from "./types";

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
  index: number,
  topic?: string,
  time?: number
) {
  const newState: States.NextQuestionSoon = {
    kind: "nextQuestionSoon",
    gameId,
    questionId,
    index,
  };
  if (topic) newState.topic = topic;
  if (time) newState.time = time;
  set(ref(database, "state"), newState);
}

export function openQuestion(
  gameId: string,
  questionId: string,
  index: number,
  answers: Answer[],
  text?: string,
  time?: number,
  layout?: "list" | "grid"
) {
  const newState: States.QuestionOpen<object> = {
    kind: "questionOpen",
    gameId,
    questionId,
    index,
    answers,
    startTime: serverTimestamp(),
  };
  if (text) newState.text = text;
  if (time) newState.time = time;
  if (layout) newState.layout = layout;
  set(ref(database, "state"), newState);
}
