import firebase from 'firebase/app';

export type ContextUserType = {
  id: string;
  type?: string;
};

export type Signup = (
  email: string,
  password: string,
) => Promise<firebase.auth.UserCredential>;

export type Signin = (
  email: string,
  password: string,
) => Promise<firebase.User | void | null>;

export type Logout = () => Promise<void>;

export type sendPasswordResetEmail = (email: string) => Promise<void>;

export type UseAuthProviderReturnType = {
  user: ContextUserType;
  signup: Signup;
  signin: Signin;
  logout: Logout;
  sendPasswordResetEmail: sendPasswordResetEmail;
  setContextUser: (user: ContextUserType) => void;
};

export type FirebaseUserCredential = firebase.auth.UserCredential;

export type FirebaseUser = firebase.User;
