import { FirebaseError } from 'lib/types/auth';

interface LayoutProps {
  title: string;
  heading: string;
  error: FirebaseError | null;
}

export type ChangeLayoutProps = (
  propName: keyof LayoutProps,
  newValue: string | FirebaseError | null,
  resetOtherProps?: boolean,
) => void;
export interface LayoutContextType extends LayoutProps {
  changeLayoutProps: ChangeLayoutProps;
}
