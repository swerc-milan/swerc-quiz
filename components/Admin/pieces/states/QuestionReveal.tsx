import { ErrorView } from "components/ErrorView/ErrorView";
import { RankingPreview } from "components/RankingPreview/RankingPreview";
import { ref } from "firebase/database";
import { revealCurrentRanking } from "lib/admin";
import { database } from "lib/firebase";
import { Game, Ranking, States } from "lib/types";
import { useObjectVal } from "react-firebase-hooks/database";

export function QuestionReveal({
  state,
  game,
}: {
  state: States.QuestionReveal;
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

  const question = game.questions[index];
  const hideRanking = question.hideRanking ?? false;

  return (
    <div>
      <p>Ready to reveal current standings.</p>
      <button
        onClick={() =>
          revealCurrentRanking(gameId, questionId, index, ranking, hideRanking)
        }
      >
        Reveal standings
      </button>
      <RankingPreview ranking={ranking} />
    </div>
  );
}
