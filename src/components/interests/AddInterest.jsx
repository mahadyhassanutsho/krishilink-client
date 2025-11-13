import { useNavigate } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import alert from "../../lib/utils/alert";
import { postInterest } from "../../services/api";

const AddInterest = ({ user, crop }) => {
  const navigate = useNavigate();

  const {
    register: registerFormField,
    handleSubmit,
    watch,
    reset: resetForm,
    formState: { errors: formErrors, isSubmitting: formIsSubmitting },
  } = useForm();

  const quantity = watch("quantity");

  const handleInterestSubmission = async (formData) => {
    await alert.confirm(
      "Confirm Your Action",
      "Are you sure you want to buy this crop?",
      async () => {
        try {
          await postInterest({
            ...formData,
            cropId: crop._id,
            userName: user.displayName,
            userEmail: user.email,
          });

          alert.success(
            "Interest Added!",
            "Your interest has been recorded successfully."
          );
          resetForm();
          navigate("/my-interests");
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
              error.response?.data?.message ||
                "Unable to connect to the server."
            );
          }
        }
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(handleInterestSubmission)}
      className="w-full max-w-lg mx-auto"
    >
      <fieldset className="fieldset bg-base-200 border border-base-300 rounded-xl p-6 shadow-md space-y-2">
        <legend className="text-3xl font-bold text-center mb-4">
          Add Interest
        </legend>

        <div className="flex flex-col gap-2">
          <label className="label font-medium">Quantity</label>
          <input
            {...registerFormField("quantity", {
              required: "Quantity is required",
              min: { value: 1, message: "Must be at least 1" },
            })}
            type="number"
            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={`in ${crop.unit.toUpperCase()}`}
          />
          {formErrors.quantity && (
            <p className="label text-error">{formErrors.quantity.message}</p>
          )}

          <label className="label font-medium">Message (optional)</label>
          <textarea
            {...registerFormField("message")}
            className="textarea textarea-bordered w-full h-24 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Add a note or request for the owner..."
          ></textarea>

          <p className="flex items-center gap-2 text-lg font-semibold text-primary bg-base-100 px-4 py-2 rounded-xl shadow-sm w-fit">
            <span>Total Price:</span>
            <span className="text-primary">
              {quantity * crop.pricePerUnit} BDT
            </span>
          </p>
        </div>

        <motion.button
          type="submit"
          className="btn btn-primary w-full"
          disabled={formIsSubmitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {formIsSubmitting ? "Submitting..." : "Submit Interest"}
        </motion.button>
      </fieldset>
    </form>
  );
};

export default AddInterest;
