import { FaComment, FaHashtag } from "react-icons/fa";

import { useAuth } from "../../providers/AuthProvider";

const InterestCard = ({
  interest,
  crop,
  showCrop = false,
  shortenMessage = false,
  onUpdateStatus,
}) => {
  const { user } = useAuth();

  return (
    <div
      className={
        showCrop ? "" : "p-4 bg-base-100 rounded-xl shadow-md space-y-4"
      }
    >
      {showCrop && crop && (
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-primary">{crop.name}</h2>
          <p className="flex items-center gap-1">
            <FaHashtag />
            <strong>Price:</strong> {crop.pricePerUnit} BDT /{" "}
            {crop.unit.toUpperCase()}
          </p>
          <p className="flex items-center gap-1">
            <FaHashtag />
            <strong>Quantity:</strong> {crop.quantity}
          </p>
          <p className="flex items-center gap-1">
            <FaHashtag />
            <strong>Type:</strong> {crop.type}
          </p>
          <p className="flex items-center gap-1">
            <FaHashtag />
            <strong>Location:</strong> {crop.location}
          </p>
        </div>
      )}

      <div className="space-y-1">
        <h2 className="font-bold text-2xl text-primary">Interest Details:</h2>
        <p className="text-gray-800">
          <strong>Quantity:</strong> {interest.quantity} {crop.unit}
        </p>
        <p className="flex items-center gap-2 text-base-content/75 italic my-2">
          <span className={shortenMessage ? "line-clamp-1" : ""}>
            {interest.message}
          </span>
        </p>
        <p className="text-wrap">
          <strong>Submitted by:</strong> {interest.userName} (
          {interest.userEmail})
          <br />
          <small className="text-sm">
            <strong>at</strong> {new Date(interest.createdAt).toLocaleString()}
          </small>
        </p>
        <p
          className={`w-fit text-sm font-semibold px-3 py-1 rounded-full ${
            interest.status === "approved"
              ? "bg-success text-success-content"
              : interest.status === "rejected"
              ? "bg-error text-error-content"
              : "bg-warning text-warning-content"
          }`}
        >
          {interest.status}
        </p>
        <p className="flex items-center gap-2 text-lg mt-4">
          <strong>Total Price:</strong>
          <span>{interest.quantity * (crop.pricePerUnit || 0)} BDT</span>
        </p>
      </div>

      {crop.ownerEmail === user.email ? (
        interest.status === "pending" ? (
          <div className="flex gap-4">
            <button
              onClick={() => onUpdateStatus(interest, "approved")}
              className="flex-1 btn btn-success"
            >
              Accept
            </button>
            <button
              onClick={() => onUpdateStatus(interest, "rejected")}
              className="flex-1 btn btn-error"
            >
              Reject
            </button>
          </div>
        ) : null
      ) : null}
    </div>
  );
};

export default InterestCard;
