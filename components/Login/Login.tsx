import styles from "./Login.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "lib/firebase";
import { ErrorView } from "components/ErrorView/ErrorView";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

export function Login() {
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  const [user, , error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const cleanPassword = (password: string) => {
    return password.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  };

  const login = async () => {
    setLoginError(null);
    setLoggingIn(true);
    if (!password) return;
    try {
      await signInWithEmailAndPassword(
        auth,
        `${password}@example.com`,
        password
      );
      router.push("/");
      setLoggingIn(false);
    } catch (error) {
      console.error(error);
      setLoginError("Wrong password!");
      setLoggingIn(false);
    }
  };

  return (
    <form
      className={styles.container}
      onSubmit={(e) => {
        e.preventDefault();
        login();
      }}
    >
      <div className={styles.login}>
        <img className={styles.image} src="/swerc-neg.svg" />
        <input
          className={styles.input}
          placeholder="Password"
          type="text"
          value={password}
          onChange={(e) => setPassword(cleanPassword(e.target.value))}
          autoFocus
        />
        <button className={styles.button} type="submit" disabled={loggingIn}>
          {loggingIn ? "Loading..." : "Login"}
        </button>
        {error && <ErrorView error={error} />}
        <div className={styles.loginError}>{loginError}</div>
      </div>
    </form>
  );
}
