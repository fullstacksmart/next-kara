import { makeStyles } from '@material-ui/core';
import { Theme } from 'lib/material-ui/theme';
import { StyleProps } from './Section.types';

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  Paper: ({ withAddButton }) => ({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    padding: theme.sizes.xl,
    paddingBottom: withAddButton ? 0 : undefined,
    paddingRight: 0,
  }),

  ButtonBox: {
    alignSelf: 'flex-end',
  },
  ContentBox: {
    flex: 1,
    overflow: 'hidden',
  },
}));

export default useStyles;
