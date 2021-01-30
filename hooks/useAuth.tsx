import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from 'react';
import firebase from 'firebase/app';
import { auth } from '../lib/auth/firebase';

type ContextUserType = {
  id: string;
  type?: string;
};

type useAuthProviderReturnType = {
  user: ContextUserType;
  signup: (email: string, password: string) => any;
  signin: (email: string, password: string) => any;
  setContextUser: (user: ContextUserType) => void;
};

const AuthContext = createContext({ user: { id: '' } });
const { Provider } = AuthContext;
export function AuthProvider(props: { children: ReactNode }): JSX.Element {
  const auth = useAuthProvider();
  return <Provider value={auth}>{props.children}</Provider>;
}

export const useAuth: any = () => {
  return useContext(AuthContext);
};

// Provider hook that creates an auth object and handles it's state
const useAuthProvider = (): useAuthProviderReturnType => {
  const [user, setUser] = useState({ id: '' });

  // return type: firebase.User
  const handleAuthStateChanged = (user: firebase.User | null): void => {
    //can save additional data here, e.g. type
    if (user) setUser({ id: user.uid });
  };

  useEffect(() => {
    const subscription = auth.onAuthStateChanged(handleAuthStateChanged);
    return () => subscription();
  }, []);

  const signup = (
    email: string,
    password: string,
  ): Promise<firebase.auth.UserCredential> => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const signin = (
    email: string,
    password: string,
  ): Promise<firebase.User | void | null> => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if (userCredential.user) setUser({ id: userCredential.user.uid });
        return userCredential.user;
      })
      .catch((error: Error) => {
        console.error(error);
      });
  };

  const setContextUser = (user: ContextUserType): void => {
    if (user) setUser(user);
  };

  return {
    user,
    signup,
    signin,
    setContextUser,
  };
};
