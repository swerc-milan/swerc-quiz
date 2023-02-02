import { Game } from "components/Game/Game";
import { ref } from "firebase/database";
import { database } from "lib/firebase";
import { State } from "lib/types";
import { useObjectVal } from "react-firebase-hooks/database";
import styles from "./CurrentState.module.css";

export function CurrentState({ uid }: { uid: string }) {
  const [state, loading] = useObjectVal<State>(ref(database, "state"));

  const currentState = loading ? "loading" : state?.kind ?? "no state";

  return (
    <>
      <h2>
        Current state <small>({currentState})</small>
      </h2>
      <details>
        <div className={styles.currentState}>
          <Game uid={uid} />
        </div>
      </details>
    </>
  );
}
