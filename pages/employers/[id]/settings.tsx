// import { getStaticPaths, getStaticProps } from './profile';
import { Button } from '../../../components/buttons';
import { PageProps } from '../../../lib/types';

export interface SettingsPageProps extends PageProps {
  id: string;
}

const SettingsPage = ({ id, t }: SettingsPageProps): React.ReactElement => {
  return (
    <>
      <h1>Settings Page for Employer {id}</h1>
      <Button href={`/employers/${id}/profile`}>To Profile</Button>
    </>
  );
};

// export { getStaticPaths, getStaticProps };

SettingsPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default SettingsPage;
