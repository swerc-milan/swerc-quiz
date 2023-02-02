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
}: {
  uid: string;
  state: States.QuestionReveal;
}) {
  const [submission] = useObjectVal<Submission>(
    ref(database, `answers/${state.gameId}/${state.questionId}/${uid}`)
  );
  const submissionAnswerId = submission?.answerId;
  const layout = state.layout ?? "list";

  return (
    <div>
      <GameHeader index={state.index} />
      <QuestionText text={state.text} />
      <AnswersLayout
        layout={layout}
        answers={state.answers}
        gameId={state.gameId ?? "?"}
        questionId={state.questionId ?? "?"}
        uid={uid}
        submissionAnswerId={submissionAnswerId}
        correctAnswerId={state.correctAnswerId}
      />
    </div>
  );
}
