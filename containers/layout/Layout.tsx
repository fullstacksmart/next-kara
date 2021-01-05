import React from 'react';
import Container from '@material-ui/core/Container';
import { Button } from '../../components/buttons';
import Head from 'next/head';
import { getTitleString } from '../../lib/utils/strings';
import text from '../../lib/text';
import Footer from '../../components/footer/Footer';

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
  return (
    <Container disableGutters>
      <Head>
        <title>{getTitleString(title)}</title>
      </Head>
      <header className={styles.header}>
        {!home && <Button href="/">take me back home</Button>}
      </header>
      <main>{children}</main>
      {!home && <Footer />}
    </Container>
  );
};

export default Layout;
