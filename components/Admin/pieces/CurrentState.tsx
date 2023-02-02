import { Game } from "components/Game/Game";
import styles from "./CurrentState.module.css";

export function CurrentState({ uid }: { uid: string }) {
  return (
    <>
      <details>
        <div className={styles.currentState}>
          <Game uid={uid} />
        </div>
      </details>
    </>
  );
}
