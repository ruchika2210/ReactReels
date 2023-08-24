import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

let object = require("./secret");

//initialize firebase
const app = initializeApp(object);
export const auth = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage(app);
