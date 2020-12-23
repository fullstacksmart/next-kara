import { Layout } from '../containers/layout';
import LandingPage from '../containers/landing/LandingPage';

export default function Home(): React.ReactNode {
  return (
    <Layout title="Home" home>
      <LandingPage />
    </Layout>
  );
}
