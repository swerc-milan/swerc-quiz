import { importGame } from "lib/admin";
import { useState } from "react";
import styles from "./ImportGame.module.css";

export function ImportGame() {
  const [data, setData] = useState<string>("");
  return (
    <div>
      <div>
        <textarea
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Paste the game JSON here"
          className={styles.textarea}
        ></textarea>
      </div>
      <button
        onClick={() => {
          importGame(JSON.parse(data));
        }}
      >
        Import
      </button>
    </div>
  );
}
