import '../styles/globals.css';
import { AppProps } from 'next/app';
import baseTheme from '../lib/material-ui/theme';
import { ThemeProvider } from '@material-ui/core';

function MyApp({ Component, pageProps }: AppProps): React.ReactNode {
  return (
    <ThemeProvider theme={baseTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
