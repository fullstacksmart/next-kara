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

const SignUpPage = (): React.ReactElement => {
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
              setOption={(option) => {
                console.log(option);
              }}
            />
            <Box component="div">
              <InputField
                label={text.fullName.firstName.german}
                fullWidth={false}
              />
              <InputField
                label={text.fullName.lastName.german}
                fullWidth={false}
              />
            </Box>
            <InputField label={text.email.german} />
            <InputField label={text.password.german} />
            <InputField label={text.repeatPassword.german} />
            <Button>{text.signUp.german}</Button>
          </Container>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default SignUpPage;
