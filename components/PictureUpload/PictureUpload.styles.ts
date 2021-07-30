import { makeStyles } from '@material-ui/core';
import { Theme } from 'lib/material-ui/theme';

const useStyles = makeStyles<Theme>(() => ({
  root: {
    width: '100%',
    height: '100%',
  },
  imageInput: {
    backgroundColor: 'rgb(255, 255, 255)',
    border: '2px solid rgba(211, 220, 225, 1)',
    borderRadius: '50%',
    height: '100%',
    width: '100%',
  },
  fileInput: {
    display: 'none',
  },
}));

export default useStyles;
