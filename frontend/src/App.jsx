import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/", // Root path
      element: <Home />,
    },
    {
      path: "/home", // Home path
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/SignUp",
      element: <SignUp />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;