import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import App from "./App";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3B82F6",
    },
    secondary: {
      main: "#F97316",
    },
    error: {
      main: "#EF4444",
    },
    warning: {
      main: "#F59E0B",
    },
    info: {
      main: "#0EA5E9",
    },
    success: {
      main: "#10B981",
    },
    text: {
      primary: "#1F2937",
      secondary: "#4B5563",
    },
    background: {
      default: "#F9FAFB",
      paper: "#FFFFFF",
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: "bold",
        },
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <CssBaseline />
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </StrictMode>
);
