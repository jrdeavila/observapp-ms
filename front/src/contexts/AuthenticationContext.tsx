import LoginCredentials from "@/models/loginCredentials";
import TokenData from "@/pages/authentication/models/tokenData";
import { createContext } from "react";

interface AuthenticationContextProps {
  token: TokenData | null;
  setToken: (token: TokenData | null) => void;
  login: (data: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthenticationContext = createContext<AuthenticationContextProps>({
  token: null,
  setToken: () => {},
  login: async () => {},
  logout: () => {},
  refreshToken: async () => {},
});

export default AuthenticationContext;
