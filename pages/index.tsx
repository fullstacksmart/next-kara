import PropTypes from 'prop-types'
import { withTranslation } from '../i18n'
import { Button } from '../components/buttons';
import { Layout } from '../containers/layout';

const Home = ({t, i18n}): React.ReactElement => {
  const changeLocales = (locale) => {
    i18n.changeLanguage(locale)
  }
  return (
    <Layout title="Home" home>
      <Button onClick={() => changeLocales('de')}>
        change langauge
      </Button>
      <Button href="/signin" color="primary" variant="contained">
        {t('signin')}
      </Button>
      <Button href="/signup" color="secondary" variant="contained">
        sign up
      </Button>
    </Layout>
  );
}

  Home.getInitialProps = async () => ({
    namespacesRequired: ['common'],
  })

  Home.propTypes = {
    t: PropTypes.func.isRequired,
  }

export default withTranslation('common')(Home)