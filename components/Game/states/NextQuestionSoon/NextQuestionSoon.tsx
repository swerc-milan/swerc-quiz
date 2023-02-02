import { MessageView } from "components/MessageView/MessageView";
import { States } from "lib/types";
import styles from "./NextQuestionSoon.module.css";

export function NextQuestionSoon({
  uid,
  state,
}: {
  uid: string;
  state: States.NextQuestionSoon;
}) {
  const questionName =
    state.index !== undefined
      ? `Question ${state.index + 1}`
      : "The next question";
  const topic = state.topic ? (
    <>
      is about{" "}
      <div>
        <strong>{state.topic}</strong>
      </div>
    </>
  ) : (
    "is about to start"
  );
  return (
    <MessageView>
      <div>
        <div>
          {questionName} {topic}
        </div>
        {state.time && <div className={styles.time}>{state.time} seconds</div>}
      </div>
    </MessageView>
  );
}
