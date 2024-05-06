import { RouterProvider } from "react-router-dom";
import router from "./routers/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        bodyStyle={{
          fontFamily: "Geomanist",
        }}
      />
    </>
  );
}

export default App;
