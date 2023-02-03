import classNames from "classnames";
import { RankingItem } from "components/RankingItem/RankingItem";
import { States } from "lib/types";
import styles from "./CurrentRanking.module.css";

const CUTOFF = 5;

export function CurrentRanking({
  uid,
  state,
  wide,
}: {
  uid?: string;
  state: States.CurrentRanking;
  wide?: boolean;
}) {
  const index = state.index === undefined ? state.index : state.index + 1;
  const myRanking = state.ranking?.find((r) => r.uid === uid);
  const hidden = state.hideRanking ?? false;

  return (
    <div className={classNames(styles.container, { [styles.wide]: wide })}>
      <div className={styles.title}>After question {index}</div>
      {myRanking && (myRanking.rank ?? Infinity) > CUTOFF && (
        <div className={styles.myRanking}>
          <p className={styles.myRankingTitle}>Your position</p>
          <RankingItem
            item={myRanking}
            hideName={false}
            index={0}
            isMe
            wide={wide}
          />
        </div>
      )}
      <div className={styles.ranking}>
        {(state.ranking ?? [])
          .filter((r) => r.rank !== undefined && r.rank <= CUTOFF)
          .filter((r) => !r.isHidden)
          .map((item, index) => (
            <RankingItem
              key={item.uid}
              item={item}
              hideName={hidden}
              index={index}
              isMe={item.uid === uid && !hidden}
              wide={wide}
            />
          ))}
      </div>
    </div>
  );
}
