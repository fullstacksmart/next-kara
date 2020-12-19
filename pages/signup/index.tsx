import { Card, CardContent, Typography } from '@material-ui/core';
import TypeToggler from '../../components/OptionToggler/OptionToggler';
import { Layout } from '../../containers/layout';
import text from '../../lib/text';

const SignUpPage = (): React.ReactElement => {
  return (
    <Layout title="sign up">
      <Card>
        <CardContent>
          <Typography variant="h2">
            {text.pages.signup.header.german}
          </Typography>
          <TypeToggler
            options={[
              { value: text.type.talent.german },
              { value: text.type.employer.german },
            ]}
            optionsLabel="type"
            setOption={(option) => {
              console.log(option);
            }}
          />
        </CardContent>
      </Card>
    </Layout>
  );
};

export default SignUpPage;
