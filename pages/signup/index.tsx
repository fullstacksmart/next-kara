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

const SignUpPage = (): React.ReactElement => {
  const [formValues, setFormValues] = useState<UserInput>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    type: text.type.talent.german.toUpperCase() as UserType,
  });
  const [passwordsIdentical, setPasswordsIdentical] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const company =
    formValues.type === text.type.talent.german.toUpperCase() ? null : (
      <InputField
        id="company"
        label={text.companyName.german}
        setValue={setFormValues}
      />
    );

  const handleClick = () => {};

  useEffect(() => {
    setIsFormFilled(
      Boolean(
        passwordsIdentical &&
          formValues.lastName &&
          formValues.email &&
          formValues.password,
      ),
    );
  }, [formValues, passwordsIdentical]);

  return (
    <Layout title="sign up">
      <Card>
        <CardContent>
          <Container>
            <Typography variant="h2">
              {text.pages.signup.header.german}
            </Typography>
            <OptionsToggler
              options={[
                { value: text.type.talent.german },
                { value: text.type.employer.german },
              ]}
              optionsLabel="type"
              setOption={(type) => {
                setFormValues((oldValues) => ({
                  ...oldValues,
                  type: type?.toUpperCase() as UserType,
                }));
              }}
            />
            <Box component="div">
              <InputField
                id="firstName"
                label={text.fullName.firstName.german}
                fullWidth={false}
                setValue={setFormValues}
              />
              <InputField
                id="lastName"
                label={text.fullName.lastName.german}
                fullWidth={false}
                setValue={setFormValues}
              />
            </Box>
            {company}
            <InputField
              id="email"
              label={text.email.german}
              setValue={setFormValues}
            />
            <InputField
              id="password"
              label={text.password.german}
              setValue={setFormValues}
            />
            <InputField
              id="passwordConfirm"
              label={text.repeatPassword.german}
              onChange={(e) =>
                setPasswordsIdentical(e.target.value === formValues.password)
              }
            />
            <Button disabled={!isFormFilled} onClick={handleClick}>
              {text.signUp.german}
            </Button>
          </Container>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default SignUpPage;
