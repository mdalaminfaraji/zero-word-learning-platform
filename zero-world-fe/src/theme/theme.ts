import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1A3A40",
      light: "#2C7A7A",
      dark: "#123333",
    },
    secondary: {
      main: "#F2994A",
      light: "#FFB067",
      dark: "#D97A2D",
    },
    background: {
      default: "#F5F7F9",
      paper: "#FFFFFF",
    },
    success: {
      main: "#27AE60",
    },
    warning: {
      main: "#F2994A",
    },
    info: {
      main: "#2F80ED",
    },
    error: {
      main: "#EB5757",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "0.875rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        },
      },
    },
  },
});
