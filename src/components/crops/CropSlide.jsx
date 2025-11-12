import { FaMapMarkerAlt } from "react-icons/fa";

const CropSlide = ({ crop }) => {
  return (
    <div className="relative aspect-square md:aspect-video w-full h-auto rounded-md overflow-hidden group">
      <img
        src={crop.image}
        alt={crop.name}
        className="absolute inset-0 w-full h-full object-cover opacity-75 transition-transform duration-500 group-hover:scale-105"
      />

      <div className="relative z-10 flex flex-col justify-end h-full p-8 bg-linear-to-t from-black/75 to-black/10 text-white">
        <h1 className="text-2xl md:text-3xl font-bold">{crop.name}</h1>
        <p className="text-sm md:text-base italic mt-1">{crop.description}</p>

        <div className="flex items-center gap-2 mt-2 text-sm md:text-base font-medium">
          <FaMapMarkerAlt />
          <span>{crop.location}</span>
        </div>
      </div>
    </div>
  );
};

export default CropSlide;
