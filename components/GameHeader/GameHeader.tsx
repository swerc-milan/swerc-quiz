import { Timer } from "components/Timer/Timer";
import styles from "./GameHeader.module.css";

export function GameHeader({
  index,
  time,
  startTime,
}: {
  index?: number;
  time?: number;
  startTime?: number;
}) {
  return (
    <div className={styles.header}>
      <div className={styles.questionNumber}>
        Question {index === undefined ? "" : index + 1}
      </div>
      {time && startTime && (
        <div className={styles.timer}>
          <Timer startTimestamp={startTime} duration={time * 1000} />
        </div>
      )}
    </div>
  );
}
