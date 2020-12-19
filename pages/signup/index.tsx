import { Button } from '../../components/buttons';
import { Layout } from '../../containers/layout';

const SignUpPage = (): React.ReactElement => {
  return (
    <Layout title="sign up">
      <Button href="/talents/1/profile">Talents</Button>
      <Button href="/employers/1/profile">Employers</Button>
    </Layout>
  );
};

export default SignUpPage;
