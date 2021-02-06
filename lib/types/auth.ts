import firebase from 'firebase/app';

export type ContextUserType = {
  id: string;
  type?: string;
};

export type signup = (
  email: string,
  password: string,
) => Promise<firebase.auth.UserCredential>;

export type signin = (
  email: string,
  password: string,
) => Promise<firebase.User | void | null>;

export type useAuthProviderReturnType = {
  user: ContextUserType;
  signup: signup;
  signin: signin;
  setContextUser: (user: ContextUserType) => void;
};

export type FirebaseUserCredential = firebase.auth.UserCredential;

export type FirebaseUser = firebase.User;
