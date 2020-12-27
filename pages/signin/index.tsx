import { Button } from '../../components/buttons';
import { Layout } from '../../containers/layout';

const SignInPage = (): React.ReactElement => {
  return (
    <Layout title="sign in">
      <Button href="/talents/yasbiuycdbucoiuscboiucsiousc!@/profile">
        Talents
      </Button>
      <Button href="/employers/1/profile">Employers</Button>
    </Layout>
  );
};

SignInPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default SignInPage;
