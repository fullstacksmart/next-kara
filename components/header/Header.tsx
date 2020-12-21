import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AnimatedPics from '../animated-pics/AnimatedPics';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '4rem',
      marginBottom: '2rem',
    },
    mainText: {
      color: theme.palette.text.primary,
      margin: '3.5rem 4.5rem',
      fontSize: '4rem',
      letterSpacing: '0.07rem',
    },
    secondaryText: {
      color: 'rgb(255, 255, 255)',
      fontWeight: 'bold',
      fontSize: '2rem',
    },
    leftColoredDiv: {
      borderRadius: '0px 100px 100px 0px',
      background: theme.palette.primary.main,
      padding: '3rem 5rem',
    },
    rightColoredDiv: {
      position: 'absolute',
      width: '30rem',
      height: '7rem',
      right: '0',
      top: '52rem',
      background:
        'linear-gradient(270deg, #018395 0%, rgba(255, 255, 255, 0) 75%), #00ACAC',
      borderRadius: '0px 0px 0px 100px',
    },
    picsContainer: {
      justifyContent: 'flex-end',
    },
  }),
);

const Header = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      className={classes.root}
    >
      <Grid item xs={6}>
        <Typography variant="h3" gutterBottom className={classes.mainText}>
          Start today your healthcare career in Germany.
        </Typography>
        <div className={classes.leftColoredDiv}>
          <Typography
            variant="subtitle1"
            align="center"
            className={classes.secondaryText}
          >
            Kara is a platform that connects international health care
            professionals with German employers.
          </Typography>
        </div>
      </Grid>
      <Grid item xs={6} container className={classes.picsContainer}>
        <AnimatedPics />
        <div className={classes.rightColoredDiv}></div>
      </Grid>
    </Grid>
  );
};

export default Header;
