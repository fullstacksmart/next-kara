import { getStaticPaths, getStaticProps } from './profile';
import { LinkedButton } from '../../../components/buttons';
import { Layout } from '../../../containers/layout';

export interface SettingsPageProps {
  id: string;
}

const SettingsPage = ({ id }: SettingsPageProps): React.ReactElement => {
  return (
    <Layout title={['settings', `Employer ${id}`]}>
      <h1>Settings Page for Employer {id}</h1>
      <LinkedButton href={`/employers/${id}/profile`}>To Profile</LinkedButton>
    </Layout>
  );
};

export { getStaticPaths, getStaticProps };

export default SettingsPage;
