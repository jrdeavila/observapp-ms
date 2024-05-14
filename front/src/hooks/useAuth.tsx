import AuthenticationContext from "@/contexts/AuthenticationContext";
import LoginCredentials from "@/models/loginCredentials";
import TokenData from "@/pages/authentication/models/tokenData";
import { useContext } from "react";

interface UseAuthHookProps {
  token: TokenData | null;
  setToken: (token: TokenData | null) => void;
  login: (data: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

export default function useAuth(): UseAuthHookProps {
  const { token, setToken, login, logout, refreshToken } = useContext(
    AuthenticationContext
  );

  return {
    token,
    setToken,
    login,
    logout,
    refreshToken,
  };
}
