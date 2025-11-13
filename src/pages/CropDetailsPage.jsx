import { useLoaderData } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import ScrollToTop from "../components/shared/ScrollToTop";
import PageTitle from "../components/shared/PageTitle";

const CropDetailsPage = () => {
  const crop = useLoaderData();

  const cropDetails = (
    <div className="max-w-4xl mx-auto bg-base-100 p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-8">
      <img
        src={crop.image}
        alt={crop.name}
        className="w-full md:w-1/3 h-48 md:h-auto object-contain rounded-xl"
      />
      <div className="flex-1 space-y-4">
        <h2 className="text-3xl font-bold text-primary">{crop.name}</h2>
        <p className="text-gray-600">{crop.description}</p>
        <div className="flex flex-wrap gap-4 text-gray-700">
          <span>
            <strong>Type:</strong> {crop.type}
          </span>
          <span>
            <strong>Price:</strong> {crop.pricePerUnit} per {crop.unit}
          </span>
          <span>
            <strong>Quantity:</strong> {crop.quantity} {crop.unit}
          </span>
          <span>
            <strong>Location:</strong> {crop.location}
          </span>
          <span>
            <strong>Owner:</strong> {crop.ownerName} ({crop.ownerEmail})
          </span>
        </div>
        <p className="text-gray-400 text-sm">
          Created at: {new Date(crop.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );

  const fallback = (
    <p className="text-center text-gray-500 text-xl mt-10">
      Crop details not found 😢
    </p>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="space-y-16 py-10"
    >
      <ScrollToTop />
      <PageTitle title="Crop Details" />

      {crop ? cropDetails : fallback}
    </motion.div>
  );
};

export default CropDetailsPage;
