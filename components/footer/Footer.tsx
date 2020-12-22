import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    footer: {
      marginTop: '5rem',
      padding: '2rem 2rem',
      fontSize: '1rem',
      letterSpacing: '0.05rem',
    },
  }),
);

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
        Kara {year} &copy;
      </Typography>
    </Container>
  );
};

export default Footer;
