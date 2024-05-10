import React, { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";

import styled from "styled-components";
import { Spinner } from "@nextui-org/react";

const AppBar = lazy(() => import("../components/AppBar"));
const Footer = lazy(() => import("../components/Footer"));

const LoadingPage: React.FC<{}> = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Spinner className="text-center" color="primary" label="Cargando..." />
    </div>
  );
};

const GuestLayout: React.FC = () => {
  return (
    <div>
      <Suspense fallback={<LoadingPage />}>
        <AppBar />
        <MainLayout className="w-full">
          <Outlet />
        </MainLayout>
        <Footer />
      </Suspense>
    </div>
  );
};

const MainLayout = styled.main`
  height: calc(100vh - 120px);
`;

export default GuestLayout;
