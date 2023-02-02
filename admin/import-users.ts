import fs from "fs";
import crypto from "crypto";
import { auth, db } from "./utils";

type Users = {
  users: User[];
};
type User = {
  uid: string;
  password: string;
  name: string;
};

const usersJson = fs.readFileSync(0, "utf-8");
const users = JSON.parse(usersJson) as Users;

const usersToImport = users.users.map((user) => {
  const email = `${user.password}@example.com`;
  const password = user.password;
  const name = user.name;
  const uid = user.uid;
  return {
    uid,
    email,
    displayName: name,
    passwordHash: crypto.createHash("sha256").update(password).digest(),
  };
});

// Import the user credentials into firebase.
console.log("Importing users into Firebase authentication...");
auth
  .importUsers(usersToImport, { hash: { algorithm: "SHA256", rounds: 1 } })
  .then((res) => {
    res.errors.forEach((indexedError) => {
      console.log(`Error importing user ${indexedError.index}`);
    });
  })
  .catch((err) => {
    console.error("Error importing users:");
    console.error(err);
  });

// Import the users into the database.
console.log("Importing users into Firebase database...");
const all = Promise.all(
  usersToImport.map((user) => {
    console.log("Importing user", user.uid, user.displayName);
    return db.ref(`users/${user.uid}`).set({
      name: user.displayName,
    });
  })
);
all
  .then(() => {
    console.log("done!");
    process.exit(0);
  })
  .catch((err) =>
    console.error("Failed to import users into the database:", err)
  );
