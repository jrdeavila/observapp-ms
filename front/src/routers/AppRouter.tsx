import WelcomeRootPage from "@/pages/welcome/pages/WelcomeRootPage";
import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import LoginPage from "@/pages/authentication/pages/LoginPage";
import Dashboard from "@/pages/dashboard/pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <WelcomeRootPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
