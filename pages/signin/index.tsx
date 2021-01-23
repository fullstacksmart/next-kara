import { Button } from '../../components/buttons';
import { Card, CardContent, Typography, Container } from '@material-ui/core';
import { Layout } from '../../containers/layout';
import InputField from '../../components/input-field/InputField';
import { useState } from 'react';
import { PageProps, UserInput } from '../../lib/types';
import { withTranslation } from '../../i18n';
import firebase from '../../components/firebase';
import styles from './Signin.module.css';
import { useAuth } from '../../hooks/useAuth';

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

  console.log(auth.user);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValues.email && formValues.password) {
      auth.signin(formValues.email, formValues.password).then(() => {
        console.log('after signin', auth.user);
      });
    }
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
