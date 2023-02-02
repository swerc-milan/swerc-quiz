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
}: {
  gameId: string;
  questionId: string;
  uid: string;
  answerId: string;
  text: string;
  answered: boolean;
  isSubmittedAnswer: boolean;
  isCorrectAnswer: boolean;
  isWrongAnswer: boolean;
}) {
  return (
    <button
      className={classnames(styles.answer, {
        [styles.isSubmittedAnswer]: isSubmittedAnswer,
        [styles.isCorrectAnswer]: isCorrectAnswer,
        [styles.isWrongAnswer]: isWrongAnswer,
      })}
      onClick={() => submitAnswer(gameId, questionId, uid, answerId)}
      disabled={answered}
    >
      {text}
    </button>
  );
}
