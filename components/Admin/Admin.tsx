import { auth, database } from "lib/firebase";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import { User } from "lib/types";
import styles from "./Admin.module.css";
import { Navbar } from "components/Navbar/Navbar";
import { CurrentState } from "./pieces/CurrentState";
import { CurrentStateActions } from "./pieces/CurrentStateActions";

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
