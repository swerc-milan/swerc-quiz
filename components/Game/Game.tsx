import { ErrorView } from "components/ErrorView/ErrorView";
import { ref } from "firebase/database";
import { database } from "lib/firebase";
import { State } from "lib/types";
import { useObjectVal } from "react-firebase-hooks/database";
import { NextQuestionSoon } from "./states/NextQuestionSoon/NextQuestionSoon";
import { NoGame } from "./states/NoGame/NoGame";
import { PendingStart } from "./states/PendingStart/PendingStart";
import { QuestionOpen } from "./states/QuestionOpen/QuestionOpen";

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
    default:
      return <div>Unknown state</div>;
  }
}
