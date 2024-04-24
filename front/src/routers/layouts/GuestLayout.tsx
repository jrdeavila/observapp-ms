import React from "react";
import { Outlet } from "react-router-dom";
import AppBar from "../components/AppBar";
import Footer from "../components/Footer";
import styled from "styled-components";

const GuestLayout: React.FC = () => {
  return (
    <div>
      <AppBar />
      <MainLayout className="w-full">
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
