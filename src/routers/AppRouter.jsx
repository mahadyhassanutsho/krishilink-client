import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import { getCrops } from "../services/api";

const AppLayout = lazy(() => import("../layouts/AppLayout"));
const ProtectedRoute = lazy(() =>
  import("../components/router/ProtectedRoute")
);
const LoaderPage = lazy(() => import("../pages/LoaderPage"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));

const HomePage = lazy(() => import("../pages/HomePage"));
const AddCorpPage = lazy(() => import("../pages/AddCropPage"));
const AllCropsPage = lazy(() => import("../pages/AllCropsPage"));
const CropDetailsPage = lazy(() => import("../pages/CropDetailsPage"));
const MyCropsPage = lazy(() => import("../pages/MyCropsPages"));
const MyInterestsPage = lazy(() => import("../pages/MyInterestsPage"));

const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const UpdateProfilePage = lazy(() => import("../pages/UpdateProfilePage"));
// const ResetPasswordPage = lazy(() => import("../pages/ResetPasswordPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    hydrateFallbackElement: <LoaderPage />,
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
      {
        path: "my-interests",
        element: (
          <ProtectedRoute>
            <MyInterestsPage />
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
      // { path: "reset-password", element: <ResetPasswordPage /> },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
