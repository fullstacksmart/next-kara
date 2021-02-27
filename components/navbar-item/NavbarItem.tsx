import { Link } from '../../i18n.config';
import { Typography, Grid } from '@material-ui/core';
import useStyles from './NavbarItemStyles';

interface NavbarItemProps {
  name: string;
  href: string;
  bold?: boolean;
}

const NavbarItem = (props: NavbarItemProps): React.ReactElement => {
  const classes = useStyles();

  if (!props.bold) {
    return (
      <Grid item>
        <Link href={props.href}>
          <a className={classes.a}>
            <Typography variant="h6" className={classes.link}>
              {props.name}
            </Typography>
          </a>
        </Link>
      </Grid>
    );
  }

  return (
    <Grid item>
      <Link href={props.href}>
        <a className={classes.a}>
          <Typography
            variant="h6"
            className={`${classes.link} ${classes.linkBold}`}
          >
            {props.name}
          </Typography>
        </a>
      </Link>
    </Grid>
  );
};

export default NavbarItem;
