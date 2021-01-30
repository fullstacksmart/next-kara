import * as admin from 'firebase-admin';
import { getTalentById } from '../../apollo/helpers';
import { User } from '../../lib/types';

export const getUserFromToken = async (
  token: string,
): Promise<Partial<User> | undefined> => {
  const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // https://stackoverflow.com/a/41044630/1332513
        privateKey: firebasePrivateKey?.replace(/\\n/g, '\n'),
      }),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    });
  }

  const uid = await admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      console.log('uid from token: ', decodedToken.uid);
      return decodedToken.uid;
    })
    .catch((error) => {
      console.error('uid failed', error);
      return null;
    });

  if (uid) {
    const user = await getTalentById(uid);
    console.log('found user: ', user);
    return user;
  } else {
    console.log('no uid found');
    return undefined;
  }
};
