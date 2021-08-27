import { ChangeEvent, Dispatch, SetStateAction, useContext } from "react";
import { useState } from "react";
import { AuthContext } from "./../contexts/AuthContext";
import {
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Button,
} from "@material-ui/core";

interface LoginProps {
  isOpen: boolean;
  handleClose: Dispatch<SetStateAction<boolean>>;
}

const Login = ({ isOpen, handleClose }: LoginProps) => {
  // Context
  const { toggleAuth } = useContext(AuthContext);

  const [username, setUsername] = useState("");

  const onUsernameChange = (event: ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);

  const onClickButton = () => {
    toggleAuth(username);
    setUsername("");
    handleClose(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose.bind(this, false)}>
      <DialogContent>
        <TextField
          label="Username"
          onChange={onUsernameChange}
          value={username}
          required
        />
      </DialogContent>

      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={onClickButton}
          disabled={username === ""}
        >
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Login;
