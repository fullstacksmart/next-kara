import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import LandingCards from '../../components/landing-cards/LandingCards';
import Footer from '../../components/footer/Footer';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/react-hooks';

const LandingPage = (): React.ReactElement => {
  const GET_ALL_TALENTS = gql`
    query getAllTalentIds {
      id
    }
  `;

  const { data, error, loading } = useQuery(GET_ALL_TALENTS);
  console.log(data);

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
