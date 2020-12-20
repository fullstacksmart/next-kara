import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Image from 'next/image';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: '4rem 3rem',
    },
    middleGridContainer: {
      justifyContent: 'space-between',
    },
    rightGridContainer: {
      justifyContent: 'center',
    },
    link: {
      fontSize: '1.75rem',
      letterSpacing: '0.05rem',
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
      alignItems="flex-end"
      className={classes.root}
    >
      <Grid item xs={2}>
        <Image
          src="/kara_gradient.png"
          alt="kara logo"
          width="100px"
          height="35px"
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
          <Typography variant="h6" className={classes.link}>
            Home
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" className={classes.link}>
            Für Arbeitgeber
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" className={classes.link}>
            Für Talente
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" className={classes.link}>
            Über uns
          </Typography>
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
          <Typography
            variant="h6"
            className={`${classes.link} ${classes.linkBold}`}
          >
            Mitglied werden
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="h6"
            className={`${classes.link} ${classes.linkBold}`}
          >
            Login
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Navbar;
