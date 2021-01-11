import firebase from 'firebase/app';
import 'firebase/auth';
import initFirebase from '../../lib/auth/initFirebase';

initFirebase();

//can also define other stuff here:
//const firebaseAuth = firebase.auth()
//const now = firebase.firestore.Timestamp.now();
//const storage = firebase.storage();

export default firebase;
