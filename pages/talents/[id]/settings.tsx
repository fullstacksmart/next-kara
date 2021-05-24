import { Button } from '../../../components/buttons';
import { withTranslation } from '../../../i18n.config';
import { PageProps } from '../../../lib/types';

export interface SettingsPageProps extends PageProps {
  id: string;
}

const SettingsPage = ({ id, t }: SettingsPageProps): React.ReactElement => {
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

export default withTranslation('common')(SettingsPage);
