import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthenticationProvider from "./providers/AuthenticationProvider";
import SessionProvider from "./providers/SessionProvider";
import AppRouter from "./routers/AppRouter";

function App() {
  return (
    <>
      <SessionProvider>
        <AuthenticationProvider>
          <RouterProvider router={AppRouter} />
        </AuthenticationProvider>
      </SessionProvider>
      <ToastContainer
        bodyStyle={{
          fontFamily: "Geomanist",
        }}
      />
    </>
  );
}

export default App;
