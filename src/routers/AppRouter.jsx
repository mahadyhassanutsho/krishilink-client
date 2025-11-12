import { createBrowserRouter, RouterProvider } from "react-router";

import AppLayout from "../layouts/AppLayout";
import ProtectedRoute from "../components/router/ProtectedRoute";

import HomePage from "../pages/HomePage";
import AddCorpPage from "../pages/AddCropPage";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProfilePage from "../pages/ProfilePage";
import UpdateProfilePage from "../pages/UpdateProfilePage";
import ResetPasswordPage from "../pages/ResetPasswordPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "", index: true, element: <HomePage /> },

      {
        path: "add-crop",
        element: (
          <ProtectedRoute>
            <AddCorpPage />
          </ProtectedRoute>
        ),
      },

      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "update-profile",
        element: (
          <ProtectedRoute>
            <UpdateProfilePage />
          </ProtectedRoute>
        ),
      },
      { path: "reset-password", element: <ResetPasswordPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
