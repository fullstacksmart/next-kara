import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from 'react';
import firebase from 'firebase/app';
import { auth } from '../lib/auth/firebase';
import {
  ContextUserType,
  UseAuthProviderReturnType,
  Signup,
  Signin,
  Logout,
  sendPasswordResetEmail,
} from '../lib/types/auth';

const AuthContext = createContext({ user: { id: '' } });
const { Provider } = AuthContext;
export function AuthProvider(props: { children: ReactNode }): JSX.Element {
  const auth = useAuthProvider();
  return <Provider value={auth}>{props.children}</Provider>;
}

// ignoring because context needs initial state
// eslint-disable-next-line
// @ts-ignore
export const useAuth: () => UseAuthProviderReturnType = () => {
  return useContext(AuthContext);
};

const useAuthProvider = (): UseAuthProviderReturnType => {
  const [user, setUser] = useState<ContextUserType>({ id: '' });
  const [authStateChangeFinished, setAuthStateChangeFinished] = useState(false);

  const handleAuthStateChanged = (user: firebase.User | null): void => {
    //can save additional data here, e.g. type
    if (user) {
      setUser({ id: user.uid });
      setAuthStateChangeFinished(true);
    }
  };

  useEffect(() => {
    const subscription = auth.onAuthStateChanged(handleAuthStateChanged);
    return () => subscription();
  }, []);

  const signup: Signup = (email, password) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => error);
  };

  const signin: Signin = (email, password) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        if (response.user) setUser({ id: response.user.uid });
        return response.user;
      })
      .catch((error) => error);
  };

  const logout: Logout = () => {
    return auth
      .signOut()
      .then(() => setUser({ id: '' }))
      .catch((e) => console.error(e)); //eslint-disable-line no-console
  };

  const sendPasswordResetEmail: sendPasswordResetEmail = (email) => {
    return auth
      .sendPasswordResetEmail(email)
      .then((response) => {
        return response;
      })
      .catch((e) => console.error(e)); //eslint-disable-line
  };

  const setContextUser = (user: ContextUserType): void => {
    if (user) setUser(user);
  };

  return {
    user,
    signup,
    signin,
    logout,
    sendPasswordResetEmail,
    setContextUser,
    authStateChangeFinished,
  };
};
