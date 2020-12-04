import { LinkedButton } from '../../components/buttons';
import { Layout } from '../../containers/layout';

const SignInPage = (): React.ReactElement => {
  return (
    <Layout title="sign in">
      <LinkedButton href="/talents/1/profile">Talents</LinkedButton>
      <LinkedButton href="/employers/1/profile">Employers</LinkedButton>
    </Layout>
  );
};

export default SignInPage;
