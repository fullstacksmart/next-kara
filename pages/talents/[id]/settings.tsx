import { Button } from '../../../components/buttons';
import { PageProps } from '../../../lib/types';
import { useTranslation } from 'react-i18next';
export interface SettingsPageProps extends PageProps {
  id: string;
}

const SettingsPage = ({ id }: SettingsPageProps): React.ReactElement => {
  const { t } = useTranslation('common');

  return (
    <>
      <h1>Settings Page for Talent {id}</h1>
      <Button href={`/talents/${id}/profile`}>To Profile</Button>
    </>
  );
};

SettingsPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default SettingsPage;
