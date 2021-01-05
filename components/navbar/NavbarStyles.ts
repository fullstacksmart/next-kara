import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: '1rem 1.5rem',
    },
    middleGridContainer: {
      justifyContent: 'space-between',
    },
    rightGridContainer: {
      justifyContent: 'center',
    },
    logo: {
      paddingLeft: '1.5rem',
      width: '120px',
      height: '35px',
    },
  }),
);

export default useStyles;
