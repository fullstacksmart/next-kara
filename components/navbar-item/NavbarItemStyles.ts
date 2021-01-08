import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    a: {
      textDecoration: 'none',
    },
    link: {
      color: theme.palette.text.primary,
      padding: '1rem 1.5rem',
      borderRadius: '20px',
      fontSize: '1.75rem',
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
