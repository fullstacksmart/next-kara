import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      minHeight: '100vh',
      maxWidth: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '0 2rem',
      height: '10rem',
      width: '100%',
    },
    text: {
      flex: 1,
    },
    buttons: {
      display: 'flex',
      flexDirection: 'row',
    },
    languageButton: {
      marginLeft: '2rem',
    },
    main: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
);

export default useStyles;
