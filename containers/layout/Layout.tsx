import React from 'react';
import Container from '@material-ui/core/Container';
import { I18n, TFunction } from 'next-i18next';
import Head from 'next/head';
import Footer from 'components/footer/Footer';
import useStyles from './LayoutStyles';
import { Box, Typography } from '@material-ui/core';
import OptionToggler from 'components/option-toggler/OptionToggler';
import { Button } from 'components';
import { useAuth } from 'hooks/useAuth';
import { useRouter } from 'next/router';
import Error from 'components/error';
import { withTranslation } from 'i18n.config';
import { layoutErrorVar } from 'apollo/cache';
import { useReactiveVar } from '@apollo/client';
import { getTitleString, getTitleStringFromPathname } from 'lib/utils/strings';
import { gql, useQuery } from '@apollo/client';
import { getShortName } from 'lib/utils/strings';

const GET_TALENT_NAME = gql`
  query GetTalentById($id: String!) {
    getTalentById(id: $id) {
      id
      basicInfo {
        id
        name {
          firstName
          middleName
          lastName
        }
      }
    }
  }
`;

export interface LayoutProps {
  children?: React.ReactNode;
  i18n?: I18n;
  t: TFunction;
}

const Layout = ({ children, t, i18n }: LayoutProps): React.ReactElement => {
  const classes = useStyles();
  const auth = useAuth();
  const layoutError = useReactiveVar(layoutErrorVar);
  const router = useRouter();
  const { pathname, query } = router;

  const isHome = pathname === '/';
  const isOnTalentProfilePage = pathname.includes('/talents/[id]'); // dependent on how profile page is named

  const { id } = query;

  const { data, error } = useQuery(GET_TALENT_NAME, {
    variables: {
      id,
    },
    skip: !isOnTalentProfilePage,
  });

  if (error) {
    if (error.message.startsWith('404')) return <h1>insert 404 page here</h1>;
    return <h1>Error: {error.message}</h1>;
  }

  let title = '';
  let heading = '';

  if (data) {
    const { basicInfo } = data?.getTalentById;
    const { name } = basicInfo;
    const titleArray = ['profile', getShortName(name)];
    title = getTitleString(titleArray);
    heading =
      t('pages.profile.greeting') +
      (name?.firstName ? ', ' + name.firstName : '') +
      '!';
  } else {
    title = getTitleStringFromPathname(pathname);
  }

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
        <title>{title}</title>
      </Head>
      {!isHome ? (
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
      {layoutError ? <Error error={layoutError} /> : null}
      <main className={classes.main}>{children}</main>
      {!isHome && <Footer />}
    </Container>
  );
};

export default withTranslation('common')(Layout);
