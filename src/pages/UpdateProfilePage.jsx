import { useNavigate } from "react-router";
import { FiArrowLeft } from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import alert from "../lib/utils/alert";
import { updateUser } from "../services/firebase";
import { useAuth } from "../providers/AuthProvider";

import ScrollToTop from "../components/shared/ScrollToTop";
import PageTitle from "../components/shared/PageTitle";

const UpdateProfilePage = () => {
  const { user, setUser } = useAuth();
  const {
    register: registerFormField,
    reset: resetForm,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting: formIsSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const goToProfile = () => navigate("/profile");

  const handleUpdateUser = async (formData) => {
    const { name, photo } = formData;

    const {
      success,
      user: updatedUser,
      message,
    } = await updateUser(user, name, photo);

    if (success) {
      resetForm();
      setUser(updatedUser);
      alert.success("Updated!", message);
      goToProfile();
    } else {
      alert.error("Oops!", message);
    }
  };

  return (
    <>
      <ScrollToTop />
      <PageTitle title="Update Profile" />

      <motion.form
        onSubmit={handleSubmit(handleUpdateUser)}
        className="w-full max-w-sm mx-auto"
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <fieldset className="fieldset bg-base-200 border border-base-300 rounded-xl p-6 shadow-md">
          <legend className="text-3xl font-bold text-center mb-4">
            Update Profile
          </legend>

          <div className="flex flex-col gap-3">
            <label className="label font-medium">Name</label>
            <input
              {...registerFormField("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name cannot be shorter than 3 character",
                },
              })}
              defaultValue={user.displayName}
              type="text"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="John Doe"
            />
            {formErrors.name && (
              <p className="label text-error">{formErrors.name.message}</p>
            )}

            <label className="label font-medium">Photo URL</label>
            <input
              {...registerFormField("photo", {
                required: "Photo URL is required",
                pattern: {
                  value: /^https:\/\/[^\s/$.?#].[^\s]*\.[a-z]{2,}(\/[^\s]*)?$/i,
                  message: "Please enter a valid URL",
                },
              })}
              defaultValue={user.photoURL}
              type="text"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://example.com/photo"
            />
            {formErrors.photo && (
              <p className="label text-error">{formErrors.photo.message}</p>
            )}
          </div>

          <motion.button
            type="submit"
            className="mt-4 btn btn-primary"
            disabled={formIsSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {formIsSubmitting ? "Updating..." : "Update"}
          </motion.button>

          <div className="divider">OR</div>

          <button
            type="button"
            onClick={goToProfile}
            className="btn btn-outline btn-primary items-center gap-2"
          >
            <FiArrowLeft size={20} /> Go Back to Profile
          </button>
        </fieldset>
      </motion.form>
    </>
  );
};

export default UpdateProfilePage;
