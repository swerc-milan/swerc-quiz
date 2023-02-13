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

const INITIAL = "INITIAL";
const REMOVED = "REMOVED";

export function Game({ uid, wide }: { uid?: string; wide?: boolean }) {
  const [state, loading, error] = useObjectVal<State>(ref(database, "state"));
  // Keep the current state and the last state so that we can transition between them.
  const [previousState, setPreviousState] = useState<
    State | undefined | typeof INITIAL | typeof REMOVED
  >(INITIAL);
  const [currentState, setCurrentState] = useState<
    State | undefined | typeof INITIAL
  >(INITIAL);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (currentState === INITIAL || currentState?.kind !== state?.kind) {
      if (previousState === INITIAL && currentState !== INITIAL) {
        // The first render we don't want the animation.
        setPreviousState(state);
      } else {
        setPreviousState(currentState);
      }
      // Remove the old state after the animation has finished.
      timer = setTimeout(() => setPreviousState("REMOVED"), ANIMATION_DURATION);
    }
    setCurrentState(state ? { ...state } : undefined);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [state]);

  if (loading) return <div>Loading...</div>;
  if (error) return <ErrorView error={error} />;
  if (state === undefined) return <div>An unknown error occurred</div>;

  // Not ready yet.
  if (currentState === INITIAL) {
    console.log("Not ready yet.");
    return null;
  }

  // First render, animate from nothing to the current state.
  if (previousState === INITIAL) {
    console.log("First render, animate from nothing to the current state.");
    return (
      <>
        <GameInner uid={uid} state={currentState} wide={wide} />
      </>
    );
  }

  // The previous state has been removed after the animation ended.
  if (previousState === REMOVED) {
    return <GameInner uid={uid} state={currentState} wide={wide} />;
  }

  // Render both states and animate between them.
  if (previousState?.kind !== currentState?.kind) {
    return (
      <>
        <GameInner uid={uid} state={currentState} wide={wide} />
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

  if (!state) return <NoGame wide={wide} />;
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
