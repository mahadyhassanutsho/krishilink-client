import { Link, useNavigate } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import alert from "../lib/utils/alert";
import {
  registerUser,
  loginWithProvider,
  GoogleProvider,
} from "../services/firebase";
import { useAuth } from "../providers/AuthProvider";
import useToggle from "../hooks/useToggle";

import ScrollToTop from "../components/shared/ScrollToTop";
import PageTitle from "../components/shared/PageTitle";

const RegisterPage = () => {
  const { setUser } = useAuth();
  const { value: showPassword, toggle: toggleShowPassword } = useToggle();
  const {
    register: registerFormField,
    reset: resetForm,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting: formIsSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const handleAuthResult = (success, user, message) => {
    if (success) {
      setUser(user);
      resetForm();
      alert.success(
        "Logged In!",
        `You are successfully logged in as: ${user.displayName}.`
      );
      navigate("/");
    } else {
      alert.error("Oops!", message);
    }
  };

  const handleRegister = async (formData) => {
    const { name, email, password, photo } = formData;

    const { success, user, message } = await registerUser(
      email,
      password,
      name,
      photo
    );

    handleAuthResult(success, user, message);
  };

  const handleLoginWithGoogle = async () => {
    const { success, user, message } = await loginWithProvider(GoogleProvider);

    handleAuthResult(success, user, message);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <ScrollToTop />
      <PageTitle title="Register" />

      <motion.form
        onSubmit={handleSubmit(handleRegister)}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -25 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-full max-w-sm mx-auto"
      >
        <fieldset className="fieldset bg-base-200 border border-base-300 rounded-xl p-6 shadow-md">
          <legend className="text-3xl font-bold text-center mb-4">
            Register
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
              type="text"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="John Doe"
            />
            {formErrors.name && (
              <p className="label text-error">{formErrors.name.message}</p>
            )}

            <label className="label font-medium">Email</label>
            <input
              {...registerFormField("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="johndoe@example.com"
            />
            {formErrors.email && (
              <p className="label text-error">{formErrors.email.message}</p>
            )}

            <label className="label font-medium mt-2">Password</label>
            <div className="relative">
              <input
                {...registerFormField("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  validate: {
                    hasUppercase: (value) =>
                      /[A-Z]/.test(value) || "Must include an uppercase letter",
                    hasLowercase: (value) =>
                      /[a-z]/.test(value) || "Must include a lowercase letter",
                    hasNumber: (value) =>
                      /[0-9]/.test(value) || "Must include a number",
                    hasSpecial: (value) =>
                      /[!@#$%^&*]/.test(value) ||
                      "Must include a special character",
                  },
                })}
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="*******"
              />
              {formErrors.password && (
                <p className="label text-error">
                  {formErrors.password.message}
                </p>
              )}
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute top-0 right-0 translate-y-1/2 px-2 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            <label className="label font-medium">Photo URL</label>
            <input
              {...registerFormField("photo", {
                required: "Photo URL is required",
                pattern: {
                  value: /^https:\/\/[^\s/$.?#].[^\s]*\.[a-z]{2,}(\/[^\s]*)?$/i,
                  message: "Please enter a valid URL",
                },
              })}
              type="text"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://example.com/photo"
            />
            {formErrors.photo && (
              <p className="label text-error">{formErrors.photo.message}</p>
            )}
          </div>

          <div className="my-4 text-center space-x-1 text-sm">
            <span>Already have an account? </span>
            <Link to="/login" className="underline text-accent font-semibold">
              Login
            </Link>
          </div>

          <motion.button
            className="btn btn-primary w-full transition-colors"
            disabled={formIsSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {formIsSubmitting ? "Registering" : "Register"}
          </motion.button>

          <div className="divider">OR</div>

          <button
            type="button"
            onClick={handleLoginWithGoogle}
            className="btn btn-outline btn-primary gap-2"
          >
            <FcGoogle size={20} />
            <span className="text-sm">Continue with Google</span>
          </button>
        </fieldset>
      </motion.form>
    </div>
  );
};

export default RegisterPage;
