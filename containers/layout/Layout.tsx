import React from 'react';
import Container from '@material-ui/core/Container';
import { Button } from '../../components/buttons';
import Head from 'next/head';
import { getTitleString } from '../../lib/utils/strings';
import Footer from '../../components/footer/Footer';
import useStyles from './LayoutStyles';

export interface LayoutProps {
  home?: boolean;
  title?: string | string[];
  children?: React.ReactNode;
}

const Layout = ({
  home = false,
  children,
  title,
}: LayoutProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Container disableGutters className={classes.container}>
      <Head>
        <title>{getTitleString(title)}</title>
      </Head>
      <header className={classes.header}>
        {!home && <Button href="/">take me back home</Button>}
      </header>
      <main className={classes.main}>{children}</main>
      {!home && <Footer />}
    </Container>
  );
};

export default Layout;
