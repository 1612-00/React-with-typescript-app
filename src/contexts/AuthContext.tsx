import { createContext, ReactNode, useReducer } from "react";
import { authReducer, AuthState } from "../reducers/AuthReducer";
import { AuthActionType } from "../reducers/types";

const { TOGGLE_AUTH } = AuthActionType;

interface AuthContextProviderProps {
  children: ReactNode;
}

interface AuthContextDefault {
  authInfo: AuthState,
  toggleAuth: (username: string) => void
}

const AuthDefault = {
  isAuthenticated: false,
  username: "",
};

export const AuthContext = createContext<AuthContextDefault>({
  authInfo: AuthDefault,
  toggleAuth: () => {},
});

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authInfo, dispatch] = useReducer(authReducer, AuthDefault);

  const toggleAuth = (username: string) =>
    dispatch({ type: TOGGLE_AUTH, payload: username });

  const AuthContextData = { authInfo, toggleAuth };

  return (
    <AuthContext.Provider value={AuthContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
