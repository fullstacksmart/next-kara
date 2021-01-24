import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "../../lib/auth/initFirebase";

initFirebase();

export const auth: firebase.auth.Auth = firebase.auth();
//can also define other stuff here:
//const storage = firebase.storage();

export default firebase;
