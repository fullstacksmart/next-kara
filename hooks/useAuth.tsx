import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
 } from 'react';
 import firebase, { auth } from '../components/firebase';

type AuthContext = {
  user?: {
    email: string,
    password: string
  },
  signup?: (email: any, password: any) => Promise<void>,
  setContextUser?: (user: any) => void;
}

 //signup: (email: any, password: any) => Promise<void | firebase.auth.UserCredential>; setContextUser: (user: any) => void; }
const AuthContext = createContext({ user: {email: '', password: ''} });
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
  const [user, setUser] = useState({email: '', password: ''});

  const handleAuthStateChanged = (user: any) => {
    console.log(user.uid)
    setUser(user);
   };

   useEffect(() => {
    const unsub = auth.onAuthStateChanged(handleAuthStateChanged);

    return () => unsub();
   }, []);

  const signup = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password)
  };

  const setContextUser = (user: AuthContext['user']) => {
    if (user) setUser(user);
  }
  return {
    user,
    signup,
    setContextUser
  };
};
