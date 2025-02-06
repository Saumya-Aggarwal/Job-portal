import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import JobPage from "./pages/JobPage";
import Layout from "./components/Layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/", // Root path with Layout
      element: <Layout />,
      children: [
        {
          path: "", // Default page
          element: <Home />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "jobs",
          element: <JobPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
