import { useState, useEffect } from "react";

import { getCropById } from "../../services/api";

import InterestCard from "./InterestCard";
import Loader from "../shared/Loader";

const EditableInterestCard = ({ interest }) => {
  const [crop, setCrop] = useState(null);

  useEffect(() => {
    let mounted = true;
    getCropById(interest.cropId).then((data) => {
      if (mounted) setCrop(data);
    });
    return () => (mounted = false);
  }, [interest.cropId]);

  if (!crop) return <Loader />;

  return (
    <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 p-5 flex flex-col gap-4">
      <InterestCard
        crop={crop}
        interest={interest}
        showCrop={true}
        shortenMessage={true}
      />
    </div>
  );
};

export default EditableInterestCard;
