import { Link } from "react-router";
import { FaMapMarkerAlt } from "react-icons/fa";

const CropCard = ({ crop }) => {
  return (
    <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <div className="aspect-video h-auto w-full overflow-hidden bg-base-300">
        <img
          src={crop.image}
          alt={crop.name}
          className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-xl font-bold text-primary">{crop.name}</h2>

        <span className="text-sm font-medium text-base-content/75 bg-base-300 px-2 py-1 rounded-lg w-fit">
          {crop.type}
        </span>

        <p className="text-lg font-semibold">
          Price: {crop.pricePerUnit} BDT / {crop.unit.toUpperCase()}
        </p>

        <div className="flex items-center gap-1 text-sm text-gray-500">
          <FaMapMarkerAlt className="text-error text-base" />
          <span>{crop.location}</span>
        </div>

        <p className="text-sm italic text-gray-600 mt-1 line-clamp-2">
          {crop.description}
        </p>

        <Link
          to={`/crops/${crop._id}`}
          className="btn btn-primary duration-500"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CropCard;
