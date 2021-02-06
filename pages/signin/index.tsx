import { Button } from '../../components/buttons';
import { Card, CardContent, Typography, Container } from '@material-ui/core';
import { Layout } from '../../containers/layout';
import InputField from '../../components/input-field/InputField';
import { useState } from 'react';
import { PageProps, UserInput } from '../../lib/types';
import { withTranslation } from '../../i18n';
import styles from './Signin.module.css';
import { useAuth } from '../../hooks/useAuth';
import { FirebaseUser } from '../../lib/types/auth';

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
  const auth = useAuth();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    auth.logout();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (formValues.email && formValues.password) {
      auth
        .signin(formValues.email, formValues.password)
        .then((user: FirebaseUser | void | null) => {
          if (typeof user === null) {
            //eslint-disable-next-line no-console
            console.error(
              'wrong email or password, current user still is: ',
              auth.user,
            );
          }
        })
        .catch((error: Error) => console.error(error)); //eslint-disable-line no-console
    }
  };

  return (
    <Layout title="sign in" t={t}>
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
