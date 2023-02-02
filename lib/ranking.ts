import { Rank, Ranking, Submission } from "./types";

// Points that are awarded to the first correct submission if everyone answers correctly.
const MIN_POINTS_FASTEST_CORRECT = 500;
// Points that are awarded to the first correct submission if everyone answers wrongly.
// Note that since nobody answers correctly, this score is never awarded.
const MAX_POINTS_FASTEST_CORRECT = 1000;
// Points awarded to a correct submission at the end of the time limit.
const MIN_POINTS_CORRECT = 10;

export function updateRanking(
  oldRanking: Rank[],
  submissions: Record<string, Submission>,
  startTime: number,
  maxTime: number,
  correctAnswerId: string
): Ranking {
  const newRanking: Record<string, Rank> = {};
  for (const oldPlayer of oldRanking) {
    newRanking[oldPlayer.uid] = {
      uid: oldPlayer.uid,
      rank: -1,
      score: oldPlayer.score,
      delta: 0,
    };
  }
  const answerCounts: Record<string, number> = {};
  for (const [uid, submission] of Object.entries(submissions)) {
    if (!(uid in newRanking)) {
      newRanking[uid] = {
        uid,
        rank: -1,
        score: 0,
        delta: 0,
      };
    }
    if (!(submission.answerId in answerCounts)) {
      answerCounts[submission.answerId] = 0;
    }
    answerCounts[submission.answerId]++;
  }
  const numPlayers = Object.keys(newRanking).length;

  const correctSubmissions = Object.entries(submissions).filter(
    ([uid, sub]) => sub.answerId === correctAnswerId
  );
  const numCorrect = correctSubmissions.length;
  const correctPercentage = numCorrect / numPlayers;

  if (numCorrect === 0) {
    return {
      ranking: updateRank(newRanking),
      answerCounts,
      computedAt: new Date().getTime(),
    };
  }

  // Time from the opening of the question to the first correct submission.
  const firstCorrectTime =
    Math.min(...correctSubmissions.map(([uid, sub]) => sub.ts)) - startTime;

  // Points awarded to the first correct submission.
  const maxScore =
    MIN_POINTS_FASTEST_CORRECT +
    (MAX_POINTS_FASTEST_CORRECT - MIN_POINTS_FASTEST_CORRECT) *
      correctPercentage;
  const minScore = MIN_POINTS_CORRECT;

  for (const [uid, sub] of correctSubmissions) {
    const time = Math.min(sub.ts - startTime, maxTime * 1000);
    const timeFactor =
      (time - firstCorrectTime) / (maxTime * 1000 - firstCorrectTime);
    // timeFactor == 0 -> delta == maxScore
    // timeFactor == 1 -> delta == minScore
    const delta = Math.round(maxScore - (maxScore - minScore) * timeFactor);

    newRanking[uid].score += delta;
    newRanking[uid].delta = delta;
  }

  return {
    ranking: updateRank(newRanking),
    answerCounts,
    computedAt: new Date().getTime(),
  };
}

function updateRank(ranking: Record<string, Rank>) {
  const sorted = Object.values(ranking).sort((a, b) => compare(a, b));
  let rank = 0;
  let index = 0;
  let score = Infinity;
  for (const player of sorted) {
    if (player.score < score) {
      rank = index + 1;
      score = player.score;
    }
    player.rank = rank;
    index++;
  }
  return sorted;
}

function compare(a: Rank, b: Rank) {
  if (a.rank < b.rank) return -1;
  if (a.rank > b.rank) return 1;
  if (a.score > b.score) return -1;
  if (a.score < b.score) return 1;
  if (a.delta > b.delta) return -1;
  if (a.delta < b.delta) return 1;
  return 0;
}
