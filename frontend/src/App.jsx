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
import AdminJobPage from "./pages/admin/AdminJobPage";
import CreateJobPage from "./pages/admin/CreateJobPage";
import ApplicantsPage from "./pages/admin/ApplicantsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "browse", element: <BrowsePage /> },

      // Protected routes for applicants
      {
        element: <ProtectedRoute allowedRoles={["applicant"]} />,
        children: [
          { path: "jobs", element: <JobPage /> },
          { path: "profile", element: <ProfilePage /> },
        ],
      },

      // Protected routes for admin & recruiters
      {
        element: <ProtectedRoute allowedRoles={["recruiter"]} />,
        children: [
          { path: "admin/companies", element: <CompaniesPage /> },
          { path: "admin/companies/create", element: <CreateCompanyPage /> },
          { path: "admin/job/create", element: <CreateJobPage /> },
          { path: "admin/companies/:id", element: <CompanySetupPage /> },
          { path: "admin/jobs", element: <AdminJobPage /> },
          { path: "admin/job/edit/:id", element: <CreateJobPage /> },
          { path: "admin/job/:id/applicants", element: <ApplicantsPage /> },
        ],
      },

      { path: "description/:id", element: <JobDescriptionPage /> },

      // 404 catch-all route (must be last in the children array)
      { path: "*", element: <NotFound /> },
    ],
  },

  // Guest-only routes
  {
    path: "login",
    element: (
      <ProtectedRoute guestOnly={true} redirectTo="/">
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: "signup",
    element: (
      <ProtectedRoute guestOnly={true} redirectTo="/">
        <SignUp />
      </ProtectedRoute>
    ),
  },

  // Global catch-all route (for paths outside the layout)
  { path: "*", element: <NotFound /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
