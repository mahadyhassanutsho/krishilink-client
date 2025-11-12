import { Outlet } from "react-router";

import Header from "../components/layouts/header/Header";
import Footer from "../components/layouts/Footer";

const AppLayout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-base-200 text-base-content">
      <Header />
      <div className="container mx-auto my-12">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
