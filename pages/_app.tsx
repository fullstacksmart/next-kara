import '../styles/globals.css';
import App from 'next/app';
import { AppProps } from 'next/app';
import { appWithTranslation } from '../i18n';
import baseTheme from '../lib/material-ui/theme';
import { ThemeProvider } from '@material-ui/core';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo/client';
import { Router } from 'next/dist/client/router';
import { AppContextType } from 'next/dist/next-server/lib/utils';

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={baseTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
};

MyApp.getInitialProps = async (appContext: AppContextType<Router>) =>
  await App.getInitialProps(appContext);

export default appWithTranslation(MyApp);
