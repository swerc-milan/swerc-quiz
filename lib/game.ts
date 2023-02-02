import { ref, set, serverTimestamp } from "firebase/database";
import { database } from "./firebase";

export function submitAnswer(
  gameId: string,
  questionId: string,
  uid: string,
  answerId: string
) {
  set(ref(database, `answers/${gameId}/${questionId}/${uid}`), {
    ts: serverTimestamp(),
    answerId,
  });
}
