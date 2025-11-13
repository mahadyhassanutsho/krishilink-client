import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import alert from "../lib/utils/alert";
import { useAuth } from "../providers/AuthProvider";
import {
  getInterestsByEmail,
  updateInterest,
  deleteInterest,
} from "../services/api";

import ScrollToTop from "../components/shared/ScrollToTop";
import PageTitle from "../components/shared/PageTitle";
import Loader from "../components/shared/Loader";
import EditableInterestCard from "../components/interests/EditableInterestCard";

const MyInterestsPage = () => {
  const { user } = useAuth();
  const [allInterests, setAllInterests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getInterestsByEmail(user.email).then((interests) => {
      setAllInterests(interests);
      setLoading(false);
    });
  }, [user.email]);

  const handleUpdate = async (id, interest) => {
    try {
      await updateInterest(id, interest);
      setLoading(true);
      await getInterestsByEmail(user.email).then((interests) => {
        setAllInterests(interests);
        setLoading(false);
      });
      alert.success("Updated", "Successfully updated interest.");
    } catch (error) {
      alert.error("Oops!", error.message || "Couldn't update");
    }
  };

  const handleDelete = async (id) => {
    await alert.confirm(
      "Are you sure?",
      "If you delete this interest, it's gone forever. It cannot be undone.",
      async () => {
        try {
          await deleteInterest(id);
          setLoading(true);
          await getInterestsByEmail(user.email).then((interests) => {
            setAllInterests(interests);
            setLoading(false);
          });
          alert.success("Deleted", "Successfully deleted interest.");
        } catch (error) {
          alert.error("Oops!", error.message || "Couldn't delete");
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

      <PageTitle title="My Interests" />

      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 md:gap-0">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary">
          My Interests
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center mt-20">
          <Loader />
        </div>
      ) : allInterests.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allInterests.map((interest) => (
            <EditableInterestCard
              key={interest._id}
              interest={interest}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <span className="text-6xl mb-4">😢</span>
          <h2 className="text-3xl font-semibold text-gray-700 mb-2">
            No interests found
          </h2>
          <p className="text-gray-500 max-w-md">
            We couldn’t find any interests matching your search.
            <br />
            Try adjusting your filters or search term.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default MyInterestsPage;
