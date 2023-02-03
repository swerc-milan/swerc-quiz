import classNames from "classnames";
import styles from "./MessageView.module.css";

export function MessageView({
  children,
  wide,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={classNames(styles.message, { [styles.wide]: wide })}>
      {children}
    </div>
  );
}
