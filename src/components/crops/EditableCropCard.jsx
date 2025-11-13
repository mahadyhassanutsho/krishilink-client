import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiDollarSign, FiPackage, FiMapPin } from "react-icons/fi";

const EditableCropCard = ({ crop, onDelete, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: crop.name,
      type: crop.type,
      quantity: crop.quantity,
      pricePerUnit: crop.pricePerUnit,
      unit: crop.unit,
      location: crop.location,
      description: crop.description,
    },
  });

  const onSubmit = async (data) => {
    await onUpdate(crop._id, data);
    setIsModalOpen(false);
  };

  const openModal = () => {
    reset({
      name: crop.name,
      type: crop.type,
      quantity: crop.quantity,
      pricePerUnit: crop.pricePerUnit,
      unit: crop.unit,
      location: crop.location,
      description: crop.description,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <div className="aspect-video h-auto w-full overflow-hidden">
        <img
          src={crop.image}
          alt={crop.name}
          className="w-full h-auto object-contain transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="p-5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary">{crop.name}</h2>
          <span className="text-sm font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
            {crop.type}
          </span>
        </div>

        <div className="space-y-2">
          <p className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <FiDollarSign className="text-primary text-xl" />
            {crop.pricePerUnit} BDT / {crop.unit.toUpperCase()}
          </p>

          <p className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <FiPackage className="text-primary text-xl" />
            {crop.quantity} {crop.unit}s
          </p>

          <div className="flex items-center gap-2 text-base font-medium text-gray-700">
            <FiMapPin className="text-primary text-lg" />
            <span className="truncate">{crop.location}</span>
          </div>
        </div>

        <p className="text-sm italic text-gray-600 line-clamp-2">
          {crop.description}
        </p>

        <div className="flex gap-2">
          <button
            onClick={openModal}
            className="flex-1 btn btn-primary rounded-lg transition-all hover:scale-105"
          >
            Update
          </button>
          <button
            onClick={() => onDelete(crop._id)}
            className="flex-1 btn btn-error rounded-lg transition-all hover:scale-105"
          >
            Delete
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-base-100 rounded-xl p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Update Crop</h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <input
                {...register("name", { required: "Crop name is required" })}
                placeholder="Crop Name"
                className="input input-bordered w-full"
              />

              <input
                {...register("type")}
                placeholder="Type"
                className="input input-bordered w-full"
              />

              <input
                {...register("quantity")}
                placeholder="Quantity"
                className="input input-bordered w-full"
              />

              <input
                type="number"
                {...register("pricePerUnit", {
                  required: "Price is required",
                  valueAsNumber: true,
                })}
                placeholder="Price per unit"
                className="input input-bordered w-full"
              />

              <input
                {...register("unit")}
                placeholder="Unit"
                className="input input-bordered w-full"
              />

              <input
                {...register("location")}
                placeholder="Location"
                className="input input-bordered w-full"
              />

              <textarea
                {...register("description")}
                placeholder="Description"
                className="textarea textarea-bordered w-full"
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary ${
                    isSubmitting ? "btn-disabled cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableCropCard;
