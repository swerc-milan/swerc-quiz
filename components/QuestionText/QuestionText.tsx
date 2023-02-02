import styles from "./QuestionText.module.css";

export function QuestionText({ text }: { text?: string }) {
  return <div className={styles.text}>{text}</div>;
}
