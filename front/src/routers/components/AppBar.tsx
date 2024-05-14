import useSession from "@/hooks/useSession";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Navbar, NavbarBrand } from "@nextui-org/react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserAccountPopover from "./UserAccountPopover";

const AppBar: React.FC = () => {
  const session = useSession();
  const navigation = useNavigate();
  // ====================================================================
  const handleGoToLogin = () => {
    navigation("/login");
  };
  const handleGoToRoot = () => {
    navigation("/");
  };
  const handleGoToBack = () => {
    navigation(-1);
  };

  let hasBack =
    useLocation().pathname !== "/" &&
    useLocation().pathname !== "/login" &&
    useLocation().pathname !== "/dashboard";

  // ====================================================================
  return (
    <NavbarStyled className="bg-light border-b-2 border-dark">
      {hasBack && (
        <StyledButton onClick={handleGoToBack}>
          <FontAwesomeIcon icon={faBackspace} />
        </StyledButton>
      )}
      <NavbarBrand onClick={handleGoToRoot}>
        <h1 className="text-2xl text-dark font-bold">ObservApp</h1>
      </NavbarBrand>

      {session.active ? (
        <UserAccountPopover />
      ) : (
        <Button
          onClick={handleGoToLogin}
          className="bg-primary rounded-lg text-light font-bold"
        >
          Iniciar Sesión
        </Button>
      )}
    </NavbarStyled>
  );
};

const NavbarStyled = styled(Navbar)`
  height: 80px;
`;

const StyledButton = styled(Button)`
  border: none;
  color: black;
  font-size: 1.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
  // Hover
  &:hover {
    border: none;
    outline: none;
  }
`;

export default AppBar;
