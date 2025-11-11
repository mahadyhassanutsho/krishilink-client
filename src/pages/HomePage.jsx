// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import Newsletter from "../components/home/Newsletter";
import Stats from "../components/home/Stats";
import PageTitle from "../components/shared/PageTitle";

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <PageTitle title="Home" />

      <Stats />
      <Newsletter />
    </motion.div>
  );
};

export default HomePage;
