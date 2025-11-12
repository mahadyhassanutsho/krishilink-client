import { createBrowserRouter, RouterProvider } from "react-router";

import { getCrops, getCropById } from "../services/api";

import AppLayout from "../layouts/AppLayout";
import ProtectedRoute from "../components/router/ProtectedRoute";
import Loader from "../components/shared/Loader";
import ErrorPage from "../pages/ErrorPage";

import HomePage from "../pages/HomePage";
import AddCorpPage from "../pages/AddCropPage";
import AllCropsPage from "../pages/AllCropsPage";
import CropDetailsPage from "../pages/CropDetailsPage";
import MyCropsPage from "../pages/MyCropsPages";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import UpdateProfilePage from "../pages/UpdateProfilePage";
import ResetPasswordPage from "../pages/ResetPasswordPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    hydrateFallbackElement: <Loader />,
    errorElement: <ErrorPage />,
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
      {
        path: "crops",
        loader: () => getCrops(),
        element: <AllCropsPage />,
      },
      {
        path: "crops/:id",
        loader: ({ params }) => getCropById(params.id),
        element: (
          <ProtectedRoute>
            <CropDetailsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-crops",
        element: (
          <ProtectedRoute>
            <MyCropsPage />
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
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
