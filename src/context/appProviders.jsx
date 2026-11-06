import React from "react";
import ThemeProvider from "./theme/themeProvider";

function AppProviders({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

export default AppProviders;
