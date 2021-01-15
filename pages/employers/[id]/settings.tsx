// import { getStaticPaths, getStaticProps } from './profile';
import { Button } from '../../../components/buttons';
import { Layout } from '../../../containers/layout';
import { PageProps } from '../../../lib/types';

export interface SettingsPageProps extends PageProps {
  id: string;
}

const SettingsPage = ({ id, t }: SettingsPageProps): React.ReactElement => {
  return (
    <Layout t={t} title={['settings', `Employer ${id}`]}>
      <h1>Settings Page for Employer {id}</h1>
      <Button href={`/employers/${id}/profile`}>To Profile</Button>
    </Layout>
  );
};

// export { getStaticPaths, getStaticProps };

export default SettingsPage;
