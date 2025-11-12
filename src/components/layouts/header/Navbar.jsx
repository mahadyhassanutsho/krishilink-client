import { NavLink } from "react-router";
import { HiMiniBars3, HiMiniXMark } from "react-icons/hi2";

import alert from "../../../lib/utils/alert";
import { logoutUser } from "../../../services/firebase";
import { useAuth } from "../../../providers/AuthProvider";
import useToggle from "../../../hooks/useToggle";

import Loader from "../../shared/Loader";

const publicRoutes = [
  { name: "Home", path: "/" },
  { name: "All Crops", path: "/crops" },
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
];

const privateRoutes = [
  { name: "Home", path: "/" },
  { name: "All Crops", path: "/crops" },
  { name: "Profile", path: "/profile" },
  { name: "Add Crops", path: "/add-crop" },
  { name: "My Posts", path: "/my-posts" },
  { name: "My Interests", path: "/interests" },
];

const Navbar = () => {
  const { authIsReady, user, clearUser } = useAuth();
  const { value: menuOpen, toggle: toggleMenuOpen } = useToggle();
  const routes = user ? privateRoutes : publicRoutes;

  const handleAuthResult = (success, message) => {
    if (success) {
      clearUser();
      alert.info("Logged Out!", `You are successfully logged out.`);
      // navigate(redirectTo || "/profile");
    } else {
      alert.error("Oops!", message);
    }
  };

  const handleLogout = async () => {
    const { success, message } = await logoutUser();
    handleAuthResult(success, message);
  };

  if (!authIsReady) return <Loader />;

  return (
    <nav>
      <button
        onClick={() => toggleMenuOpen()}
        className="md:hidden btn btn-sm btn-ghost"
      >
        {menuOpen ? <HiMiniXMark size={22} /> : <HiMiniBars3 size={22} />}
      </button>

      <ul
        className={`absolute md:static top-full left-0 w-full md:w-auto min-h-screen md:min-h-auto bg-base-100 md:bg-transparent flex flex-col md:flex-row items-center gap-4 p-8 md:p-0 transition-all duration-300 ease-in-out overflow-hidden z-50 ${
          menuOpen ? "block" : "hidden md:flex"
        }`}
      >
        {routes.map((route) => (
          <li key={route.name} onClick={() => toggleMenuOpen(false)}>
            <NavLink
              to={route.path}
              className={({ isActive }) =>
                `block py-1 transition-colors duration-300 ${
                  isActive ? "text-primary font-semibold" : "hover:text-accent"
                }`
              }
            >
              {route.name}
            </NavLink>
          </li>
        ))}

        {user && (
          <li>
            <button
              onClick={handleLogout}
              className="btn btn-warning btn-sm mt-2 md:mt-0"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
