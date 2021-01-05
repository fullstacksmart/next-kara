import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    a: {
      textDecoration: 'none',
    },
    link: {
      color: theme.palette.text.primary,
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      fontSize: '1rem',
      letterSpacing: '0.05rem',
      transition: 'color 0.2s, background 0.2s',
      '&:hover': {
        color: 'rgb(255, 255, 255)',
        background: theme.palette.primary.main,
      },
    },
    linkBold: {
      fontWeight: 'bold',
    },
  }),
);

export default useStyles;
