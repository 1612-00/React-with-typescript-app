import { PropTypes } from "@material-ui/core";
import { createContext, ReactNode, useState } from "react";

interface ThemeContextProviderProps {
  children: ReactNode;
}

interface ThemContextDefault {
  theme: PropTypes.Color;
  toggleTheme: (theme: PropTypes.Color) => void
}

const ThemeContextDefaultData = {
  theme: "primary" as PropTypes.Color,
  toggleTheme: () => {}
};

export const ThemeContext = createContext<ThemContextDefault>(
  ThemeContextDefaultData
);

const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState<PropTypes.Color>(ThemeContextDefaultData.theme);

  const toggleTheme = (theme: PropTypes.Color) => setTheme(theme);

  const themeContextDynamicData = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={themeContextDynamicData}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
