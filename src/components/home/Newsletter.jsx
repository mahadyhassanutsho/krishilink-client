// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import alert from "../../lib/utils/alert";

const Newsletter = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      e.target.reset();
      alert.success(
        "Subscribed!",
        "You have successfully subscribed to the newsletter."
      );
    } else {
      alert.error("Oops!", "Enter a valid email address.");
    }
  };

  return (
    <section className="border border-base-300 rounded-box p-8 shadow-md max-w-2xl mx-auto text-center space-y-6">
      <motion.h2 className="text-3xl md:text-4xl font-semibold text-base-content">
        Stay Updated
      </motion.h2>

      <motion.p className="text-base md:text-lg text-base-content/80 max-w-lg mx-auto">
        Join our newsletter to receive the latest updates, exclusive content,
        and special offers—straight to your inbox.
      </motion.p>

      <motion.form
        onSubmit={handleSubscribe}
        className="flex flex-col sm:flex-row gap-3 justify-center items-center"
      >
        <input
          required
          type="email"
          name="email"
          placeholder="Enter your email"
          className="input input-bordered w-full sm:w-80 bg-base-100 text-base-content placeholder:text-base-content/60 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <motion.button
          type="submit"
          className="w-full sm:w-fit btn btn-primary font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Subscribe
        </motion.button>
      </motion.form>

      <p className="text-sm text-base-content/60">
        We respect your privacy. No spam ever.
      </p>
    </section>
  );
};

export default Newsletter;
