import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';

const theme = createMuiTheme();

export function MuiProvider ({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        { children }
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}
