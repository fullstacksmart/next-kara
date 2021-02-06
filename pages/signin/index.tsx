import { Button } from 'components/buttons';
import { Layout } from 'containers/layout';
import { withTranslation } from 'i18n.config';
import { PageProps } from 'lib/types';

const SignInPage = ({ t }: PageProps): React.ReactElement => {
  return (
    <Layout title="sign in" t={t}>
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

export default withTranslation('common')(SignInPage);
