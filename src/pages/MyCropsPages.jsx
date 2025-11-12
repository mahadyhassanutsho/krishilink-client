import { Suspense, useState, useEffect, useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import { useAuth } from "../providers/AuthProvider";
import { getCropsByEmail } from "../services/api";

import ScrollToTop from "../components/shared/ScrollToTop";
import PageTitle from "../components/shared/PageTitle";
import CropList from "../components/crops/CropList";
import Loader from "../components/shared/Loader";

const MyCropsPage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [allCrops, setAllCrops] = useState([]);

  useEffect(() => {
    getCropsByEmail(user.email).then((crops) => {
      setAllCrops(crops);
    });
  }, [user.email]);

  const filteredCrops = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return allCrops.filter((crop) => crop.name.toLowerCase().includes(term));
  }, [searchTerm, allCrops]);

  const cropsPromise = useMemo(
    () => Promise.resolve(filteredCrops),
    [filteredCrops]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="min-h-screen"
    >
      <ScrollToTop />

      <PageTitle title="My Crops" />

      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 md:gap-0">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary">
          My Crops
        </h1>

        <div className="w-full md:w-2/5 flex justify-center">
          <input
            type="text"
            placeholder="Search crops by names"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full max-w-md rounded-lg border-gray-300 focus:border-primary focus:ring focus:ring-primary/20 placeholder-gray-400 shadow-sm transition-all duration-200"
          />
        </div>
      </div>

      <Suspense fallback={<Loader />}>
        {filteredCrops.length > 0 ? (
          <CropList cropsPromise={cropsPromise} />
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <span className="text-6xl mb-4">😢</span>
            <h2 className="text-3xl font-semibold text-gray-700 mb-2">
              No crops found
            </h2>
            <p className="text-gray-500 max-w-md">
              We couldn’t find any crops matching your search.
              <br />
              Try adjusting your filters or search term.
            </p>
          </div>
        )}
      </Suspense>
    </motion.div>
  );
};

export default MyCropsPage;
