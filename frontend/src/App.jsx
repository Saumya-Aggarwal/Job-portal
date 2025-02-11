import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import JobPage from "./pages/JobPage";
import Layout from "./components/Layout";
import BrowsePage from "./pages/BrowsePage";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "jobs", element: <JobPage /> },
        { path: "browse", element: <BrowsePage /> },
        { path: "profile", element: <ProfilePage /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      {/* Toast Provider */}
      <Toaster />
    </>
  );
}

export default App;
