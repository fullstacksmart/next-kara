import PropTypes from 'prop-types'
import { withTranslation } from '../i18n'
import { Button } from '../components/buttons';
import { Layout } from '../containers/layout';

const Home = ({t}): React.ReactElement => (
    <Layout title="Home" home>
      <Button href="/signin" color="primary" variant="contained">
        {t('signin')}
      </Button>
      <Button href="/signup" color="secondary" variant="contained">
        sign up
      </Button>
    </Layout>
  );

  Home.getInitialProps = async () => ({
    namespacesRequired: ['common'],
  })

  Home.propTypes = {
    t: PropTypes.func.isRequired,
  }

export default withTranslation('common')(Home)