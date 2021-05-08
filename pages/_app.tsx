import { useEffect } from 'react';
import App from 'next/app';
import { AppProps } from 'next/app';
import Head from 'next/head';
import baseTheme from '../lib/material-ui/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { appWithTranslation } from '../i18n.config';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo/client';
import { Router } from 'next/dist/client/router';
import { AppContextType } from 'next/dist/next-server/lib/utils';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import '../styles/globals.css';
import { AuthProvider } from '../hooks/useAuth';
import { Layout } from 'containers/layout';

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Head>
          <title>Kara</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={baseTheme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContextType<Router>) =>
  await App.getInitialProps(appContext);

export default appWithTranslation(MyApp);
