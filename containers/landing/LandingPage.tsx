import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import LandingCards from '../../components/landing-cards/LandingCards';
import Footer from '../../components/footer/Footer';

const LandingPage = (): React.ReactElement => {
  return (
    <React.Fragment>
      <Navbar />
      <Header />
      <LandingCards />
      <Footer />
    </React.Fragment>
  );
};

export default LandingPage;
