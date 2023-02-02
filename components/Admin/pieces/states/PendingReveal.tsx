import { ErrorView } from "components/ErrorView/ErrorView";
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
  const [ranking, rankingLoading, rankingError] = useObjectVal(
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

  if (!ranking) {
    if (index > 0) {
      // Compute the ranking from the previous question's one.
      const previousQuestion = game.questions[index - 1];
      get(ref(database, `ranking/${gameId}/${previousQuestion.id}`)).then(
        (snap) => {
          const oldRanking = snap.val();
          if (!oldRanking) return;
          const newRanking = updateRanking(
            [],
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
  }

  const newRanking: Ranking[] | undefined = ranking as Ranking[] | undefined;

  return (
    <div>
      <div>
        Total of {Object.keys(submissions).length} submissions. Correct answer
        is <strong>{correctAnswer.text}</strong>.
      </div>
      <div>
        {newRanking ? (
          <>
            <div>Ranking is ready!</div>
            <button
              onClick={() => {
                revealQuestion(
                  gameId,
                  question.id,
                  index,
                  question.text,
                  question.layout,
                  question.answers,
                  correctAnswer.id
                );
              }}
            >
              Reveal correct answer
            </button>
            <RankingPreview ranking={newRanking} />
          </>
        ) : (
          <div>Ranking is not ready yet.</div>
        )}
      </div>
    </div>
  );
}

function RankingPreview({ ranking }: { ranking: Ranking[] }) {
  const [usersSnapshot, usersLoading, usersError] = useObject(
    ref(database, "users")
  );
  if (usersLoading) return <div>Loading users...</div>;
  if (usersError) return <ErrorView error={usersError} />;
  const users = usersSnapshot?.val() ?? {};

  return (
    <ol>
      {ranking.map((r) => (
        <li key={r.uid} value={r.rank}>
          {users[r.uid]?.name ?? r.uid} {r.score} (+{r.delta})
        </li>
      ))}
    </ol>
  );
}
