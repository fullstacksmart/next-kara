import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";
import { auth } from "../components/firebase";

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

const AuthContext = createContext({ user: { id: "" } });
const { Provider } = AuthContext;
export function AuthProvider(props: { children: ReactNode }): JSX.Element {
  const auth = useAuthProvider();
  return <Provider value={auth}>{props.children}</Provider>;
}

export const useAuth: unknown = () => {
  return useContext(AuthContext);
};

// Provider hook that creates an auth object and handles it's state
const useAuthProvider = (): useAuthProviderReturnType => {
  const [user, setUser] = useState({ id: "" });

  // return type: firebase.User
  const handleAuthStateChanged = (user: any): void => {
    //can save additional data here, e.g. type
    setUser({ id: user.uid });
  };

  useEffect(() => {
    const subscription = auth.onAuthStateChanged(handleAuthStateChanged);

    return () => subscription();
  }, []);

  //return type: Promise<firebase.auth.UserCredential>
  const signup = (email: string, password: string): any => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const signin = (email: string, password: string): any => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if (userCredential.user) setUser({ id: userCredential.user.uid });
        return userCredential.user;
      })
      .catch((error) => {
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
