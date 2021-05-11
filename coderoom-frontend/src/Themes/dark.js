import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

// Dark theme
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    grey: {
      800: "#00000",
      900: "#1c1c1c"
    },
    background: {
      default: "#1c1c1c"
    },
    primary: {
      main: '#347FC4 ',
      light: '#989FCE',
      dark: '#373240',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#989FCE',
      light: '#b5bcf5',
      dark: '#686c8c',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    Info: {
      main: '#347FC4',
      contrastText: '#ffffff',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: [
      // 'Roboto Condensed',
      'Cabin',
      'sans-serif'
    ].join(','),
  },
})

export default theme