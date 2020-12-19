import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const baseTheme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(0, 172, 172)',
    },
    secondary: {
      main: 'rgb(1,131,149)',
    },
    text: {
      primary: 'rgb(61, 61, 61)',
      secondary: 'rgb(255, 255, 255)',
    },
  },
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(','),
    htmlFontSize: 10,
    h1: {
      fontFamily: ['Lato', 'sans-serif'].join(','),
    },
    h2: {
      fontFamily: ['Lato', 'sans-serif'].join(','),
    },
    h3: {
      fontFamily: ['Lato', 'sans-serif'].join(','),
    },
    h4: {
      fontFamily: ['Lato', 'sans-serif'].join(','),
    },
    h5: {
      fontFamily: ['Lato', 'sans-serif'].join(','),
    },
    h6: {
      fontFamily: ['Lato', 'sans-serif'].join(','),
    },
  },
});

export default responsiveFontSizes(baseTheme);
