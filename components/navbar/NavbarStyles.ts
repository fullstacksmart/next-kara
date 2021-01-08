import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: '3rem',
    },
    middleGridContainer: {
      justifyContent: 'space-between',
    },
    rightGridContainer: {
      justifyContent: 'center',
    },
    logo: {
      paddingLeft: '2rem',
      width: '120px',
      height: '35px',
    },
  }),
);

export default useStyles;
