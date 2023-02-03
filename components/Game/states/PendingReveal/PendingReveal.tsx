import { MessageView } from "components/MessageView/MessageView";
import { ref } from "firebase/database";
import { database } from "lib/firebase";
import { States, Submission } from "lib/types";
import { useObjectVal } from "react-firebase-hooks/database";
import styles from "./PendingReveal.module.css";

export function PendingReveal({
  uid,
  state,
  wide,
}: {
  uid?: string;
  state: States.PendingReveal;
  wide?: boolean;
}) {
  const [submission, submissionLoading] = useObjectVal<Submission>(
    uid
      ? ref(database, `answers/${state.gameId}/${state.questionId}/${uid}`)
      : undefined
  );
  const getMessage = () => {
    if (!uid) return null;
    if (submissionLoading) return "Loading...";
    if (submission) return "We received your answer!";
    return "You didn't answer in time!";
  };

  return (
    <MessageView wide={wide}>
      <div>
        <div>Time is up!</div>
        {getMessage() && <div className={styles.tooLate}>{getMessage()}</div>}
        <div className={styles.subtitle}>And the correct answer is...</div>
      </div>
    </MessageView>
  );
}
