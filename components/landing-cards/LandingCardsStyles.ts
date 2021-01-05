import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    cardsContainer: {
      justifyContent: 'space-evenly',
    },
    actionArea: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
    },
    card: {
      boxShadow: '15px 20px 24px rgba(0, 0, 0, 0.16)',
      borderRadius: '0px 0px 34px 34px',
      margin: '2rem',
      width: '300px',
      height: '300px',
    },
    imageContainer: {
      display: 'flex',
      width: '100%',
      justifyContent: 'flex-end',
    },
    cardImage: {
      width: '95%',
      height: '95px',
      borderRadius: '15px 0px 0px 15px',
    },
    cardTitle: {
      fontSize: '1rem',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    cardDescription: {
      fontSize: '1rem',
      textAlign: 'center',
    },
  }),
);

export default useStyles;
