import { Outlet, useNavigation } from "react-router";

import Header from "../components/layouts/header/Header";
import Footer from "../components/layouts/Footer";
import LoaderPage from "../pages/LoaderPage";

const AppLayout = () => {
  const { state } = useNavigation();

  if (state === "loading") return <LoaderPage />;

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-base-200 text-base-content">
      <Header />
      <div className="container mx-auto my-12 flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
