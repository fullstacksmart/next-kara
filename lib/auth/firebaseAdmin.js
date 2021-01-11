import * as admin from 'firebase-admin';
import { models } from '../../db';

export const getUserFromToken = async (token) => {
  const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // https://stackoverflow.com/a/41044630/1332513
        privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
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

  const user = await getUserFromUid(uid);
  console.log('found user: ', user);
  return user;
};

export const getUserFromUid = async (uid) => {
  try {
    console.log('called with uid', uid);
    console.log('user from uid: ', models['Talent'].findOne({ id: uid }));
    const user = await models['Talent'].findOne({ id: uid });
    return user;
  } catch (e) {
    console.error('could not find user with uid', e);
    return null;
  }
};

// export const getUidFromToken = async (token) => {
//   const uid = await admin
//     .auth()
//     .verifyIdToken(token)
//     .then((decodedToken) => {
//       return decodedToken.uid;
//     })
//     .catch((error) => {
//       console.log('uid failed', error);
//       return null;
//     });
//   console.log('uid found', uid);
//   return uid;
// };
