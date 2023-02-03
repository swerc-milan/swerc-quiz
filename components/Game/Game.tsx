import { ErrorView } from "components/ErrorView/ErrorView";
import { ref } from "firebase/database";
import { database } from "lib/firebase";
import { State } from "lib/types";
import { useWakeLock } from "lib/useWakeLock";
import React, { useEffect, useState } from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import { CurrentRanking } from "./states/CurrentRanking/CurrentRanking";
import { FinalRanking } from "./states/FinalRanking/FinalRanking";
import { NextQuestionSoon } from "./states/NextQuestionSoon/NextQuestionSoon";
import { NoGame } from "./states/NoGame/NoGame";
import { PendingFinalRanking } from "./states/PendingFinalRanking/PendingFinalRanking";
import { PendingReveal } from "./states/PendingReveal/PendingReveal";
import { PendingStart } from "./states/PendingStart/PendingStart";
import { QuestionOpen } from "./states/QuestionOpen/QuestionOpen";
import { QuestionReveal } from "./states/QuestionReveal/QuestionReveal";
import styles from "./Game.module.css";
import classNames from "classnames";

const ANIMATION_DURATION = 1000;
// const ANIMATION_DURATION = 5000;

export function Game({ uid, wide }: { uid?: string; wide?: boolean }) {
  const [state, loading, error] = useObjectVal<State>(ref(database, "state"));
  // Keep the current state and the last state so that we can transition between them.
  const [previousState, setPreviousState] = useState<State | undefined>(
    undefined
  );
  const [currentState, setCurrentState] = useState<State | undefined>(
    undefined
  );

  useEffect(() => {
    const savedStateKind = currentState?.kind;
    const stateKind = state?.kind;
    let timer: NodeJS.Timeout | null = null;

    if (savedStateKind !== stateKind) {
      setPreviousState(currentState);
      if (currentState !== undefined) {
        // Remove the old state after the animation has finished.
        timer = setTimeout(
          () => setPreviousState(undefined),
          ANIMATION_DURATION
        );
      }
    }
    setCurrentState(state ? { ...state } : null);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [state]);

  if (loading) return <div>Loading...</div>;
  if (error) return <ErrorView error={error} />;
  if (state === undefined) return <div>An unknown error occurred</div>;

  if (currentState === undefined) return null;
  if (previousState === undefined)
    return <GameInner uid={uid} state={currentState} wide={wide} />;
  const previousStateKind = previousState?.kind;
  const stateKind = state?.kind;

  if (previousStateKind !== stateKind) {
    return (
      <>
        <GameInner uid={uid} state={state} wide={wide} />
        <div
          className={classNames(styles.fadeAway, { [styles.wide]: wide })}
          style={
            {
              "--duration": `${ANIMATION_DURATION / 1000}s`,
            } as React.CSSProperties
          }
        >
          <GameInner uid={uid} state={previousState} wide={wide} />
        </div>
      </>
    );
  }
  return <GameInner uid={uid} state={currentState} wide={wide} />;
}

function GameInner({
  uid,
  state,
  wide,
}: {
  uid?: string;
  state: State;
  wide?: boolean;
}) {
  const [, setWakeLock] = useWakeLock();

  useEffect(() => {
    if (!state || state.kind === "finalRanking") {
      setWakeLock(false);
    } else {
      setWakeLock(true);
    }

    // Always disable the wake lock when the component unmounts.
    return () => setWakeLock(false);
  }, [state]);

  if (state === null) return <NoGame wide={wide} />;
  switch (state.kind) {
    case "pendingStart":
      return <PendingStart state={state} wide={wide} />;
    case "nextQuestionSoon":
      return <NextQuestionSoon state={state} wide={wide} />;
    case "questionOpen":
      return <QuestionOpen uid={uid} state={state} wide={wide} />;
    case "pendingReveal":
      return <PendingReveal uid={uid} state={state} wide={wide} />;
    case "questionReveal":
      return <QuestionReveal uid={uid} state={state} wide={wide} />;
    case "currentRanking":
      return <CurrentRanking uid={uid} state={state} wide={wide} />;
    case "pendingFinalRanking":
      return <PendingFinalRanking wide={wide} />;
    case "finalRanking":
      return <FinalRanking uid={uid} state={state} wide={wide} />;
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
