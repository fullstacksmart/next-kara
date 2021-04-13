import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import LandingCards from '../../components/landing-cards/LandingCards';
import Footer from '../../components/footer/Footer';

const LandingPage = (): React.ReactElement => {
  return (
    <>
      <Navbar />
      <Header />
      <LandingCards />
      <Footer />
    </>
  );
};

export default LandingPage;
