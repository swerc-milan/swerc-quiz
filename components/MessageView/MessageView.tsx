import styles from "./MessageView.module.css";

export function MessageView({ children }: { children: React.ReactNode }) {
  return <div className={styles.message}>{children}</div>;
}
