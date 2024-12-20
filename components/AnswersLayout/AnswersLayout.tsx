import classnames from "classnames";
import { AnswerButton } from "components/AnswerButton/AnswerButton";
import { Answer } from "lib/types";
import styles from "./AnswersLayout.module.css";

export function AnswersLayout({
  layout,
  answers,
  gameId,
  questionId,
  uid,
  submissionAnswerId,
  correctAnswerId,
  answerCounts,
  wide,
}: {
  layout: "list" | "grid";
  answers?: Answer[];
  gameId: string;
  questionId: string;
  uid?: string;
  submissionAnswerId?: string;
  correctAnswerId?: string;
  answerCounts?: Record<string, number>;
  wide?: boolean;
}) {
  const numAnswers = Object.values(answerCounts ?? {}).reduce(
    (sum, count) => sum + count,
    0
  );
  return (
    <div
      className={classnames(styles.answers, {
        [styles.listLayout]: layout === "list",
        [styles.gridLayout]: layout === "grid",
        [styles.wide]: wide,
      })}
      style={{ "--num-options": (answers ?? []).length } as React.CSSProperties}
    >
      {(answers ?? []).map((answer, index) => (
        <AnswerButton
          key={answer.id ?? index}
          gameId={gameId}
          questionId={questionId}
          uid={uid}
          answerId={answer.id ?? "?"}
          text={answer.text ?? ""}
          answered={!!submissionAnswerId}
          isSubmittedAnswer={submissionAnswerId === answer.id}
          isCorrectAnswer={correctAnswerId === answer.id}
          isWrongAnswer={
            submissionAnswerId !== undefined &&
            correctAnswerId !== undefined &&
            submissionAnswerId !== correctAnswerId &&
            submissionAnswerId === answer.id
          }
          percentage={
            numAnswers > 0
              ? (answerCounts?.[answer.id ?? ""] ?? 0) / numAnswers
              : undefined
          }
        />
      ))}
    </div>
  );
}
