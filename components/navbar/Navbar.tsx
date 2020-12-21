import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Image from 'next/image';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '3rem 3rem',
    },
    middleGridContainer: {
      justifyContent: 'space-between',
    },
    rightGridContainer: {
      justifyContent: 'center',
    },
    logo: {
      paddingLeft: '1rem',
    },
    link: {
      padding: '1rem 1.5rem',
      borderRadius: '20px',
      fontSize: '1.5rem',
      letterSpacing: '0.07rem',
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
      <Grid item xs={2} className={classes.logo}>
        <Image
          src="/kara_gradient.png"
          alt="kara logo"
          width="100px"
          height="36px"
        />
      </Grid>
      <Grid
        item
        xs={6}
        container
        spacing={2}
        className={classes.middleGridContainer}
      >
        <Grid item>
          <Link href="/">
            <a>
              <Typography
                variant="h6"
                color="textPrimary"
                className={classes.link}
              >
                Home
              </Typography>
            </a>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/">
            <a>
              <Typography
                variant="h6"
                color="textPrimary"
                className={classes.link}
              >
                Für Arbeitgeber
              </Typography>
            </a>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/">
            <a>
              <Typography
                variant="h6"
                color="textPrimary"
                className={classes.link}
              >
                Für Talente
              </Typography>
            </a>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/">
            <a>
              <Typography
                variant="h6"
                color="textPrimary"
                className={classes.link}
              >
                Über uns
              </Typography>
            </a>
          </Link>
        </Grid>
        <Grid item />
      </Grid>
      <Grid
        item
        xs={3}
        container
        spacing={4}
        className={classes.rightGridContainer}
      >
        <Grid item>
          <Link href="/signup">
            <a>
              <Typography
                variant="h6"
                color="textPrimary"
                className={`${classes.link} ${classes.linkBold}`}
              >
                Mitglied werden
              </Typography>
            </a>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/signin">
            <a>
              <Typography
                variant="h6"
                color="textPrimary"
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
