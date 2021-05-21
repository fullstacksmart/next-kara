import { makeStyles } from '@material-ui/core';
import { Theme } from 'lib/material-ui/theme';

const useStyles = makeStyles<Theme>((theme) => ({
  OuterContainer: {
    maxWidth: '150rem',
    '& >* > *:not(:last-child)': {
      marginBottom: '5rem',
    },
    padding: theme.sizes.lg,
  },
}));

export default useStyles;
