import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    footer: {
      marginTop: '3rem',
      padding: '3rem 3rem',
      fontSize: '1.4rem',
      letterSpacing: '0.05rem',
    },
  }),
);

export default useStyles;
