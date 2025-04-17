import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import JobPage from "./pages/JobPage";
import Layout from "./components/Layout";
import BrowsePage from "./pages/BrowsePage";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "@/components/ui/toaster";
import JobDescriptionPage from "./pages/JobDescriptionPage";
import CompaniesPage from "./pages/admin/companiesPage";
import CreateCompanyPage from "./pages/admin/CreateCompanyPage";
import CompanySetupPage from "./pages/admin/CompanySetupPage";

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
        { path: "description/:id", element: <JobDescriptionPage /> },
        //admin routes
        {path: "/admin/companies", element: <CompaniesPage />},
        {path: "/admin/companies/create", element: <CreateCompanyPage />},
        {path: "/admin/companies/:id", element: <CompanySetupPage />},

      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
