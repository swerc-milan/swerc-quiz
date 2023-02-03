import classNames from "classnames";
import styles from "./Layout.module.css";

export function Layout({
  children,
  wide,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={classNames(styles.container, { [styles.wide]: wide })}>
      {children}
    </div>
  );
}
