import firebase from "firebase/compat/app";
import "firebase/compat/auth";

let object = require("./secret");
firebase.initializeApp(object);
let auth = firebase.auth();
export default auth;
