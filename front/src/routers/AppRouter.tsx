import { ReactNode } from "react";

import useSession from "@/hooks/useSession";

import { Navigate, createBrowserRouter } from "react-router-dom";

//  =============================================================================================

const ProtectedRoute: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const session = useSession();
  return session.active ? children : <Navigate to="/login" />;
};

const RedirectToDashboardRoute: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const session = useSession();
  return session.active ? <Navigate to="/dashboard" /> : children;
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      lazy: async () => {
        let GuestLayout = await import("./layouts/GuestLayout");
        return {
          Component: GuestLayout.default,
        };
      },

      children: [
        {
          index: true,
          lazy: async () => {
            let WelcomeRootPage = await import(
              "@/pages/welcome/pages/WelcomeRootPage"
            );

            return {
              element: (
                <RedirectToDashboardRoute>
                  <WelcomeRootPage.default />
                </RedirectToDashboardRoute>
              ),
            };
          },
        },
        {
          path: "/login",
          lazy: async () => {
            let LoginPage = await import(
              "@/pages/authentication/pages/LoginPage"
            );
            return {
              element: (
                <RedirectToDashboardRoute>
                  <LoginPage.default />
                </RedirectToDashboardRoute>
              ),
            };
          },
        },
        {
          path: "/dashboard",
          children: [
            {
              index: true,
              lazy: async () => {
                let Dashboard = await import(
                  "@/pages/dashboard/pages/Dashboard"
                );

                return {
                  element: (
                    <ProtectedRoute>
                      <Dashboard.default />
                    </ProtectedRoute>
                  ),
                };
              },
            },
            {
              path: "/dashboard/section/:slug",
              lazy: async () => {
                let ShowSection = await import(
                  "@/pages/dashboard/pages/ShowSection"
                );

                return {
                  element: (
                    <ProtectedRoute>
                      <ShowSection.default />
                    </ProtectedRoute>
                  ),
                };
              },
            },
          ],
        },
      ],
    },
    {
      path: "*",
      lazy: async () => {
        let NotFound404 = await import("@/components/NotFound404");
        return {
          Component: NotFound404.default,
        };
      },
    },
  ],
  {}
);

export default router;
