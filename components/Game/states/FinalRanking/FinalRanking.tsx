import classNames from "classnames";
import { RankingItem } from "components/RankingItem/RankingItem";
import { States } from "lib/types";
import styles from "./FinalRanking.module.css";

export function FinalRanking({
  uid,
  state,
  wide,
}: {
  uid?: string;
  state: States.FinalRanking;
  wide?: boolean;
}) {
  const hideFirst = state.hideFirst ?? 0;

  return (
    <div className={classNames(styles.container, { [styles.wide]: wide })}>
      <div className={styles.title}>Final standings</div>
      <div className={styles.ranking}>
        {(state.ranking ?? [])
          .filter((r) => r.uid === uid || !r.isHidden)
          .map((item, index) => {
            const isMe = item.uid === uid;
            const shouldHide = (item.rank ?? Infinity) <= hideFirst;
            return (
              <RankingItem
                key={item.uid}
                item={item}
                hideName={shouldHide}
                index={index}
                isMe={isMe && !shouldHide}
                wide={wide}
              />
            );
          })}
      </div>
    </div>
  );
}
