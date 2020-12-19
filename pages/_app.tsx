import '../styles/globals.css';
import { AppProps } from 'next/app';
import { baseTheme } from '../lib/material-ui/theme';
import { ThemeProvider } from '@material-ui/core';
import { ApolloProvider } from '@apollo/react-hooks';
import client from '../apollo/client';

function MyApp({ Component, pageProps }: AppProps): React.ReactNode {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={baseTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
