import { ErrorView } from "components/ErrorView/ErrorView";
import { ref } from "firebase/database";
import { database } from "lib/firebase";
import { State } from "lib/types";
import { useObjectVal } from "react-firebase-hooks/database";
import { CurrentRanking } from "./states/CurrentRanking/CurrentRanking";
import { NextQuestionSoon } from "./states/NextQuestionSoon/NextQuestionSoon";
import { NoGame } from "./states/NoGame/NoGame";
import { PendingReveal } from "./states/PendingReveal/PendingReveal";
import { PendingStart } from "./states/PendingStart/PendingStart";
import { QuestionOpen } from "./states/QuestionOpen/QuestionOpen";
import { QuestionReveal } from "./states/QuestionReveal/QuestionReveal";

export function Game({ uid }: { uid: string }) {
  const [state, loading, error] = useObjectVal<State>(ref(database, "state"));

  if (loading) return <div>Loading...</div>;
  if (error) return <ErrorView error={error} />;
  if (state === undefined) return <div>An unknown error occurred</div>;
  return <GameInner uid={uid} state={state} />;
}

function GameInner({ uid, state }: { uid: string; state: State }) {
  if (state === null) return <NoGame uid={uid} state={state} />;
  switch (state.kind) {
    case "pendingStart":
      return <PendingStart uid={uid} state={state} />;
    case "nextQuestionSoon":
      return <NextQuestionSoon uid={uid} state={state} />;
    case "questionOpen":
      return <QuestionOpen uid={uid} state={state} />;
    case "pendingReveal":
      return <PendingReveal uid={uid} state={state} />;
    case "questionReveal":
      return <QuestionReveal uid={uid} state={state} />;
    case "currentRanking":
      return <CurrentRanking uid={uid} state={state} />;
    default:
      return (
        <div>
          Unknown state:{" "}
          <div>
            <pre>{JSON.stringify(state, undefined, 2)}</pre>
          </div>
        </div>
      );
  }
}
