import { ErrorView } from "components/ErrorView/ErrorView";
import { QuestionPreview } from "components/QuestionPreview/QuestionPreview";
import { RankingPreview } from "components/RankingPreview/RankingPreview";
import { ref } from "firebase/database";
import { prepareFinalRanking, prepareNextQuestion } from "lib/admin";
import { database } from "lib/firebase";
import { Game, Ranking, States } from "lib/types";
import { useObjectVal } from "react-firebase-hooks/database";

export function CurrentRanking({
  state,
  game,
}: {
  state: States.CurrentRanking;
  game: Game;
}) {
  const [ranking, rankingLoading, rankingError] = useObjectVal<Ranking[]>(
    ref(database, `ranking/${state.gameId}/${state.questionId}`)
  );

  if (!game.questions) return <ErrorView error="Game has no questions" />;
  const gameId = state.gameId;
  if (!gameId) return <ErrorView error="Missing game id" />;
  const questionId = state.questionId;
  if (!questionId) return <ErrorView error="Missing question id" />;
  const index = state.index;
  if (index === undefined)
    return <ErrorView error="Missing current question index" />;
  if (index >= game.questions.length)
    return <ErrorView error="Invalid question index" />;

  if (rankingLoading) return <div>Loading ranking...</div>;
  if (rankingError) return <ErrorView error={rankingError} />;
  if (!ranking) return <ErrorView error="Missing ranking" />;

  const nextQuestion =
    index + 1 < game.questions.length ? game.questions[index + 1] : null;

  return (
    <div>
      {nextQuestion ? (
        <>
          <p>Ready to start the next question.</p>
          <button
            onClick={() => {
              prepareNextQuestion(
                gameId,
                nextQuestion.id,
                index + 1,
                nextQuestion.topic,
                nextQuestion.time
              );
            }}
          >
            Prepare next question
          </button>
          <QuestionPreview question={nextQuestion} />
        </>
      ) : (
        <>
          <p>This was the last question.</p>
          <button
            onClick={() => {
              prepareFinalRanking(gameId, questionId);
            }}
          >
            Start the hype
          </button>
        </>
      )}

      <h3>Full ranking</h3>
      <RankingPreview ranking={ranking} />
    </div>
  );
}
