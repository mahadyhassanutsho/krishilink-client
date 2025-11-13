import { Suspense, useState, useEffect, useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import alert from "../lib/utils/alert";
import { useAuth } from "../providers/AuthProvider";
import { getCropsByEmail, updateCrop, deleteCrop } from "../services/api";

import ScrollToTop from "../components/shared/ScrollToTop";
import PageTitle from "../components/shared/PageTitle";
import Loader from "../components/shared/Loader";
import EditableCropCard from "../components/crops/EditableCropCard";

const MyCropsPage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [allCrops, setAllCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCropsByEmail(user.email).then((crops) => {
      setAllCrops(crops);
      setLoading(false);
    });
  }, [user.email]);

  const filteredCrops = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return allCrops.filter((crop) => crop.name.toLowerCase().includes(term));
  }, [searchTerm, allCrops]);

  const handleUpdate = async (id, crop) => {
    try {
      await updateCrop(id, crop);
      setLoading(true);
      await getCropsByEmail(user.email).then((crops) => {
        setAllCrops(crops);
        setLoading(false);
      });
      alert.success("Updated", "Successfully updated crop.");
    } catch (error) {
      alert.error("Oops!", error.message || "Couldn't update");
    }
  };

  const handleDelete = async (id) => {
    await alert.confirm(
      "Are you sure?",
      "If you delete this data, it's gone forever. It cannot be undone.",
      async () => {
        try {
          await deleteCrop(id);
          setLoading(true);
          await getCropsByEmail(user.email).then((crops) => {
            setAllCrops(crops);
            setLoading(false);
          });
          alert.success("Deleted", "Successfully deleted crop.");
        } catch (error) {
          alert.error("Oops!", error.message || "Couldn't update");
        }
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="space-y-16"
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

      {loading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : filteredCrops.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCrops.map((crop) => (
            <EditableCropCard
              key={crop._id}
              crop={crop}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
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
    </motion.div>
  );
};

export default MyCropsPage;
