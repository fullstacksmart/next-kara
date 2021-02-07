import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  OuterContainer: {
    maxWidth: '150rem',
    '& >* > *:not(:last-child)': {
      marginBottom: '5rem',
    },
  },
});

export default useStyles;
