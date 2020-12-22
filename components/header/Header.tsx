import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AnimatedPics from '../animated-pics/AnimatedPics';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '4rem',
      marginBottom: '1rem',
    },
    mainText: {
      color: theme.palette.text.primary,
      margin: '3rem 0 3rem 3.2rem',
      fontSize: '2.5rem',
      fontWeight: 'bold',
    },
    secondaryText: {
      color: 'rgb(255, 255, 255)',
      fontWeight: 'bold',
      fontSize: '1.5rem',
      lineHeight: '1.5',
    },
    leftColoredDiv: {
      borderRadius: '0px 100px 100px 0px',
      background: theme.palette.primary.main,
      padding: '1rem 5rem',
    },
    rightColoredDiv: {
      width: '310px',
      height: '80px',
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
      <Grid item lg={6}>
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
      <Grid item lg={6} container spacing={0} className={classes.picsContainer}>
        <AnimatedPics />
        <div className={classes.rightColoredDiv}></div>
      </Grid>
    </Grid>
  );
};

export default Header;
