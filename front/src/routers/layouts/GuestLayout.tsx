import React from "react";
import { Outlet } from "react-router-dom";

import styled from "styled-components";

const AppBar = React.lazy(() => import("../components/AppBar"));
const Footer = React.lazy(() => import("../components/Footer"));

const GuestLayout: React.FC = () => {
  return (
    <div>
      <AppBar />
      <MainLayout className="w-full overflow-y-scroll overflow-x-hidden">
        <Outlet />
      </MainLayout>
      <Footer />
    </div>
  );
};

const MainLayout = styled.main`
  height: calc(100vh - 120px);
`;

export default GuestLayout;
