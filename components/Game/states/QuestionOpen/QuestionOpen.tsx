import { States, Submission } from "lib/types";
import styles from "./QuestionOpen.module.css";
import classnames from "classnames";
import { submitAnswer } from "lib/game";
import { useObjectVal } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import { database } from "lib/firebase";

export function QuestionOpen({
  uid,
  state,
}: {
  uid: string;
  state: States.QuestionOpen;
}) {
  const [submission] = useObjectVal<Submission>(
    ref(database, `answers/${state.gameId}/${state.questionId}/${uid}`)
  );
  const index = state.index === undefined ? "" : state.index + 1;
  const layout = state.layout ?? "list";

  const submissionAnswerId = submission?.answerId;

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.questionNumber}>Question {index}</div>
        <div className={styles.timer}>(timer)</div>
      </div>
      <div className={styles.text}>{state.text}</div>
      <div
        className={classnames(styles.answers, {
          [styles.listLayout]: layout === "list",
          [styles.gridLayout]: layout === "grid",
        })}
      >
        {(state.answers ?? []).map((answer, index) => (
          <AnswerButton
            key={answer.id ?? index}
            gameId={state.gameId ?? "?"}
            questionId={state.questionId ?? "?"}
            uid={uid}
            answerId={answer.id ?? "?"}
            text={answer.text ?? ""}
            answered={!!submissionAnswerId}
            isSubmittedAnswer={submissionAnswerId === answer.id}
          />
        ))}
      </div>
    </div>
  );
}

function AnswerButton({
  gameId,
  questionId,
  uid,
  answerId,
  text,
  answered,
  isSubmittedAnswer,
}: {
  gameId: string;
  questionId: string;
  uid: string;
  answerId: string;
  text: string;
  answered: boolean;
  isSubmittedAnswer: boolean;
}) {
  return (
    <button
      className={classnames(styles.answer, {
        [styles.isSubmittedAnswer]: isSubmittedAnswer,
      })}
      onClick={() => submitAnswer(gameId, questionId, uid, answerId)}
      disabled={answered}
    >
      {text}
    </button>
  );
}
