import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { ref, set } from "firebase/database";
import { config, database } from "lib/firebase";
import { useMemo, useState } from "react";
import styles from "./AddUser.module.css";

type CreatedUser = {
  uid: string;
  name: string;
  password: string;
};

export function AddUser() {
  const [name, setName] = useState("");
  const [hidden, setHidden] = useState(false);
  const [user, setUser] = useState<CreatedUser | null>(null);
  const secondaryAuth = useMemo(
    () => getAuth(initializeApp(config, "Secondary")),
    []
  );

  const create = () => {
    const password = makePassword(6);
    createUserWithEmailAndPassword(
      secondaryAuth,
      `${password}@example.com`,
      password
    ).then((cred) => {
      const uid = cred.user.uid;
      secondaryAuth.signOut();

      set(ref(database, `users/${uid}`), { name, isHidden: hidden });
      setUser({ uid, name, password });
    });
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
        />
      </div>
      <div>
        <input
          id="hidden"
          type="checkbox"
          checked={hidden}
          onChange={() => setHidden(!hidden)}
        />
        <label htmlFor="hidden">Hidden</label>
      </div>
      <div className={styles.button}>
        <button onClick={() => create()}>Create</button>
      </div>
      {user && (
        <div className={styles.createdUser}>
          <p>
            <strong>User created</strong>
          </p>
          <div>
            UID: <code>{user.uid}</code>
          </div>
          <div>Name: {user.name}</div>
          <div>
            Password: <code className={styles.password}>{user.password}</code>
          </div>
        </div>
      )}
    </div>
  );
}

function makePassword(length: number) {
  let result = "";
  const characters = "123456789bcdefghjkmnpqrstuvwxyz";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
