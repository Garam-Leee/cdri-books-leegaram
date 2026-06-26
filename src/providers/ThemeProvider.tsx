import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import type { PropsWithChildren } from "react";

import theme from "@/styles/theme";

export default function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <EmotionThemeProvider theme={theme}>
      {children}
    </EmotionThemeProvider>
  );
}