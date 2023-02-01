import { auth, database } from "lib/firebase";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useObject, useObjectVal } from "react-firebase-hooks/database";
import { ref, set } from "firebase/database";
import { Games, State, States, User } from "lib/types";
import styles from "./Admin.module.css";
import { Navbar } from "components/Navbar/Navbar";
import { Game } from "components/Game/Game";
import { ErrorView } from "components/ErrorView/ErrorView";
import { cancelGame, makePendingGame } from "lib/admin";

export function Admin() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Loading...</div>;
  return user ? <AdminLoggedIn uid={user.uid} /> : <AdminLogin />;
}

function AdminLogin() {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  return (
    <div className={styles.container}>
      <img
        src="/btn_google_signin_dark_normal_web@2x.png"
        alt="Sign in with Google"
        className={styles.login}
        onClick={() => signInWithGoogle()}
      />
    </div>
  );
}

function AdminLoggedIn({ uid }: { uid: string }) {
  const [user, loading] = useObjectVal<User>(ref(database, `users/${uid}`));

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Not authorized</div>;
  if (!user.isAdmin) return <div>Not authorized</div>;

  return (
    <>
      <Navbar />
      <h2>Current state</h2>
      <CurrentState uid={uid} />
      <h2>Actions</h2>
      <CurrentStateActions />
    </>
  );
}

function CurrentState({ uid }: { uid: string }) {
  return (
    <>
      <details>
        <div className={styles.currentState}>
          <Game uid={uid} />
        </div>
      </details>
    </>
  );
}

function CurrentStateActions() {
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
    return (
      <>
        <p>No game is running. Select a game to make it ready.</p>
        <ul>
          {Object.entries(games ?? {}).map(([gameId, game]) => (
            <li key={gameId}>
              <button onClick={() => makePendingGame(game.name ?? null)}>
                {game.name ?? "<unnamed>"}
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }

  switch (state.kind) {
    case "pendingStart":
      return (
        <>
          <p>{state.name ?? "A game"} is ready to start.</p>
          <div>
            <button>Start</button>{" "}
            <button onClick={() => cancelGame()}>Cancel</button>
          </div>
        </>
      );
  }
}
