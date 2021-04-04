import baseTheme from './baseTheme';
import cssVariables, { CssVariables } from './cssVariables';
import { Theme as MuiTheme } from '@material-ui/core';

export type Theme = MuiTheme & CssVariables;

export default { ...baseTheme, ...cssVariables };
