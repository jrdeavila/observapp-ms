import WelcomeRootPage from "@/pages/welcome/pages/WelcomeRootPage";
import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <WelcomeRootPage />,
      }
    ]

  },
]);

export default router;
