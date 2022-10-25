import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Create a theme instance.

let theme = createTheme({
  palette: {
    primary: {
      main: "#357ded",
      dark: "##2A64BD",
      light: "#71A4F2",
    },
    secondary: {
      main: "#56eef4",
    },
    error: {
      main: "#F25C54",
    },
    success: {
      main: "#7fb069",
    },
    background: {
      main: "#fff3f0",
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
