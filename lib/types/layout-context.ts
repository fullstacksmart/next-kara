import { FirebaseError } from 'lib/types/auth';

export type ChangeLayoutProps = (
  propName: string,
  newValue: string | FirebaseError | null,
) => void;

export type LayoutContextType = {
  title: string;
  heading: string;
  error: FirebaseError | null;
  changeLayoutProps: ChangeLayoutProps;
};