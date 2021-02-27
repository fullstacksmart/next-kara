import { Button } from 'components/buttons';
import { Card, CardContent, Typography, Container } from '@material-ui/core';
import { Layout } from 'containers/layout';
import InputField from 'components/input-field/InputField';
import { useState } from 'react';
import { PageProps, UserInput } from '../../lib/types';
import { withTranslation } from 'i18n.config';
import styles from './Signin.module.css';
import { useAuth } from '../../hooks/useAuth';
import Error from 'components/error-handling';
import { isError, FirebaseError } from 'lib/types/auth';

const SignInPage = ({ t }: PageProps): React.ReactElement => {
  const [formValues, setFormValues] = useState<Partial<UserInput>>({
    name: {
      lastName: '',
    },
    gender: 'OTHER',
    email: '',
    password: '',
    type: 'TALENT',
  });
  const [error, setError] = useState<FirebaseError | null>(null);
  const auth = useAuth();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    auth.logout();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (formValues.email && formValues.password) {
      setError(null);
      auth
        .signin(formValues.email, formValues.password)
        .then((response) => {
          if (isError(response)) setError(response);
        })
        .catch((error: Error) => console.error(error)); //eslint-disable-line no-console
    }
  };

  return (
    <Layout title="sign in" t={t}>
      {error && <Error error={error} />}
      <Card>
        <CardContent>
          <Container>
            <Typography variant="h2">Sign In</Typography>
            <form onSubmit={handleSubmit}>
              <InputField
                propName="email"
                type="email"
                value={formValues.email}
                label={t('email')}
                setValue={setFormValues}
                inputProps={{ className: styles.FormInput }}
                required
              />
              <InputField
                propName="password"
                value={formValues.password}
                label={t('password.password')}
                setValue={setFormValues}
                type="password"
                required
              />
              <Button type="submit">signin</Button>
            </form>
          </Container>
        </CardContent>
      </Card>
      <Button href="/reset-password">{t('password.forgot')}</Button>
      <Button href="/talents/yasbiuycdbucoiuscboiucsiousc!@/profile">
        Talents
      </Button>
      <Button href="/employers/1/profile">Employers</Button>
      {/* TODO: Add Logout Button to Navbar */}
      <Button onClick={handleLogout}>Logout</Button>
    </Layout>
  );
};

SignInPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(SignInPage);
