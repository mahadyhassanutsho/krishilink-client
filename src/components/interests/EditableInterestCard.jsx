import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { getCropById } from "../../services/api";

import InterestCard from "./InterestCard";
import Loader from "../shared/Loader";

const EditableInterestCard = ({ interest, onUpdate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [crop, setCrop] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      quantity: interest.quantity,
      message: interest.message || "",
      status: interest.status,
    },
  });

  useEffect(() => {
    let mounted = true;
    getCropById(interest.cropId).then((data) => {
      if (mounted) setCrop(data);
    });
    return () => (mounted = false);
  }, [interest.cropId]);

  const onSubmit = async (data) => {
    await onUpdate(interest._id, data);
    setIsModalOpen(false);
  };

  const openModal = () => {
    reset({
      quantity: interest.quantity,
      message: interest.message,
      status: interest.status,
    });
    setIsModalOpen(true);
  };

  if (!crop) return <Loader />;

  return (
    <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 p-5 flex flex-col gap-4">
      <InterestCard crop={crop} interest={interest} showCrop={true} />

      <div className="flex gap-2 mt-4">
        <button
          onClick={openModal}
          className="flex-1 btn btn-primary rounded-lg transition-all hover:scale-105"
        >
          Update
        </button>
        <button
          onClick={() => onDelete(interest._id)}
          className="flex-1 btn btn-error rounded-lg transition-all hover:scale-105"
        >
          Delete
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-base-100 rounded-xl p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Update Interest</h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <input
                type="number"
                {...register("quantity", {
                  required: "Quantity is required",
                  valueAsNumber: true,
                })}
                placeholder="Quantity"
                className="input input-bordered w-full"
              />
              <textarea
                {...register("message")}
                placeholder="Message (optional)"
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

export default EditableInterestCard;
