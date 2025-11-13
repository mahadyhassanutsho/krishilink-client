import { useEffect, useState, useCallback } from "react";

import { getInterestsByCropId, updateInterest } from "../../services/api";
import alert from "../../lib/utils/alert";

import Loader from "../shared/Loader";
import InterestCard from "./InterestCard";

const ShowInterests = ({ crop }) => {
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInterests = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getInterestsByCropId(crop._id);
      setInterests(data);
    } catch (err) {
      console.error("Failed to fetch interests:", err);
    } finally {
      setLoading(false);
    }
  }, [crop._id]);

  const updateInterestStatus = async (interestId, status) => {
    await alert.confirm(
      "Are you sure?",
      "You are about to update the interest status.",
      async () => {
        await updateInterest(interestId, { status });
        await fetchInterests();
        alert.success("Updated", "Interest status updated successfully");
      }
    );
  };

  useEffect(() => {
    fetchInterests();
  }, [fetchInterests]);

  if (loading) return <Loader />;

  if (interests.length === 0)
    return (
      <p className="text-center text-gray-500 text-xl mt-10">
        No interests found 😢
      </p>
    );

  return (
    <div className="space-y-2 max-w-4xl mx-auto p-4">
      <h2>Interests: </h2>
      {interests.map((interest) => (
        <InterestCard
          key={interest._id}
          interest={interest}
          crop={crop}
          onUpdateStatus={updateInterestStatus}
        />
      ))}
    </div>
  );
};

export default ShowInterests;
