import { Link } from '../../i18n';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '1rem 1.5rem',
    },
    middleGridContainer: {
      justifyContent: 'space-between',
    },
    rightGridContainer: {
      justifyContent: 'center',
    },
    logo: {
      paddingLeft: '1.5rem',
      width: '120px',
      height: '35px',
    },
    a: {
      textDecoration: 'none',
    },
    link: {
      color: theme.palette.text.primary,
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      fontSize: '1rem',
      letterSpacing: '0.05rem',
      transition: 'color 0.2s, background 0.2s',
      '&:hover': {
        color: 'rgb(255, 255, 255)',
        background: theme.palette.primary.main,
      },
    },
    linkBold: {
      fontWeight: 'bold',
    },
  }),
);

const Navbar = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      className={classes.root}
    >
      <Grid item lg={2}>
        <img
          src="/kara_gradient.png"
          alt="kara logo"
          className={classes.logo}
        />
      </Grid>
      <Grid
        item
        lg={6}
        container
        spacing={1}
        className={classes.middleGridContainer}
      >
        <Grid item>
          <Link href="/">
            <a className={classes.a}>
              <Typography variant="h6" className={classes.link}>
                Home
              </Typography>
            </a>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/">
            <a className={classes.a}>
              <Typography variant="h6" className={classes.link}>
                Für Arbeitgeber
              </Typography>
            </a>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/">
            <a className={classes.a}>
              <Typography variant="h6" className={classes.link}>
                Für Talente
              </Typography>
            </a>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/">
            <a className={classes.a}>
              <Typography variant="h6" className={classes.link}>
                Über uns
              </Typography>
            </a>
          </Link>
        </Grid>
        <Grid item />
      </Grid>
      <Grid
        item
        lg={3}
        container
        spacing={2}
        className={classes.rightGridContainer}
      >
        <Grid item>
          <Link href="/signup">
            <a className={classes.a}>
              <Typography
                variant="h6"
                className={`${classes.link} ${classes.linkBold}`}
              >
                Mitglied werden
              </Typography>
            </a>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/signin">
            <a className={classes.a}>
              <Typography
                variant="h6"
                className={`${classes.link} ${classes.linkBold}`}
              >
                Login
              </Typography>
            </a>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Navbar;
