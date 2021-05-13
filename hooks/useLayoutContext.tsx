import React, { useState } from 'react';
import { ChangeLayoutProps, LayoutContextType } from 'lib/types/layout-context';

const initialLayoutProps = {
  title: 'testInitialTitle',
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
    // TODO: improve function for the case resetOtherProps
    // and pass object with arguments instead (better readability for function calls)
    resetOtherProps
      ? setLayoutProps({
          ...layoutProps,
          error: null,
          heading: '',
          [propName]: newValue,
        })
      : setLayoutProps({
          ...layoutProps,
          [propName]: newValue,
        });
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
