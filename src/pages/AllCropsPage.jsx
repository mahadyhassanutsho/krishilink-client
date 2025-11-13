import { useState, useMemo } from "react";
import { useLoaderData } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import ScrollToTop from "../components/shared/ScrollToTop";
import PageTitle from "../components/shared/PageTitle";
import CropCard from "../components/crops/CropCard";

const AllCropsPage = () => {
  const crops = useLoaderData();

  const [searchTerm, setSearchTerm] = useState("");
  const [allCrops, _] = useState(crops);

  const filteredCrops = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return allCrops.filter((crop) => crop.name.toLowerCase().includes(term));
  }, [searchTerm, allCrops]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <ScrollToTop />

      <PageTitle title="All Crops" />

      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 md:gap-0">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary">
          All Crops
        </h1>

        <div className="w-full max-w-md flex justify-center">
          <input
            type="text"
            placeholder="Search crops by names"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full rounded-lg border-gray-300 focus:border-primary focus:ring focus:ring-primary/20 placeholder-gray-400 shadow-sm transition-all duration-200"
          />
        </div>
      </div>

      {filteredCrops.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCrops.map((crop) => (
            <CropCard key={crop._id} crop={crop} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <h2 className="text-3xl font-semibold text-gray-700 mb-2">
            No crops found
          </h2>
          {searchTerm ? (
            <p className="text-gray-500 max-w-md text-center">
              No crops found for “{searchTerm}”.
              <br />
              Try adjusting your filters or refining your keywords.
            </p>
          ) : (
            <p className="text-gray-500 max-w-md text-center">
              No crops available at the moment.
              <br />
              Check back later for new updates.
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default AllCropsPage;
