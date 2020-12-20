import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from '../../components/header/Header';

const LandingPage = (): React.ReactElement => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container disableGutters>
        <Header />
      </Container>
    </React.Fragment>
  );
};

export default LandingPage;
