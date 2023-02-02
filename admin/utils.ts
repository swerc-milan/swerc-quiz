import admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getDatabase } from "firebase-admin/database";
import fs from "fs";

const firebaseConfig = JSON.parse(
  fs.readFileSync("./firebase-config.json").toString()
);
const serviceAccountConfig = JSON.parse(
  fs.readFileSync("./adminsdk.json").toString()
);
export const app = initializeApp({
  credential: admin.credential.cert(serviceAccountConfig),
  databaseURL: firebaseConfig.databaseURL,
});
export const auth = getAuth(app);
export const db = getDatabase(app);
