import { createTheme } from '@material-ui/core/styles';
import { color } from './color';

const FONT_PRIMARY = `${'Proto Grotesk'}, sans-serif`;

export const theme = createTheme({
  spacing: (factor) => `${0.5 * factor}rem`,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: color.primary.main,
      secondary: color.text.secondary,
      contrastText: color.white,
    },
    text: {
      primary: color.text.primary,
      secondary: color.text.secondary,
    },
    background: {
      default: color.white,
    },
    black: color.black,
    green: color.green,
    white: color.white,
    orange: color.orange,
    orangeLight: color.orangeLight,
    pageError: color.pageError,
    blue: color.blue,
  },
  typography: {
    fontFamily: FONT_PRIMARY,
    fontWeightLight: 'normal',
    fontWeightRegular: 'bold',
    color: color.text.primary,

    h1: {
      fontWeight: 'normal',
      lineHeight: '3.844rem',
      fontSize: '3.844rem',
    },
    h2: {
      fontWeight: 'normal',
      lineHeight: '3.3rem',
      fontSize: '3rem',
    },
    h3: {
      fontWeight: 'normal',
      lineHeight: '2.75rem',
      fontSize: '2.5rem',
    },
    h4: {
      fontWeight: 'normal',
      lineHeight: '2.2rem',
      fontSize: '2rem',
    },
    subtitle1: {
      fontWeight: 'normal',
      lineHeight: '1.5rem',
      fontSize: '1.25rem',
    },
    subtitle2: {
      fontWeight: 'normal',
      lineHeight: '2.2rem',
      fontSize: '2rem',
    },
    body1: {
      fontWeight: 'normal',
      lineHeight: '1.125rem',
      fontSize: '0.875rem',
      letterSpacing: '1%',
    },
    button: {
      fontWeight: 'normal',
      lineHeight: '1.5rem',
      fontSize: '1.25rem',
      textTransform: 'none',
    },
    caption: {
      fontWeight: 'normal',
      lineHeight: '1.5rem',
      fontSize: '1.25rem',
      cursor: 'pointer',
    },
  },
});
