export type ChangeLayoutProps = (
  propName: string,
  newValue: string | any,
) => void;

export type LayoutContextType = {
  title: string;
  heading: string;
  error: any;
  changeLayoutProps: ChangeLayoutProps;
};
