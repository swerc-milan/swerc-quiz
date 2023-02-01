import styles from "./Login.module.css";

export function Login() {
  return (
    <form className={styles.container} onSubmit={(e) => e.preventDefault()}>
      <img className={styles.image} src="swerc.png" />
      <input className={styles.input} placeholder="Password" type="password" />
      <button className={styles.button} type="submit">
        Login
      </button>
    </form>
  );
}
