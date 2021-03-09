import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      minHeight: '100vh',
      maxWidth: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    circularLoader: {
      margin: 'auto',
    },
    logo: {
      height: '5rem',
      width: '5rem',
      margin: 'auto',
      position: 'absolute',
    },
  }),
);

export default useStyles;
