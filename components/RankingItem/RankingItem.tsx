import { Ranking, User } from "lib/types";
import styles from "./RankingItem.module.css";

export function RankingItem({
  item,
  hideName,
  users,
}: {
  item: Ranking;
  hideName: boolean;
  users: Record<string, User>;
}) {
  const user = users[item.uid] ?? { name: "Unknown" };
  return (
    <div className={styles.item}>
      <div className={styles.rank}>#{item.rank}</div>
      <div className={styles.score}>{item.score}</div>
      <div className={styles.delta}>+{item.delta}</div>
      <div className={styles.name}>{user.name}</div>
    </div>
  );
}
