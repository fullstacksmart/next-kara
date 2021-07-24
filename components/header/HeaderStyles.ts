import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '2rem',
      marginBottom: '2rem',
    },
    textContainer: {
      marginLeft: '3.5rem',
    },
    mainText: {
      margin: '3rem 0 2.5rem 2.4rem',
      fontSize: '3.5rem',
      fontWeight: 'bold',
    },
    secondaryText: {
      color: 'rgb(255, 255, 255)',
      fontWeight: 'bold',
      fontSize: '1.8rem',
      lineHeight: '1.5',
    },
    leftColoredDiv: {
      borderRadius: '100px',
      background: theme.palette.primary.main,
      padding: '2.5rem 6rem',
    },
    rightColoredDiv: {
      width: '300px',
      height: '70px',
      background:
        'linear-gradient(270deg, #018395 0%, rgba(255, 255, 255, 0) 75%), #00ACAC',
      borderRadius: '0px 0px 0px 100px',
    },
  }),
);

export default useStyles;
