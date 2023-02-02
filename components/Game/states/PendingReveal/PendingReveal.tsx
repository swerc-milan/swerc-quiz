import { MessageView } from "components/MessageView/MessageView";
import { ref } from "firebase/database";
import { database } from "lib/firebase";
import { States, Submission } from "lib/types";
import { useObjectVal } from "react-firebase-hooks/database";
import styles from "./PendingReveal.module.css";

export function PendingReveal({
  uid,
  state,
}: {
  uid: string;
  state: States.PendingReveal;
}) {
  const [submission, submissionLoading] = useObjectVal<Submission>(
    ref(database, `answers/${state.gameId}/${state.questionId}/${uid}`)
  );
  return (
    <MessageView>
      <div>
        <div>Time is up!</div>
        {submissionLoading ? (
          <div className={styles.tooLate}>Loading...</div>
        ) : submission ? (
          <div className={styles.tooLate}>We received your answer!</div>
        ) : (
          <div className={styles.tooLate}>You didn't answer in time!</div>
        )}
        <div className={styles.subtitle}>And the correct answer is...</div>
      </div>
    </MessageView>
  );
}
