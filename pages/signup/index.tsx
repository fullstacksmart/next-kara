import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
  Container,
  Box,
} from '@material-ui/core';
import { withTranslation } from '../../i18n';
import OptionsToggler from '../../components/option-toggler/OptionToggler';
import { Layout } from '../../containers/layout';
import { Button } from '../../components/buttons';
import InputField from '../../components/input-field/InputField';
import { useEffect, useState } from 'react';
import { UserInput, UserType } from '../../lib/types';
import { useMutation, gql } from '@apollo/client';
import styles from './Signup.module.css';
import { CropDinSharp } from '@material-ui/icons';

const SIGNUP = gql`
  mutation Signup($input: UserInput!) {
    signup(input: $input) {
      newUser {
        id
      }
      token
    }
  }
`;

const SignUpPage = ({t}): React.ReactElement => {
  const [formValues, setFormValues] = useState<UserInput>({
    name: {
      lastName: '',
    },
    email: '',
    password: '',
    gender: 'MALE',
    type: 'TALENT',
  });
  const [passwordsIdentical, setPasswordsIdentical] = useState(true);
  const [createUser, newUser] = useMutation(SIGNUP);

  const company =
    formValues.type === 'TALENT' ? null : (
      <InputField
        id="company"
        label={t('companyName')}
        setValue={setFormValues}
        required
      />
    );

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    try {
      await createUser({
        variables: {
          input: formValues,
        },
      })
    } catch (e) {
      console.error('Error while signing up user: ', e.message);
    }
  };

  useEffect(() => {
    if (newUser.data) {
      console.log('new User:', newUser);
      localStorage.setItem('token', newUser.data.signup.token);
    }
  }, [newUser]);

  return (
    <Layout title="sign up">
      <Card>
        <CardContent>
          <Container>
            <Typography variant="h2">
              {t('pages.signup.header')}
            </Typography>
            <form onSubmit={handleSubmit}>
              <OptionsToggler
                options={[
                  { value: 'TALENT', display: t('type.talent')},
                  { value: 'EMPLOYER', display: t('type.employer')},
                ]}
                optionsLabel="type"
                setOption={(type) => {
                  setFormValues((oldValues) => ({
                    ...oldValues,
                    type: type as UserType,
                  }));
                }}
              />
              <Box component="div">
                <InputField
                  id="firstName"
                  nesting="name"
                  label={t('fullName.firstName')}
                  fullWidth={false}
                  setValue={setFormValues}
                />
                <InputField
                  id="lastName"
                  nesting="name"
                  label={t('fullName.lastName')}
                  fullWidth={false}
                  setValue={setFormValues}
                  required
                />
              </Box>
              {company}
              <InputField
                id="email"
                type="email"
                label={t('email')}
                setValue={setFormValues}
                inputProps={{ className: styles.FormInput }}
                required
              />
              <InputField
                id="password"
                label={t('password')}
                setValue={setFormValues}
                type="password"
                required
              />
              <InputField
                id="passwordConfirm"
                label={t('repeatPassword')}
                onChange={(e) =>
                  setPasswordsIdentical(e.target.value === formValues.password)
                }
                type="password"
                required
                inputProps={{
                  className: styles.FormInput,
                  pattern: `^${formValues.password}$`,
                }}
              />
              <Button disabled={!passwordsIdentical} type="submit">
                {t('signup')}
              </Button>
            </form>
          </Container>
        </CardContent>
      </Card>
    </Layout>
  );
};

SignUpPage.getInitialProps = async () => ({
  namespacesRequired: ['common']
})

SignUpPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(SignUpPage);
