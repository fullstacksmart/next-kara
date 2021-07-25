import firebase from 'firebase/app';
import 'firebase/auth';
import initFirebase from './initFirebase';

initFirebase();

export const auth: firebase.auth.Auth = firebase.auth();
//can also define other stuff here:
export const storage: firebase.storage.Storage = firebase.storage();

export default firebase;
