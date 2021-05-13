import { FirebaseError } from 'lib/types/auth';

type LayoutProps = {
  title: string;
  heading: string;
  error: FirebaseError | null;
};

export type ChangeLayoutProps = (
  propName: keyof LayoutProps,
  newValue: string | FirebaseError | null,
  resetOtherProps?: boolean,
) => void;

export type LayoutContextType = {
  title: string;
  heading: string;
  error: FirebaseError | null;
  changeLayoutProps: ChangeLayoutProps;
};
