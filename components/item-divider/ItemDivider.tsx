import classes from '*.module.css';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  divider: {
    background: 'black',
    width: 'calc(100% + var(--right-column-width))',
    height: '1px',
    margin: '2rem 0',
  },
});

export const ItemDivider = (): React.ReactElement => {
  const classes = useStyles();
  return <div className={classes.divider} />;
};
