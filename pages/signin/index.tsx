import { Button } from 'components/buttons';
import { Card, CardContent, Typography, Container } from '@material-ui/core';
import InputField from 'components/input-field/InputField';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { PageProps } from '../../lib/types';
import { withTranslation } from 'i18n.config';
import styles from './Signin.module.css';
import { useAuth } from '../../hooks/useAuth';
import { isError } from 'lib/types/auth';
import { useRouter } from 'next/router';
import { layoutError } from 'apollo/cache';

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
  const auth = useAuth();

  useEffect(
    () => () => {
      layoutError(null);
    },
    [],
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (formValues.email && formValues.password) {
      layoutError(null);
      auth
        .signin(formValues.email, formValues.password)
        .then((response) => {
          if (isError(response)) {
            layoutError(response);
            return;
          }
          if (response && 'uid' in response)
            router.push(`/talents/${response.uid}`);
        })
        .catch((error: Error) => console.error(error)); //eslint-disable-line no-console
    }
  };

  return (
    <>
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
    </>
  );
};

export default withTranslation('common')(SignInPage);
