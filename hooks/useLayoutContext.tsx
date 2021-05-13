import React, { useState } from 'react';

const initialTitle = 'testInitialTitle';
const initialHeading = '';
const initialError = null;

export const initialLayoutContext = {
  title: initialTitle,
  heading: initialHeading,
  error: initialError,
};

export const LayoutContext = React.createContext(initialLayoutContext);

export const LayoutProvider = ({ children, initialLayoutContext }) => {
  const [layoutProps, setLayoutProps] = useState(initialLayoutContext);

  const { title, error, heading } = layoutProps;

  const changeLayoutProps = (propName, newValue) =>
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

export const useLayoutContext = () => React.useContext(LayoutContext);
