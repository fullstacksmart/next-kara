// import PropTypes from 'prop-types'
// import { withTranslation } from '../i18n';
// import TranslateIcon from "@material-ui/icons/Translate";
// import { Button } from '../components/buttons';
import LandingPage from '../containers/landing/LandingPage';
import { PageProps } from '../lib/types';
import { withTranslation } from '../i18n.config';

const Home = ({ t }: PageProps): React.ReactElement => {
  // const handleClick = (): void => {
  //   const newLang = i18n.language === 'en' ? 'de' : 'en'
  //   i18n.changeLanguage(newLang)
  // }

  return <LandingPage />;
};

Home.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(Home);
