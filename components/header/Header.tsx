import { Grid, Typography } from '@material-ui/core';
import AnimatedPics from '../animated-pics/AnimatedPics';
import useStyles from './HeaderStyles';

const Header = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      className={classes.root}
    >
      <Grid item lg={5} className={classes.textContainer}>
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
      <Grid
        item
        lg={6}
        container
        spacing={0}
        direction="column"
        alignItems="flex-end"
      >
        <AnimatedPics />
        <div className={classes.rightColoredDiv}></div>
      </Grid>
    </Grid>
  );
};

export default Header;
