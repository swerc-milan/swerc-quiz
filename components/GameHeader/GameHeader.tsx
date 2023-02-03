import classNames from "classnames";
import { Timer } from "components/Timer/Timer";
import styles from "./GameHeader.module.css";

export function GameHeader({
  index,
  time,
  startTime,
  wide,
}: {
  index?: number;
  time?: number;
  startTime?: number;
  wide?: boolean;
}) {
  return (
    <div className={classNames(styles.header, { [styles.wide]: wide })}>
      <div className={styles.questionNumber}>
        Question {index === undefined ? "" : index + 1}
      </div>
      {time && startTime && (
        <div className={styles.timer}>
          <Timer
            startTimestamp={startTime}
            duration={time * 1000}
            wide={wide}
          />
        </div>
      )}
    </div>
  );
}
