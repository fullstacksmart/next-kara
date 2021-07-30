import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import initFirebase from './initFirebase';

initFirebase();

export const auth: firebase.auth.Auth = firebase.auth();

export const storage: firebase.storage.Storage = firebase.storage();

export default firebase;
