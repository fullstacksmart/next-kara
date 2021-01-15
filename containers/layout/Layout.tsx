import React from 'react';
import Container from '@material-ui/core/Container';
import { Button } from '../../components/buttons';
import Head from 'next/head';
import { getTitleString } from '../../lib/utils/strings';
import Footer from '../../components/footer/Footer';
import useStyles from './LayoutStyles';
import { Box, Typography } from '@material-ui/core';

export interface LayoutProps {
  home?: boolean;
  heading?: string;
  title?: string | string[];
  children?: React.ReactNode;
}

const Layout = ({
  home = false,
  children,
  heading,
  title,
}: LayoutProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Container disableGutters className={classes.container}>
      <Head>
        <title>{getTitleString(title)}</title>
      </Head>
      <header className={classes.header}>
        <Box component="div" className={classes.text}>
          <Typography variant="h5">{heading}</Typography>
        </Box>
        <div className={classes.buttons}>
          {!home && <Button href="/">take me back home</Button>}
        </div>
      </header>
      <main className={classes.main}>{children}</main>
      {!home && <Footer />}
    </Container>
  );
};

export default Layout;
