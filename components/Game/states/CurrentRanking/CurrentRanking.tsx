import { ErrorView } from "components/ErrorView/ErrorView";
import { RankingItem } from "components/RankingItem/RankingItem";
import { ref } from "firebase/database";
import { database } from "lib/firebase";
import { States, User } from "lib/types";
import { useObjectVal } from "react-firebase-hooks/database";
import styles from "./CurrentRanking.module.css";

const CUTOFF = 5;

export function CurrentRanking({
  uid,
  state,
}: {
  uid: string;
  state: States.CurrentRanking;
}) {
  const [users, usersLoading, usersError] = useObjectVal<Record<string, User>>(
    ref(database, "users")
  );
  if (usersLoading) return <div>Loading...</div>;
  if (usersError) return <ErrorView error={usersError} />;

  const index = state.index === undefined ? state.index : state.index + 1;
  const myRanking = state.ranking?.find((r) => r.uid === uid);
  const hidden = state.hideRanking ?? false;

  return (
    <div className={styles.container}>
      <div className={styles.title}>After question {index}</div>
      {myRanking && myRanking.rank > CUTOFF && (
        <div className={styles.myRanking}>
          <p className={styles.myRankingTitle}>Your position</p>
          <RankingItem
            item={myRanking}
            hideName={false}
            users={users ?? {}}
            index={0}
            isMe
          />
        </div>
      )}
      <div className={styles.ranking}>
        {(state.ranking ?? [])
          .filter((r) => r.rank <= CUTOFF)
          .map((item, index) => (
            <RankingItem
              key={item.uid}
              item={item}
              hideName={hidden}
              users={users ?? {}}
              index={index}
              isMe={item.uid === uid && !hidden}
            />
          ))}
      </div>
    </div>
  );
}
