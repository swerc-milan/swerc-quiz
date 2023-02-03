import { Rank } from "lib/types";

export function RankingPreview({ ranking }: { ranking: Rank[] }) {
  return (
    <ol>
      {ranking.map((r) => (
        <li key={r.uid} value={r.rank ?? "?"}>
          {r.name} {r.score} (+{r.delta})
        </li>
      ))}
    </ol>
  );
}
