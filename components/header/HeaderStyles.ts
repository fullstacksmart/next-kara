import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '1rem',
      marginBottom: '1rem',
    },
    textContainer: {
      marginLeft: '3rem',
    },
    mainText: {
      margin: '3rem 0 2rem 2rem',
      fontSize: '2rem',
      fontWeight: 'bold',
    },
    secondaryText: {
      color: 'rgb(255, 255, 255)',
      fontWeight: 'bold',
      fontSize: '1.25rem',
      lineHeight: '1.5',
    },
    leftColoredDiv: {
      borderRadius: '100px',
      background: theme.palette.primary.main,
      padding: '1rem 5rem',
    },
    rightColoredDiv: {
      width: '300px',
      height: '70px',
      background:
        'linear-gradient(270deg, #018395 0%, rgba(255, 255, 255, 0) 75%), #00ACAC',
      borderRadius: '0px 0px 0px 100px',
    },
    picsContainer: {
      justifyContent: 'flex-end',
    },
  }),
);

export default useStyles;
