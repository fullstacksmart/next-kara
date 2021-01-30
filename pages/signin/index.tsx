import { Button } from '../../components/buttons';
import { Card, CardContent, Typography, Container } from '@material-ui/core';
import { Layout } from '../../containers/layout';
import InputField from '../../components/input-field/InputField';
import { useState } from 'react';
import { PageProps, UserInput } from '../../lib/types';
import { withTranslation } from '../../i18n';
import styles from './Signin.module.css';
import { useAuth } from '../../hooks/useAuth';
// firebase only imported to satisfy typescript. Better to find alternative.
import firebase from 'firebase/app';

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    auth
      // tslint disable-next-line
      .signin(formValues.email, formValues.password)
      .then((user: firebase.User | void | null) => {
        if (typeof user !== null) {
          console.log('current user: ', auth.user);
        } else {
          console.log(
            'wrong email or password, current user still is: ',
            auth.user,
          );
        }
      })
      .catch((error: Error) => console.error(error));
  };

  return (
    <Layout title="sign in">
      <Card>
        <CardContent>
          <Container>
            <Typography variant="h2">Sign In</Typography>
            <form onSubmit={handleSubmit}>
              <InputField
                id="email"
                type="email"
                value={formValues.email}
                label={t('email')}
                setValue={setFormValues}
                inputProps={{ className: styles.FormInput }}
                required
              />
              <InputField
                id="password"
                value={formValues.password}
                label={t('password')}
                setValue={setFormValues}
                type="password"
                required
              />
              <Button type="submit">signin</Button>
            </form>
          </Container>
        </CardContent>
      </Card>

      <Button href="/talents/yasbiuycdbucoiuscboiucsiousc!@/profile">
        Talents
      </Button>
      <Button href="/employers/1/profile">Employers</Button>
    </Layout>
  );
};

SignInPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(SignInPage);
