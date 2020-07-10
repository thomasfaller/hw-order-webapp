import { createMuiTheme } from "@material-ui/core/styles";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface ThemeOptions {
    themeName?: string; // optional
  }
}

const palette = {
  primary: { main: "#00bfb3" },
  secondary: { main: "#25303b" },
  text: { primary: "#333" },
  alternateTextColor: "#fff",
};

const overrides = {
  MuiAppBar: {
    color: {
      primary: "#fff",
    },
  },
};

const themeName = "Healthwave Theme";

export const theme = createMuiTheme({
  palette: {
    primary: { main: "#00bfb3" },
    secondary: { main: "#25303b" },
    text: { primary: "#333" },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        color: "#fff",
      },
    },
  },
  themeName: "Healthwave Theme",
});
