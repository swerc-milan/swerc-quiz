import { ref, set, serverTimestamp } from "firebase/database";
import { database } from "./firebase";
import { Answer, Rank, States } from "./types";

export function importGame(gameData: any) {
  const id = gameData.id;
  const name = gameData.name;
  const questions = gameData.questions;
  if (!id || !name || !questions) {
    alert("Invalid game data");
  }
  set(ref(database, `admin/games/${id}`), {
    name,
    questions,
  });

  if (gameData.images) {
    for (const image of gameData.images) {
      const imageId = image.id;
      const imageUrl = image.url;
      if (!imageId || !imageUrl) {
        alert("Invalid image data");
      }
      set(ref(database, `images/${imageId}`), {
        url: imageUrl,
        kind: image.kind ?? "img",
      });
    }
  }
}

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
  imageId?: string,
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
  if (imageId) newState.imageId = imageId;
  if (time) newState.time = time;
  if (layout) newState.layout = layout;
  set(ref(database, "state"), newState);
}

export function closeQuestion(
  gameId: string,
  questionId: string,
  index: number,
  startTime: number
) {
  const newState: States.PendingReveal = {
    kind: "pendingReveal",
    gameId,
    questionId,
    index,
    startTime,
  };
  set(ref(database, "state"), newState);
}

export function revealQuestion(
  gameId: string,
  questionId: string,
  index: number,
  text?: string,
  imageId?: string,
  layout?: "list" | "grid",
  answers?: Answer[],
  correctAnswerId?: string,
  answerCounts?: Record<string, number>
) {
  const newState: States.QuestionReveal = {
    kind: "questionReveal",
    gameId,
    questionId,
    index,
  };
  if (text) newState.text = text;
  if (imageId) newState.imageId = imageId;
  if (layout) newState.layout = layout;
  if (answers) newState.answers = answers;
  if (correctAnswerId) newState.correctAnswerId = correctAnswerId;
  if (answerCounts) newState.answerCounts = answerCounts;
  set(ref(database, "state"), newState);
}

export function revealCurrentRanking(
  gameId: string,
  questionId: string,
  index: number,
  ranking: Rank[],
  hideRanking?: boolean
) {
  const newState: States.CurrentRanking = {
    kind: "currentRanking",
    gameId,
    questionId,
    index,
    ranking,
  };
  if (hideRanking) newState.hideRanking = hideRanking;
  set(ref(database, "state"), newState);
}

export function prepareFinalRanking(gameId: string, questionId: string) {
  const newState: States.PendingFinalRanking = {
    kind: "pendingFinalRanking",
    gameId,
    questionId,
  };
  set(ref(database, "state"), newState);
}

export function showFinalRanking(
  gameId: string,
  questionId: string,
  ranking: Rank[],
  hideFirst: number
) {
  const newState: States.FinalRanking = {
    kind: "finalRanking",
    gameId,
    questionId,
    ranking,
    hideFirst,
  };
  set(ref(database, "state"), newState);
}

export function updateFinalRankingHideFirst(hideFirst: number) {
  set(ref(database, "state/hideFirst"), hideFirst);
}
