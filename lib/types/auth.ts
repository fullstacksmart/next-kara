import firebase from 'firebase/app';
import { UserGroup } from './user';

export type ContextUserType = {
  id: string;
  type?: string;
  group?: UserGroup;
};

export type Signup = (
  email: string,
  password: string,
) => Promise<firebase.auth.UserCredential | FirebaseError>;

export type Signin = (
  email: string,
  password: string,
) => Promise<firebase.User | void | null | FirebaseError>;

export type Logout = () => Promise<void>;

export type sendPasswordResetEmail = (email: string) => Promise<void>;

export type UseAuthProviderReturnType = {
  user: ContextUserType;
  signup: Signup;
  signin: Signin;
  logout: Logout;
  sendPasswordResetEmail: sendPasswordResetEmail;
  setContextUser: (user: ContextUserType) => void;
  authStateChangeFinished: boolean;
};

export type FirebaseUserCredential = firebase.auth.UserCredential;

export type FirebaseUser = firebase.User;

export type FirebaseError = firebase.auth.Error;

export const isError = (
  response: FirebaseUser | FirebaseUserCredential | FirebaseError | void | null,
): response is FirebaseError => {
  return (response as FirebaseError).code !== undefined;
};
