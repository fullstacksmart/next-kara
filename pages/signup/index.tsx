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
import { PageProps, UserInput, UserType } from '../../lib/types';
import { useMutation, gql } from '@apollo/client';
import styles from './Signup.module.css';
import { GenderToggler } from '../../components/gender-toggler/GenderToggler';

const ADD_USER = gql`
  mutation AddUser($input: UserInput!) {
    addUser(input: $input) {
      id
    }
  }
`;

const SignUpPage = ({ t }: PageProps): React.ReactElement => {
  const [formValues, setFormValues] = useState<Partial<UserInput>>({
    name: {
      lastName: '',
    },
    email: '',
    password: '',
    type: 'TALENT',
  });
  const [passwordsIdentical, setPasswordsIdentical] = useState(true);
  const [createUser, newUser] = useMutation(ADD_USER);

  const company =
    formValues.type === 'TALENT' ? null : (
      <InputField
        id="company"
        label={t('companyName')}
        setValue={setFormValues}
        required
      />
    );

  console.log(formValues);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    // const newUser = {
    //   name: formValues.name,
    //   email: formValues.email,
    //   password: formValues.password,
    //   type: formValues.type,
    // };
    // if (formValues.company) newUser.company = formValues.company;
    try {
      // const token = await createUser
      // then save to local storage (for now)
      await createUser({
        variables: {
          input: formValues,
        },
      });
    } catch (e) {
      console.error('user already exists: ', e.message);
    }
  };

  useEffect(() => {
    if (newUser.data) {
      console.log('new User:', newUser);
    }
  }, [newUser]);

  return (
    <Layout title="sign up">
      <Card>
        <CardContent>
          <Container>
            <Typography variant="h2">{t('pages.signup.header')}</Typography>
            <form onSubmit={handleSubmit}>
              <OptionsToggler
                options={[
                  { value: 'TALENT', display: t('type.talent') },
                  { value: 'EMPLOYER', display: t('type.employer') },
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
              <GenderToggler t={t} updateFunction={setFormValues} />
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
  namespacesRequired: ['common'],
});

export default withTranslation('common')(SignUpPage);
