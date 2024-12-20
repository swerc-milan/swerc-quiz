import { States, Submission } from "lib/types";
import { useObjectVal } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import { database } from "lib/firebase";
import { GameHeader } from "components/GameHeader/GameHeader";
import { AnswersLayout } from "components/AnswersLayout/AnswersLayout";
import { QuestionText } from "components/QuestionText/QuestionText";

export function QuestionReveal({
  uid,
  state,
  wide,
}: {
  uid?: string;
  state: States.QuestionReveal;
  wide?: boolean;
}) {
  const [submission] = useObjectVal<Submission>(
    uid
      ? ref(database, `answers/${state.gameId}/${state.questionId}/${uid}`)
      : undefined
  );
  const submissionAnswerId = submission?.answerId;
  const layout = state.layout ?? "list";
  const answerCounts = state.answerCounts ?? {};

  return (
    <div>
      <GameHeader index={state.index} wide={wide} />
      <QuestionText text={state.text} imageUrl={state.imageUrl} wide={wide} />
      <AnswersLayout
        layout={layout}
        answers={state.answers}
        gameId={state.gameId ?? "?"}
        questionId={state.questionId ?? "?"}
        uid={uid}
        submissionAnswerId={submissionAnswerId}
        correctAnswerId={state.correctAnswerId}
        answerCounts={answerCounts}
        wide={wide}
      />
    </div>
  );
}
