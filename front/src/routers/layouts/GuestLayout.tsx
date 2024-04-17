import React from "react";
import { Outlet } from "react-router-dom";
import AppBar from "../components/AppBar";
import Footer from "../components/Footer";

const GuestLayout: React.FC = () => {
  return (
    <div>
      <AppBar />
      <main className="min-h-screen w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default GuestLayout;
