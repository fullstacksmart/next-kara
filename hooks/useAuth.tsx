import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
 } from 'react';
 import { auth } from '../components/firebase';

type AuthContext = {
  user?: {
    id: string,
  },
  signup?: (email: any, password: any) => Promise<void>,
  setContextUser?: (user: any) => void;
}

 //signup: (email: any, password: any) => Promise<void | firebase.auth.UserCredential>; setContextUser: (user: any) => void; }
const AuthContext = createContext({ user: {id: ''} });
const { Provider } = AuthContext;
export function AuthProvider(props: { children: ReactNode }): JSX.Element {
 const auth = useAuthProvider();
 return <Provider value={auth}>{props.children}</Provider>;
}
export const useAuth: any = () => {
 return useContext(AuthContext);
};

// Provider hook that creates an auth object and handles it's state
const useAuthProvider = () => {
  const [user, setUser] = useState({id: ''});

  const handleAuthStateChanged = (user: any) => {
    //can save additional data here, e.g. type
    setUser({id: user.uid});
   };

   useEffect(() => {
    const unsub = auth.onAuthStateChanged(handleAuthStateChanged);

    return () => unsub();
   }, []);

  const signup = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password)
  };

  const signin = (email: string, password: string) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
      console.log('usercredentials', userCredential.user)
      if( userCredential.user) setUser({id: userCredential.user.uid})
      return userCredential.user;
      })
      .catch((error) => {
       console.error(error)
      });
  }

  const setContextUser = (user: AuthContext['user']) => {
    if (user) setUser(user);
  }
  return {
    user,
    signup,
    signin,
    setContextUser
  };
};
