import { ErrorView } from "components/ErrorView/ErrorView";
import { RankingPreview } from "components/RankingPreview/RankingPreview";
import { get, ref, set } from "firebase/database";
import { revealQuestion } from "lib/admin";
import { database } from "lib/firebase";
import { updateRanking } from "lib/ranking";
import { Game, Ranking, States, Submission } from "lib/types";
import { useObject, useObjectVal } from "react-firebase-hooks/database";

export function PendingReveal({
  state,
  game,
}: {
  state: States.PendingReveal;
  game: Game;
}) {
  const [submissionsSnapshot, submissionsLoading, submissionsError] = useObject(
    ref(database, `answers/${state.gameId}/${state.questionId}`)
  );
  const [ranking, rankingLoading, rankingError] = useObjectVal<Ranking>(
    ref(database, `ranking/${state.gameId}/${state.questionId}`)
  );

  if (!game.questions) return <ErrorView error="Game has no questions" />;
  const gameId = state.gameId;
  if (!gameId) return <ErrorView error="Missing game id" />;
  const index = state.index;
  if (index === undefined)
    return <ErrorView error="Missing current question index" />;
  if (index >= game.questions.length)
    return <ErrorView error="Invalid question index" />;

  const question = game.questions[index];
  const correctAnswerId = question.correctAnswerId;
  const correctAnswer = (question.answers ?? []).find(
    (a) => a.id === correctAnswerId
  );

  if (!correctAnswer) return <ErrorView error="Missing correct answer" />;

  if (submissionsLoading) return <div>Loading submissions...</div>;
  if (submissionsError) return <ErrorView error={submissionsError} />;

  if (rankingLoading) return <div>Loading ranking...</div>;
  if (rankingError) return <ErrorView error={rankingError} />;

  const submissions: Record<string, Submission> =
    submissionsSnapshot?.val() ?? {};

  const computeRanking = () => {
    if (!game.questions) return;

    if (index > 0) {
      // Compute the ranking from the previous question's one.
      const previousQuestion = game.questions[index - 1];
      get(ref(database, `ranking/${gameId}/${previousQuestion.id}`)).then(
        (snap) => {
          const oldRanking = snap.val();
          if (!oldRanking) return;
          const newRanking = updateRanking(
            oldRanking.ranking ?? [],
            submissions,
            state.startTime ?? 0,
            question.time ?? 0,
            correctAnswer.id ?? ""
          );
          set(
            ref(database, `ranking/${gameId}/${state.questionId}`),
            newRanking
          );
        }
      );
    } else {
      // This is the first question, start from an empty ranking.
      const newRanking = updateRanking(
        [],
        submissions,
        state.startTime ?? 0,
        question.time ?? 0,
        correctAnswer.id ?? ""
      );
      set(ref(database, `ranking/${gameId}/${state.questionId}`), newRanking);
    }
  };

  return (
    <div>
      <div>
        Total of {Object.keys(submissions).length} submissions. Correct answer
        is <strong>{correctAnswer.text}</strong>.
      </div>
      <div>
        {ranking ? (
          <>
            <div>Ranking is ready!</div>
            <button
              onClick={() => {
                revealQuestion(
                  gameId,
                  question.id,
                  index,
                  question.text,
                  question.imageId,
                  question.layout,
                  question.answers,
                  correctAnswer.id
                );
              }}
            >
              Reveal correct answer
            </button>
            <RankingPreview ranking={ranking.ranking ?? []} />
          </>
        ) : (
          <>
            <div>Ranking is not ready yet.</div>
            <button onClick={() => computeRanking()}>Compute ranking</button>
          </>
        )}
      </div>
    </div>
  );
}
