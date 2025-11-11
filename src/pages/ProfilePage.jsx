import { Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import { useAuth } from "../providers/AuthProvider";

import ScrollToTop from "../components/shared/ScrollToTop";
import PageTitle from "../components/shared/PageTitle";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <>
      <ScrollToTop />
      <PageTitle title="Profile" />

      <motion.div
        className="relative border border-base-300 rounded-2xl shadow-lg w-fit p-16 mx-auto flex flex-col items-center"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -25 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <figure className="absolute -top-16 w-32 h-32 rounded-full overflow-hidden bg-base-300 shadow-md">
          <motion.img
            src={user.photoURL}
            alt="User Avatar"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.25 }}
            transition={{ type: "spring", stiffness: 250 }}
          />
        </figure>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-primary">
            {user.displayName}
          </h2>
          <p className="text-base-content/70 mt-1">{user.email}</p>
        </div>

        <motion.button
          className="btn btn-primary btn-wide mt-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/update-profile">Update Profile</Link>
        </motion.button>
      </motion.div>
    </>
  );
};

export default ProfilePage;
