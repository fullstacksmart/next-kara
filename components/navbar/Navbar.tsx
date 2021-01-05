import { Grid } from '@material-ui/core';
import NavbarItem from '../navbar-item/NavbarItem';
import useStyles from './NavbarStyles';

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
        <NavbarItem name="Home" href="/" />
        <NavbarItem name="Für Arbeitgeber" href="/" />
        <NavbarItem name="Für Talente" href="/" />
        <NavbarItem name="Über uns" href="/" />
        <Grid item />
      </Grid>
      <Grid
        item
        lg={3}
        container
        spacing={2}
        className={classes.rightGridContainer}
      >
        <NavbarItem name="Mitglied werden" href="/signup" bold />
        <NavbarItem name="Login" href="/signin" bold />
      </Grid>
    </Grid>
  );
};

export default Navbar;
