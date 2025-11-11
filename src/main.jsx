import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./styles/main.css";

import AuthProvider from "./providers/AuthProvider";
import AppRouter from "./routers/AppRouter";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </StrictMode>
);
