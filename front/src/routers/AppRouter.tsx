import { lazy } from "react";

import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";

const Dashboard = lazy(() => import("@/pages/dashboard/pages/Dashboard"));
const ShowSection = lazy(() => import("@/pages/dashboard/pages/ShowSection"));
const LoginPage = lazy(() => import("@/pages/authentication/pages/LoginPage"));
const WelcomeRootPage = lazy(
  () => import("@/pages/welcome/pages/WelcomeRootPage")
);

interface PrivateRouterProps {
  isAuthenticated: boolean;
}

const privateRouter: (
  props: PrivateRouterProps & RouteObject
) => RouteObject = ({ isAuthenticated, ...props }) => {
  return {
    ...props,
    element: isAuthenticated ? <Navigate to="/login" /> : props.element,
  };
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        index: true,
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
