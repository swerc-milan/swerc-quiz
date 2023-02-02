import { ErrorView } from "components/ErrorView/ErrorView";
import { RankingItem } from "components/RankingItem/RankingItem";
import { ref } from "firebase/database";
import { database } from "lib/firebase";
import { States, User } from "lib/types";
import { useObjectVal } from "react-firebase-hooks/database";
import styles from "./FinalRanking.module.css";

export function FinalRanking({
  uid,
  state,
}: {
  uid: string;
  state: States.FinalRanking;
}) {
  const [users, usersLoading, usersError] = useObjectVal<Record<string, User>>(
    ref(database, "users")
  );
  if (usersLoading) return <div>Loading...</div>;
  if (usersError) return <ErrorView error={usersError} />;

  const hideFirst = state.hideFirst ?? 0;

  return (
    <div className={styles.container}>
      <div className={styles.title}>Final standings</div>
      <div className={styles.ranking}>
        {(state.ranking ?? []).map((item, index) => (
          <RankingItem
            key={item.uid}
            item={item}
            hideName={item.rank <= hideFirst}
            users={users ?? {}}
            index={index}
            isMe={item.uid === uid && item.rank > hideFirst}
          />
        ))}
      </div>
    </div>
  );
}
