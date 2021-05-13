import React from 'react';

const initialTitle = '';
const initialHeading = '';
const initialError = null;

const LayoutContext = React.createContext({
  title: initialTitle,
  heading: initialHeading,
  error: initialError,
});

const LayoutProvider = ({ children, initialLayoutContext }) => {
  const [title, setTitle] = React.useState(initialTitle);
  const [heading, setHeading] = React.useState(initialHeading);
  const [error, setError] = React.useState(initialError);

  const changeTitle = (newTitle: string) => setTitle(newTitle);

  return (
    <LayoutContext.Provider value={{ title, heading, error }}>
      {children}
    </LayoutContext.Provider>
  );
};
