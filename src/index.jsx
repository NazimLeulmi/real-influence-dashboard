import * as React from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import theme from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import axios from "axios";
import { AuthProvider } from "./context/authContext";
axios.defaults.withCredentials = true;

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);
