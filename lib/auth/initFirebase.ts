import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: `gs://${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}.appspot.com`,
};

export default function initFirebase(): void {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
}
