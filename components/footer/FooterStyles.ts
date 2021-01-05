import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    footer: {
      marginTop: '2rem',
      padding: '2rem 2rem',
      fontSize: '1rem',
      letterSpacing: '0.05rem',
    },
  }),
);

export default useStyles;
