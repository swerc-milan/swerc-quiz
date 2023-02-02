import { db } from "./utils";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question(
  "Are you sure you want to reset the database? (y/n) ",
  async (answer) => {
    if (answer !== "y") {
      console.log("Aborting...");
      process.exit(0);
    }

    console.log("Resetting state...");
    await db.ref("state").set(null);

    console.log("Resetting answers...");
    await db.ref("answers").set(null);

    console.log("Resetting ranking...");
    await db.ref("ranking").set(null);

    process.exit(0);
  }
);
