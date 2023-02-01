import { auth, database } from "lib/firebase";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import { State, User } from "lib/types";
import styles from "./Admin.module.css";
import { Navbar } from "components/Navbar/Navbar";
import { Game } from "components/Game/Game";

export function Admin() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Loading...</div>;
  return user ? <AdminLoggedIn uid={user.uid} /> : <AdminLogin />;
}

export function AdminLogin() {
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

export function AdminLoggedIn({ uid }: { uid: string }) {
  const [user, loading] = useObjectVal<User>(ref(database, `users/${uid}`));

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Not authorized</div>;
  if (!user.isAdmin) return <div>Not authorized</div>;

  return (
    <>
      <Navbar />
      <CurrentState uid={uid} />
    </>
  );
}

export function CurrentState({ uid }: { uid: string }) {
  const [state, loading] = useObjectVal<State>(ref(database, "state"));

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <h2>Current state</h2>
      <details>
        <div className={styles.currentState}>
          <Game uid={uid} />
        </div>
      </details>
    </>
  );
}
