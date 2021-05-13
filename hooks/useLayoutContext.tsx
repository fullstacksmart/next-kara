import React, { useState } from 'react';
import { ChangeLayoutProps, LayoutContextType } from 'lib/types/layout-context';

const initialLayoutProps = {
  title: '',
  heading: '',
  error: null,
};

export const initialLayoutContext: LayoutContextType = {
  ...initialLayoutProps,
  changeLayoutProps: () => ({}),
};

export const LayoutContext = React.createContext(initialLayoutContext);

export const LayoutProvider = ({
  children,
  initialLayoutContext,
}: {
  children: React.ReactNode;
  initialLayoutContext: LayoutContextType;
}): React.ReactElement => {
  const [layoutProps, setLayoutProps] = useState(initialLayoutContext);

  const { title, error, heading } = layoutProps;

  const changeLayoutProps: ChangeLayoutProps = (
    propName,
    newValue,
    resetOtherProps,
  ) => {
    const newLayoutProps = resetOtherProps
      ? { ...layoutProps, ...initialLayoutProps, [propName]: newValue }
      : { ...layoutProps, [propName]: newValue };

    setLayoutProps(newLayoutProps);
  };

  return (
    <LayoutContext.Provider
      value={{ title, error, heading, changeLayoutProps }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = (): LayoutContextType =>
  React.useContext(LayoutContext);
