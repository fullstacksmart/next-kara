import React from 'react';
import Container from '@material-ui/core/Container';
import { I18n, TFunction } from 'next-i18next';
import Head from 'next/head';
import { getTitleString } from 'lib/utils/strings';
import Footer from 'components/footer/Footer';
import useStyles from './LayoutStyles';
import { Box, Typography } from '@material-ui/core';
import OptionToggler from 'components/option-toggler/OptionToggler';
import { Button } from 'components';
import { useAuth } from 'hooks/useAuth';
import { useRouter } from 'next/router';
import { FirebaseError } from 'lib/types/auth';
import Error from 'components/error';

export interface LayoutProps {
  home?: boolean;
  heading?: string;
  title?: string | string[];
  error: FirebaseError | null;
  children?: React.ReactNode;
  i18n?: I18n;
  t: TFunction;
}

const Layout = ({
  home = false,
  error = null,
  children,
  heading,
  title,
  i18n,
  t,
}: LayoutProps): React.ReactElement => {
  const classes = useStyles();
  const auth = useAuth();
  const router = useRouter();

  const languageOptions = [
    {
      value: 'de',
    },
    {
      value: 'en',
    },
  ];

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    auth.logout();
    router.push('/');
  };

  const handleChange = (value: string): void => {
    if (i18n) {
      i18n.changeLanguage(value);
    }
  };

  return (
    <Container disableGutters className={classes.container}>
      <Head>
        <title>{getTitleString(title)}</title>
      </Head>
      {!home ? (
        <header className={classes.header}>
          <Box component="div" className={classes.text}>
            <Typography variant="h5">{heading}</Typography>
          </Box>
          <div className={classes.buttons}>
            <Button onClick={handleLogout}>{t('logout')}</Button>
            <Button href="/">{t('labels.buttons.home')}</Button>
            {i18n ? (
              <OptionToggler
                className={classes.languageButton}
                defaultValue={i18n.language}
                size="small"
                optionsLabel="language"
                options={languageOptions}
                setOption={(language) => handleChange(language)}
              />
            ) : (
              <></>
            )}
          </div>
        </header>
      ) : (
        <></>
      )}
      {error ? <Error error={error} /> : null}
      <main className={classes.main}>{children}</main>
      {!home && <Footer />}
    </Container>
  );
};

export default Layout;
