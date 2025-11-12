import { useNavigate } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import alert from "../lib/utils/alert";
import { postCrop } from "../services/api";
import { useAuth } from "../providers/AuthProvider";

import ScrollToTop from "../components/shared/ScrollToTop";
import PageTitle from "../components/shared/PageTitle";

const AddCorpPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    register: registerFormField,
    reset: resetForm,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting: formIsSubmitting },
  } = useForm();

  const handleCropSubmission = async (formData) => {
    try {
      await postCrop({
        ...formData,
        ownerName: user.displayName,
        ownerEmail: user.email,
      });

      alert.success("Crop Added!", "Crop has been added successfully.");
      resetForm();
      navigate("/crops");
    } catch (error) {
      console.error(error);

      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors)
          .map((err) => err.message)
          .join(", ");
        alert.error("Validation Error", errorMessages);
      } else {
        alert.error(
          "Network/Error",
          error.response?.data?.message || "Unable to connect to the server."
        );
      }
    }
  };

  return (
    <>
      <ScrollToTop />
      <PageTitle title="Add Crop" />

      <motion.form
        onSubmit={handleSubmit(handleCropSubmission)}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -25 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-full max-w-lg mx-auto"
      >
        <fieldset className="fieldset bg-base-200 border border-base-300 rounded-xl p-6 shadow-md">
          <legend className="text-3xl font-bold text-center mb-4">
            Add Crop
          </legend>

          <div className="flex flex-col gap-3">
            <label className="label font-medium">Crop Name</label>
            <input
              {...registerFormField("name", {
                required: "Crop name is required",
              })}
              type="text"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Tomato"
            />
            {formErrors.name && (
              <p className="label text-error">{formErrors.name.message}</p>
            )}

            {/* Image URL */}
            <label className="label font-medium">Image URL</label>
            <input
              {...registerFormField("image", {
                required: "Image URL is required",
                pattern: {
                  value: /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg)$/i,
                  message: "Please enter a valid image URL",
                },
              })}
              type="text"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://example.com/tomato.png"
            />
            {formErrors.image && (
              <p className="label text-error">{formErrors.image.message}</p>
            )}

            {/* Location */}
            <label className="label font-medium">Location</label>
            <input
              {...registerFormField("location", {
                required: "Location is required",
              })}
              type="text"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Kurigram"
            />
            {formErrors.location && (
              <p className="label text-error">{formErrors.location.message}</p>
            )}

            {/* Description */}
            <label className="label font-medium">Description</label>
            <textarea
              {...registerFormField("description", {
                required: "Description is required",
              })}
              className="textarea textarea-bordered w-full h-24 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Short description about the corporation..."
            ></textarea>
            {formErrors.description && (
              <p className="label text-error">
                {formErrors.description.message}
              </p>
            )}

            {/* Quantity */}
            <label className="label font-medium">Quantity</label>
            <input
              {...registerFormField("quantity", {
                required: "Quantity is required",
                min: { value: 1, message: "Must be at least 1" },
              })}
              type="number"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="500"
            />
            {formErrors.quantity && (
              <p className="label text-error">{formErrors.quantity.message}</p>
            )}

            {/* Unit */}
            <label className="label font-medium">Unit</label>
            <input
              {...registerFormField("unit", {
                required: "Unit is required",
              })}
              type="text"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="kg, liters, bags..."
            />
            {formErrors.unit && (
              <p className="label text-error">{formErrors.unit.message}</p>
            )}

            {/* Price Per Unit */}
            <label className="label font-medium">Price Per Unit (৳)</label>
            <input
              {...registerFormField("pricePerUnit", {
                required: "Price per unit is required",
                min: { value: 1, message: "Must be greater than 0" },
              })}
              type="number"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="120"
            />
            {formErrors.pricePerUnit && (
              <p className="label text-error">
                {formErrors.pricePerUnit.message}
              </p>
            )}

            {/* Type */}
            <label className="label font-medium">Type</label>
            <input
              {...registerFormField("type", {
                required: "Type is required",
              })}
              type="text"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Vegetable"
            />
            {formErrors.type && (
              <p className="label text-error">{formErrors.type.message}</p>
            )}
          </div>

          <motion.button
            type="submit"
            className="btn btn-primary w-full mt-5"
            disabled={formIsSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {formIsSubmitting ? "Submitting..." : "Add Crop"}
          </motion.button>
        </fieldset>
      </motion.form>
    </>
  );
};

export default AddCorpPage;
