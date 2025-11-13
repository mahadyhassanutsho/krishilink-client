import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import { useAuth } from "../providers/AuthProvider";
import { getCropById } from "../services/api";

import ScrollToTop from "../components/shared/ScrollToTop";
import PageTitle from "../components/shared/PageTitle";
import AddInterest from "../components/interests/AddInterest";
import ShowInterests from "../components/interests/ShowInterests";

const CropDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCrop = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCropById(id);
      setCrop(data);
    } catch (err) {
      console.error("Failed to fetch crop:", err);
      setCrop(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCrop();
  }, [id, fetchCrop]);

  if (loading)
    return (
      <p className="text-center text-gray-500 text-xl mt-10">Loading crop...</p>
    );

  if (!crop)
    return (
      <p className="text-center text-gray-500 text-xl mt-10">
        Crop details not found
      </p>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="space-y-12"
    >
      <ScrollToTop />
      <PageTitle title="Crop Details" />

      <div className="max-w-4xl mx-auto bg-base-100 p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-8">
        <img
          src={crop.image}
          alt={crop.name}
          className="w-full md:w-1/2 h-auto object-cover rounded-xl"
        />
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold text-primary">{crop.name}</h2>
          <p className="text-gray-600">{crop.description}</p>
          <div className="flex flex-col gap-4 text-base-content/75">
            <p>
              <strong>Type:</strong> {crop.type}
            </p>
            <p>
              <strong>Price:</strong> {crop.pricePerUnit} /{" "}
              {crop.unit.toUpperCase()}
            </p>
            <p>
              <strong>Quantity:</strong> {crop.quantity}{" "}
              {crop.unit.toUpperCase()}
            </p>
            <p>
              <strong>Location:</strong> {crop.location}
            </p>
            <p>
              <strong>Owner:</strong> {crop.ownerName} ({crop.ownerEmail})
            </p>
          </div>
          <p className="text-gray-400 text-sm">
            Created at: {new Date(crop.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {user.email === crop.ownerEmail ? (
        <ShowInterests crop={crop} refreshCrop={fetchCrop} />
      ) : (
        <AddInterest user={user} crop={crop} />
      )}
    </motion.div>
  );
};

export default CropDetailsPage;
