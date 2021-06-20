import HomePage from 'containers/Home/HomePage';

const Home = (): React.ReactElement => {
  return <HomePage />;
};

Home.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default Home;
