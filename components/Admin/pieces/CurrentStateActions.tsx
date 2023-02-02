import { database } from "lib/firebase";
import { useObject, useObjectVal } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import { Games, State } from "lib/types";
import { ErrorView } from "components/ErrorView/ErrorView";
import { NoGame } from "./states/NoGame";
import { PendingStart } from "./states/PendingStart";
import { cancelGame } from "lib/admin";
import { NextQuestionSoon } from "./states/NextQuestionSoon";

export function CurrentStateActions() {
  const [state, stateLoading, stateError] = useObjectVal<State>(
    ref(database, "state")
  );
  const [gamesSnapshot, gamesLoading, gamesError] = useObject(
    ref(database, "admin/games")
  );
  const error = stateError ?? gamesError;

  if (stateLoading || gamesLoading) return <div>Loading...</div>;
  if (error) return <ErrorView error={error} />;

  const games = gamesSnapshot?.val() as Games;

  if (!state) {
    return <NoGame games={games} />;
  }
  if (!state.gameId || !(state.gameId in games)) {
    return (
      <>
        <ErrorView error={`Game ${state.gameId ?? "<missing id>"} not found`} />
        <button onClick={() => cancelGame()}>Reset</button>
      </>
    );
  }

  const game = games[state.gameId];

  switch (state.kind) {
    case "pendingStart":
      return <PendingStart state={state} game={game} />;
    case "nextQuestionSoon":
      return <NextQuestionSoon state={state} game={game} />;
  }
}
