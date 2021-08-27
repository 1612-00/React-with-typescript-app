import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  Chip,
} from "@material-ui/core";
import WelcomeMessage from "./WelcomeMessage";
import { useState, useEffect, ChangeEvent, useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ProgressContext } from "./../contexts/ProgressContext";
import { ThemeContext } from "./../contexts/ThemeContext";
import Login from "./Login";
import { AuthContext } from "./../contexts/AuthContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    positionSelect: {
      color: "white",
      borderBottom: "1px solid white",
    },
  })
);

const Navbar = () => {
  // Style
  const classes = useStyles();

  // Context
  const { lastTime, status } = useContext(ProgressContext);
  const { theme } = useContext(ThemeContext);
  const {
    authInfo: { isAuthenticated },
    toggleAuth,
  } = useContext(AuthContext);

  // State
  const [position, setPosition] = useState("Full-stack Developer");

  const [time, setTime] = useState<Date>(() => new Date(Date.now()));

  const [loginOpen, setLoginOpen] = useState(false);

  // Effect
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date(Date.now())), 1000);
    return () => clearInterval(timer);
  }, []);

  const onChangePosition = (
    event: ChangeEvent<{
      value: unknown;
    }>
  ) => setPosition(event.target.value as string);

  return (
    <AppBar position="static" color={theme}>
      <Toolbar>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width={1}
          py={2}
        >
          <Typography variant="h6">My movies</Typography>

          <Box textAlign="center">
            <WelcomeMessage position={position} />

            <Chip
              label={`Last time working on this project: ${lastTime} - Status: ${status}`}
            ></Chip>

            <Box mt={1}>
              <FormControl>
                <Select
                  value={position}
                  onChange={onChangePosition}
                  className={classes.positionSelect}
                >
                  <MenuItem value="Full-stack Developer">
                    Full-stack Developer
                  </MenuItem>
                  <MenuItem value="Front-end DeveloFer">
                    Pront-end Developer
                  </MenuItem>
                  <MenuItem value="Back-end Developer">
                    Back-end Developer
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box textAlign="center">
            <Box my={1}>
              <Typography variant="h6">{time.toUTCString()}</Typography>
            </Box>
            <Button
              variant="contained"
              onClick={
                isAuthenticated === true
                  ? toggleAuth.bind(this, "")
                  : setLoginOpen.bind(this, true)
              }
            >
              {isAuthenticated === true ? "Logout" : "Login"}
            </Button>
          </Box>
          <Login isOpen={loginOpen} handleClose={setLoginOpen} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
