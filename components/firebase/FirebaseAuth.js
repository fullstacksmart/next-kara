// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import initFirebase from '../../lib/auth/initFirebase';
// import { setUserCookie } from '../../lib/auth/userCookies';
// import { mapUserData } from '../../lib/auth/mapUserData';

// // Init the Firebase app.
// initFirebase();

// const firebaseAuthConfig = {
//   signInFlow: 'popup',
//   // Auth providers
//   // https://github.com/firebase/firebaseui-web#configure-oauth-providers
//   signInOptions: [
//     {
//       provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
//       requireDisplayName: false,
//     },
//   ],
//   signInSuccessUrl: '/',
//   credentialHelper: 'none',
//   callbacks: {
//     signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
//       const userData = await mapUserData(user);
//       setUserCookie(userData);
//     },
//   },
// };

// const FirebaseAuth = () => {
//   return (
//     <div>
//       <StyledFirebaseAuth
//         uiConfig={firebaseAuthConfig}
//         firebaseAuth={firebase.auth()}
//       />
//     </div>
//   );
// };

// export default FirebaseAuth;
