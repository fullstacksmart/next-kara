import { Container, Typography } from '@material-ui/core';
import useStyles from './FooterStyles';

const Footer = (): React.ReactElement => {
  const classes = useStyles();

  const year: string = new Date().getFullYear().toString();

  return (
    <Container disableGutters>
      <Typography
        variant="h6"
        color="textPrimary"
        align="center"
        className={classes.footer}
      >
        &copy; {year} Kara. All rights reserved.
      </Typography>
    </Container>
  );
};

export default Footer;
