import classNames from "classnames";
import { Rank, User } from "lib/types";
import styles from "./RankingItem.module.css";

const HIDDEN_NAMES = [
  "Don Quixote, Miguel de Cervantes",
  "A Tale of Two Cities, Charles Dickens",
  "The Little Prince (Le Petit Prince),	Antoine de Saint-Exupéry",
  "Harry Potter and the Philosopher's Stone, J. K. Rowling",
  "And Then There Were None, Agatha Christie",
  "Dream of the Red Chamber, Cao Xueqin",
  "The Hobbit, J. R. R. Tolkien",
  "The Lion, the Witch and the Wardrobe, C. S. Lewis",
  "She: A History of Adventure, H. Rider Haggard",
  "Vardi Wala Gunda, Ved Prakash Sharma",
];

export function RankingItem({
  item,
  hideName,
  index,
  isMe,
  wide,
}: {
  item: Rank;
  hideName: boolean;
  index: number;
  isMe: boolean;
  wide?: boolean;
}) {
  const name = hideName ? HIDDEN_NAMES[index % HIDDEN_NAMES.length] : item.name;
  return (
    <div
      className={classNames(styles.item, {
        [styles.isMe]: isMe,
        [styles.wide]: wide,
      })}
    >
      <div className={styles.rank}>
        {item.rank !== undefined ? `#${item.rank}` : "?"}
      </div>
      <div className={styles.score}>{item.score}</div>
      <div className={styles.delta}>+{item.delta}</div>
      <div className={classNames(styles.name, { [styles.hidden]: hideName })}>
        {name}
      </div>
    </div>
  );
}
