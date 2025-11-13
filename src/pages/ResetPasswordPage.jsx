import { useLocation, useNavigate } from "react-router";
import { FiArrowLeft } from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import alert from "../lib/utils/alert";
import { requestPasswordReset } from "../services/firebase";

import ScrollToTop from "../components/shared/ScrollToTop";
import PageTitle from "../components/shared/PageTitle";

const ResetPasswordPage = () => {
  const {
    register: registerFormField,
    reset: resetForm,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting: formIsSubmitting },
  } = useForm();
  const { state: redirectEmail } = useLocation();
  const navigate = useNavigate();

  const goToLogin = () => navigate("/login");

  const handleResetPassword = async (formData) => {
    const { email } = formData;

    const { success, message } = await requestPasswordReset(email);

    if (success) {
      resetForm();
      alert.info("Check Your Inbox", message);
      window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
    } else {
      alert.error("Oops!", message);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <ScrollToTop />
      <PageTitle title="Reset Password" />

      <motion.form
        onSubmit={handleSubmit(handleResetPassword)}
        className="w-full max-w-sm mx-auto"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -25 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <fieldset className="fieldset bg-base-200 border border-base-300 rounded-xl p-6 shadow-md">
          <legend className="text-3xl font-bold text-center mb-4">
            Reset Password
          </legend>

          <div className="flex flex-col gap-3">
            <label className="label font-medium">Email</label>
            <input
              {...registerFormField("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              defaultValue={redirectEmail}
              type="email"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
            />
            {formErrors.email && (
              <p className="label text-error">{formErrors.email.message}</p>
            )}
          </div>

          <motion.button
            type="submit"
            className="mt-4 btn btn-primary"
            disabled={formIsSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {formIsSubmitting ? "Sending..." : "Send"}
          </motion.button>

          <div className="divider">OR</div>

          <button
            type="button"
            onClick={goToLogin}
            className="btn btn-outline btn-primary items-center gap-2"
          >
            <FiArrowLeft size={20} /> Go Back to Login
          </button>
        </fieldset>
      </motion.form>
    </div>
  );
};

export default ResetPasswordPage;
