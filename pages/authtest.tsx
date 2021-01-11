// import {Button} from '../components/buttons';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import initFirebase from '../lib/auth/initFirebase';
// import { setUserCookie } from '../lib/auth/userCookies';
// import { mapUserData } from '../lib/auth/mapUserData';

// // Init the Firebase app.
// initFirebase();

// const Auth = (): React.ReactElement => {

// const handleClick = () => firebase.auth().createUserWithEmailAndPassword('testemail2@web.de', 'testpassword')
//   .then((user) => {
//     console.log(user)
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.error(error)
//     // ..
// });

//   return (
//     <div>
//       <p>Sign in</p>
//       <Button onClick={handleClick}>
//         Sign in here
//       </Button>
//     </div>
//   )
// }

// export default Auth