// import PropTypes from 'prop-types'
// import { withTranslation } from '../i18n';
// import TranslateIcon from "@material-ui/icons/Translate";
// import { Button } from '../components/buttons';
import { Layout } from '../containers/layout';
import LandingPage from '../containers/landing/LandingPage';

const Home = (): React.ReactElement => {
  // const handleClick = (): void => {
  //   const newLang = i18n.language === 'en' ? 'de' : 'en'
  //   i18n.changeLanguage(newLang)
  // }

  return (
    <Layout title="Home" home>
      {/* <Button onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true"  color="primary" startIcon={<TranslateIcon />}>
           Switch Language
      </Button>
      <Button href="/signin" color="primary" variant="contained">
        {t('signin')}
      </Button>
      <Button href="/signup" color="secondary" variant="contained">
        {t('signup')}
      </Button> */}
      <LandingPage />
    </Layout>
  );
};

Home.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default Home;
