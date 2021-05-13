import React, { useState } from 'react';
import { ChangeLayoutProps, LayoutContextType } from 'lib/types/layout-context';

const initialTitle = 'testInitialTitle';
const initialHeading = '';
const initialError = null;

export const initialLayoutContext: LayoutContextType = {
  title: initialTitle,
  heading: initialHeading,
  error: initialError,
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

  const changeLayoutProps: ChangeLayoutProps = (propName, newValue) =>
    setLayoutProps({
      ...layoutProps,
      [propName]: newValue,
    });

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
