import { Button } from '../../components/buttons';
import { Card, CardContent, Typography, Container } from '@material-ui/core';
import { Layout } from '../../containers/layout';
import InputField from '../../components/input-field/InputField';
import { useState } from 'react';
import { PageProps, UserInput } from '../../lib/types';
import { withTranslation } from '../../i18n';
import styles from './ResetPassword.module.css';
import { useAuth } from '../../hooks/useAuth';

const PasswordResetPage = ({ t }: PageProps): React.ReactElement => {
  const [formValues, setFormValues] = useState<Partial<UserInput>>({
    email: '',
  });

  const auth = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.sendPasswordResetEmail(formValues.email);
  };

  return (
    <Layout title="reset password">
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
              <Button type="submit">{t('password.reset')}</Button>
              <Button href="/signin">Back to SignIn</Button>
            </form>
          </Container>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default withTranslation('common')(PasswordResetPage);
