import { Fab } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useContext } from "react";
import { ThemeContext } from "./../contexts/ThemeContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    floatButton: {
      position: "fixed",
      right: "3rem",
      bottom: "3rem",
    },
  })
);

const ToggleThemeBtn = () => {
  // Style
  const classes = useStyles();

  // Context
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Fab
      color={theme}
      variant="extended"
      className={classes.floatButton}
      onClick={toggleTheme.bind(
        this,
        theme === "primary" ? "secondary" : "primary"
      )}
    >
      Toggle theme
    </Fab>
  );
};

export default ToggleThemeBtn;
