import { Button } from 'components/buttons';
import { Card, CardContent, Typography, Container } from '@material-ui/core';
import { Layout } from 'containers/layout';
import InputField from 'components/input-field/InputField';
import { Dispatch, SetStateAction, useState } from 'react';
import { PageProps } from '../../lib/types';
import { withTranslation } from 'i18n.config';
import styles from './Signin.module.css';
import { useAuth } from '../../hooks/useAuth';
import Error from 'components/error';
import { isError, FirebaseError, FirebaseUser } from 'lib/types/auth';
import { useRouter } from 'next/router';

interface FormValues {
  email: string;
  password: string;
}

const SignInPage = ({ t }: PageProps): React.ReactElement => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<FirebaseError | null>(null);
  const auth = useAuth();

  // const handleLogout = (e: React.MouseEvent<HTMLButtonElement>): void => {
  //   e.preventDefault();
  //   auth.logout();
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (formValues.email && formValues.password) {
      setError(null);
      auth
        .signin(formValues.email, formValues.password)
        .then((response) => {
          if (isError(response)) setError(response);
          if (typeof response === null || typeof response === undefined) {
            //eslint-disable-next-line no-console
            console.error(
              'wrong email or password, current user still is: ',
              auth.user,
            );
          } else {
            return (response as FirebaseUser).uid;
          }
        })
        .then((id) => {
          if (id) {
            router.push(`/talents/${id}`);
          }
        })
        .catch((error: Error) => console.error(error)); //eslint-disable-line no-console
    }
  };

  const errorComponent = error && <Error error={error} />;

  return (
    <Layout title="sign in" t={t} error={errorComponent}>
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
                setValue={
                  setFormValues as Dispatch<SetStateAction<Partial<FormValues>>>
                }
                inputProps={{ className: styles.FormInput }}
                required
              />
              <InputField
                propName="password"
                value={formValues.password}
                label={t('password')}
                setValue={
                  setFormValues as Dispatch<SetStateAction<Partial<FormValues>>>
                }
                type="password"
                required
              />
              <Button type="submit">signin</Button>
            </form>
          </Container>
        </CardContent>
      </Card>
      {/* TODO: Add Logout Button to Navbar */}
    </Layout>
  );
};

SignInPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(SignInPage);
