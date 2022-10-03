import { createTheme,responsiveFontSizes } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.



let theme = createTheme({
  palette: {
    primary: {
      main: '#FBBF34',
      dark:'#8E6E2E'
    },
    secondary: {
      main: '#6ccff6',
    },
    error: {
      main: "#F25C54",
    },
    success:{
      main:"#7fb069"
    }
  },
});

theme = responsiveFontSizes(theme);


export default theme;
