import {
  Card,
  CardContent,
  Typography,
  Container,
  Box,
} from '@material-ui/core';
import OptionsToggler from '../../components/option-toggler/OptionToggler';
import { Layout } from '../../containers/layout';
import { Button } from '../../components/buttons';
import InputField from '../../components/input-field/InputField';
import text from '../../lib/text';
import { useEffect, useState } from 'react';
import { UserInput, UserType } from '../../lib/types';
import { useMutation, gql } from '@apollo/react-hooks';
import styles from './Signup.module.css';

const ADD_USER = gql`
  mutation AddUser($input: UserInput!) {
    addUser(input: $input) {
      id
    }
  }
`;

const SignUpPage = (): React.ReactElement => {
  const [formValues, setFormValues] = useState<UserInput>({
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
    formValues.type === text.type.talent.german.toUpperCase() ? null : (
      <InputField
        id="company"
        label={text.companyName.german}
        setValue={setFormValues}
        required
      />
    );

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
    console.log(formValues);
    try {
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
            <Typography variant="h2">
              {text.pages.signup.header.german}
            </Typography>
            <form onSubmit={handleSubmit}>
              <OptionsToggler
                options={[
                  { value: 'TALENT', display: text.type.talent.german },
                  { value: 'EMPLOYER', display: text.type.employer.german },
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
                  label={text.fullName.firstName.german}
                  fullWidth={false}
                  setValue={setFormValues}
                />
                <InputField
                  id="lastName"
                  nesting="name"
                  label={text.fullName.lastName.german}
                  fullWidth={false}
                  setValue={setFormValues}
                  required
                />
              </Box>
              {company}
              <InputField
                id="email"
                type="email"
                label={text.email.german}
                setValue={setFormValues}
                inputProps={{ className: styles.FormInput }}
                required
              />
              <InputField
                id="password"
                label={text.password.german}
                setValue={setFormValues}
                type="password"
                required
              />
              <InputField
                id="passwordConfirm"
                label={text.repeatPassword.german}
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
                {text.signUp.german}
              </Button>
            </form>
          </Container>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default SignUpPage;
