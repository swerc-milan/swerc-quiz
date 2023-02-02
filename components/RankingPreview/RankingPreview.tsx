import { ErrorView } from "components/ErrorView/ErrorView";
import { ref } from "firebase/database";
import { database } from "lib/firebase";
import { Rank, User } from "lib/types";
import { useObjectVal } from "react-firebase-hooks/database";

export function RankingPreview({ ranking }: { ranking: Rank[] }) {
  const [users, usersLoading, usersError] = useObjectVal<Record<string, User>>(
    ref(database, "users")
  );
  if (usersLoading) return <div>Loading users...</div>;
  if (usersError) return <ErrorView error={usersError} />;
  if (!users) return null;

  return (
    <ol>
      {ranking.map((r) => (
        <li key={r.uid} value={r.rank}>
          {users[r.uid]?.name ?? r.uid} {r.score} (+{r.delta})
        </li>
      ))}
    </ol>
  );
}
