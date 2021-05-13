import React from 'react';

export const Context = React.createContext({
  layoutContext: {
    title: '',
    heading: '',
    error: null,
  },
});
