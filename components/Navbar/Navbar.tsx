import { signOut } from "firebase/auth";
import { ref } from "firebase/database";
import { auth, database } from "lib/firebase";
import { User } from "lib/types";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
import styles from "./Navbar.module.css";

export function Navbar() {
  const [user, loading] = useAuthState(auth);

  if (loading) return null;
  if (!user) return null;

  return <InnerNavbar uid={user.uid} />;
}

function InnerNavbar({ uid }: { uid: string }) {
  const [user] = useObjectVal<User>(ref(database, `users/${uid}`));

  return (
    <nav className={styles.navbar}>
      <div className={styles.name}>{user?.name ?? ""}</div>
      <button className={styles.logout} onClick={() => signOut(auth)}>
        Logout
      </button>
    </nav>
  );
}
