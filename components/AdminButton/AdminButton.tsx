import styles from "./AdminButton.module.css";

export function AdminButton({
  onClick,
  children,
  disabled,
}: {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button onClick={onClick} disabled={disabled} className={styles.button}>
      {children}
    </button>
  );
}
