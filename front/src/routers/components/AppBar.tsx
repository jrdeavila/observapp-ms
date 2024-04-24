import { Button, Navbar, NavbarBrand } from "@nextui-org/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AppBar: React.FC = () => {
  const navigation = useNavigate();
  // ====================================================================
  const handleGoToLogin = () => {
    navigation("/login");
  };
  const handleGoToRoot = () => {
    navigation("/");
  };
  // ====================================================================
  return (
    <NavbarStyled className="bg-light border-b-2 border-dark">
      <NavbarBrand onClick={handleGoToRoot}>
        <h1 className="text-2xl text-dark font-bold">ObservApp</h1>
      </NavbarBrand>

      <Button
        onClick={handleGoToLogin}
        className="bg-primary rounded-lg text-light font-bold"
      >
        Iniciar Sesión
      </Button>
    </NavbarStyled>
  );
};

const NavbarStyled = styled(Navbar)`
  height: 80px;
`;
export default AppBar;
