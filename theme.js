import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      light: "#AC8ED4",
      main: "#845EC2",
      dark: "#6D4B9B",
    },
    secondary: {
      light: "#ff8ba7",
      main: "#FF6F91",
      dark: "#cc5874",
    },
    success: { light: "#4cd9c1", main: "#32d3b8", dark: "#00C9A7" },
    warning: { main: "#FFC75F" },
    error: { main: "#C34A36" },
    background: { main: "#171A21" },
  },
});

export default theme;
