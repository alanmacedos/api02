
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";

const app = initializeApp({
    credential: applicationDefault(),
    databaseURL: "https://fb-learning-code-default-rtdb.firebaseio.com"
});

const database = getDatabase(app);

export { database };
