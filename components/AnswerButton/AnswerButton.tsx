import classnames from "classnames";
import { submitAnswer } from "lib/game";
import styles from "./AnswerButton.module.css";

export function AnswerButton({
  gameId,
  questionId,
  uid,
  answerId,
  text,
  answered,
  isSubmittedAnswer,
  isCorrectAnswer,
  isWrongAnswer,
  percentage,
}: {
  gameId: string;
  questionId: string;
  uid?: string;
  answerId: string;
  text: string;
  answered: boolean;
  isSubmittedAnswer: boolean;
  isCorrectAnswer: boolean;
  isWrongAnswer: boolean;
  percentage?: number;
}) {
  return (
    <button
      className={classnames(styles.answer, {
        [styles.isSubmittedAnswer]: isSubmittedAnswer,
        [styles.isCorrectAnswer]: isCorrectAnswer,
        [styles.isWrongAnswer]: isWrongAnswer,
        [styles.withPercentage]: percentage !== undefined,
      })}
      style={
        percentage !== undefined
          ? ({
              "--percentage": `${percentage * 100}%` ?? "0",
            } as React.CSSProperties)
          : {}
      }
      onClick={() => uid && submitAnswer(gameId, questionId, uid, answerId)}
      disabled={answered}
    >
      {text}
    </button>
  );
}
