import { Button } from 'components/buttons';
import { Card, CardContent, Typography, Container } from '@material-ui/core';
import { Layout } from 'containers/layout';
import InputField from 'components/input-field/InputField';
import { Dispatch, SetStateAction, useState } from 'react';
import { PageProps, UserType } from '../../lib/types';
import { withTranslation } from 'i18n.config';
import styles from './Signin.module.css';
import { useAuth } from '../../hooks/useAuth';
import Error from 'components/error-handling';
import { isError, FirebaseError } from 'lib/types/auth';
import useRedirectToProfile from 'hooks/useRedirectToProfile';

interface FormValues {
  email: string;
  password: string;
}

const SignInPage = ({ t }: PageProps): React.ReactElement => {
  const { redirectToProfile } = useRedirectToProfile();
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<FirebaseError | null>(null);
  const auth = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (formValues.email && formValues.password) {
      setError(null);
      auth
        .signin(formValues.email, formValues.password)
        .then((response) => {
          if (isError(response)) {
            setError(response);
            return;
          }
          if (response && 'uid' in response) {
            console.log('response: ', response);
            // TODO: CHeck if Talent or Employer
            redirectToProfile({ userType: UserType.TALENT, id: response.uid });
          }
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
                setValue={
                  setFormValues as Dispatch<SetStateAction<Partial<FormValues>>>
                }
                inputProps={{ className: styles.FormInput }}
                required
              />
              <InputField
                propName="password"
                value={formValues.password}
                label={t('password.password')}
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
      <Button href="/reset-password">{t('password.forgot')}</Button>
    </Layout>
  );
};

export default withTranslation('common')(SignInPage);
