import LoginPage from "@/pages/authentication/pages/LoginPage";
import Dashboard from "@/pages/dashboard/pages/Dashboard";
import ShowSection from "@/pages/dashboard/pages/ShowSection";
import WelcomeRootPage from "@/pages/welcome/pages/WelcomeRootPage";
import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";

interface PrivateRouterProps {
  isAuthenticated: boolean;
}

const privateRouter: (
  props: PrivateRouterProps & RouteObject
) => RouteObject = ({ isAuthenticated, ...props }) => {
  return {
    element: isAuthenticated ? <Navigate to="/login" /> : props.element,
    ...props,
  };
};

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
      privateRouter({
        isAuthenticated: false,
        path: "/dashboard",
        children: [
          {
            path: "/dashboard/",
            element: <Dashboard />,
          },
          {
            path: "/dashboard/section/:slug",
            element: <ShowSection />,
          },
        ],
      }),
    ],
  },
]);

export default router;
