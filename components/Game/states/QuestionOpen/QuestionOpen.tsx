import { States } from "lib/types";
import styles from "./QuestionOpen.module.css";
import classnames from "classnames";

export function QuestionOpen({
  uid,
  state,
}: {
  uid: string;
  state: States.QuestionOpen;
}) {
  const index = state.index === undefined ? "" : state.index + 1;
  const layout = state.layout ?? "list";

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
        {(state.answers ?? []).map((answer) => (
          <button key={answer.id} className={styles.answer}>
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
}
