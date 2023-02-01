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

  const [user, loading, error] = useAuthState(auth);
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
    try {
      setLoginError(null);
      await signInWithEmailAndPassword(
        auth,
        `${password}@example.com`,
        password
      );
      router.push("/");
    } catch (error) {
      console.error(error);
      setLoginError("Failed to login");
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
      <img className={styles.image} src="/swerc.png" />
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          <input
            className={styles.input}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(cleanPassword(e.target.value))}
          />
          <button className={styles.button} type="submit">
            Login
          </button>
        </>
      )}
      {error && <ErrorView error={error} />}
      {loginError && <ErrorView error={loginError} />}
    </form>
  );
}
