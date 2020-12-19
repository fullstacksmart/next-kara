import { Card, CardContent, Typography } from '@material-ui/core';
import { Button } from '../../components/buttons';
import { Layout } from '../../containers/layout';
import text from '../../lib/text';

const SignUpPage = (): React.ReactElement => {
  return (
    <Layout title="sign up">
      <Card>
        <CardContent>
          <Typography variant="h2">
            {text.german.pages.signup.header}
          </Typography>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default SignUpPage;
