import { Button } from '../../components/buttons';
import { Layout } from '../../containers/layout';

const SignInPage = (): React.ReactElement => {
  return (
    <Layout title="sign in">
      <Button href="/talents/1/profile">Talents</Button>
      <Button href="/employers/1/profile">Employers</Button>
    </Layout>
  );
};

export default SignInPage;
