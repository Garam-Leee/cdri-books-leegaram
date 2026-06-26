import "@emotion/react";
import theme from "./styles/theme";

type ThemeType = typeof theme;

declare module "@emotion/react" {
  export interface Theme extends ThemeType {
    colors: typeof theme.colors;
    typography: typeof theme.typography;
  }
}
