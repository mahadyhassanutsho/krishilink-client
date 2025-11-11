// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import ScrollToTop from "../components/shared/ScrollToTop";
import PageTitle from "../components/shared/PageTitle";

const AuthLoadingPage = () => {
  return (
    <>
      <ScrollToTop />
      <PageTitle title="Loading..." />

      <div
        className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-base-content"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -25 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          className="w-16 h-16 border-4 border-t-primary border-r-primary border-b-secondary border-l-secondary rounded-full mb-6"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />

        <motion.h2
          className="text-3xl md:text-4xl font-semibold mb-2 text-accent animate-pulse"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Authenticating...
        </motion.h2>

        <motion.p
          className="text-center text-base-content/70 max-w-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          Please wait while we check your credentials.
          <br />
          Your adventure is loading!
        </motion.p>
      </div>
    </>
  );
};

export default AuthLoadingPage;
