import Navbar from 'components/navbar/Navbar';
import Header from 'components/header/Header';
import HomePageCards from 'components/HomePageCards/HomePageCards';
import Footer from 'components/footer/Footer';

const HomePage = (): React.ReactElement => {
  return (
    <>
      <Navbar />
      <Header />
      <HomePageCards />
      <Footer />
    </>
  );
};

export default HomePage;
