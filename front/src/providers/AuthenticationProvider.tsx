import AlertDialog from "@/components/AlertDialog";
import AuthenticationContext from "@/contexts/AuthenticationContext";
import useSession from "@/hooks/useSession";
import LoginCredentials from "@/models/loginCredentials";
import TokenData from "@/pages/authentication/models/tokenData";
import {
  fetchUserData,
  loginService,
} from "@/pages/authentication/services/loginService";
import React, { ReactNode, useEffect, useState } from "react";

const AuthenticationProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [token, setToken] = useState<TokenData | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  // ======================================================================

  const session = useSession();

  // ======================================================================

  // Load token from local storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(JSON.parse(token));
    }
  }, []);

  // Save token in local storage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
    } else {
      localStorage.removeItem("token");
      session.setUser(null);
    }
  }, [token]);

  // Fetch user data when token changes
  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token]);

  // ======================================================================

  const getUserData = async () => {
    let res = await fetchUserData();
    session.setUser(res);
  };

  // ======================================================================
  const handleSetToken = (token: TokenData | null) => {
    setToken(token);
  };
  const handleLogin = async (data: LoginCredentials) => {
    const token = await loginService(data);
    setToken(token);
  };
  const handleLogout = () => {
    setShowLogoutModal(true);
  };
  const handleRefreshToken = async () => {};

  // ======================================================================
  return (
    <AuthenticationContext.Provider
      value={{
        token: token,
        setToken: handleSetToken,
        login: handleLogin,
        logout: handleLogout,
        refreshToken: handleRefreshToken,
      }}
    >
      {children}
      <AlertDialog
        title="Cerrar Sesión"
        message="¿Estás seguro que deseas cerrar sesión?"
        onAccept={() => {
          setToken(null);
          setShowLogoutModal(false);
        }}
        onClose={() => setShowLogoutModal(false)}
        open={showLogoutModal}
      />
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
